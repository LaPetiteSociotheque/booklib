export default function ConceptsSection({ html }: { html: string }) {
  if (!html.trim()) return null

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold text-[#B74E22] mb-4">
        Concepts clés définis, expliqués et historicisés
      </h2>
      <div className="bg-[#f4e9dd] border border-[#e0d4c4] p-6 rounded-xl">
        <div
          className="text-[#2E2A26] text-base leading-relaxed font-serif prose prose-p:my-4 prose-headings:text-[#B74E22] prose-headings:font-semibold"
          style={{ fontFamily: `"Georgia", "Times New Roman", ui-serif, serif` }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  )
}
