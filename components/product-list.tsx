"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useFavorites } from "@/hooks/use-favorites"

// Datos de ejemplo (reemplazar con datos reales de la base de datos)
const productosEjemplo = [
  {
    id: 1,
    nombre: "Producto Premium",
    precio: 1200,
    descripcion: "Producto de alta calidad con características premium",
    imagen: "/placeholder.svg?height=200&width=300",
    categoria: "Premium",
    marca: "MarcaA",
  },
  {
    id: 2,
    nombre: "Producto Estándar",
    precio: 800,
    descripcion: "Producto estándar con buena relación calidad-precio",
    imagen: "/placeholder.svg?height=200&width=300",
    categoria: "Estándar",
    marca: "MarcaB",
  },
  {
    id: 3,
    nombre: "Producto Básico",
    precio: 500,
    descripcion: "Producto básico para necesidades esenciales",
    imagen: "/placeholder.svg?height=200&width=300",
    categoria: "Básico",
    marca: "MarcaC",
  },
  {
    id: 4,
    nombre: "Producto Especial",
    precio: 1500,
    descripcion: "Producto con características especiales y únicas",
    imagen: "/placeholder.svg?height=200&width=300",
    categoria: "Especial",
    marca: "MarcaA",
  },
  {
    id: 5,
    nombre: "Producto Económico",
    precio: 300,
    descripcion: "Producto económico para presupuestos ajustados",
    imagen: "/placeholder.svg?height=200&width=300",
    categoria: "Económico",
    marca: "MarcaD",
  },
  {
    id: 6,
    nombre: "Producto Exclusivo",
    precio: 2000,
    descripcion: "Producto exclusivo con características premium",
    imagen: "/placeholder.svg?height=200&width=300",
    categoria: "Premium",
    marca: "MarcaB",
  },
]

export default function ProductList() {
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()
  const [productos] = useState(productosEjemplo)

  const handleToggleFavorite = (producto: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(producto)
    toast({
      title: favorites.some((fav) => fav.id === producto.id) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${producto.nombre} ha sido ${favorites.some((fav) => fav.id === producto.id) ? "eliminado de" : "añadido a"} favoritos`,
    })
  }

  return (
    <div className="space-y-2">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={(e) => handleToggleFavorite(producto, e)}
            >
              <Heart
                className={`h-5 w-5 ${favorites.some((fav) => fav.id === producto.id) ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="sr-only">
                {favorites.some((fav) => fav.id === producto.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
              </span>
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
