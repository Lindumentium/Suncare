import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Acme Inc. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

