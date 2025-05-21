"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

type Product = {
  id: number
  nombre: string
  precio: number
  descripcion: string
  imagen: string
  categoria: string
  marca: string
}

type FavoritesContextType = {
  favorites: Product[]
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
      }
    }
  }, [])

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === product.id)

      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== product.id)
      } else {
        return [...prevFavorites, product]
      }
    })
  }

  const isFavorite = (productId: number) => {
    return favorites.some((fav) => fav.id === productId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
