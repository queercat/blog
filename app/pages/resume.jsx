import Link from "next/link"
import styles from "../components/Resume/Resume.module.css"

export default function Resume() {
    return (
        <div className={styles.resume}>
            <Link href={'/blog/pdfs/resume_2022.pdf'}/>
        </div>
    )
}