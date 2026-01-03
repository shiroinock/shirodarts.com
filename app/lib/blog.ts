import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostMetadata {
  title: string;
  date: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export interface PostPreview {
  slug: string;
  metadata: PostMetadata;
}

/**
 * すべてのブログ記事のメタデータを取得（日付降順）
 */
export function getAllPosts(): PostPreview[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName: string) => fileName.endsWith(".md"))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        metadata: data as PostMetadata,
      };
    });

  // 日付降順でソート
  return allPostsData.sort((a: PostPreview, b: PostPreview) => {
    if (a.metadata.date < b.metadata.date) {
      return 1;
    }
    return -1;
  });
}

/**
 * 指定されたスラッグの記事を取得
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Markdown を HTML に変換
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    return {
      slug,
      metadata: data as PostMetadata,
      content: processedContent.toString(),
    };
  } catch (_error) {
    return null;
  }
}

/**
 * すべての記事のスラッグを取得
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName: string) => fileName.endsWith(".md"))
    .map((fileName: string) => fileName.replace(/\.md$/, ""));
}
