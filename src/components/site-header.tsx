import Link from "next/link"
import { Mountain } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Mountain className="h-5 w-5" />
          <span className="font-bold">Acme Inc</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Documentation
          </Link>
          <Button size="sm">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  )
}

