import path from "path"
import fs from "fs"

import { MDXRemote } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize';
import gruvboxDark from "../../components/Styles/gruvbox-dark";
import gradientDark from "../../components/Styles/gradient-dark";
import styles from "../../components/Posts/Post.module.css";

import SyntaxHighlighter from 'react-syntax-highlighter';
import BytecodeCompiler from '../../components/Posts/BytecodeCompiler/BytecodeCompiler';
import Aside from "../../components/Aside/Aside";
import LineChart from "../../components/Posts/Charts/LineChart";
import ReducerVisualizer from "../../components/Posts/ReducerVisualizer/ReducerVisualizer";


import { NextSeo } from "next-seo";


export default function Posts({source}) {    
    
    const components = {code, BytecodeCompiler, Aside, LineChart, ReducerVisualizer};

    /* https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l */
    function readingTime() {
        const wpm = 225;
        const words = source.compiledSource.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);

        return time;
      }

      const time = readingTime();

    function code({className, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return match
          ? <SyntaxHighlighter language={match[1]} style={gruvboxDark} PreTag="div_space" {...props} />
          : <nocode className={className} {...props} />
    }

    function getTimeAgo(date) {
        date = date.split('-')
        let pastDate = new Date(date[2], date[0] - 1, date[1]);
        let currDate = new Date();

        return Math.round((currDate - pastDate)/1000/60/60/24);
    }

    return (
        <>
            <NextSeo title={source.frontmatter.title} description={source.frontmatter.description}/>
            <div className={styles.blog_post}>
                <div className={styles.blog_header}>
                    <div className={styles.blog_title_container}>
                        <p className={styles.blog_title_date}>&lt;{source.frontmatter.date}&gt; {getTimeAgo(source.frontmatter.date)} days ago</p>
                        <p className={styles.blog_time}>reading time {time} minutes</p>
                        <h1 className={styles.blog_title}>{source.frontmatter.title}</h1>                    
                    </div> 
                    <p className={styles.blog_subtitle}>{source.frontmatter.blurb}</p>
                </div>
                
                <div id="blog_content" className={styles.blog_content}>
                    <MDXRemote {...source} components={components} />
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
    const location = path.join('posts', params.post + '.mdx');
    const data = fs.readFileSync(location, 'utf-8');
    const ser = await serialize(data, {parseFrontmatter: true});

    return {
        props: {
            source: ser,
            meta: 0
        }
    }
}