// Tipos para productos
export interface Producto {
  id: number
  nombre: string
  precio: number
  descripcion: string
  imagen: string
  categoria: string
  marca: string
  tipo?: string
}

// Tipos para el carrito
export interface ItemCarrito {
  id: number
  nombre: string
  precio: number
  cantidad: number
  imagen: string
}

export interface Carrito {
  items: ItemCarrito[]
  total: number
  notas?: string
}

// Tipos para reservaciones
export interface ProductoReservacion {
  id: number
  nombre: string
  cantidad: number
  precio: number
}

export interface Reservacion {
  id: number
  fecha: string
  productos: ProductoReservacion[]
  estado: "Aprobado" | "Pendiente" | "Rechazado"
  total: number
  notas?: string
}

// Tipos para productos personalizados
export interface ProductoPersonalizado {
  id: number
  nombre: string
  descripcion: string
  fecha: string
  estado: "Aprobado" | "Pendiente" | "Rechazado"
  imagen: string
  categoria?: string
}

// Tipos para usuarios
export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: "Cliente" | "Administrador"
}

// Tipos para mensajes de contacto
export interface MensajeContacto {
  id: number
  nombre: string
  email: string
  asunto: string
  mensaje: string
  fecha: string
  leido: boolean
}
