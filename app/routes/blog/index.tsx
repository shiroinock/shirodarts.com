import { css } from "hono/css";
import { getAllPosts } from "../../lib/blog";

const containerClassName = css`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem 1rem;
	font-family: sans-serif;
`;

const navClassName = css`
	margin-bottom: 2rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;
	font-size: 0.9rem;
	color: #666;

	a {
		color: #0070f3;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

const titleClassName = css`
	font-size: 2.5rem;
	margin-bottom: 2rem;
	color: #333;
`;

const postListClassName = css`
	list-style: none;
	padding: 0;
`;

const postItemClassName = css`
	margin-bottom: 2rem;
	padding-bottom: 2rem;
	border-bottom: 1px solid #eee;

	&:last-child {
		border-bottom: none;
	}
`;

const postMetaClassName = css`
	color: #666;
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
`;

const postTitleClassName = css`
	font-size: 1.5rem;
	margin: 0;

	a {
		color: #0070f3;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div class={containerClassName}>
      <nav class={navClassName}>
        <a href="/">ホーム</a>
        <span>/</span>
        <span>ブログ</span>
      </nav>
      <h1 class={titleClassName}>Blog</h1>
      {posts.length === 0 ? (
        <p>記事がまだありません。</p>
      ) : (
        <ul class={postListClassName}>
          {posts.map((post) => (
            <li key={post.slug} class={postItemClassName}>
              <div class={postMetaClassName}>{post.metadata.date}</div>
              <h2 class={postTitleClassName}>
                <a href={`/blog/${post.slug}`}>{post.metadata.title}</a>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
