import Head from 'next/head'
import Header from '../components/Header'
import { Analytics } from "@vercel/analytics/next"

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>À propos – La Petite Sociothèque</title>
        <meta property="og:title" content="À propos | La Petite Sociothèque" />
        <meta property="og:description" content="Présentation de La Petite Sociothèque, ses objectifs et sa méthode." />
        <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
        <meta property="og:url" content="https://lapetitesociotheque.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="La Petite Sociothèque" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="À propos | La Petite Sociothèque" />
        <meta name="twitter:description" content="Présentation de La Petite Sociothèque, ses objectifs et sa méthode." />
        <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />

        <section className="max-w-3xl mx-auto mt-12">
          <h1 className="text-3xl font-bold mb-6 text-[#B74E22] text-center">
            À propos de La Petite Sociothèque
          </h1>

          {/* Zone de contenu principal stylisée comme une biographie */}
          <div className="bg-[#FAF4EB] border-l-4 border-[#B74E22] p-6 rounded-xl shadow-sm text-lg leading-relaxed">
            <p className="mb-4">
              La Petite Sociothèque est un repère de lecture critique et collective créé par Andy Antonin, à la croisée des sciences sociales, d'une vision critique de la société et des luttes anticoloniales. Le projet est né d’un double constat : d’une part, les textes qui permettent de penser la domination — le racisme, le capitalisme, l’impérialisme, le patriarcat — sont souvent difficiles d’accès. Ils circulent dans des réseaux universitaires fermés, sont majoritairement rédigés en anglais, et trop rarement rendus disponibles dans un langage clair, rigoureux et partageable. D’autre part, ces savoirs restent souvent détachés des réalités vécues dans les territoires postcoloniaux.
            </p>
            <p className="mb-4">
              La sélection des ouvrages présentés ici est le fruit d’un cheminement personnel et politique : celui d’un Guadeloupéen noir, formé aux sciences sociales, lisant depuis sa position située, et portant une attention particulière aux textes qui éclairent les conditions concrètes de la vie, de la lutte et de la pensée en contexte colonial ou postcolonial.
            </p>
            <p className="mb-0">
              Chaque fiche vise à transmettre des savoirs capables de nourrir l’analyse sans appauvrir la complexité. Mais surtout, elle participe à un pari : la politique dans le monde réel se fait à l’instinct — et l’instinct est notre savoir en action. En rendant ces textes plus accessibles, La Petite Sociothèque espère contribuer à forger de meilleurs instincts, c’est-à-dire des manières plus justes, plus fines, plus collectives de percevoir, et d’agir.
            </p>
          </div>

          {/* Zone de citation stylisée en italique */}
          <div className="mt-6 text-center italic text-[#4B2E1F] text-base max-w-xl mx-auto">
            {/* 🔽 INSÈRE ICI UNE CITATION EN ITALIQUE SI BESOIN 🔽 */}
            <p>“The learning process is something you can incite, literally incite, like a riot.” – Audre Lorde</p>
            {/* 🔼 OU REMPLACE PAR TA PROPRE CITATION 🔼 */}
          </div>
        </section>
        <Analytics/>
      </main>
    </>
  )
}
