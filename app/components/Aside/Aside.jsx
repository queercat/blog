import styles from "./Aside.module.css"

export default function Aside(props) {
    let source = "";

    if (props.mood != undefined) {
        if (props.mood == 'default'){
            source = require("/imgs/pfp.png")
        }
        
        else if (props.mood == 'rat') {
            source = require("/imgs/rat.png")
        }
    } else {
        return new Error("you forgot to set a mood. 🤓")
    }
    
    return (
        <div className={styles.aside}>
            <div className={styles.aside_image}>
                <img src={source} alt="an image for the socratic method" width={200} height={200}/>
            </div>

            <div className={styles.aside_content}>
                {props.children}
            </div>
        </div>
    )
}