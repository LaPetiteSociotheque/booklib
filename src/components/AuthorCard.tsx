
type Props = {
    name: string
  }
  
  export default function AuthorCard({ name }: Props) {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
        <p className="text-md font-semibold">{name}</p>
      </div>
    )
  }
  