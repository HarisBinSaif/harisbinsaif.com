import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold text-white mt-12 mb-6" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold text-white mt-10 mb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold text-white mt-8 mb-3" {...props} />,
  h4: (props) => <h4 className="text-xl font-bold text-white mt-6 mb-2" {...props} />,
  p: (props) => <p className="text-gray-300 leading-relaxed mb-4 text-lg" {...props} />,
  ul: (props) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-data-accent pl-4 italic text-gray-300 my-6" {...props} />
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        className="rounded-lg my-4"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="px-2 py-1 rounded bg-white/10 text-data-accent text-sm font-mono" {...props}>
        {children}
      </code>
    )
  },
  a: (props) => (
    <a className="text-data-accent hover:text-data-purple underline" {...props} />
  ),
  img: (props) => (
    <img className="rounded-lg my-6 w-full" {...props} />
  ),
  hr: (props) => (
    <hr className="border-white/10 my-8" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border border-white/20 px-4 py-2 bg-white/5 text-left font-semibold text-white" {...props} />
  ),
  td: (props) => (
    <td className="border border-white/20 px-4 py-2 text-gray-300" {...props} />
  ),
}

