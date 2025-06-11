import React from "react"

type Props = {
  summaryHtml: string
}

export default function BookSummary({ summaryHtml }: Props) {
  return (
    <section className="bg-[#FFF8F0] border border-[#E8DCCA] p-6 rounded-2xl shadow-md max-w-3xl mx-auto mb-12">
      <div className="text-[#B74E22] text-2xl mb-2"></div>
      <h2 className="text-xl font-semibold text-[#B74E22] mb-4">Résumé du livre</h2>
      <div
        className="prose prose-sm sm:prose-base text-[#2E2A26]"
        dangerouslySetInnerHTML={{ __html: summaryHtml }}
      />
    </section>
  )
}
