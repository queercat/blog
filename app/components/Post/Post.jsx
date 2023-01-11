import Link from 'next/link'
import path from 'path'

export default function Post({id, post}) {
    return (
        <div className='post'>
            <Link href={"/posts/" + post.name}><h1>- {post.meta.title} &lt;{post.meta.date}&gt;</h1></Link>
        </div>
    )
}