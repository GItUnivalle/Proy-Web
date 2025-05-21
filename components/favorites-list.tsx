"use client"

import type React from "react"

import Link from "next/link"
import { Heart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useFavorites } from "@/hooks/use-favorites"

export default function FavoritesList() {
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()

  const handleRemoveFavorite = (producto: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(producto)
    toast({
      title: "Eliminado de favoritos",
      description: `${producto.nombre} ha sido eliminado de favoritos`,
    })
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-semibold mb-2">No tiene productos favoritos</h2>
        <p className="text-muted-foreground mb-6">
          Añada productos a favoritos haciendo clic en el corazón de cada producto
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {favorites.map((producto) => (
        <div
          key={producto.id}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={(e) => handleRemoveFavorite(producto, e)}
            >
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              <span className="sr-only">Quitar de favoritos</span>
            </Button>
            <span className="font-medium">{producto.nombre}</span>
          </div>
          <Link href={`/producto/${producto.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Ver detalles</span>
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
