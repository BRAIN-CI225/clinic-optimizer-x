
import React from 'react';
import { Users, Calendar, DollarSign, ClipboardCheck } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentsList from '@/components/dashboard/AppointmentsList';
import TodoList from '@/components/dashboard/TodoList';
import UpcomingCalendar from '@/components/dashboard/UpcomingCalendar';

// Données fictives pour les rendez-vous
const mockAppointments = [
  {
    id: 1,
    patientName: 'Martin Dubois',
    time: '09:00',
    date: new Date(),
    duration: 30,
    type: 'Consultation',
    status: 'upcoming' as const,
  },
  {
    id: 2,
    patientName: 'Sophie Laurent',
    time: '10:30',
    date: new Date(),
    duration: 45,
    type: 'Détartrage',
    status: 'upcoming' as const,
  },
  {
    id: 3,
    patientName: 'Philippe Moreau',
    time: '14:15',
    date: new Date(),
    duration: 60,
    type: 'Traitement de canal',
    status: 'upcoming' as const,
  }
];

// Données fictives pour les tâches
const mockTodos = [
  { id: 1, text: 'Appeler le laboratoire pour la prothèse de M. Dupont', completed: false },
  { id: 2, text: 'Vérifier les stocks de matériel', completed: true },
  { id: 3, text: 'Préparer le dossier pour la consultation de 14h', completed: false },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue sur Brain Dental X, votre assistant de gestion dentaire</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Patients" 
          value="1,234" 
          icon={<Users className="h-6 w-6" />} 
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Rendez-vous" 
          value="42" 
          icon={<Calendar className="h-6 w-6" />} 
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="Revenus" 
          value="5,280 €" 
          icon={<DollarSign className="h-6 w-6" />} 
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard 
          title="Traitements" 
          value="86" 
          icon={<ClipboardCheck className="h-6 w-6" />} 
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingCalendar />
        </div>
        <div>
          <TodoList initialTodos={mockTodos} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppointmentsList appointments={mockAppointments} />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Accès rapide</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-dental-50 rounded-lg text-dental-700 hover:bg-dental-100 transition-colors text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Nouveau rendez-vous</span>
            </button>
            <button className="p-4 bg-dental-50 rounded-lg text-dental-700 hover:bg-dental-100 transition-colors text-center">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Nouveau patient</span>
            </button>
            <button className="p-4 bg-dental-50 rounded-lg text-dental-700 hover:bg-dental-100 transition-colors text-center">
              <ClipboardCheck className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Créer dossier</span>
            </button>
            <button className="p-4 bg-dental-50 rounded-lg text-dental-700 hover:bg-dental-100 transition-colors text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Nouvelle facture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
