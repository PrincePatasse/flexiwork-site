'use client'

import { useState } from 'react'

export default function BureauCard({ bureau, meta, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeInUp"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {bureau.photos ? (
            <img
              src={bureau.photos}
              alt={bureau.nom}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {meta.icon}
            </div>
          )}
          {bureau.disponibilite && (
            <div className="absolute top-4 right-4 bg-success text-white px-4 py-2 rounded-full text-sm font-bold">
              {bureau.disponibilite}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{bureau.nom}</h3>

          {bureau.localisation && (
            <p className="text-sm text-gray-600 mb-2">
              📍 {bureau.localisation}
            </p>
          )}

          <div className="flex gap-4 mb-3">
            {bureau.surface > 0 && (
              <span className="text-sm text-gray-600">
                📏 {bureau.surface}m²
              </span>
            )}
            {bureau.capacite && (
              <span className="text-sm text-gray-600">
                👥 {bureau.capacite}
              </span>
            )}
          </div>

          {bureau.description && (
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {bureau.description}
            </p>
          )}

          {bureau.prix > 0 && (
            <p className="text-2xl font-black text-gray-900 mb-4">
              {bureau.prix}€
              <span className="text-sm font-normal text-gray-500">/mois</span>
            </p>
          )}

          {bureau.type && (
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {bureau.type}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation()
              window.open(bureau.lienVisite, '_blank')
            }}
            className="block w-full text-center bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors"
          >
            📅 Réserver une visite
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>

              {bureau.photos ? (
                <img
                  src={bureau.photos}
                  alt={bureau.nom}
                  className="w-full h-96 object-cover rounded-t-3xl"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-3xl flex items-center justify-center text-8xl">
                  {meta.icon}
                </div>
              )}

              {bureau.disponibilite && (
                <div className="absolute bottom-4 right-4 bg-success text-white px-6 py-3 rounded-full text-base font-bold shadow-lg">
                  {bureau.disponibilite}
                </div>
              )}
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-black text-gray-900 mb-6">{bureau.nom}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {bureau.localisation && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Localisation</p>
                      <p className="text-lg text-gray-900">{bureau.localisation}</p>
                    </div>
                  </div>
                )}

                {bureau.surface > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📏</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Surface</p>
                      <p className="text-lg text-gray-900">{bureau.surface}m²</p>
                    </div>
                  </div>
                )}

                {bureau.capacite && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Capacité</p>
                      <p className="text-lg text-gray-900">{bureau.capacite}</p>
                    </div>
                  </div>
                )}

                {bureau.type && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Type</p>
                      <p className="text-lg text-gray-900">{bureau.type}</p>
                    </div>
                  </div>
                )}
              </div>

              {bureau.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{bureau.description}</p>
                </div>
              )}

              <div className="border-t-2 border-gray-200 pt-8 mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {bureau.prix > 0 && (
                    <div>
                      <p className="text-4xl font-black text-primary">
                        {bureau.prix}€
                        <span className="text-xl font-normal text-gray-500">/mois</span>
                      </p>
                    </div>
                  )}

                  <a
                    href={bureau.lienVisite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-600 transition-colors text-center text-lg shadow-lg"
                  >
                    📅 Réserver une visite
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
