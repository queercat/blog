import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Post from "../components/Post/Post";
import styles from "../components/Blog/Blog.module.css";
import { NextSeo } from "next-seo";

export default function Blog({ postObjects }) {
  postObjects.map((post) => {
    let dateArray = post.meta.date.split("-");
    const month = dateArray[0];
    const day = dateArray[1];
    const year = dateArray[2];

    const date = new Date(year, month, day);
    post.unixTime = date.getTime();
  });

  let ps = postObjects;

  postObjects.sort((a, b) => {
    return b.unixTime - a.unixTime;
  });

  if (postObjects != undefined) {
    return (
      <div className={styles.posts}>
        <NextSeo description="may's blog posts" title="blog posts"></NextSeo>
        {postObjects.map((post) => {
          return <Post key={post.key} post={post} />;
        })}
      </div>
    );
  } else {
    return <></>;
  }
}

export async function getStaticProps() {
  const postNames = fs.readdirSync(path.join("posts"));

  let postObjects = null;

  if (postNames != undefined) {
    postObjects = postNames.map((name, index) => {
      const file = fs.readFileSync(path.join("posts", name), "utf-8");
      const meta = matter(file).data;

      return {
        name: name.replace(".mdx", ""),
        meta,
        key: index,
      };
    });
  }

  return {
    props: {
      postObjects,
    },
  };
}
