"use client"

import { useMemo, useState } from "react"
import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Users, CheckCircle2, Clock, TrendingUp, Search } from "lucide-react"

export function AdminDashboard() {
  const { guests } = useApp()
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [search, setSearch] = useState("")

  const stats = useMemo(() => {
    const total = guests.length
    const confirmed = guests.filter((g) => g.status === "confirmado").length
    const pending = guests.filter((g) => g.status === "pendente").length
    const percent = total > 0 ? Math.round((confirmed / total) * 100) : 0
    return { total, confirmed, pending, percent }
  }, [guests])

  const pieData = useMemo(
    () => [
      { name: "Confirmados", value: stats.confirmed },
      { name: "Pendentes", value: stats.pending },
    ],
    [stats]
  )

  // Compute pie colors at JS level
  const PIE_COLORS = ["#2b8a3e", "#868e96"]

  const barData = useMemo(
    () => [
      { name: "Confirmados", quantidade: stats.confirmed },
      { name: "Pendentes", quantidade: stats.pending },
    ],
    [stats]
  )

  const BAR_COLORS = ["#2b8a3e", "#868e96"]

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchStatus = filterStatus === "todos" || g.status === filterStatus
      const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [guests, filterStatus, search])

  const kpiCards = [
    {
      title: "Total de convidados",
      value: stats.total,
      icon: Users,
      className: "bg-primary/10 text-primary",
    },
    {
      title: "Confirmados",
      value: stats.confirmed,
      icon: CheckCircle2,
      className: "bg-success/10 text-success",
    },
    {
      title: "Pendentes",
      value: stats.pending,
      icon: Clock,
      className: "bg-muted text-muted-foreground",
    },
    {
      title: "Confirmacao",
      value: stats.percent + "%",
      icon: TrendingUp,
      className: "bg-primary/10 text-primary",
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visao geral das confirmacoes do evento
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="border-border/50">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${kpi.className}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
                  {kpi.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-base font-semibold">
              Distribuicao de confirmacoes
            </CardTitle>
            <CardDescription>Grafico de pizza com status dos convidados</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                confirmados: { label: "Confirmados", color: PIE_COLORS[0] },
                pendentes: { label: "Pendentes", color: PIE_COLORS[1] },
              }}
              className="mx-auto aspect-square h-[280px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  strokeWidth={2}
                  stroke="var(--color-card)"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[0] }} />
                <span className="text-sm text-muted-foreground">Confirmados ({stats.confirmed})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[1] }} />
                <span className="text-sm text-muted-foreground">Pendentes ({stats.pending})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-base font-semibold">
              Resumo por status
            </CardTitle>
            <CardDescription>Comparacao entre confirmados e pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                quantidade: { label: "Quantidade", color: PIE_COLORS[0] },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="quantidade" radius={[6, 6, 0, 0]}>
                    {barData.map((_, index) => (
                      <Cell key={`bar-${index}`} fill={BAR_COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Guest Table */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-[var(--font-heading)] text-base font-semibold">
                Lista de convidados
              </CardTitle>
              <CardDescription>{filteredGuests.length} convidados encontrados</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 sm:w-48"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filtrar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="confirmado">Confirmados</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">E-mail</TableHead>
                  <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium text-foreground">{guest.name}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{guest.email}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">{guest.phone}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          guest.status === "confirmado"
                            ? "bg-success/15 text-success border-success/20"
                            : "bg-muted text-muted-foreground border-border"
                        }
                        variant="outline"
                      >
                        {guest.status === "confirmado" ? "Confirmado" : "Pendente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredGuests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                      Nenhum convidado encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
