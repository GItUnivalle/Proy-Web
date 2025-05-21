"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Plus, LayoutGrid, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
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

export default function SideMenu() {
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()
  const [productosOpen, setProductosOpen] = useState(true)
  const [favoritosOpen, setFavoritosOpen] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const handleToggleFavorite = (producto: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(producto)
    toast({
      title: favorites.some((fav) => fav.id === producto.id) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${producto.nombre} ha sido ${
        favorites.some((fav) => fav.id === producto.id) ? "eliminado de" : "añadido a"
      } favoritos`,
    })
  }

  const openQuickView = (producto: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedProduct(producto)
    setQuickViewOpen(true)
  }

  return (
    <>
      <div className="border rounded-lg">
        <div className="p-4 font-medium">Navegación</div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-400px)] min-h-[300px]">
          <div className="p-4 space-y-4">
            <Collapsible open={productosOpen} onOpenChange={setProductosOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 font-medium hover:text-primary w-full text-left">
                <LayoutGrid className="h-4 w-4" />
                Lista de Productos
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 pl-6 space-y-1">
                {productosEjemplo.map((producto) => (
                  <div key={producto.id} className="flex items-center justify-between py-1 group hover:text-primary">
                    <div className="flex items-center gap-2 truncate pr-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0"
                        onClick={(e) => handleToggleFavorite(producto, e)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.some((fav) => fav.id === producto.id) ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="sr-only">
                          {favorites.some((fav) => fav.id === producto.id)
                            ? "Quitar de favoritos"
                            : "Añadir a favoritos"}
                        </span>
                      </Button>
                      <span className="truncate text-sm">{producto.nombre}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => openQuickView(producto, e)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={favoritosOpen} onOpenChange={setFavoritosOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 font-medium hover:text-primary w-full text-left">
                <Star className="h-4 w-4" />
                Sección de Favoritos
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 pl-6 space-y-1">
                {favorites.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-1">No tiene productos favoritos</p>
                ) : (
                  favorites.map((producto) => (
                    <div key={producto.id} className="flex items-center justify-between py-1 group hover:text-primary">
                      <div className="flex items-center gap-2 truncate pr-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={(e) => handleToggleFavorite(producto, e)}
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          <span className="sr-only">Quitar de favoritos</span>
                        </Button>
                        <span className="truncate text-sm">{producto.nombre}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => openQuickView(producto, e)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                    </div>
                  ))
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
      </div>

      {selectedProduct && (
        <ProductQuickView producto={selectedProduct} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  )
}
