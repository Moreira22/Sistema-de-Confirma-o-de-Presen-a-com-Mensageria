"use client"

import { useState, useMemo } from "react"
import { useApp } from "@/lib/app-context"
import type { Guest } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search, UserPlus } from "lucide-react"
import { toast } from "sonner"

type FormData = {
  name: string
  cpf: string
  phone: string
  email: string
  status: "pendente" | "confirmado"
}

const emptyForm: FormData = {
  name: "",
  cpf: "",
  phone: "",
  email: "",
  status: "pendente",
}

export function GuestManagement() {
  const { guests, addGuest, updateGuest, deleteGuest } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("todos")

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchStatus = filterStatus === "todos" || g.status === filterStatus
      const matchSearch =
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.email.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [guests, filterStatus, search])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEdit = (guest: Guest) => {
    setEditingId(guest.id)
    setForm({
      name: guest.name,
      cpf: guest.cpf,
      phone: guest.phone,
      email: guest.email,
      status: guest.status,
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name.trim() ) {
      toast.error("Preencha os campos obrigatorios (Nome).")
      return
    }

    if (editingId) {
      updateGuest(editingId, form)
      toast.success("Convidado atualizado com sucesso!")
    } else {
      addGuest(form)
      toast.success("Convidado adicionado com sucesso!")
    }
    setShowForm(false)
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteGuest(deleteId)
      toast.success("Convidado removido com sucesso!")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Convidados
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie a lista de convidados do evento
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Convidado
        </Button>
      </div>

      {/* Table */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-[var(--font-heading)] text-base font-semibold">
                Lista completa
              </CardTitle>
              <CardDescription>{filteredGuests.length} convidados</CardDescription>
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
                  <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                  <TableHead className="hidden lg:table-cell">CPF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium text-foreground">{guest.name}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {guest.email}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {guest.phone}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {guest.cpf || "-"}
                    </TableCell>
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
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(guest)}
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                          aria-label="Editar convidado"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(guest.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          aria-label="Excluir convidado"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredGuests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                          <UserPlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Nenhum convidado encontrado</p>
                          <p className="text-sm text-muted-foreground">
                            Ajuste os filtros ou adicione um novo convidado
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-[var(--font-heading)]">
              {editingId ? "Editar convidado" : "Novo convidado"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Atualize os dados do convidado"
                : "Preencha os dados do novo convidado"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="guest-name">
                Nome completo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="guest-name"
                placeholder="Nome do convidado"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="guest-cpf">CPF (opcional)</Label>
                <Input
                  id="guest-cpf"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="guest-phone">Telefone</Label>
                <Input
                  id="guest-phone"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="guest-email">
                E-mail
              </Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(val) =>
                  setForm({ ...form, status: val as "pendente" | "confirmado" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Salvar alteracoes" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-[var(--font-heading)]">Excluir convidado</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este convidado? Esta acao nao pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
