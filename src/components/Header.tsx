import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  return (
    
    <header className="bg-[#FBE3C2] px-6 py-6 text-[#4B2E1F] font-serif" >
      <Link href="/" className="text-4xl font-bold uppercase block w-fit hover:opacity-80">
      <div className="text-4xl font-bold uppercase">LA PETITE SOCIOTHÈQUE</div>
      </Link>
      
      <div className="text-md font-light mt-1 mb-6">Petites bouchées d'ouvrages militants à partager</div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Rechercher…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border border-[#C18C57] rounded-md bg-white text-[#4B2E1F] w-48"
          />
        </form>

        <nav className="flex flex-wrap gap-2">
          <Link href="/books" className="px-3 py-1 border border-[#C18C57] bg-white rounded-md text-sm">
            Fiches
          </Link>
          <Link href="/authors" className="px-3 py-1 border border-[#C18C57] bg-white rounded-md text-sm">
            Auteurs
          </Link>
          <Link href="/themes" className="px-3 py-1 border border-[#C18C57] bg-white rounded-md text-sm">
            Thèmes
          </Link>
          <Link href="/concepts" className="px-3 py-1 border border-[#C18C57] bg-white rounded-md text-sm">
            Concepts
          </Link>
        </nav>
      </div>
    </header>
  )
}
