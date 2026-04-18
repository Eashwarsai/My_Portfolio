import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// We import a syntax-highlighting theme suitable for Dark Modes.
// "highlight.js/styles/atom-one-dark.css" looks excellent alongside Tailwind Dark patterns.
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article 
      className="prose prose-sm md:prose-base dark:prose-invert max-w-none 
                 prose-pre:bg-surface prose-pre:border prose-pre:border-border-secondary
                 prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-secondary
                 prose-headings:font-display prose-headings:font-bold
                 w-full"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
