import { getDatabase } from '@/lib/notion'
import Link from 'next/link'
import BureauCard from './BureauCard'

const categoryConfig = {
  prestation: { dbId: process.env.NOTION_DB_PRESTATION, title: 'Prestation de Services' },
  bail: { dbId: process.env.NOTION_DB_BAIL, title: 'Bail 3/6/9' },
  'sous-location': { dbId: process.env.NOTION_DB_SOUS_LOCATION, title: 'Sous-location' },
  acquisition: { dbId: process.env.NOTION_DB_ACQUISITION, title: 'Acquisition' },
}

export default async function CategoriePage({ params }) {
  const { id } = params
  const config = categoryConfig[id]
  
  if (!config) return <div>Catégorie non trouvée</div>
  
  const results = await getDatabase(config.dbId)
  
  const bureaux = results.map((page) => {
    const props = page.properties
    
    // Récupérer les URLs des photos depuis le champ "Files & media"
    const photosFiles = props.Photos?.files || []
    const photosUrls = photosFiles.map(file => 
      file.file?.url || file.external?.url || file.name
    ).filter(Boolean).join(',')
    
    return {
      id: page.id,
      nom: props.Nom?.title?.[0]?.plain_text || 'Sans nom',
      photos: photosUrls,
      localisation: props.Localisation?.rich_text?.[0]?.plain_text || '',
      surface: props.Surface?.number || null,
      capacite: props['Capacité']?.rich_text?.[0]?.plain_text || '',
      prix: props.Prix?.number || null,
      disponibilite: props['Disponibilité']?.rich_text?.[0]?.plain_text || '',
      type: props.Type?.rich_text?.[0]?.plain_text || '',
      description: props.Description?.rich_text?.[0]?.plain_text || '',
      lien_visite: props['Lien visite']?.url || props['Lien visite']?.rich_text?.[0]?.plain_text || 'https://meetings.hubspot.com/flexiwork',
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
          ← Retour aux catégories
        </Link>
        <h1 className="text-5xl font-bold text-gray-900 mb-12">{config.title}</h1>
        
        {bureaux.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Aucun bureau disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bureaux.map((bureau) => (
              <BureauCard key={bureau.id} bureau={bureau} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
