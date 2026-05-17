import { marked } from "marked";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";

type ContentData = {
  content: string;
  data: {
    image: string;
    title: string;
  };
  isEmpty?: boolean;
  excerpt?: string;
  orig?: Buffer;
};

export async function getPost(title: string) {
  const text = await readFile(`./app/contents/${title}.md`, { encoding: "utf8" });
  const { data, content } = matter(text) as unknown as ContentData;
  const parsedText = marked.parse(content);

  return { image: data.image, html: parsedText, title: data.title };
}

export async function getAllPost() {
  const files = await readdir(`./app/contents`);
  
  return files.map(item => item.replace('.md', ''));;
}
