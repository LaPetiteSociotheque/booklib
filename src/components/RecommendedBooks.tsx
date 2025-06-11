import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

type Book = {
  title: string
  slug: string
  coverImage: string
}

type Props = {
  books: Book[]
}

export default function RecommendedBooks({ books }: Props) {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([])

  useEffect(() => {
    const shuffled = [...books].sort(() => 0.5 - Math.random())
    setSelectedBooks(shuffled.slice(0, 5))
  }, [books])

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-[#B74E22] mb-4">Ouvrages recommandés</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {selectedBooks.map((book) => (
            <Link
              href={`/books/${book.slug}`}
              key={book.slug}
              className="min-w-[150px] sm:min-w-[180px] hover:opacity-90 transition"
            >
              <div className="w-full">
                <Image
                  src={book.coverImage}
                  alt={`Couverture de ${book.title}`}
                  width={180}
                  height={270}
                  className="rounded-xl shadow"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
