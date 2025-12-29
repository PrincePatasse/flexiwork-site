import Link from 'next/link'

export default function Home() {
  const categories = [
    {
      id: 'prestation',
      icon: '🏢',
      title: 'PRESTATION DE SERVICES',
      subtitle: 'Clés en main',
      description: 'Bureaux opérés tout compris : mobilier ergonomique, internet fibre, salles de réunion, cuisine équipée, ménage quotidien, installation immédiate, aucune contrainte de gestion.',
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
      description: 'Engagement long terme avec cadre optimisé. Stabilité et sécurité pour votre développement. Bail commercial classique avec foyer minimal.',
      color: 'purple',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-l-purple-500',
      textColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-50',
    },
    {
      id: 'sous-location',
      icon: '🔄',
      title: 'SOUS-LOCATION',
      subtitle: 'Flexible',
      description: 'Solution flexible sans engagement lourd. Contrat souple, installation rapide. Idéal pour tester un emplacement ou une phase de croissance.',
      color: 'green',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-l-green-500',
      textColor: 'text-green-600',
      hoverBg: 'hover:bg-green-50',
    },
    {
      id: 'acquisition',
      icon: '🏛️',
      title: 'ACQUISITION',
      subtitle: 'Investissement',
      description: 'Achat de bureaux premium. Investissement patrimonial stratégique. Valorisation long terme de votre capital immobilier professionnel.',
      color: 'amber',
      bgGradient: 'from-amber-50 to-amber-100',
      borderColor: 'border-l-amber-500',
      textColor: 'text-amber-600',
      hoverBg: 'hover:bg-amber-50',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-4">
            Sélection Flexiwork
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bureaux Disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos solutions adaptées à vos besoins professionnels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorie/${category.id}`}
              className={`group relative bg-gradient-to-br ${category.bgGradient} rounded-2xl p-8 shadow-lg ${category.hoverBg} transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-l-4 ${category.borderColor}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-5xl">{category.icon}</div>
                <svg
                  className={`w-6 h-6 ${category.textColor} transform group-hover:translate-x-1 transition-transform`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <h2 className={`text-2xl font-bold ${category.textColor} mb-2`}>
                {category.title}
              </h2>
              <p className="text-sm font-medium text-gray-500 mb-4">
                {category.subtitle}
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {category.description}
              </p>

              <div className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                → Voir les bureaux disponibles
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
