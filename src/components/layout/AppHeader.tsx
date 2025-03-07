
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AppHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nouveau rendez-vous à 14h00", isRead: false },
    { id: 2, message: "Dossier patient mis à jour", isRead: false },
    { id: 3, message: "Rappel: Réunion d'équipe à 16h30", isRead: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mettre à jour l'heure toutes les minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-white shadow-sm border-b h-16">
      <div className="h-full container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {format(currentTime, 'EEEE d MMMM yyyy', { locale: fr })}
            </span>
          </div>

          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {format(currentTime, 'HH:mm')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-dental-500 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <div className="p-2">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Rechercher un patient, un rendez-vous..."
                      className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dental-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-dental-500 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-dental-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        Aucune notification
                      </div>
                    ) : (
                      <ul>
                        {notifications.map((notification) => (
                          <li key={notification.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-dental-50' : ''}`}>
                            <p className="text-sm">{notification.message}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-100 text-center">
                    <button className="text-xs text-dental-500 hover:text-dental-600 transition-colors font-medium">
                      Voir toutes les notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
