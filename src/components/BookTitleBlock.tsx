import Link from 'next/link'

export function BookTitleBlock({ title, author, slug }) {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-xl text-gray-600">
        par{' '}
        <Link href={`/authors/${slug}`} className="text-[#B74E22] hover:underline">
          {author}
        </Link>
      </p>
    </header>
  )
}
