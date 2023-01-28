import fs from "fs"
import path from "path"

import styles from "../components/Tools/Tools.module.css"
import Link from "next/link"
import { NextSeo } from "next-seo"

export default function Tools({postObjects}) {        
    if (postObjects != undefined) {    
        return (
            <div className={styles.tools_container}>
                <NextSeo description="may's tools" title="tools"></NextSeo>
                {postObjects.map(post => {
                    return (
                        <div key={post.key} className={styles.tool_item}>
                            <h1><Link href={"/tools/" + post.path}>{post.meta.title}</Link></h1>
                            <p>{post.meta.description}</p>
                        </div>
                    )
                })}
            </div>)}
    else {
        return (
            <></>
        )
    }
}

export async function getStaticProps() {
    const postNames = fs.readdirSync(path.join('pages', 'tools'));

    let postObjects = null;

    if (postNames != undefined) {

    postObjects = postNames.map((name, index) => {
        const file = fs.readFileSync(path.join('pages', 'tools', name), 'utf-8', 'r')
        const meta = (JSON.parse(file.split('\n')[0].replace(/\/\*|\*\//g, "")));

        return {
            path: name.replace('.jsx', ''),
            meta: meta,
            key: index
        }
    })
    }

    return {
        props: {
            postObjects
        }
    }
}