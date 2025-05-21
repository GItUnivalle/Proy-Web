"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useFavorites } from "@/hooks/use-favorites"
import ProductQuickView from "@/components/product-quick-view"

// Datos de ejemplo (reemplazar con datos reales de la base de datos)
const productosEjemplo = [
  {
    id: 1,
    nombre: "Producto Premium",
    precio: 1200,
    descripcion: "Producto de alta calidad con características premium",
    imagen: "/imagenpremiur.png?height=200&width=300",
    categoria: "Premium",
    marca: "MarcaAA",
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

export default function ProductCatalog() {
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()
  const [productos] = useState(productosEjemplo)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const agregarAlCarrito = (producto: any) => {
    // Aquí iría la lógica para agregar al carrito
    toast({
      title: "Producto agregado",
      description: `${producto.nombre} ha sido agregado al carrito`,
    })
  }

  const handleToggleFavorite = (producto: any) => {
    toggleFavorite(producto)
    toast({
      title: favorites.some((fav) => fav.id === producto.id) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${producto.nombre} ha sido ${
        favorites.some((fav) => fav.id === producto.id) ? "eliminado de" : "añadido a"
      } favoritos`,
    })
  }

  const openQuickView = (producto: any) => {
    setSelectedProduct(producto)
    setQuickViewOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <Card key={producto.id} className="overflow-hidden">
            <div className="relative h-48 w-full cursor-pointer" onClick={() => openQuickView(producto)}>
              <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleFavorite(producto)
                }}
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.some((fav) => fav.id === producto.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{producto.nombre}</CardTitle>
                <Badge variant="outline">{producto.categoria}</Badge>
              </div>
              <div className="text-lg font-bold">${producto.precio}</div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{producto.descripcion}</p>
              <p className="text-xs mt-2">Marca: {producto.marca}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full" onClick={() => agregarAlCarrito(producto)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedProduct && (
        <ProductQuickView producto={selectedProduct} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  )
}
