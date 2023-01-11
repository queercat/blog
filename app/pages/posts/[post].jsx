import path from "path"
import fs from "fs"

import {remark} from "remark";
import html from "remark-html";
import matter from "gray-matter";

export default function Posts({html, meta}) {    
    return (
        <>
            <div className='blog-post'>
                <div className="blog-header">
                    <h1>{meta.title} &lt;{meta.date}&gt;</h1>
                    <subtext>{meta.blurb}</subtext>
                </div>
                
                <div className='blog-content'>
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const paths = fs.readdirSync(path.join('posts')).map(name => ({
        params: { post: name.split('.')[0] }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const location = path.join('posts', params.post + '.md');
    const data = fs.readFileSync(location, 'utf-8');
    const meta = matter(data);

    const file = (await remark().use(html).process(meta.content)).toString();

    return {
        props: {
            html: file,
            meta: meta.data
        }
    }
}