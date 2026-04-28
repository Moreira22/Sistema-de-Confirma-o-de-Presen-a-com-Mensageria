"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { LoginPage } from "@/components/login-page"
import  PublicConfirmation  from "@/components/public-confirmation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { GuestManagement } from "@/components/guest-management"
import { CalendarCheck, LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type View = "public" | "login" | "dashboard" | "guests"

export default function Home() {
  const { isAuthenticated, logout } = useApp()
  const [view, setView] = useState<View>("public")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (view === "login" && !isAuthenticated) {
    return <LoginPage onSuccess={() => setView("dashboard")} onBack={() => setView("public")} />
  }

  if (isAuthenticated && (view === "dashboard" || view === "guests" || view === "login")) {
    if (view === "login") setView("dashboard")

    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <button
              onClick={() => setView("public")}
              className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
            >
              <CalendarCheck className="h-6 w-6 text-primary" />
              <span className="font-[var(--font-heading)] text-xl font-bold tracking-tight">EventCheck</span>
            </button>
            <nav className="hidden items-center gap-1 md:flex">
              <Button
                variant={view === "dashboard" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={view === "guests" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("guests")}
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Convidados
              </Button>
              <div className="mx-2 h-6 w-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout()
                  setView("public")
                }}
                className="gap-2 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          {mobileMenuOpen && (
            <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
              <nav className="flex flex-col gap-1">
                <Button
                  variant={view === "dashboard" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => { setView("dashboard"); setMobileMenuOpen(false) }}
                  className="justify-start gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={view === "guests" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => { setView("guests"); setMobileMenuOpen(false) }}
                  className="justify-start gap-2"
                >
                  <Users className="h-4 w-4" />
                  Convidados
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { logout(); setView("public"); setMobileMenuOpen(false) }}
                  className="justify-start gap-2 text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </nav>
            </div>
          )}
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8">
          {view === "dashboard" && <AdminDashboard />}
          {view === "guests" && <GuestManagement />}
        </main>
      </div>
    )
  }

  return <PublicConfirmation onLoginClick={() => setView("login")} />
}
