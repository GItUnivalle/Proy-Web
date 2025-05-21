"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo (reemplazar con datos reales)
const carritoEjemplo = [
  {
    id: 1,
    nombre: "Producto Premium",
    precio: 1200,
    cantidad: 1,
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    nombre: "Producto Básico",
    precio: 500,
    cantidad: 2,
    imagen: "/placeholder.svg?height=100&width=100",
  },
]

export default function CarritoPage() {
  const { toast } = useToast()
  const [carrito, setCarrito] = useState(carritoEjemplo)
  const [notas, setNotas] = useState("")

  const eliminarProducto = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    })
  }

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) return
    setCarrito((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad } : item)))
  }

  const enviarReservacion = () => {
    // Aquí iría la lógica para enviar la reservación a la base de datos
    toast({
      title: "Reservación enviada",
      description: "Su pedido sugerido ha sido enviado correctamente",
    })
    setCarrito([])
    setNotas("")
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Carrito de Reservación</h1>

      {carrito.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Su carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">Agregue productos al carrito para hacer una reservación</p>
          <Link href="/">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Productos en su carrito</h2>
                <div className="space-y-6">
                  {carrito.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden">
                        <Image
                          src={item.imagen || "/placeholder.svg"}
                          alt={item.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.nombre}</h3>
                        <p className="text-muted-foreground">${item.precio}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidad(item.id, Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => eliminarProducto(item.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <div className="space-y-4">
                  {carrito.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.nombre} x{item.cantidad}
                      </span>
                      <span>${item.precio * item.cantidad}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Notas adicionales</h2>
                <Textarea
                  placeholder="Agregue cualquier información adicional sobre su pedido"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  className="mb-4"
                />
                <Button className="w-full" onClick={enviarReservacion}>
                  Enviar pedido sugerido
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
