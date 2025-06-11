import React from "react"

type Props = {
  html: string
}

export default function SummarySection({ html }: Props) {
  return (
    <section className="my-10 px-2">
      <h2 className="text-2xl font-semibold text-[#B74E22] mb-4">Résumé et analyse</h2>
      <div
        className="text-[#2E2A26] text-base leading-relaxed font-serif prose prose-p:my-4 prose-headings:text-[#B74E22]"
        style={{ fontFamily: `"Georgia", "Times New Roman", ui-serif, serif` }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}
