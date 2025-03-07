
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Appointment = {
  id: number;
  patientName: string;
  time: string;
  date: Date;
  duration: number;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

interface AppointmentsListProps {
  appointments: Appointment[];
  title?: string;
}

const statusClasses = {
  upcoming: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

const statusLabels = {
  upcoming: 'À venir',
  completed: 'Terminé',
  cancelled: 'Annulé',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const AppointmentsList: React.FC<AppointmentsListProps> = ({ 
  appointments, 
  title = "Rendez-vous à venir" 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      
      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Aucun rendez-vous à afficher</p>
        </div>
      ) : (
        <motion.ul 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {appointments.map((appointment) => (
            <motion.li
              key={appointment.id}
              variants={item}
              className="border border-gray-100 rounded-lg p-4 hover:border-dental-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusClasses[appointment.status]}`}>
                  {statusLabels[appointment.status]}
                </span>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(appointment.date, 'EEEE d MMMM', { locale: fr })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{appointment.time} ({appointment.duration} min)</span>
                </div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <button className="text-dental-500 text-sm font-medium hover:text-dental-700 transition-colors focus:outline-none">
                  Détails
                </button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
      
      <div className="mt-4 text-center">
        <button className="text-dental-500 text-sm font-medium hover:text-dental-700 transition-colors focus:outline-none">
          Voir tous les rendez-vous
        </button>
      </div>
    </div>
  );
};

export default AppointmentsList;
