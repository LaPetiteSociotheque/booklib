import Link from 'next/link'

type Concept = {
  slug: string
  name: string
  definition: string
}

type Props = {
  concepts: Concept[]
}

export default function ConceptsMobilises({ concepts }: Props) {
  if (!concepts.length) return null

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Concepts mobilisés</h2>
      <ul className="list-disc list-inside space-y-2">
        {concepts.map((concept, index) => (
          <li key={index}>
            <Link href={`/concepts/${concept.slug}`} className="text-[#B74E22] underline">
              {concept.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
