import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function getDatabase(databaseId) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    })
    return response.results
  } catch (error) {
    console.error('Error fetching database from Notion:', error)
    return []
  }
}
