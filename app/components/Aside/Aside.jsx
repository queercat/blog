import styles from "./Aside.module.css"

import Image from 'next/image'

import rat from "../../public/imgs/rat.png"
import pfp from "../../public/imgs/pfp.png"

export default function Aside(props) {
    let source = "";

    if (props.mood != undefined) {
        if (props.mood == 'default'){
            source = pfp
        }
        
        else if (props.mood == 'rat') {
            source = rat
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