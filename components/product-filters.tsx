"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo (reemplazar con datos reales)
const categorias = ["Premium", "Estándar", "Básico", "Especial", "Económico"]
const marcas = ["MarcaA", "MarcaB", "MarcaC", "MarcaD"]
const tipos = ["Tipo1", "Tipo2", "Tipo3"]

export default function ProductFilters() {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState<string[]>([])
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([])

  const toggleCategoria = (categoria: string) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria],
    )
  }

  const toggleMarca = (marca: string) => {
    setMarcasSeleccionadas((prev) => (prev.includes(marca) ? prev.filter((m) => m !== marca) : [...prev, marca]))
  }

  const toggleTipo = (tipo: string) => {
    setTiposSeleccionados((prev) => (prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]))
  }

  const limpiarFiltros = () => {
    setCategoriasSeleccionadas([])
    setMarcasSeleccionadas([])
    setTiposSeleccionados([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
          Limpiar
        </Button>
      </div>
      <Separator />

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium">Categorías</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          {categorias.map((categoria) => (
            <div key={categoria} className="flex items-center space-x-2">
              <Checkbox
                id={`categoria-${categoria}`}
                checked={categoriasSeleccionadas.includes(categoria)}
                onCheckedChange={() => toggleCategoria(categoria)}
              />
              <Label htmlFor={`categoria-${categoria}`}>{categoria}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium">Marcas</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          {marcas.map((marca) => (
            <div key={marca} className="flex items-center space-x-2">
              <Checkbox
                id={`marca-${marca}`}
                checked={marcasSeleccionadas.includes(marca)}
                onCheckedChange={() => toggleMarca(marca)}
              />
              <Label htmlFor={`marca-${marca}`}>{marca}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium">Tipos</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          {tipos.map((tipo) => (
            <div key={tipo} className="flex items-center space-x-2">
              <Checkbox
                id={`tipo-${tipo}`}
                checked={tiposSeleccionados.includes(tipo)}
                onCheckedChange={() => toggleTipo(tipo)}
              />
              <Label htmlFor={`tipo-${tipo}`}>{tipo}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
