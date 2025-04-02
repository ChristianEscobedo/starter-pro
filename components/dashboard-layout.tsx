'use client'

import { ReactNode } from 'react'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import {
  Home,
  Image,
  Youtube,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import NextImage from 'next/image'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 border-r bg-card md:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold">AI Photo</span>
            <NextImage
              src="/logo.png"
              width={32}
              height={32}
              className="ml-2"
              alt="AI Photo Logo"
              alt="AI Photo Logo"
            />
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <NavItem href="/dashboard" icon={<Home className="h-4 w-4" />} label="Dashboard" />
          <NavItem
            href="/transform/youtube"
            icon={<Youtube className="h-4 w-4" />}
            label="YouTube Thumbnails"
          />
          <NavItem
            href="/transform/meme"
            icon={<MessageSquare className="h-4 w-4" />}
            label="Meme Generator"
          />
          <NavItem
            href="/transform/professional"
            icon={<Image className="h-4 w-4" />}
            label="Professional Images"
          />

          <div className="my-4 border-t"></div>

          <NavItem href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
          <NavItem href="/billing" icon={<CreditCard className="h-4 w-4" />} label="Billing" />
          <NavItem href="/help" icon={<HelpCircle className="h-4 w-4" />} label="Help & Support" />
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <aside className="fixed left-0 top-0 h-full w-3/4 border-r bg-card">
            <div className="flex h-16 items-center justify-between border-b px-6">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-semibold">AI Photo</span>
                <NextImage
                  src="/logo.png"
                  width={32}
                  height={32}
                  className="ml-2"
                  alt="AI Photo Logo"
                  alt="AI Photo Logo"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <NavItem
                href="/dashboard"
                icon={<Home className="h-4 w-4" />}
                label="Dashboard"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                href="/transform/youtube"
                icon={<Youtube className="h-4 w-4" />}
                label="YouTube Thumbnails"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                href="/transform/meme"
                icon={<MessageSquare className="h-4 w-4" />}
                label="Meme Generator"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                href="/transform/professional"
                icon={<Image className="h-4 w-4" />}
                label="Professional Images"
                onClick={() => setSidebarOpen(false)}
              />

              <div className="my-4 border-t"></div>

              <NavItem
                href="/settings"
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                href="/billing"
                icon={<CreditCard className="h-4 w-4" />}
                label="Billing"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                href="/help"
                icon={<HelpCircle className="h-4 w-4" />}
                label="Help & Support"
                onClick={() => setSidebarOpen(false)}
              />
            </nav>
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        {/* Top navigation */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: ReactNode
  label: string
  onClick?: () => void
}

function NavItem({ href, icon, label, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
