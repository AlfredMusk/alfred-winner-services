"use client";

import { useSyncExternalStore } from "react";
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
  if (dismissed) return null;

  return (
    <aside className={styles.panel} aria-labelledby="privacy-notice-title" aria-live="polite">
      <div className={styles.heading}>
        <h2 id="privacy-notice-title" className={styles.title}>{dict.title}</h2>
        <button type="button" className={styles.close} aria-label={dict.close}
          onClick={() => {
            dismiss();
            document.getElementById("top")?.focus({ preventScroll: true });
          }}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <p className={styles.description}>{dict.description}</p>
      <a href={`/${locale}/confidentialite`} className={styles.link} onClick={dismiss}>
        {dict.learnMore}<span aria-hidden="true"> →</span>
      </a>
    </aside>
  );
}
