import { css } from "hono/css";

const className = css`
	font-family: sans-serif;
`;

const linksClassName = css`
	margin-top: 1.5rem;
	display: flex;
	gap: 1rem;
	font-size: 0.9rem;

	a {
		color: #0070f3;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

export default function Home() {
  return (
    <div class={className}>
      <h1>Welcome to shirodarts.com</h1>
      <p>Built with HonoX and Cloudflare Pages</p>
      <div class={linksClassName}>
        <a href="/blog">
          Blog
        </a>
        <span>|</span>
        <a href="https://github.com/shiroinock" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span>|</span>
        <a href="https://x.com/shirodarts" target="_blank" rel="noopener noreferrer">
          X
        </a>
      </div>
    </div>
  );
}
