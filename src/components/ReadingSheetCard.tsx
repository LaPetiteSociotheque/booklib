
type Props = {
    title: string
    description: string
  }
  
  export default function ReadingSheetCard({ title, description }: Props) {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    )
  }
  