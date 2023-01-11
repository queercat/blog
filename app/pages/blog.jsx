import fs from "fs"
import path from "path"
import matter from "gray-matter"

import Post from "../components/Post/Post"

export default function Blog({postObjects}) {    
    return (
        <div className="posts">
            {postObjects.map(post => {
                return <Post id={post.key} post={post}/>
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
            name: name.replace('.md', ''),
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