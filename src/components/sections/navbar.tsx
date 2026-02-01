"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link' // Using Next.js Link for better performance
import { Menu, X, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation' // Added usePathname

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<FirebaseUser | null>(null)
  
  const router = useRouter()
  const pathname = usePathname() // This hook gets the current URL path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about-section' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Events', href: '/events' },
    { name: 'Workshop', href: '/workshop' },
    { name: 'Synergy', href: '/synergy' },
  ]

  // Function to determine if a link should be active
  const isActiveLink = (href: string) => {
    // If it's the home link, strictly check if we are at root
    if (href === '/') {
      return pathname === '/'
    }
    // If it's an anchor link (like About), generally don't highlight it as a separate page 
    // unless you want it to trigger on Home. For now, we return false so "Home" stays active.
    if (href.includes('#')) {
      return false
    }
    // For other pages (Events, Sponsors), check if the current path starts with the link
    // This handles sub-pages like /events/details as well
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={cn(
        "sticky top-3 mx-3 z-[100] mb-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[24px] shadow-lg transition-all duration-300 isolate",
        isScrolled ? "py-1 shadow-2xl bg-white/10" : "py-0"
      )}
      style={{
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(24px) saturate(150%) brightness(1.1) contrast(0.9) opacity(1)",
        background: "rgba(255, 255, 255, 0.05)"
      }}
    >
      <div className="px-4 sm:px-6 h-[5.6rem] flex items-center justify-between">
        {/* Logo Section */}
<Link
  href="/"
  aria-label="Go to Home"
  className="flex items-center h-full"
>
  <img
    src="/images/image.png"
    alt="Aavishkar 26 Logo"
    className="
      h-9 
      sm:h-10 
      md:h-12 
      lg:h-14 
      w-auto 
      object-contain
    "
  />
</Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1.5 h-full">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-lg font-medium px-5 py-3 rounded-lg transition-all duration-200 text-center whitespace-nowrap",
                  active
                    ? "text-[#3B82F6] underline underline-offset-8 decoration-2 decoration-[#1D4ED8]"
                    : "text-slate-400 hover:text-white hover:underline underline-offset-8 decoration-2 decoration-white/20"
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/users" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 group">
                  <User className="w-5 h-5 text-[#3B82F6] group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/20 group"
                >
                  <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                  <span className="text-sm font-medium text-red-400 group-hover:text-red-500">Logout</span>
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 h-10 text-sm font-semibold bg-[#1D4ED8] hover:bg-[#EAB308] text-white border-0 px-6 py-5 rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-[0_0_15px_rgba(29,78,216,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:text-black">
                  Login / Signup
                </button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7 text-white" />
            ) : (
              <Menu className="h-7 w-7 text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 w-full mt-2 rounded-2xl bg-[#020617]/95 border border-white/10 backdrop-blur-3xl transition-all duration-300 origin-top overflow-hidden",
          isMobileMenuOpen ? "max-h-[600px] opacity-100 scale-100 py-4" : "max-h-0 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-2 px-4">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200",
                  active
                    ? "bg-[#1D4ED8]/10 text-[#3B82F6] border-l-4 border-[#1D4ED8]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="pt-4 border-t border-white/10 mt-2 space-y-3">
            {user ? (
              <>
                <Link 
                  href="/users" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full h-12 text-base font-semibold bg-white/5 text-white rounded-xl border border-white/10"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full h-12 text-base font-semibold bg-red-500/10 text-red-400 rounded-xl border border-red-500/20"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full h-12 text-base font-semibold bg-[#1D4ED8] text-white rounded-xl active:scale-[0.98] transition-transform">
                  Login / Signup
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar