import Link from 'next/link'
import themes from '../../data/themes.json'

type Props = {
  bookSlug: string
}

export function BookThemesBlock({ bookSlug }: Props) {
  const relatedThemes = themes.filter((theme) =>
    theme.books.includes(bookSlug)
  )

  if (relatedThemes.length === 0) return null

  return (
    <div className="bg-white border border-[#E8DCCA] p-4 rounded-2xl shadow-md mt-4">
      <h3 className="text-base font-semibold mb-2">Thèmes associés</h3>
      <ul className="list-disc list-inside text-sm space-y-1">
        {relatedThemes.map((theme) => (
          <li key={theme.slug}>
            <Link href={`/themes/index.tsx`} className="text-[#B74E22] hover:underline">
              {theme.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
