"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo (reemplazar con datos reales)
const reservacionesEjemplo = [
  {
    id: 1,
    fecha: "2023-05-15",
    productos: [
      { id: 1, nombre: "Producto Premium", cantidad: 2, precio: 1200 },
      { id: 3, nombre: "Producto Básico", cantidad: 1, precio: 500 },
    ],
    estado: "Aprobado",
    total: 2900,
    notas: "Entrega en horario de oficina",
  },
  {
    id: 2,
    fecha: "2023-06-02",
    productos: [
      { id: 2, nombre: "Producto Estándar", cantidad: 3, precio: 800 },
      { id: 5, nombre: "Producto Económico", cantidad: 2, precio: 300 },
    ],
    estado: "Pendiente",
    total: 3000,
    notas: "",
  },
  {
    id: 3,
    fecha: "2023-06-10",
    productos: [{ id: 4, nombre: "Producto Especial", cantidad: 1, precio: 1500 }],
    estado: "Rechazado",
    total: 1500,
    notas: "Producto no disponible temporalmente",
  },
]

export default function MisReservacionesPage() {
  const [reservaciones] = useState(reservacionesEjemplo)
  const [selectedReservacion, setSelectedReservacion] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const verDetalles = (reservacion: any) => {
    setSelectedReservacion(reservacion)
    setDialogOpen(true)
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Reservaciones</h1>
          <p className="text-muted-foreground mt-2">Historial de pedidos sugeridos y su estado de aprobación</p>
        </div>
        <Link href="/">
          <Button>Hacer nueva reservación</Button>
        </Link>
      </div>

      {reservaciones.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No hay reservaciones</CardTitle>
            <CardDescription>Aún no ha realizado ninguna reservación</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>Ir al catálogo</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservaciones.map((reservacion) => (
                <TableRow key={reservacion.id}>
                  <TableCell className="font-medium">{reservacion.id}</TableCell>
                  <TableCell>{reservacion.fecha}</TableCell>
                  <TableCell>${reservacion.total}</TableCell>
                  <TableCell>{getEstadoBadge(reservacion.estado)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => verDetalles(reservacion)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles de la Reservación #{selectedReservacion?.id}</DialogTitle>
            <DialogDescription>Fecha: {selectedReservacion?.fecha}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Productos</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedReservacion?.productos.map((producto: any) => (
                    <TableRow key={producto.id}>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell className="text-right">${producto.precio * producto.cantidad}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} className="text-right font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-medium">${selectedReservacion?.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="font-medium mb-2">Estado</h3>
              <p>{getEstadoBadge(selectedReservacion?.estado)}</p>
            </div>
            {selectedReservacion?.notas && (
              <div>
                <h3 className="font-medium mb-2">Notas</h3>
                <p className="text-sm">{selectedReservacion.notas}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
