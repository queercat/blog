import styles from "../components/Resume/Resume.module.css"

export default function Resume() {
    return (
        <div className={styles.resume}>
            <iframe width="100%" height="100%" src={'/pdfs/resume_2022.pdf'}></iframe>
        </div>
    )
}