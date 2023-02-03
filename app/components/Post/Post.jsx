import Link from 'next/link'

import styles from '../Blog/Blog.module.css'

export default function Post({id, post}) {
    function click() {
        location.href += "/posts/" + post.name;
    }

    return (
        <div onClick={click} id={id} key={id} className={styles.post}>
            <div className={styles.post_header}>
                <h1><Link href={"/posts/" + post.name}>{post.meta.title}</Link></h1>
                <p>{post.meta.description}</p>
            </div>
            <h1 className={styles.post_date}>&lt;{post.meta.date}&gt;</h1>
        </div>
    )
}