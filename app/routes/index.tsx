import { css } from "hono/css";

const className = css`
	font-family: sans-serif;
`;

export default function Home() {
  return (
    <div class={className}>
      <h1>Welcome to shirodarts.com</h1>
      <p>Built with HonoX and Cloudflare Pages</p>
    </div>
  );
}
