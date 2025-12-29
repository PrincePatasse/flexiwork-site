import './globals.css'

export const metadata = {
  title: 'Bureaux Disponibles - Flexiwork',
  description: 'Découvrez nos solutions adaptées à vos besoins professionnels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
