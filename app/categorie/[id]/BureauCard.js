'use client'
import { useState } from 'react'

const colorMap = {
  default: 'bg-gray-100 text-gray-700',
  gray: 'bg-gray-100 text-gray-700',
  brown: 'bg-amber-100 text-amber-800',
  orange: 'bg-orange-100 text-orange-700',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  pink: 'bg-pink-100 text-pink-700',
  red: 'bg-red-100 text-red-700',
}

export default function BureauCard({ bureau, meta, index }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
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

  const nextModalPhoto = (e) => {
    e.stopPropagation()
    setModalPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevModalPhoto = (e) => {
    e.stopPropagation()
    setModalPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const openModal = () => {
    setModalPhotoIndex(0)
    setShowModal(true)
  }

  return (
    <>
      <div onClick={openModal} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          {photos.length > 0 ? (
            <>
              <img src={photos[currentPhotoIndex]} alt={bureau.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {photos.length > 1 && (
                <>
                  <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
            <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-blue-50 to-blue-100">🏢</div>
          )}
          {bureau.disponibilite && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">{bureau.disponibilite}</div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{bureau.nom}</h3>
          {bureau.localisation && <p className="text-gray-600 text-sm mb-3 flex items-center gap-1"><span>📍</span> {bureau.localisation}</p>}
          <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
            {bureau.surface > 0 && <span className="flex items-center gap-1"><span>📐</span> {bureau.surface} m²</span>}
            {bureau.capacite && <span className="flex items-center gap-1"><span>👥</span> {bureau.capacite} pers.</span>}
          </div>
          {bureau.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bureau.description}</p>}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-xl font-bold text-blue-600">{formatPrice(bureau.prix)}</div>
            <span className="text-blue-600 text-sm font-medium group-hover:underline">Voir détails →</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100">✕</button>
              {photos.length > 0 ? (
                <div className="relative h-80 md:h-96">
                  <img src={photos[modalPhotoIndex]} alt={bureau.nom} className="w-full h-full object-cover" />
                  {photos.length > 1 && (
                    <>
                      <button onClick={prevModalPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={nextModalPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {photos.map((_, idx) => (
                          <button key={idx} onClick={(e) => { e.stopPropagation(); setModalPhotoIndex(idx); }} className={`w-3 h-3 rounded-full ${idx === modalPhotoIndex ? 'bg-white' : 'bg-white/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                  {bureau.disponibilite && <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">{bureau.disponibilite}</div>}
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-8xl">🏢</div>
              )}
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{bureau.nom}</h2>
              {bureau.localisation && <p className="text-gray-600 mb-6 flex items-center gap-2"><span className="text-xl">📍</span> {bureau.localisation}</p>}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {bureau.surface > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">📐</div>
                    <div className="text-lg font-bold text-gray-900">{bureau.surface} m²</div>
                    <div className="text-xs text-gray-500">Surface</div>
                  </div>
                )}
                {bureau.capacite && (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">👥</div>
                    <div className="text-lg font-bold text-gray-900">{bureau.capacite}</div>
                    <div className="text-xs text-gray-500">Capacité</div>
                  </div>
                )}
                {bureau.prix > 0 && (
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-lg font-bold text-blue-600">{formatPrice(bureau.prix)}</div>
                    <div className="text-xs text-gray-500">Par mois</div>
                  </div>
                )}
                {bureau.type && (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">🏢</div>
                    <div className="text-lg font-bold text-gray-900">{bureau.type}</div>
                    <div className="text-xs text-gray-500">Type</div>
                  </div>
                )}
              </div>
              {bureau.prestations && bureau.prestations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">✨ Prestations</h3>
                  <div className="flex flex-wrap gap-2">
                    {bureau.prestations.map((prestation, idx) => (
                      <span key={idx} className={`px-4 py-2 rounded-full text-sm font-semibold ${colorMap[prestation.color] || colorMap.default}`}>{prestation.name}</span>
                    ))}
                  </div>
                </div>
              )}
              {bureau.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{bureau.description}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <a href={bureau.lienVisite || 'https://meetings.hubspot.com/flexiwork'} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center text-lg shadow-lg">📅 Réserver une visite</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
