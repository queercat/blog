import Link from 'next/link'

import styles from '../Blog/Blog.module.css'

export default function Tool({id, post}) {
    function click() {
        location.href += "/" + post.path;
    }

    return (
        <div onClick={click} id={id} key={id} className={styles.post}>
            <div className={styles.post_header}>
                <h1><Link href={"/posts/" + post.path}>{post.meta.title}</Link></h1>
                <p>{post.meta.description}</p>
            </div>
        </div>
    )
}