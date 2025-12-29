import Link from 'next/link'
import { getBureauxByCategory, DEMO_BUREAUX } from '../../../lib/notion'
import BureauCard from './BureauCard'

const CATEGORY_META = {
  prestation: {
    icon: '🏢',
    title: 'Prestation de Services',
    description: 'Bureaux opérés tout compris : mobilier ergonomique, internet fibre, salles de réunion, cuisine équipée, ménage quotidien. Installation immédiate, aucune contrainte de gestion.',
  },
  bail: {
    icon: '📋',
    title: 'Bail 3/6/9',
    description: 'Engagement long terme avec coûts optimisés. Stabilité et sécurité pour votre développement. Bail commercial classique avec loyer maîtrisé.',
  },
  'sous-location': {
    icon: '🔄',
    title: 'Sous-location',
    description: 'Valorisez vos espaces vacants. Récupérez jusqu à 180K€/an en optimisant votre occupation. Solution flexible pour espaces sous-utilisés.',
  },
  acquisition: {
    icon: '🏛️',
    title: 'Acquisition',
    description: 'Investissement immobilier patrimonial. Optimisation fiscale et indépendance locative. Constitution d actifs immobiliers professionnels.',
  },
}

export default async function CategoriePage({ params }) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const meta = CATEGORY_META[id]

  if (!meta) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
            ← Retour aux catégories
          </Link>
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-xl text-gray-500">Catégorie non trouvée</p>
          </div>
        </div>
      </main>
    )
  }

  let bureaux = []
  try {
    bureaux = await getBureauxByCategory(id)
    if (bureaux.length === 0 && DEMO_BUREAUX[id]) {
      bureaux = DEMO_BUREAUX[id]
    }
  } catch (error) {
    console.error('Error loading bureaux:', error)
    bureaux = DEMO_BUREAUX[id] || []
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
          ← Retour aux catégories
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{meta.icon}</span>
            <h1 className="text-5xl font-black text-gray-900">{meta.title}</h1>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            {meta.description}
          </p>
        </div>

        {bureaux.length === 0 ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-xl text-gray-500 mb-2">
              Aucun bureau disponible pour le moment dans cette catégorie.
            </p>
            <p className="text-gray-400">
              Contactez-nous pour connaître nos prochaines disponibilités.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bureaux.map((bureau, index) => (
              <BureauCard
                key={bureau.id}
                bureau={bureau}
                meta={meta}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="mt-20 bg-white border-2 border-gray-200 rounded-2xl p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Besoin d informations ?</h3>
          <p className="text-gray-600 mb-6">
            Contactez-nous pour échanger sur vos besoins
          </p>
          <div className="space-y-2">
            <p>
              📧{' '}
              <a href="mailto:contact@flexiwork.fr" className="text-primary font-semibold hover:underline">
                contact@flexiwork.fr
              </a>
            </p>
            <p>
              📞{' '}
              <a href="tel:0668727147" className="text-primary font-semibold hover:underline">
                06 68 72 71 47
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return [
    { id: 'prestation' },
    { id: 'bail' },
    { id: 'sous-location' },
    { id: 'acquisition' },
  ]
}
