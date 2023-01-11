export default function Home() {
  return (
    <div className="home">
      <div className="blurb">
        <h1>#about me</h1>
        <p>=========</p>
        <p>hi i am <u>may</u>. a pnw based software developer with a wide range of experiences that i wish to share.</p>
      </div>

      <div className="blurb">
        <h1>#skills</h1>
        <p>=========</p>
        <p>- languages: python, javascript, c++, c, rust, go, c#.</p>
        <p>- frameworks, libs, etc: express, jest, jquery, react, next, flask, mongo, postgres.</p>
      </div>

      <div className="blurb">
        <h1>#interesting projects</h1>
        <p>=========</p>
        <p><a href="https://github.com/queercat/most">most</a>: a file hosting server i built with node.</p>
        <p><a href="https://github.com/queercat/hexqt">hexqt</a>: a hex editor written with qt.</p>
        <p><a href="https://github.com/queercat/autodoc-generator">autodoc</a>: a custom documentation engine written with regex and node.</p>
        <p><a href="https://github.com/queercat/queercat.github.io">portfolio site</a>: my <a href="https://queercat.github.io">portfolio</a> written with React and Three.js.</p>
      </div>
    </div>
  )
}