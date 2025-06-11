// src/components/ConceptList.tsx

import Link from "next/link"

type Concept = {
  title: string
  slug: string
}

type Props = {
  concepts: Concept[]
}

export default function ConceptList({ concepts }: Props) {
  return (
    <ul className="list-disc list-inside space-y-2">
      {concepts.map((concept) => (
        <li key={concept.slug}>
          <Link href={`/concepts/${concept.slug}`} className="text-[#B74E22] underline">
            {concept.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
