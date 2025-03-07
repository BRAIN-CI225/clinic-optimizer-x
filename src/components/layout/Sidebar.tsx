
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Home, 
  ClipboardList, 
  Settings, 
  CreditCard,
  Menu, 
  X, 
  ChevronRight,
  UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: 'Accueil', path: '/' },
  { icon: Calendar, label: 'Rendez-vous', path: '/rendez-vous' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: UserCog, label: 'Docteurs', path: '/docteurs' },
  { icon: ClipboardList, label: 'Dossiers médicaux', path: '/dossiers' },
  { icon: CreditCard, label: 'Facturation', path: '/facturation' },
  { icon: Settings, label: 'Paramètres', path: '/parametres' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bouton pour les appareils mobiles */}
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden z-50 bottom-6 right-6 p-2 rounded-full bg-dental-500 text-white shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay pour fermer la sidebar sur mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-sidebar text-sidebar-foreground flex flex-col",
          isOpen ? "w-64" : "w-20",
          "lg:relative lg:shadow-none lg:translate-x-0 lg:h-screen",
          !isOpen && isHovered && "lg:w-64"
        )}
        animate={{ 
          width: isOpen ? "16rem" : (isHovered ? "16rem" : "5rem"),
          x: isOpen || window.innerWidth >= 1024 ? 0 : "-100%"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <AnimatePresence mode="wait">
            {(isOpen || isHovered) ? (
              <motion.div
                key="logo-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <span className="text-white font-bold text-lg">Brain Dental X</span>
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-white font-bold text-lg">BDX</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={toggleSidebar} className="hidden lg:flex items-center justify-center text-sidebar-foreground/70 hover:text-white transition-colors duration-200">
            <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center py-3 px-4 rounded-lg transition-all duration-200 group",
                      isActive 
                        ? "bg-sidebar-accent text-white font-medium" 
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    
                    <AnimatePresence mode="wait">
                      {(isOpen || isHovered) && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-0 w-1 h-8 bg-dental-300 rounded-l-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg",
            isOpen || isHovered ? "justify-start" : "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-dental-100 flex items-center justify-center text-dental-600 font-semibold flex-shrink-0">
              D
            </div>
            
            <AnimatePresence mode="wait">
              {(isOpen || isHovered) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3"
                >
                  <p className="text-sm font-medium text-white">Dr. Sophie Martin</p>
                  <p className="text-xs text-sidebar-foreground/70">Dentiste</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
