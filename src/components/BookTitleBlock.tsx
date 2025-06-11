export function BookTitleBlock({ title, author }) {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-xl text-gray-600">par {author}</p>
    </header>
  )
}
