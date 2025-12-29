'use client'
import { useState } from 'react'


export default function BureauCard({ bureau }) {
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
                  <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-6xl">🏢</span>
            </div>
          )}
          {bureau.disponibilite && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {bureau.disponibilite}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{bureau.nom}</h3>
              {bureau.localisation && (
                <p className="text-sm text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {bureau.localisation}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            {bureau.surface && (
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="font-medium">{bureau.surface} m²</span>
              </div>
            )}
            {bureau.capacite && (
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">{bureau.capacite} postes</span>
              </div>
            )}
            {bureau.type && (
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">{bureau.type}</span>
              </div>
            )}
          </div>
          {bureau.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bureau.description}</p>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-3xl font-bold text-primary">{formatPrice(bureau.prix)}</p>
              {bureau.prix && <p className="text-xs text-gray-500">par mois</p>}
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Voir détails
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative h-96 bg-gray-200">
              {photos.length > 0 ? (
                <>
                  <img src={photos[modalPhotoIndex]} alt={bureau.nom} className="w-full h-full object-cover" />
                  {photos.length > 1 && (
                    <>
                      <button onClick={prevModalPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button onClick={nextModalPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {photos.map((_, idx) => (
                          <div key={idx} className={`w-3 h-3 rounded-full ${idx === modalPhotoIndex ? 'bg-white' : 'bg-white/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-8xl">🏢</span>
                </div>
              )}
              {bureau.disponibilite && (
                <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-base font-semibold shadow-xl">
                  {bureau.disponibilite}
                </div>
              )}
            </div>
            
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{bureau.nom}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {bureau.localisation && (
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Localisation</p>
                      <p className="text-gray-900 font-semibold">{bureau.localisation}</p>
                    </div>
                  </div>
                )}
                {bureau.surface && (
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Surface</p>
                      <p className="text-gray-900 font-semibold">{bureau.surface} m²</p>
                    </div>
                  </div>
                )}
                {bureau.capacite && (
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Capacité</p>
                      <p className="text-gray-900 font-semibold">{bureau.capacite} postes</p>
                    </div>
                  </div>
                )}
                {bureau.type && (
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Type</p>
                      <p className="text-gray-900 font-semibold">{bureau.type}</p>
                    </div>
                  </div>
                )}
              </div>

              {bureau.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{bureau.description}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="text-5xl font-bold text-primary">{formatPrice(bureau.prix)}</p>
                  {bureau.prix && <p className="text-sm text-gray-500 mt-1">par mois</p>}
                </div>
                {bureau.lien_visite && (
                  <a 
                    href={bureau.lien_visite} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Organiser une visite</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
