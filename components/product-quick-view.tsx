"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useFavorites } from "@/hooks/use-favorites"

interface ProductQuickViewProps {
  producto: any
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ producto, isOpen, onClose }: ProductQuickViewProps) {
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()
  const [cantidad, setCantidad] = useState(1)

  const handleToggleFavorite = () => {
    toggleFavorite(producto)
    toast({
      title: favorites.some((fav) => fav.id === producto.id) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${producto.nombre} ha sido ${
        favorites.some((fav) => fav.id === producto.id) ? "eliminado de" : "añadido a"
      } favoritos`,
    })
  }

  const agregarAlCarrito = () => {
    // Aquí iría la lógica para agregar al carrito
    toast({
      title: "Producto agregado",
      description: `${cantidad} ${cantidad > 1 ? "unidades" : "unidad"} de ${producto.nombre} ${
        cantidad > 1 ? "han sido agregadas" : "ha sido agregado"
      } al carrito`,
    })
    onClose()
  }

  const incrementarCantidad = () => {
    setCantidad((prev) => prev + 1)
  }

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-[300px] h-[300px]">
            <Image
              src={producto.imagen || "/placeholder.svg"}
              alt={producto.nombre}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl font-bold">{producto.nombre}</DialogTitle>
                <Badge variant="outline" className="mt-1">
                  {producto.categoria}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleToggleFavorite}
                aria-label={
                  favorites.some((fav) => fav.id === producto.id) ? "Quitar de favoritos" : "Añadir a favoritos"
                }
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.some((fav) => fav.id === producto.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-bold">${producto.precio}</div>
              <p className="text-sm text-muted-foreground mt-2">Marca: {producto.marca}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{producto.descripcion}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={decrementarCantidad}
                  disabled={cantidad <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Disminuir cantidad</span>
                </Button>
                <div className="h-8 w-10 flex items-center justify-center border-y">{cantidad}</div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementarCantidad}>
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Aumentar cantidad</span>
                </Button>
              </div>
              <Button className="flex-1" onClick={agregarAlCarrito}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
