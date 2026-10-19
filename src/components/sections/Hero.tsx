import styles from "./Hero.module.css";
import HeroMedia from "./HeroMedia";
import type { HeroDictionary, Locale } from "@/i18n/dictionaries";
export default function Hero({ dict }: { dict: HeroDictionary; locale: Locale }) {
  return (
    <section aria-labelledby="hero-titre" className={styles.hero}>
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              {dict.eyebrow}
            </p>
            <h1
              id="hero-titre"
              className={styles.title}
            >
              {dict.titre}
            </h1>
            <p className={styles.description}>
              {dict.paragraphe}
            </p>
            <div className={styles.actions}>
              <a
                href="#expertises"
                className={styles.primary}
              >
                {dict.ctaPrincipal}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
              <a
                href="#projets"
                className={styles.secondary}
              >
                {dict.ctaSecondaire}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <HeroMedia dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
