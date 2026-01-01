import './globals.css'
import MixpanelProvider from './MixpanelProvider'

export const metadata = {
  title: 'Flexiwork - Bureaux disponibles',
  description: 'Trouvez votre bureau idéal avec Flexiwork',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <MixpanelProvider />
        {children}
      </body>
    </html>
  )
}
