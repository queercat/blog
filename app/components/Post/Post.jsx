import Link from 'next/link'

import styles from '../Blog/Blog.module.css'

export default function Post({id, post}) {
    return (
        <div id={id} key={id} className={styles.post}>
            <h1><Link key={id} href={"/posts/" + post.name}>{post.meta.title}</Link> &lt;{post.meta.date}&gt;</h1>
        </div>
    )
}