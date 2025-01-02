import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isStaff = request.cookies.get('user_role')?.value === 'staff'
  
  if (request.nextUrl.pathname.startsWith('/occupancy') || request.nextUrl.pathname.startsWith('/residents')) {
    if (!isStaff) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/occupancy/:path*', '/residents/:path*'],
}

