"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo (reemplazar con datos reales)
const productosPersonalizadosEjemplo = [
  {
    id: 1,
    nombre: "Producto Personalizado A",
    descripcion: "Diseño personalizado con características específicas",
    fecha: "2023-05-10",
    estado: "Aprobado",
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    nombre: "Producto Personalizado B",
    descripcion: "Diseño personalizado para necesidades especiales",
    fecha: "2023-06-05",
    estado: "Pendiente",
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    nombre: "Producto Personalizado C",
    descripcion: "Diseño personalizado con materiales específicos",
    fecha: "2023-06-15",
    estado: "Rechazado",
    imagen: "/placeholder.svg?height=100&width=100",
  },
]

export default function ProductosPersonalizadosPage() {
  const { toast } = useToast()
  const [productosPersonalizados] = useState(productosPersonalizadosEjemplo)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState("")
  const [imagen, setImagen] = useState<File | null>(null)
  const [imagenPreview, setImagenPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagen(file)
      setImagenPreview(URL.createObjectURL(file))
    }
  }

  const eliminarImagen = () => {
    setImagen(null)
    if (imagenPreview) {
      URL.revokeObjectURL(imagenPreview)
      setImagenPreview(null)
    }
  }

  const enviarProducto = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !descripcion || !categoria || !imagen) {
      toast({
        title: "Error de validación",
        description: "Por favor complete todos los campos y suba una imagen",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Aquí iría la lógica para enviar el producto personalizado
    setTimeout(() => {
      toast({
        title: "Producto enviado",
        description: "Su producto personalizado ha sido enviado para revisión",
      })
      setNombre("")
      setDescripcion("")
      setCategoria("")
      eliminarImagen()
      setIsLoading(false)
    }, 1500)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Aprobado":
        return <Badge className="bg-green-500">Aprobado</Badge>
      case "Pendiente":
        return <Badge variant="outline">Pendiente</Badge>
      case "Rechazado":
        return <Badge variant="destructive">Rechazado</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Productos Personalizados (PDI)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Nuevo Producto Personalizado</CardTitle>
              <CardDescription>
                Complete el formulario para enviar un nuevo producto personalizado para revisión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={enviarProducto} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del producto</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese un nombre descriptivo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select value={categoria} onValueChange={setCategoria} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="estandar">Estándar</SelectItem>
                      <SelectItem value="basico">Básico</SelectItem>
                      <SelectItem value="especial">Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describa las características y especificaciones del producto"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagen del producto</Label>
                  {imagenPreview ? (
                    <div className="relative w-full h-48 border rounded-md overflow-hidden">
                      <Image
                        src={imagenPreview || "/placeholder.svg"}
                        alt="Vista previa"
                        fill
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={eliminarImagen}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-md p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Arrastre una imagen o haga clic para seleccionar
                      </p>
                      <Input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={handleImagenChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("imagen")?.click()}
                      >
                        Seleccionar imagen
                      </Button>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar producto personalizado"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Mis Productos Personalizados</h2>
          {productosPersonalizados.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">No ha enviado ningún producto personalizado</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {productosPersonalizados.map((producto) => (
                <Card key={producto.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image
                          src={producto.imagen || "/placeholder.svg"}
                          alt={producto.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{producto.nombre}</h3>
                          {getEstadoBadge(producto.estado)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{producto.descripcion}</p>
                        <p className="text-xs text-muted-foreground mt-2">Enviado el: {producto.fecha}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
