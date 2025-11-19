import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_items}>
        <div className={styles.footer_item}>
          <a href="https://github.com/queercat">
            <p>my github</p>
          </a>
        </div>

        <div className={styles.footer_item}>
          <a href="https://www.linkedin.com/in/may-tusek-69a455168/">
            <p>my linkedin</p>
          </a>
        </div>

        <div className={styles.footer_item}>
          <p>
            all views expressed are <b>entirely my own</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
