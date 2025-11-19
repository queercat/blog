import fs from "fs";
import path from "path";

import styles from "../components/Blog/Blog.module.css";
import Tool from "../components/Tools/Tool";

import { NextSeo } from "next-seo";

export default function Tools({ postObjects }) {
  return (
    <div className={styles.posts}>
      <NextSeo description="may's tools" title="tools"></NextSeo>
      {postObjects.map((post) => {
        return <Tool key={postObjects.key} post={post} />;
      })}
    </div>
  );
}

export async function getStaticProps() {
  let allPostNames = fs.readdirSync(path.join("pages", "tools"));
  let postNames = [];

  allPostNames.forEach((name) => {
    if (name.includes(".jsx")) {
      postNames.push(name);
    }
  });

  let postObjects = null;

  if (postNames != undefined) {
    postObjects = postNames.map((name, index) => {
      const file = fs.readFileSync(
        path.join("pages", "tools", name),
        "utf-8",
        "r",
      );
      const meta = JSON.parse(file.split("\n")[0].replace(/\/\*|\*\//g, ""));

      return {
        path: name.replace(".jsx", ""),
        meta: meta,
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
