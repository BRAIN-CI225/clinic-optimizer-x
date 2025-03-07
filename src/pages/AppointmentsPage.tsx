
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Filter, Plus, Search } from 'lucide-react';
import { format, addDays, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';

type Appointment = {
  id: number;
  patientName: string;
  patientId: number;
  time: string;
  date: Date;
  duration: number;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
};

// Générer des données d'exemple pour la démonstration
const generateMockAppointments = (): Appointment[] => {
  const appointmentTypes = [
    'Consultation', 'Détartrage', 'Traitement de canal', 
    'Extraction', 'Pose de couronne', 'Blanchiment', 'Contrôle'
  ];
  
  const patientNames = [
    'Martin Dubois', 'Sophie Laurent', 'Philippe Moreau',
    'Isabelle Bernard', 'Thomas Petit', 'Emma Lefevre',
    'Lucas Girard', 'Camille Fournier', 'Hugo Morel'
  ];
  
  const appointments: Appointment[] = [];
  
  // Créer des rendez-vous pour les 14 prochains jours
  for (let i = 0; i < 30; i++) {
    const dayOffset = Math.floor(i / 3);
    const appointmentDate = addDays(new Date(), dayOffset);
    
    // Heures de rendez-vous (entre 8h et 18h)
    const hour = 8 + Math.floor(Math.random() * 10);
    const minute = Math.random() > 0.5 ? '00' : '30';
    
    // Durée (30, 45 ou 60 minutes)
    const durations = [30, 45, 60];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    
    // Type de rendez-vous
    const type = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
    
    // Patient
    const patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
    
    // Statut (plus de chance que ce soit 'upcoming' pour les rendez-vous à venir)
    let status: 'upcoming' | 'completed' | 'cancelled';
    
    if (appointmentDate < new Date()) {
      status = Math.random() > 0.1 ? 'completed' : 'cancelled';
    } else {
      status = Math.random() > 0.1 ? 'upcoming' : 'cancelled';
    }
    
    appointments.push({
      id: i + 1,
      patientName,
      patientId: Math.floor(Math.random() * 1000) + 1,
      time: `${hour}:${minute}`,
      date: appointmentDate,
      duration,
      type,
      status,
      notes: Math.random() > 0.7 ? 'Notes spécifiques pour ce rendez-vous...' : undefined
    });
  }
  
  // Trier par date et heure
  return appointments.sort((a, b) => {
    const dateComparison = a.date.getTime() - b.date.getTime();
    if (dateComparison !== 0) return dateComparison;
    
    return a.time.localeCompare(b.time);
  });
};

const mockAppointments = generateMockAppointments();

const AppointmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Filtrer les rendez-vous
  const filteredAppointments = mockAppointments.filter(appointment => {
    // Filtrer par recherche
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtrer par statut
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Regrouper par date
  const appointmentsByDate = filteredAppointments.reduce((acc, appointment) => {
    const dateKey = format(appointment.date, 'yyyy-MM-dd');
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);
  
  // Trier les dates
  const sortedDates = Object.keys(appointmentsByDate).sort();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des rendez-vous</h1>
          <p className="text-gray-500">Consultez et gérez tous vos rendez-vous</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 btn-primary">
          <Plus className="h-4 w-4" />
          <span>Nouveau rendez-vous</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 focus:outline-none focus:ring-2 focus:ring-dental-500 focus:border-transparent"
              placeholder="Rechercher un patient ou un traitement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="appearance-none py-2 pl-10 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dental-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="upcoming">À venir</option>
                <option value="completed">Terminés</option>
                <option value="cancelled">Annulés</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {sortedDates.length > 0 ? (
            sortedDates.map(dateKey => {
              const appointments = appointmentsByDate[dateKey];
              const date = new Date(dateKey);
              
              return (
                <div key={dateKey} className="space-y-3">
                  <h3 className="flex items-center gap-2 font-medium">
                    <Calendar className="h-5 w-5 text-dental-500" />
                    <span>
                      {isToday(date) ? 'Aujourd\'hui' : format(date, 'EEEE d MMMM yyyy', { locale: fr })}
                    </span>
                    <span className="text-sm text-gray-500 font-normal">
                      ({appointments.length} rendez-vous)
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 border border-gray-100 rounded-lg p-4 hover:border-dental-200 transition-all hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-dental-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.patientName}</h3>
                              <p className="text-sm text-gray-500">#{appointment.patientId}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              appointment.status === 'upcoming' ? 'bg-blue-50 text-blue-700' :
                              appointment.status === 'completed' ? 'bg-green-50 text-green-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {appointment.status === 'upcoming' ? 'À venir' :
                               appointment.status === 'completed' ? 'Terminé' : 'Annulé'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.time} ({appointment.duration} min)</span>
                            </div>
                            <span className="text-sm font-medium">{appointment.type}</span>
                          </div>
                          
                          {appointment.notes && (
                            <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="text-dental-500 text-sm font-medium hover:text-dental-700 transition-colors focus:outline-none">
                            Modifier
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-dental-500 text-sm font-medium hover:text-dental-700 transition-colors focus:outline-none">
                            Détails
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Aucun rendez-vous trouvé</p>
              <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
