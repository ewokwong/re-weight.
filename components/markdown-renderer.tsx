"use client"

import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import rehypeRaw from "rehype-raw"

interface MarkdownRendererProps {
  content: string
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-foreground border-b border-border pb-3 mt-16 mb-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-foreground mt-14 mb-6">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-foreground mt-10 mb-5">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base font-normal text-muted-foreground leading-relaxed mb-6" style={{ fontWeight: 400 }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-3 mb-6 ml-6 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-3 mb-6 ml-6 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base font-normal leading-relaxed pl-2" style={{ fontWeight: 400 }}>
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <span className="font-semibold text-foreground">{children}</span>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  code: ({ children, className }) => {
    const isInline = !className
    return isInline ? (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ) : (
      <code className={className}>{children}</code>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground my-6">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-foreground underline hover:text-muted-foreground transition-colors">
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-border my-8" />
  ),
  img: ({ src, alt }) => (
    <img 
      src={src} 
      alt={alt || ""} 
      className="w-full max-w-2xl mx-auto my-8 rounded-lg object-cover"
    />
  ),
  div: ({ children, ...props }) => (
    <div {...props}>{children}</div>
  ),
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-full overflow-x-auto">
      <ReactMarkdown components={markdownComponents} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

