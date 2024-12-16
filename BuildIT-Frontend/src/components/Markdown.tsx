import ReactMarkdown from "react-markdown";
import rehypePrism from 'rehype-prism';
import remarkGfm from 'remark-gfm';

import 'prism-themes/themes/prism-dracula.css';
import '../styles/Markdown.css';

export default function Markdown({text}: {text: string}) {
  return (
    <ReactMarkdown rehypePlugins={[rehypePrism, remarkGfm]} className="md">{text}</ReactMarkdown>
  )
}