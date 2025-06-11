// components/AuthorWorks.tsx

import Image from 'next/image'
import Link from 'next/link'


type Props = {
  books: { title: string; slug: string }[]
}

export default function AuthorWorks({ books }: Props) {
  console.log("📚 Livres transmis à AuthorWorks :", books) // ✅ ici

  if (books.length === 0) return null

const sortedBooks = books.slice().sort((a, b) => a.title.localeCompare(b.title))

  return (
    <section className="max-w-3xl mx-auto mt-16">
      <h2 className="text-xl font-semibold mb-6 text-[#2E2A26]">Ouvrages présents dans la Sociothèque</h2>
      <ul className="space-y-6">
        {books.map((book) => (
          <li key={book.slug} className="flex items-center space-x-4">
            <div className="w-16 h-24 bg-[#DDD3C7] flex-shrink-0 overflow-hidden rounded">
              <Image
                src={`/images/covers/${book.slug}.jpg`}
                alt={`Couverture de ${book.title}`}
                width={64}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <Link
              href={`/books/${book.slug}`}
              className="text-lg text-[#B74E22] hover:underline font-medium"
            >
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
