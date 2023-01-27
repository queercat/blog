import Link from "next/link"
import styles from "../components/Resume/Resume.module.css"

export default function Resume() {
    return (
        <div className={styles.resume_container}>
            <iframe className={styles.resume} src="/blog/pdfs/resume_2022.pdf"/>
        </div>
    )
}