import styles from "./Aside.module.css"
import Image from "next/image";

export default function Aside(props) {
    let source = "";

    if (props.mood != undefined) {
        if (props.mood == 'default'){
            source = "/blog/imgs/pfp.png"
        }
        
        else if (props.mood == 'rat') {
            source = "/blog/imgs/rat.png"
        }
    } else {
        return new Error("you forgot to set a mood. 🤓")
    }
    
    return (
        <div className={styles.aside}>
            <div className={styles.aside_image}>
                <Image src={source} alt="an image for the socratic method" width={200} height={200}/>
            </div>

            <div className={styles.aside_content}>
                {props.children}
            </div>
        </div>
    )
}