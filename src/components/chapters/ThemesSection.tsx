import React from "react"

type Props = {
  html: string
}

export default function ThemesSection({ html }: Props) {
  return (
    <section className="bg-[#fef9f5] border-l-4 border-[#B74E22] px-6 py-4 my-8 rounded-md">
      <h2 className="text-2xl font-semibold text-[#B74E22] mb-4">Thèmes centraux</h2>
      <div
        className="text-[#2E2A26] text-base leading-relaxed font-serif"
        style={{ fontFamily: `"Georgia", "Times New Roman", ui-serif, serif` }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}
