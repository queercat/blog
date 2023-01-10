import Link from 'next/link'
import path from 'path'

export default function Post({post: {frontmatter, slug}}, key) {
    return (
        <Link href={path.join('posts', slug)}>
        <div className="post" key={key}>
            <h2>- {frontmatter.title} <small>&lt;{frontmatter.date}&gt;</small> </h2>
        </div>
        </Link>
    )
}