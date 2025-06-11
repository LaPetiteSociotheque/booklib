import Image from 'next/image'

type Props = {
  name: string
  slug: string
}

export default function AuthorHeader({ name, slug }: Props) {
  return (
    <div className="flex items-center mb-8">
      <div className="w-20 h-20 rounded-full overflow-hidden mr-4 bg-[#DDD3C7]">
        <Image
          src={`/images/authors/${slug}.jpg`}
          alt={name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <h1 className="text-2xl font-bold text-[#2E2A26]">{name}</h1>
    </div>
  )
}
