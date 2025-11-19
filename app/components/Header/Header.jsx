import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_items}>
        <div className={styles.header_item}>
          <h1>
            <Link href="/" className={styles.header_url}>
              may
            </Link>
          </h1>
        </div>

        <div className={styles.header_item}>
          <h1 className={styles.header_seperator}>-</h1>
        </div>

        <div className={styles.header_item}>
          <h1>
            <Link href="/posts" className={styles.header_url}>
              posts
            </Link>
          </h1>
        </div>

        <div className={styles.header_item}>
          <h1 className={styles.header_seperator}>-</h1>
        </div>

        <div className={styles.header_item}>
          <h1>
            <Link href="/resume" className={styles.header_url}>
              resume
            </Link>
          </h1>
        </div>

        <div className={styles.header_item}>
          <h1 className={styles.header_seperator}>-</h1>
        </div>

        <div className={styles.header_item}>
          <h1>
            <Link href="/tools" className={styles.header_url}>
              tools
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
