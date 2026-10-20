"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Locale, PrivacyNoticeDictionary } from "@/i18n/dictionaries";
import { PRIVACY_NOTICE_STORAGE_KEY, PRIVACY_NOTICE_VERSION } from "@/lib/privacy-notice";
import styles from "./PrivacyNotice.module.css";

const CHANGE_EVENT = "aws:privacy-notice-change";
let dismissedInMemory = false;

function isDismissed() {
  if (dismissedInMemory) return true;
  try {
    return window.localStorage.getItem(PRIVACY_NOTICE_STORAGE_KEY) === PRIVACY_NOTICE_VERSION;
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === PRIVACY_NOTICE_STORAGE_KEY || event.key === null) {
      dismissedInMemory = false;
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function dismiss() {
  dismissedInMemory = true;
  try {
    window.localStorage.setItem(PRIVACY_NOTICE_STORAGE_KEY, PRIVACY_NOTICE_VERSION);
  } catch {
    // Private/restricted storage: close normally for this page session.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Hidden during SSR and the matching hydration pass. No layout reservation,
// no focus theft, no tracking consent and no marketing storage.
const serverSnapshot = () => true;

export default function PrivacyNotice({ locale, dict }: {
  locale: Locale;
  dict: PrivacyNoticeDictionary;
}) {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, serverSnapshot);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (dismissed || !panelRef.current) return;
    const panel = panelRef.current;
    const update = () => {
      // Reserve room at the page end and lift WhatsApp clear of the banner.
      document.documentElement.style.setProperty("--aws-privacy-clearance", `${Math.ceil(panel.getBoundingClientRect().height) + 24}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(panel);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--aws-privacy-clearance");
    };
  }, [dismissed]);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => {
      dismiss();
      setClosing(false);
      document.getElementById("top")?.focus({ preventScroll: true });
    }, 180);
    return () => window.clearTimeout(timer);
  }, [closing]);

  if (dismissed) return null;

  return (
    <>
    <div className={styles.clearance} aria-hidden="true" />
    <aside ref={panelRef} className={styles.panel} data-closing={closing} aria-labelledby="privacy-notice-title" aria-live="polite">
      <div className={styles.message}>
        <h2 id="privacy-notice-title" className={styles.title}>{dict.title}</h2>{" "}
        <span>{dict.description}</span>{" "}
        <a href={`/${locale}/confidentialite`} className={styles.link} onClick={dismiss}>
          {dict.learnMore}
        </a>
      </div>
        <button type="button" className={styles.close} aria-label={dict.close}
          disabled={closing}
          onClick={() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              dismiss();
              document.getElementById("top")?.focus({ preventScroll: true });
            } else setClosing(true);
          }}>
          <span aria-hidden="true">×</span>
        </button>
    </aside>
    </>
  );
}
