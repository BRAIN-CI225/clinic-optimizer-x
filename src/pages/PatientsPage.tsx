
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, User, Phone, Mail, CalendarClock, ChevronRight } from 'lucide-react';

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastAppointment?: Date;
  nextAppointment?: Date;
  status: 'active' | 'inactive';
  treatmentInProgress: boolean;
};

// Générer des données d'exemple
const generateMockPatients = (): Patient[] => {
  const firstNames = [
    'Martin', 'Sophie', 'Philippe', 'Isabelle', 'Thomas', 
    'Emma', 'Lucas', 'Camille', 'Hugo', 'Julie',
    'Nicolas', 'Aurélie', 'Pierre', 'Marie', 'Antoine'
  ];
  
  const lastNames = [
    'Dubois', 'Laurent', 'Moreau', 'Bernard', 'Petit',
    'Lefevre', 'Girard', 'Fournier', 'Morel', 'Lambert',
    'Rousseau', 'Vincent', 'Dupont', 'Bertrand', 'Simon'
  ];
  
  const patients: Patient[] = [];
  
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const hasLastAppointment = Math.random() > 0.2;
    const lastAppointmentDate = hasLastAppointment 
      ? new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000) 
      : undefined;
    
    const hasNextAppointment = Math.random() > 0.4;
    const nextAppointmentDate = hasNextAppointment
      ? new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000)
      : undefined;
    
    patients.push({
      id: 1000 + i,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `0${1 + Math.floor(Math.random() * 8)} ${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0')} ${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0')} ${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0')} ${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0')}`,
      lastAppointment: lastAppointmentDate,
      nextAppointment: nextAppointmentDate,
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      treatmentInProgress: Math.random() > 0.6
    });
  }
  
  return patients;
};

const mockPatients = generateMockPatients();

const PatientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTreatment, setFilterTreatment] = useState<string>('all');
  
  // Filtrer les patients
  const filteredPatients = mockPatients.filter(patient => {
    // Filtrer par recherche
    const matchesSearch = `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.phone.includes(searchTerm);
    
    // Filtrer par statut
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    
    // Filtrer par traitement en cours
    const matchesTreatment = filterTreatment === 'all' || 
                             (filterTreatment === 'in-progress' && patient.treatmentInProgress) ||
                             (filterTreatment === 'completed' && !patient.treatmentInProgress);
    
    return matchesSearch && matchesStatus && matchesTreatment;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-500">Gérez votre liste de patients et leurs dossiers</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 btn-primary">
          <Plus className="h-4 w-4" />
          <span>Nouveau patient</span>
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
              placeholder="Rechercher un patient par nom, email ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                className="appearance-none py-2 pl-10 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dental-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none py-2 pl-10 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dental-500 focus:border-transparent"
                value={filterTreatment}
                onChange={(e) => setFilterTreatment(e.target.value)}
              >
                <option value="all">Tous les traitements</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminés</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernier RDV
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prochain RDV
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <motion.tr 
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-dental-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-dental-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.firstName} {patient.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              #{patient.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {patient.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-1 text-gray-400" />
                          {patient.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CalendarClock className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {patient.lastAppointment 
                              ? new Intl.DateTimeFormat('fr-FR', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                }).format(patient.lastAppointment)
                              : 'Aucun'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CalendarClock className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {patient.nextAppointment 
                              ? new Intl.DateTimeFormat('fr-FR', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                }).format(patient.nextAppointment)
                              : 'Aucun'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {patient.status === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                          
                          {patient.treatmentInProgress && (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-dental-100 text-dental-800">
                              Traitement en cours
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-dental-500 hover:text-dental-700 transition-colors">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center">
                      <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">Aucun patient trouvé</p>
                      <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres ou votre recherche</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
