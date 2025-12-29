'use client'
import { useState } from 'react'

export default function BureauCard({ bureau, onClick }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const photos = bureau.photos ? bureau.photos.split(',').map(url => url.trim()) : []
  
  const formatPrice = (price) => {
    if (!price) return 'Prix sur demande'
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price) + ' € HT'
  }

  const nextPhoto = (e) => {
    e.stopPropagation()
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = (e) => {
    e.stopPropagation()
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div onClick={onClick} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100">
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        {photos.length > 0 ? (
          <>
            <img src={photos[currentPhotoIndex]} alt={bureau.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {photos.length > 1 && (
              <>
                <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {photos.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentPhotoIndex ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"><span className="text-6xl">🏢</span></div>
        )}
        {bureau.disponibilite && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">{bureau.disponibilite}</div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{bureau.nom}</h3>
            {bureau.localisation && (<p className="text-sm text-gray-500 flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{bureau.localisation}</p>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {bureau.surface && (<div className="flex items-center text-gray-600"><svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg><span className="font-medium">{bureau.surface} m²</span></div>)}
          {bureau.type && (<div className="flex items-center text-gray-600"><svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg><span className="font-medium">{bureau.type}</span></div>)}
        </div>
        {bureau.description && (<p className="text-gray-600 text-sm mb-4 line-clamp-2">{bureau.description}</p>)}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-3xl font-bold text-primary">{formatPrice(bureau.prix)}</p>
            {bureau.prix && <p className="text-xs text-gray-500">par mois</p>}
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors">Voir détails</button>
        </div>
      </div>
    </div>
  )
}
