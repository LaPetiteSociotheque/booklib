import Link from 'next/link'

type Props = {
  books: { title: string; slug: string }[]
}

export default function AuthorBooks({ books }: Props) {
  if (books.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Livres associés</h2>
      <ul className="list-disc list-inside space-y-2">
        {books.map((book) => (
          <li key={book.slug}>
            <Link href={`/books/${book.slug}`} className="text-[#B74E22] hover:underline">
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
