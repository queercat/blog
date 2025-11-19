import { NextSeo } from "next-seo";
import styles from "../components/Resume/Resume.module.css";

export default function Resume() {
  return (
    <div className={styles.resume_container}>
      <NextSeo title="may resume" description="may tusek resume" />
      <iframe
        className={styles.resume}
        src="/blog/pdfs/resume_may_tusek_2025.pdf"
      />
    </div>
  );
}
