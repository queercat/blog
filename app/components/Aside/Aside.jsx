import styles from "./Aside.module.css"
import Image from "next/image"

export default function Aside(props) {
    let source = "";

    switch (props.mood) {
        case 'default':
            source = "/blog/imgs/pfp.png"
        case 'rat':
            source = "/blog/imgs/rat.png"
    }
    
    return (
        <div className={styles.aside}>
            <div className={styles.aside_image}>
                <Image src={source} alt="an image for the socratic method" width={200} height={200}></Image>
            </div>

            <div className={styles.aside_content}>
                {props.children}
            </div>
        </div>
    )
}