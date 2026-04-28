"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import axios from "axios"
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
  CheckCircle2,
  RefreshCcw,
  Loader2,
  ChevronRight,
  LogIn,
  PartyPopper,
  Mail,
  Phone,
} from "lucide-react"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export interface Convidado {
  id: number
  nome: string
  email: string
  telefone: string
  codigoConfirmacao: string
  confirmado: boolean
}

interface Evento {
  id: number
  nome: string
}

interface PublicConfirmationProps {
  onLoginClick?: () => void
}

export default function PublicConfirmation({ onLoginClick }: PublicConfirmationProps) {
  const [events, setEvents] = useState<Evento[]>([])
  const [apiGuests, setApiGuests] = useState<Convidado[]>([])

  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [isLoadingGuests, setIsLoadingGuests] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null)
  const [selectedGuest, setSelectedGuest] = useState<Convidado | null>(null)
  const [eventSearch, setEventSearch] = useState("")
  const [search, setSearch] = useState("")
  const [showEventDropdown, setShowEventDropdown] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")

  const eventDropdownRef = useRef<HTMLDivElement>(null)
  const guestDropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setShowEventDropdown(false)
      }
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Busca todos os eventos ao iniciar
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoadingEvents(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/api/evento/liste`)
        setEvents(response.data)
      } catch {
        toast.error("Erro ao carregar lista de eventos.")
      } finally {
        setIsLoadingEvents(false)
      }
    }
    fetchEvents()
  }, [])

  // Busca convidados quando o evento é selecionado
  useEffect(() => {
    if (selectedEvent) {
      const fetchGuests = async () => {
        setIsLoadingGuests(true)
        try {
          const response = await axios.get(`${API_BASE_URL}/api/convidado/listaPorEvento/${selectedEvent.id}`)
          setApiGuests(response.data)
        } catch {
          toast.error("Erro ao carregar convidados.")
        } finally {
          setIsLoadingGuests(false)
        }
      }
      fetchGuests()
    }
  }, [selectedEvent])

  const filteredEvents = useMemo(() =>
      events.filter(e => e.nome.toLowerCase().includes(eventSearch.toLowerCase())), [eventSearch, events])

  const filteredGuests = useMemo(() => {
    if (search.length < 2) return []
    return apiGuests.filter(g => g.nome?.toLowerCase().includes(search.toLowerCase()))
  }, [search, apiGuests])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      toast.error("E-mail inválido")
      return
    }

    setSendingCode(true)
    try {
      // Simulação de envio ou chamada real para disparar e-mail
      await new Promise(r => setTimeout(r, 1000))
      setShowEmailModal(false)
      setShowCodeModal(true)
      toast.success("Código enviado com sucesso!")
    } catch {
      toast.error("Erro ao enviar código.")
    } finally {
      setSendingCode(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGuest) return

    if (code.toUpperCase() !== selectedGuest.codigoConfirmacao.toUpperCase()) {
      toast.error("Código incorreto. Verifique e tente novamente.")
      return
    }

    setVerifying(true)
    try {
      await axios.put(`${API_BASE_URL}/api/convidado/confirmar/${selectedGuest.id}`)
      setSelectedGuest({ ...selectedGuest, confirmado: true })
      setShowCodeModal(false)
      setCode("")
      toast.success("Presença confirmada!")
    } catch {
      toast.error("Erro ao confirmar presença no servidor.")
    } finally {
      setVerifying(false)
    }
  }

  const handleResetEvent = () => {
    setSelectedEvent(null)
    setSelectedGuest(null)
    setApiGuests([])
    setEventSearch("")
    setSearch("")
  }

  const handleResetGuest = () => {
    setSelectedGuest(null)
    setSearch("")
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
          <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">EventCheck</span>
            </div>
            {onLoginClick && (
                <Button variant="ghost" size="sm" onClick={onLoginClick} className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Admin
                </Button>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-12">
          {!selectedEvent ? (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Confirme sua Presença
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Selecione o evento e encontre seu nome na lista
                  </p>
                </div>

                {/* Event Search Card */}
                <Card className="border-2 border-border/50 shadow-xl shadow-black/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Selecione seu Evento</CardTitle>
                    <CardDescription>
                      Digite o nome do evento para encontrá-lo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div ref={eventDropdownRef} className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder={isLoadingEvents ? "Carregando eventos..." : "Digite o nome do evento..."}
                            value={eventSearch}
                            onChange={(e) => {
                              setEventSearch(e.target.value)
                              setShowEventDropdown(true)
                            }}
                            onFocus={() => setShowEventDropdown(true)}
                            className="pl-10 h-12 text-base"
                            disabled={isLoadingEvents}
                        />
                        {isLoadingEvents && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                        )}
                      </div>

                      {showEventDropdown && eventSearch.length > 0 && filteredEvents.length > 0 && (
                          <div className="absolute w-full mt-2 bg-card border border-border rounded-xl shadow-2xl shadow-black/10 z-50 overflow-hidden max-h-64 overflow-y-auto">
                            {filteredEvents.map(ev => (
                                <button
                                    key={ev.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedEvent(ev)
                                      setShowEventDropdown(false)
                                    }}
                                    className="w-full p-4 hover:bg-accent text-left flex items-center justify-between border-b border-border/50 last:border-0 transition-colors"
                                >
                                  <span className="font-medium">{ev.nome}</span>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </button>
                            ))}
                          </div>
                      )}

                      {showEventDropdown && eventSearch.length > 0 && filteredEvents.length === 0 && !isLoadingEvents && (
                          <div className="absolute w-full mt-2 bg-card border border-border rounded-xl shadow-xl z-50 p-4 text-center text-muted-foreground">
                            Nenhum evento encontrado
                          </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
          ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Event Banner */}
                <div className="bg-card p-4 rounded-2xl border-2 border-primary/20 flex items-center justify-between shadow-lg shadow-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <PartyPopper className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Evento selecionado
                      </p>
                      <h2 className="text-lg font-bold">{selectedEvent.nome}</h2>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={handleResetEvent} className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Trocar
                  </Button>
                </div>

                {/* Guest Search */}
                <Card className="shadow-xl shadow-black/5 border-border/50">
                  <CardContent className="pt-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Encontre seu nome na lista
                    </Label>
                    <div ref={guestDropdownRef} className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Digite pelo menos 2 letras do seu nome..."
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value)
                              setShowDropdown(true)
                            }}
                            onFocus={() => setShowDropdown(true)}
                            className="pl-10 h-12 text-base"
                            disabled={isLoadingGuests}
                        />
                        {isLoadingGuests && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                        )}
                      </div>

                      {showDropdown && search.length >= 2 && !selectedGuest && filteredGuests.length > 0 && (
                          <div className="absolute w-full mt-2 bg-card border border-border rounded-xl shadow-2xl shadow-black/10 z-50 max-h-64 overflow-auto">
                            {filteredGuests.map(g => (
                                <button
                                    key={g.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedGuest(g)
                                      setShowDropdown(false)
                                    }}
                                    className="w-full p-4 hover:bg-accent text-left flex items-center justify-between border-b border-border/50 last:border-0 transition-colors"
                                >
                                  <span className="font-medium">{g.nome}</span>
                                  <Badge variant={g.confirmado ? "default" : "outline"} className="shrink-0">
                                    {g.confirmado ? "Confirmado" : "Pendente"}
                                  </Badge>
                                </button>
                            ))}
                          </div>
                      )}

                      {showDropdown && search.length >= 2 && !selectedGuest && filteredGuests.length === 0 && !isLoadingGuests && (
                          <div className="absolute w-full mt-2 bg-card border border-border rounded-xl shadow-xl z-50 p-4 text-center text-muted-foreground">
                            Nenhum convidado encontrado
                          </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Guest Card */}
                {selectedGuest && (
                    <Card className="border-2 border-primary/30 shadow-2xl shadow-primary/10 bg-card animate-in zoom-in-95 duration-300">
                      <CardContent className="pt-6 space-y-6">
                        {/* Guest Name */}
                        <div className="text-center pb-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Convidado
                          </p>
                          <h3 className="text-2xl font-bold">{selectedGuest.nome}</h3>
                        </div>

                        {/* Guest Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-muted/30">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                              <Mail className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                E-mail
                              </p>
                              <p className="font-medium truncate text-sm">{selectedGuest.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-muted/30">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                              <Phone className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Telefone
                              </p>
                              <p className="font-medium text-sm">{selectedGuest.telefone}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          {!selectedGuest.confirmado ? (
                              <Button
                                  className="flex-1 h-12 text-base font-semibold"
                                  onClick={() => setShowEmailModal(true)}
                              >
                                Confirmar Presença
                              </Button>
                          ) : (
                              <div className="flex-1 py-3 bg-green-50 text-green-700 rounded-xl font-bold border-2 border-green-200 text-center flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                Presença Confirmada
                              </div>
                          )}
                          <Button
                              variant="outline"
                              className="h-12 px-6"
                              onClick={handleResetGuest}
                          >
                            Outro nome
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                )}
              </div>
          )}
        </main>

        {/* Modal Passo 1: Email */}
        <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Validar E-mail</DialogTitle>
              <DialogDescription>
                Digite seu e-mail para receber o código de confirmação.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11" disabled={sendingCode}>
                {sendingCode ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                ) : (
                    "Enviar Código"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal Passo 2: Código OTP */}
        <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle>Confirmar Código</DialogTitle>
              <DialogDescription>
                Digite o código de 6 dígitos que você recebeu.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleVerifyCode} className="flex flex-col items-center gap-6">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot key={i} index={i} className="w-11 h-12 text-lg" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={verifying || code.length < 6}
              >
                {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                ) : (
                    "Confirmar"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
  )
}
