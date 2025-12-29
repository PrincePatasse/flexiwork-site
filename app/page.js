import Link from 'next/link'

export default function Home() {
  const categories = [
    {
      id: 'prestation',
      icon: '🏢',
      title: 'PRESTATION DE SERVICES',
      subtitle: 'Clés en main',
      description: 'Bureaux opérés tout compris : mobilier ergonomique, internet fibre, salles de réunion, cuisine équipée, ménage quotidien. Installation immédiate, aucune contrainte de gestion.',
      price: '550-750€/poste/mois',
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-l-primary',
      textColor: 'text-primary',
      hoverBg: 'hover:bg-blue-50',
    },
    {
      id: 'bail',
      icon: '📋',
      title: 'BAIL 3/6/9',
      subtitle: 'Long terme',
      description: 'Engagement long terme avec coûts optimisés. Stabilité et sécurité pour votre développement. Bail commercial classique avec loyer maîtrisé.',
      price: '400-600€/m²/an',
      color: 'purple',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-l-secondary',
      textColor: 'text-secondary',
      hoverBg: 'hover:bg-purple-50',
    },
    {
      id: 'sous-location',
      icon: '🔄',
      title: 'SOUS-LOCATION',
      subtitle: 'Optimisation',
      description: 'Valorisez vos espaces vacants. Récupérez jusqu\'à 180K€/an en optimisant votre occupation. Solution flexible pour espaces sous-utilisés.',
      price: 'Variable selon espace',
      color: 'green',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-l-success',
      textColor: 'text-success',
      hoverBg: 'hover:bg-green-50',
    },
    {
      id: 'acquisition',
      icon: '🏛️',
      title: 'ACQUISITION',
      subtitle: 'Patrimoine',
      description: 'Investissement immobilier patrimonial. Optimisation fiscale et indépendance locative. Constitution d\'actifs immobiliers professionnels.',
      price: '3-15K€/m²',
      color: 'orange',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-l-warning',
      textColor: 'text-warning',
      hoverBg: 'hover:bg-orange-50',
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Badge */}
        <div className="text-center mb-10">
          <div className="inline-block bg-white border-2 border-gray-200 rounded-full px-8 py-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              SÉLECTION FLEXIWORK
            </span>
          </div>
        </div>

        {/* Titre Principal */}
        <h1 className="text-6xl font-black text-center mb-6 text-gray-900 tracking-tight">
          Bureaux Disponibles
        </h1>

        {/* Description */}
        <p className="text-xl text-center text-gray-600 mb-20 max-w-3xl mx-auto leading-relaxed">
          Découvrez nos solutions adaptées à vos besoins professionnels
        </p>

        {/* Grille 2x2 des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categorie/${category.id}`}
              className={`group bg-gradient-to-br ${category.bgGradient} border-2 border-gray-200 ${category.borderColor} border-l-[6px] rounded-2xl p-10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeInUp animation-delay-${(index + 1) * 100}`}
            >
              {/* Icône */}
              <div className="text-5xl mb-5">{category.icon}</div>

              {/* Titre */}
              <h2 className={`text-2xl font-black mb-2 ${category.textColor} uppercase tracking-wide`}>
                {category.title}
              </h2>

              {/* Sous-titre */}
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 pb-4 border-b-2 border-gray-200">
                {category.subtitle}
              </p>

              {/* Description */}
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {category.description}
              </p>

              {/* Prix */}
              <p className="text-2xl font-black text-gray-900 mb-6 pt-5 border-t-2 border-gray-200">
                Prix indicatif : {category.price}
              </p>

              {/* Bouton */}
              <div className={`inline-flex items-center px-7 py-4 rounded-xl ${category.hoverBg} bg-gray-100 transition-all group-hover:translate-x-1`}>
                <span className={`font-bold ${category.textColor}`}>
                  → Voir les bureaux disponibles
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Séparateur */}
        <div className="max-w-md mx-auto mb-16">
          <hr className="border-t-2 border-gray-200" />
        </div>

        {/* Contact Footer */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-14 text-center shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-black uppercase tracking-wider mb-8 text-gray-900">
            💬 CONTACT
          </h3>
          <p className="text-lg text-gray-600 leading-loose">
            Une question ? Contactez-nous pour plus d'informations
          </p>
          <div className="mt-6 space-y-2 text-lg">
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
            <p>
              📅{' '}
              <a
                href="https://meetings.hubspot.com/flexiwork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                Prendre RDV
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
