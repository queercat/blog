import fs from "fs"
import path from "path"
import matter from "gray-matter"

import Post from "../components/Post/Post"
import styles from "../components/Blog/Blog.module.css"

export default function Blog({postObjects}) {    
    return (
        <div className={styles.posts}>
            {postObjects.map(post => {
                return <Post key={post.key} post={post}/>
            })}
        </div>
    )
}

export async function getStaticProps() {
    const postNames = fs.readdirSync(path.join('posts'));
    const postObjects = postNames.map((name, index) => {
        const file = fs.readFileSync(path.join('posts', name), 'utf-8')
        const meta = matter(file).data;

        return {
            name: name.replace('.mdx', ''),
            meta,
            key: index
        }
    })

    return {
        props: {
            postObjects
        }
    }
}