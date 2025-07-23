// 📁 src/components/Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install: `npm i lucide-react`

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Heritages", path: "/heritages" },
  { name: "Journal", path: "/our-journal" },
  { name: "Contact", path: "/contact-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png" // 👈 Replace with your logo path
            alt="Heritage Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-white text-xl font-light tracking-widest">
            HERITAGE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `text-sm uppercase tracking-wide transition-all ${
                  isActive
                    ? "text-gold border-b border-gold pb-1"
                    : "text-white hover:text-gold"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobile}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 bg-black/90 backdrop-blur-md">
          <nav className="flex flex-col gap-4">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-sm uppercase tracking-wide transition-all ${
                    isActive
                      ? "text-gold border-b border-gold pb-1"
                      : "text-white hover:text-gold"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
