import { Suspense } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Filter, History, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCatalog from "@/components/product-catalog"
import FavoriteProducts from "@/components/favorite-products"
import FilterModal from "@/components/filter-modal"
import SideMenu from "@/components/side-menu"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Catálogo de Productos de Franz G.Master</h1>
            <p className="text-muted-foreground mt-2">
              Explore nuestra selección de productos y haga sus reservaciones
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar productos..." className="w-full pl-8" />
            </div>
            <Link href="/carrito">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <FilterModal>
              <Button variant="outline" size="icon">
                <Filter className="h-5 w-5" />
                <span className="sr-only">Filtros</span>
              </Button>
            </FilterModal>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            Historial de compras
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowUpDown className="h-4 w-4" />
            Cambiar orden
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <SideMenu />
          </div>
          <div className="flex-1">
            <Tabs defaultValue="productos" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="productos">Lista de Productos</TabsTrigger>
                <TabsTrigger value="favoritos">Sección de Favoritos</TabsTrigger>
              </TabsList>
              <TabsContent value="productos">
                <Suspense fallback={<CatalogSkeleton />}>
                  <ProductCatalog />
                </Suspense>
              </TabsContent>
              <TabsContent value="favoritos">
                <Suspense fallback={<CatalogSkeleton />}>
                  <FavoriteProducts />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-48 w-full rounded-md mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
    </div>
  )
}
