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

/**
 * シンプルなfrontmatterパーサー
 */
function parseFrontmatter(markdown: string): {
  data: PostMetadata;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return {
      data: { title: "", date: "" },
      content: markdown,
    };
  }

  const frontmatter = match[1] || "";
  const content = match[2] || "";
  const data: PostMetadata = { title: "", date: "" };

  // シンプルなYAMLパース（title と date のみ）
  const titleMatch = frontmatter.match(/title:\s*["'](.*)["']/);
  const dateMatch = frontmatter.match(/date:\s*["'](.*)["']/);

  if (titleMatch?.[1]) {
    data.title = titleMatch[1];
  }
  if (dateMatch?.[1]) {
    data.date = dateMatch[1];
  }

  return { data, content };
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
    const rawContent = (await (resolver as () => Promise<string>)()) as string;
    const { data } = parseFrontmatter(rawContent);

    posts.push({
      slug,
      metadata: data,
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

    const rawContent = (await (resolver as () => Promise<string>)()) as string;
    const { data, content } = parseFrontmatter(rawContent);

    // Markdown を HTML に変換
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    return {
      slug,
      metadata: data,
      content: processedContent.toString(),
    };
  } catch (_error) {
    return null;
  }
}
