import Link from 'next/link'

export function BookChaptersTableOfContents({ chapters, bookSlug }) {
  return (
    <section className="bg-[#FDF7F2] border-l-4 border-[#B74E22] p-6 rounded-r-xl">
      <h2 className="text-xl font-bold text-[#B74E22] mb-4">Sommaire</h2>
      <ul className="space-y-2 text-base text-[#2E2A26]">
        {chapters
          .sort((a, b) => a.order - b.order)
          .map((chapter, index) => (
            <li key={chapter.slug}>
              <Link
                href={`/books/${bookSlug}/${chapter.slug}`}
                className="hover:underline"
              >
                Chapitre {index + 1} — {chapter.title}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  )
}
