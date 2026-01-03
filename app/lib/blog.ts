import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

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

// ビルド時にMarkdownファイルを読み込む
const modules = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
});

/**
 * すべてのブログ記事のメタデータを取得（日付降順）
 */
export async function getAllPosts(): Promise<PostPreview[]> {
  const posts: PostPreview[] = [];

  for (const [path, resolver] of Object.entries(modules)) {
    const slug = path.replace("/content/blog/", "").replace(/\.md$/, "");
    const content = (await (resolver as () => Promise<string>)()) as string;
    const { data } = matter(content);

    posts.push({
      slug,
      metadata: data as PostMetadata,
    });
  }

  // 日付降順でソート
  return posts.sort((a, b) => {
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
    const modulePath = `/content/blog/${slug}.md`;
    const resolver = modules[modulePath];

    if (!resolver) {
      return null;
    }

    const rawContent = (await resolver()) as string;
    const { data, content } = matter(rawContent);

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
