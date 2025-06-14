import { useState } from 'react'
import Head from 'next/head'
import concepts from '../../../data/concepts.json'
import ConceptList from '../../components/ConceptList'
import Header from '../../components/Header'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function ConceptsPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const filteredConcepts = selectedLetter
    ? concepts.filter((c) => c.title.toUpperCase().startsWith(selectedLetter))
    : concepts

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter === selectedLetter ? null : letter)
  }

  return (
    <>
      <Head>
        <title>Glossaire des concepts – La Petite Sociothèque</title>
        <meta property="og:title" content="Glossaire des concepts - La Petite Sociothèque" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Glossaire des concepts - La Petite Sociothèque" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>
      
      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />

        <div className="max-w-4xl mx-auto pt-10">
          <h1 className="text-2xl font-bold mb-6">Glossaire des concepts</h1>

          {/* Barre de filtrage A–Z */}
          <div className="flex flex-wrap gap-2 mb-6">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                  selectedLetter === letter
                    ? 'bg-[#B74E22] text-white border-[#B74E22]'
                    : 'bg-white border-[#E8DCCA] text-[#2E2A26] hover:bg-[#F3EBE3]'
                }`}
              >
                {letter}
              </button>
            ))}
            {/* Bouton "tout" */}
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                selectedLetter === null
                  ? 'bg-[#B74E22] text-white border-[#B74E22]'
                  : 'bg-white border-[#E8DCCA] text-[#2E2A26] hover:bg-[#F3EBE3]'
              }`}
            >
              Tous
            </button>
          </div>

          {/* Liste des concepts filtrés */}
          <ConceptList concepts={filteredConcepts} />
        </div>
      </main>
    </>
  )
}
