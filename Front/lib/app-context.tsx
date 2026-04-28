"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { mockConvidado, type Convidado } from "@/lib/data"

interface AppState {
  guests: Convidado[]
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  addGuest: (guest: Omit<Convidado, "id">) => void
  updateGuest: (id: string, guest: Partial<Convidado>) => void
  deleteGuest: (id: string) => void
  confirmGuest: (id: string) => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Convidado[]>(mockConvidado)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useCallback((email: string, password: string) => {
    if (email === "admin@evento.com" && password === "admin123") {
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const addGuest = useCallback((guest: Omit<Convidado, "id">) => {
    const newGuest: Convidado = {
      ...guest,
      id: Date.now().toString(),
    }
    setGuests((prev) => [...prev, newGuest])
  }, [])

  const updateGuest = useCallback((id: string, data: Partial<Convidado>) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...data } : g))
    )
  }, [])

  const deleteGuest = useCallback((id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const confirmGuest = useCallback((id: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, confirmado: true } : g))
    )
  }, [])

  return (
    <AppContext.Provider
      value={{
        guests,
        isAuthenticated,
        login,
        logout,
        addGuest,
        updateGuest,
        deleteGuest,
        confirmGuest,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp deve ser usado dentro de AppProvider")
  }
  return context
}
