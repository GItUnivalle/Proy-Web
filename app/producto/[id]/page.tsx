"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useFavorites } from "@/hooks/use-favorites"

// Datos de ejemplo (reemplazar con datos reales de la base de datos)
const productosEjemplo = [
  {
    id: 1,
    nombre: "Producto Premium",
    precio: 1200,
    descripcion: "Producto de alta calidad con características premium",
    imagen: "/placeholder.svg?height=400&width=600",
    categoria: "Premium",
    marca: "MarcaA",
    caracteristicas: ["Material de alta calidad", "Diseño exclusivo", "Garantía extendida", "Servicio premium"],
  },
  {
    id: 2,
    nombre: "Producto Estándar",
    precio: 800,
    descripcion: "Producto estándar con buena relación calidad-precio",
    imagen: "/placeholder.svg?height=400&width=600",
    categoria: "Estándar",
    marca: "MarcaB",
    caracteristicas: ["Buena calidad", "Diseño funcional", "Garantía estándar"],
  },
  {
    id: 3,
    nombre: "Producto Básico",
    precio: 500,
    descripcion: "Producto básico para necesidades esenciales",
    imagen: "/placeholder.svg?height=400&width=600",
    categoria: "Básico",
    marca: "MarcaC",
    caracteristicas: ["Funcionalidad básica", "Precio accesible", "Fácil de usar"],
  },
  {
    id: 4,
    nombre: "Producto Especial",
    precio: 1500,
    descripcion: "Producto con características especiales y únicas",
    imagen: "/placeholder.svg?height=400&width=600",
    categoria: "Especial",
    marca: "MarcaA",
    caracteristicas: ["Características únicas", "Edición limitada", "Tecnología avanzada"],
  },
  {
    id: 5,
    nombre: "Producto Económico",
    precio: 300,
    descripcion: "Producto económico para presupuestos ajustados",
    imagen: "/placeholder.svg?height=400&width=600",
    categoria: "Económico",
    marca: "MarcaD",
    caracteristicas: ["Precio bajo", "Funcionalidad básica", "Ideal para principiantes"],
  },
  {
    id: 6,
    nombre: "Producto Exclusivo",
    precio: 2000,
    descripcion: "Producto exclusivo con características premium",
    imagen: "/placeholder.svg?height=400&width=600",
    categoria: "Premium",
    marca: "MarcaB",
    caracteristicas: ["Edición limitada", "Materiales premium", "Diseño exclusivo", "Garantía de por vida"],
  },
]

export default function ProductoDetalle() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { favorites, toggleFavorite } = useFavorites()
  const [producto, setProducto] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos
    const id = Number(params.id)
    const productoEncontrado = productosEjemplo.find((p) => p.id === id)

    if (productoEncontrado) {
      setProducto(productoEncontrado)
    } else {
      // Producto no encontrado, redirigir a la página principal
      router.push("/")
      toast({
        title: "Producto no encontrado",
        description: "El producto que busca no existe",
        variant: "destructive",
      })
    }

    setLoading(false)
  }, [params.id, router, toast])

  const handleToggleFavorite = () => {
    if (producto) {
      toggleFavorite(producto)
      toast({
        title: favorites.some((fav) => fav.id === producto.id) ? "Añadido a favoritos" : "Eliminado de favoritos",
        description: `${producto.nombre} ha sido ${favorites.some((fav) => fav.id === producto.id) ? "añadido a" : "eliminado de"} favoritos`,
      })
    }
  }

  const agregarAlCarrito = () => {
    if (producto) {
      // Aquí iría la lógica para agregar al carrito
      toast({
        title: "Producto agregado",
        description: `${producto.nombre} ha sido agregado al carrito`,
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!producto) {
    return null // El router ya habrá redirigido
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden border">
          <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-contain" />
        </div>

        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{producto.nombre}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{producto.categoria}</Badge>
                <span className="text-sm text-muted-foreground">Marca: {producto.marca}</span>
              </div>
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={handleToggleFavorite}>
              <Heart
                className={`h-5 w-5 ${favorites.some((fav) => fav.id === producto.id) ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="sr-only">
                {favorites.some((fav) => fav.id === producto.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
              </span>
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-2xl font-bold">${producto.precio}</p>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
            <p className="text-muted-foreground">{producto.descripcion}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Características</h2>
            <ul className="list-disc pl-5 space-y-1">
              {producto.caracteristicas.map((caracteristica: string, index: number) => (
                <li key={index} className="text-muted-foreground">
                  {caracteristica}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button className="w-full" onClick={agregarAlCarrito}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
