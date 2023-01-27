import styles from "../components/Home/Home.module.css"
export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.pfp}>
        <img src={require("/imgs/pfp.png")} width={200} height={200}/>
      </div>
      
      <div className={styles.blurbs}>
        <div className={styles.blurb}>
          <h1 className={styles.blurb_header}>#about me</h1>
          <p>hi i am <u className={styles.name}>may</u>. a pnw based software developer with a wide range of experiences that i wish to share.</p>
        </div>

        <div className={styles.blurb}>
          <h1 className={styles.blurb_header}>#skills</h1>
          <p>- languages: python, javascript, c++, c, rust, go, c#.</p>
          <p>- frameworks, libs, etc: express, jest, jquery, react, next, flask, mongo, postgres.</p>
        </div>

        <div className={styles.blurb}>
          <h1 className={styles.blurb_header}>#interesting projects</h1>
          <p><a href="https://github.com/queercat/most">most</a>: a file hosting server i built with node.</p>
          <p><a href="https://github.com/queercat/hexqt">hexqt</a>: a hex editor written with qt.</p>
          <p><a href="https://github.com/queercat/autodoc-generator">autodoc</a>: a custom documentation engine written with regex and node.</p>
          <p><a href="https://github.com/queercat/queercat.github.io">portfolio site</a>: my <a href="https://queercat.github.io">portfolio</a> written with React and Three.js.</p>
        </div>
      </div>
    </div>
  )
}