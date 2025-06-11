import Image from 'next/image'

export function BookSidebarInfo({ coverImage, publicationYear, pageCount }) {
  return (
    <aside className="bg-white border rounded-xl shadow p-4">
      <div className="w-full mb-4">
        <Image
          src={coverImage}
          alt="Couverture du livre"
          width={200}
          height={300}
          className="mx-auto rounded"
        />
      </div>
      <table className="w-full text-sm text-left text-gray-700">
        <tbody>
          <tr>
            <th className="py-1 pr-2 font-medium">Année de publication</th>
            <td>{publicationYear}</td>
          </tr>
          <tr>
            <th className="py-1 pr-2 font-medium">Nombre de pages</th>
            <td>{pageCount}</td>
          </tr>
        </tbody>
      </table>
    </aside>
  )
}
