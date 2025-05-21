import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portal de Clientes. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary">
            Términos y Condiciones
          </Link>
          <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary">
            Política de Privacidad
          </Link>
          <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
