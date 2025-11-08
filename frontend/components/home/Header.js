import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogoIcon, MenuIcon, XIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const NavLink = ({ href, children }) => (
    <Link href={href} legacyBehavior>
      <a
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-gray-600 hover:text-indigo-600 font-medium transition-colors p-2"
      >
        {children}
      </a>
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" legacyBehavior>
            <a className="flex items-center gap-2">
              <LogoIcon className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">Skill Sphere</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/#testimonials">Testimonials</NavLink>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="secondary" onClick={() => router.push('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={logout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" passHref legacyBehavior>
                  <Button as="a" variant="ghost">Log In</Button>
                </Link>
                <Link href="/auth/signup" passHref legacyBehavior>
                  <Button as="a" variant="primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-50">
          <nav className="flex flex-col space-y-2">
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/#testimonials">Testimonials</NavLink>
            <hr className="my-2" />
            {user ? (
              <>
                <Button variant="secondary" onClick={() => { router.push('/dashboard'); setIsMobileMenuOpen(false); }}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={logout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" passHref legacyBehavior>
                  <Button as="a" variant="ghost" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Log In</Button>
                </Link>
                <Link href="/auth/signup" passHref legacyBehavior>
                  <Button as="a" variant="primary" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;