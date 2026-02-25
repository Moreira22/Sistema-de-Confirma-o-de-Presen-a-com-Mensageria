"use client"

import { useState, useMemo } from "react"
import { useApp } from "@/lib/app-context"
import type { Guest } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  CalendarCheck,
  Search,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Clock,
  Send,
  ShieldCheck,
  LogIn,
} from "lucide-react"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface PublicConfirmationProps {
  onLoginClick: () => void
}

export function PublicConfirmation({ onLoginClick }: PublicConfirmationProps) {
  const { guests, confirmGuest } = useApp()
  const [search, setSearch] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [sendingCode, setSendingCode] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return guests.filter((g) => g.name.toLowerCase().includes(q))
  }, [search, guests])

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearch(guest.name)
    setShowDropdown(false)
  }

  const handleConfirmClick = () => {
    setShowEmailModal(true)
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      toast.error("Informe um e-mail valido.")
      return
    }
    setSendingCode(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSendingCode(false)
    setShowEmailModal(false)
    setShowCodeModal(true)
    toast.success("Codigo enviado para " + email)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 6) {
      toast.error("Insira o codigo completo de 6 digitos.")
      return
    }
    setVerifying(true)
    await new Promise((r) => setTimeout(r, 1000))

    if (code === "123456" && selectedGuest) {
      confirmGuest(selectedGuest.id)
      setSelectedGuest({ ...selectedGuest, status: "confirmado" })
      setShowCodeModal(false)
      setCode("")
      setEmail("")
      toast.success("Presenca confirmada com sucesso!")
    } else {
      toast.error("Codigo invalido. Use 123456 para teste.")
    }
    setVerifying(false)
  }

  const resetSelection = () => {
    setSelectedGuest(null)
    setSearch("")
    setEmail("")
    setCode("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-6 w-6 text-primary" />
            <span className="font-[var(--font-heading)] text-xl font-bold tracking-tight text-foreground">
              EventCheck
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onLoginClick} className="gap-2 text-muted-foreground">
            <LogIn className="h-4 w-4" />
            Painel Admin
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card py-16 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute -top-20 right-0 h-60 w-60 rounded-full bg-primary/5" />
          <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-accent/5" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <CalendarCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Confirmacao de Presenca
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Pesquise seu nome na lista de convidados e confirme sua presenca no evento de forma rapida e segura.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="mx-auto max-w-2xl px-4 py-10">
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-lg font-semibold">Buscar convidado</CardTitle>
            <CardDescription>Digite seu nome para encontrar seu cadastro na lista</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Digite seu nome..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowDropdown(true)
                  if (!e.target.value.trim()) setSelectedGuest(null)
                }}
                onFocus={() => setShowDropdown(true)}
                className="pl-10"
              />

              {/* Autocomplete dropdown */}
              {showDropdown && filtered.length > 0 && !selectedGuest && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-card shadow-xl">
                  {filtered.map((guest) => (
                    <button
                      key={guest.id}
                      onClick={() => handleSelectGuest(guest)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                          {guest.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{guest.name}</span>
                      </div>
                      <Badge
                        variant={guest.status === "confirmado" ? "default" : "secondary"}
                        className={
                          guest.status === "confirmado"
                            ? "bg-success text-success-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {guest.status === "confirmado" ? "Confirmado" : "Pendente"}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}

              {showDropdown && search.trim() && filtered.length === 0 && !selectedGuest && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border border-border bg-card p-4 text-center shadow-xl">
                  <p className="text-sm text-muted-foreground">Nenhum convidado encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Guest Detail Card */}
        {selectedGuest && (
          <Card className="mt-6 border-border/50 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-[var(--font-heading)] text-lg font-semibold">
                  Dados do convidado
                </CardTitle>
                <Badge
                  className={
                    selectedGuest.status === "confirmado"
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }
                >
                  {selectedGuest.status === "confirmado" ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Confirmado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Pendente
                    </span>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Nome completo</p>
                    <p className="text-sm font-medium text-foreground">{selectedGuest.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">CPF</p>
                    <p className="text-sm font-medium text-foreground">{selectedGuest.cpf || "Nao informado"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefone</p>
                    <p className="text-sm font-medium text-foreground">{selectedGuest.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">E-mail</p>
                    <p className="text-sm font-medium text-foreground">{selectedGuest.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {selectedGuest.status === "pendente" ? (
                  <Button onClick={handleConfirmClick} className="flex-1 gap-2" size="lg">
                    <CheckCircle2 className="h-4 w-4" />
                    Confirmar Presenca
                  </Button>
                ) : (
                  <div className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-success/10 py-3 text-sm font-medium text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    Presenca ja confirmada
                  </div>
                )}
                <Button variant="outline" onClick={resetSelection} size="lg">
                  Nova busca
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center font-[var(--font-heading)]">Verificacao por e-mail</DialogTitle>
            <DialogDescription className="text-center">
              Informe seu e-mail para receber o codigo de confirmacao
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm-email">E-mail</Label>
              <Input
                id="confirm-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={sendingCode}>
              {sendingCode ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Enviando...
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Codigo
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Code Verification Modal */}
      <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <DialogTitle className="text-center font-[var(--font-heading)]">Codigo de verificacao</DialogTitle>
            <DialogDescription className="text-center">
              Insira o codigo de 6 digitos enviado para <span className="font-medium text-foreground">{email}</span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVerifyCode} className="flex flex-col items-center gap-6">
            <InputOTP maxLength={6} value={code} onChange={(val) => setCode(val)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">
              Use o codigo <span className="font-medium text-foreground">123456</span> para teste
            </p>
            <Button type="submit" className="w-full gap-2" disabled={verifying}>
              {verifying ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Verificando...
                </span>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Confirmar
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            EventCheck - Sistema de confirmacao de presenca
          </p>
        </div>
      </footer>
    </div>
  )
}
