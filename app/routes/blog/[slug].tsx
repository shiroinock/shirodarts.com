import type { Context } from "hono";
import { css } from "hono/css";
import { getPostBySlug } from "../../lib/blog";

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
	margin-bottom: 0.5rem;
	color: #333;
	line-height: 1.2;
`;

const metaClassName = css`
	color: #666;
	font-size: 0.9rem;
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid #eee;
`;

const contentClassName = css`
	line-height: 1.8;
	color: #333;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 2rem;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	h2 {
		font-size: 1.8rem;
		border-bottom: 2px solid #eee;
		padding-bottom: 0.5rem;
	}

	h3 {
		font-size: 1.4rem;
	}

	p {
		margin-bottom: 1rem;
	}

	a {
		color: #0070f3;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	code {
		background: #f5f5f5;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: "Consolas", "Monaco", "Courier New", monospace;
		font-size: 0.9em;
	}

	pre {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 5px;
		overflow-x: auto;
		margin-bottom: 1rem;

		code {
			background: none;
			padding: 0;
		}
	}

	blockquote {
		border-left: 4px solid #ddd;
		padding-left: 1rem;
		margin-left: 0;
		color: #666;
		font-style: italic;
	}

	ul,
	ol {
		margin-bottom: 1rem;
		padding-left: 2rem;
	}

	li {
		margin-bottom: 0.5rem;
	}

	img {
		max-width: 100%;
		height: auto;
		border-radius: 5px;
		margin: 1rem 0;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;

		th,
		td {
			border: 1px solid #ddd;
			padding: 0.75rem;
			text-align: left;
		}

		th {
			background: #f5f5f5;
			font-weight: bold;
		}
	}

	hr {
		border: none;
		border-top: 1px solid #eee;
		margin: 2rem 0;
	}
`;

const notFoundClassName = css`
	text-align: center;
	padding: 4rem 1rem;
	color: #666;
`;

export default async function BlogPost(c: Context) {
  const slug = c.req.param("slug");
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div class={containerClassName}>
        <nav class={navClassName}>
          <a href="/">ホーム</a>
          <span>/</span>
          <a href="/blog">ブログ</a>
        </nav>
        <div class={notFoundClassName}>
          <h1>404 - 記事が見つかりません</h1>
        </div>
      </div>
    );
  }

  return (
    <div class={containerClassName}>
      <nav class={navClassName}>
        <a href="/">ホーム</a>
        <span>/</span>
        <a href="/blog">ブログ</a>
      </nav>
      <article>
        <h1 class={titleClassName}>{post.metadata.title}</h1>
        <div class={metaClassName}>{post.metadata.date}</div>
        <div class={contentClassName} dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
