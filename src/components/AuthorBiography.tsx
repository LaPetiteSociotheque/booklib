import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

export default function AuthorBiography({ content }: Props) {
  return (
    <div className="bg-[#FAF4EB] border-l-4 border-[#B74E22] p-6 rounded-bl-xl text-[#2E2A26] max-w-3xl mx-auto mb-12">
      <div className="text-2xl font-bold text-[#B74E22] mb-4">Biographie</div>
      <div className="prose prose-neutral prose-p:my-2 prose-li:my-1 prose-strong:font-semibold text-base leading-relaxed">
        <ReactMarkdown
          components={{
            ul: ({ node, ...props }) => <ul {...props} className="list-none pl-0" />,
            li: ({ node, ...props }) => <li {...props} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#2E2A26]" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
