"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

// Datos de ejemplo (reemplazar con datos reales)
const categorias = ["Premium", "Estándar", "Básico", "Especial", "Económico"]
const marcas = ["MarcaA", "MarcaB", "MarcaC", "MarcaD"]
const tipos = ["Tipo1", "Tipo2", "Tipo3"]

export default function FilterModal({ children }: { children: React.ReactNode }) {
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

  const aplicarFiltros = () => {
    // Aquí iría la lógica para aplicar los filtros
    console.log("Filtros aplicados:", {
      categorias: categoriasSeleccionadas,
      marcas: marcasSeleccionadas,
      tipos: tiposSeleccionados,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
          <DialogDescription>Filtre los productos por categoría, marca y tipo</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
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
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={limpiarFiltros} className="sm:w-auto w-full">
            Limpiar filtros
          </Button>
          <DialogClose asChild>
            <Button onClick={aplicarFiltros} className="sm:w-auto w-full">
              Aplicar filtros
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
