import { Client } from '@notionhq/client'

// Initialiser le client Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// IDs des databases par catégorie
const DATABASE_IDS = {
  prestation: process.env.NOTION_DB_PRESTATION || '',
  bail: process.env.NOTION_DB_BAIL || '',
  'sous-location': process.env.NOTION_DB_SOUS_LOCATION || '',
  acquisition: process.env.NOTION_DB_ACQUISITION || '',
}

// Récupérer les bureaux d'une catégorie
export async function getBureauxByCategory(categoryId) {
  const databaseId = DATABASE_IDS[categoryId]
  
  if (!databaseId) {
    console.error(`Database ID not found for category: ${categoryId}`)
    return []
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    })

    return response.results.map((page) => {
      const properties = page.properties

      return {
        id: page.id,
        nom: properties.Nom?.title?.[0]?.plain_text || 'Sans nom',
        photos: properties.Photos?.files?.[0]?.file?.url || properties.Photos?.files?.[0]?.external?.url || null,
        localisation: properties.Localisation?.rich_text?.[0]?.plain_text || '',
        surface: properties.Surface?.number || 0,
        capacite: properties['Capacité']?.rich_text?.[0]?.plain_text || '',
        prix: properties.Prix?.number || 0,
        disponibilite: properties['Disponibilité']?.select?.name || '',
        type: properties.Type?.select?.name || '',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        lienVisite: properties['🗓️ Lien visite']?.url || 'https://meetings.hubspot.com/flexiwork',
      }
    })
  } catch (error) {
    console.error('Error fetching bureaux from Notion:', error)
    return []
  }
}

// Données de démonstration (fallback si Notion API non configuré)
export const DEMO_BUREAUX = {
  prestation: [
    {
      id: '1',
      nom: 'Bureau 4 postes - Opéra',
      photos: null,
      localisation: '75002 Paris - Opéra',
      surface: 50,
      capacite: '4 postes',
      prix: 2800,
      disponibilite: 'Disponible immédiatement',
      type: 'Bureau privatif',
      description: 'Bureau lumineux de 50m² pouvant accueillir 4 postes de travail. Quartier Opéra, proche métro. Internet fibre, cuisine équipée, salle de réunion.',
      lienVisite: 'https://meetings.hubspot.com/flexiwork',
    },
  ],
  bail: [],
  'sous-location': [],
  acquisition: [],
}
