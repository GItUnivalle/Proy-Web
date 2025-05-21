"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ContactoPage() {
  const { toast } = useToast()
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [asunto, setAsunto] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Aquí iría la lógica para enviar el formulario
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto con usted pronto",
      })
      setNombre("")
      setEmail("")
      setAsunto("")
      setMensaje("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Contacto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Envíenos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese su nombre"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asunto">Asunto</Label>
              <Select value={asunto} onValueChange={setAsunto} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un asunto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulta">Consulta general</SelectItem>
                  <SelectItem value="soporte">Soporte técnico</SelectItem>
                  <SelectItem value="pedido">Consulta sobre pedido</SelectItem>
                  <SelectItem value="producto">Información de producto</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje</Label>
              <Textarea
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escriba su mensaje aquí"
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-muted-foreground">
                    Av. Principal 123
                    <br />
                    Ciudad Ejemplo, CP 12345
                    <br />
                    País
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-muted-foreground">
                    +1 (555) 123-4567
                    <br />
                    Lunes a Viernes: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Correo electrónico</h3>
                  <p className="text-muted-foreground">
                    info@portalclientes.com
                    <br />
                    soporte@portalclientes.com
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Horario de atención</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>Lunes a Viernes: 9:00 AM - 6:00 PM</li>
                <li>Sábados: 10:00 AM - 2:00 PM</li>
                <li>Domingos y festivos: Cerrado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
