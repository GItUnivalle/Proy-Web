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

export default function FavoriteProducts() {
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const agregarAlCarrito = (producto: any) => {
    // Aquí iría la lógica para agregar al carrito
    toast({
      title: "Producto agregado",
      description: `${producto.nombre} ha sido agregado al carrito`,
    })
  }

  const handleRemoveFavorite = (producto: any) => {
    toggleFavorite(producto)
    toast({
      title: "Eliminado de favoritos",
      description: `${producto.nombre} ha sido eliminado de favoritos`,
    })
  }

  const openQuickView = (producto: any) => {
    setSelectedProduct(producto)
    setQuickViewOpen(true)
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((producto) => (
          <Card key={producto.id} className="overflow-hidden">
            <div className="relative h-48 w-full cursor-pointer" onClick={() => openQuickView(producto)}>
              <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFavorite(producto)
                }}
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
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
