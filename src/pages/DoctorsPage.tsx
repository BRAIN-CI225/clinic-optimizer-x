
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Teeth,
  Heart,
  Medal
} from 'lucide-react';

// Types
type Doctor = {
  id: number;
  name: string;
  speciality: string;
  experience: number;
  availability: {
    days: string[];
    hours: string;
  };
  skills: string[];
  patients: number;
  avatar?: string;
  status: 'active' | 'on-leave' | 'busy';
};

// Données fictives pour les médecins
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sophie Martin',
    speciality: 'Dentiste généraliste',
    experience: 12,
    availability: {
      days: ['Lundi', 'Mercredi', 'Vendredi'],
      hours: '9h00 - 17h00'
    },
    skills: ['Soins préventifs', 'Restaurations dentaires', 'Soins des gencives'],
    patients: 120,
    status: 'active'
  },
  {
    id: 2,
    name: 'Dr. Thomas Dubois',
    speciality: 'Orthodontiste',
    experience: 15,
    availability: {
      days: ['Mardi', 'Jeudi', 'Samedi'],
      hours: '8h30 - 16h30'
    },
    skills: ['Alignement dentaire', 'Correction de morsure', 'Bagues transparentes'],
    patients: 95,
    status: 'busy'
  },
  {
    id: 3,
    name: 'Dr. Emma Laurent',
    speciality: 'Chirurgien-dentiste',
    experience: 18,
    availability: {
      days: ['Lundi', 'Mardi', 'Jeudi'],
      hours: '10h00 - 18h00'
    },
    skills: ['Implants dentaires', 'Extractions complexes', 'Chirurgie buccale'],
    patients: 85,
    status: 'active'
  },
  {
    id: 4,
    name: 'Dr. Antoine Moreau',
    speciality: 'Endodontiste',
    experience: 10,
    availability: {
      days: ['Mercredi', 'Vendredi', 'Samedi'],
      hours: '9h00 - 17h00'
    },
    skills: ['Traitement de canal', 'Soins dentaires complexes', 'Gestion de la douleur'],
    patients: 70,
    status: 'on-leave'
  },
  {
    id: 5,
    name: 'Dr. Julie Bernard',
    speciality: 'Parodontiste',
    experience: 14,
    availability: {
      days: ['Lundi', 'Mardi', 'Jeudi', 'Vendredi'],
      hours: '8h00 - 16h00'
    },
    skills: ['Traitement des gencives', 'Interventions parodontales', 'Greffes de gencive'],
    patients: 110,
    status: 'active'
  },
  {
    id: 6,
    name: 'Dr. Maxime Petit',
    speciality: 'Prothésiste dentaire',
    experience: 16,
    availability: {
      days: ['Mardi', 'Mercredi', 'Jeudi'],
      hours: '9h30 - 17h30'
    },
    skills: ['Prothèses dentaires', 'Bridges', 'Couronnes'],
    patients: 90,
    status: 'active'
  }
];

const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpeciality, setFilterSpeciality] = useState<string>('all');
  
  // Filtrer les médecins
  const filteredDoctors = mockDoctors.filter(doctor => {
    // Filtrer par recherche
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtrer par spécialité
    const matchesSpeciality = filterSpeciality === 'all' || 
                             doctor.speciality.toLowerCase().includes(filterSpeciality.toLowerCase());
    
    return matchesSearch && matchesSpeciality;
  });

  // Récupérer toutes les spécialités uniques pour le filtre
  const specialities = Array.from(new Set(mockDoctors.map(doctor => doctor.speciality)));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Docteurs</h1>
          <p className="text-gray-500">Consultez et gérez l'équipe médicale</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 btn-primary">
          <Plus className="h-4 w-4" />
          <span>Ajouter un docteur</span>
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
              placeholder="Rechercher un docteur ou une spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="appearance-none py-2 pl-10 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dental-500 focus:border-transparent"
                value={filterSpeciality}
                onChange={(e) => setFilterSpeciality(e.target.value)}
              >
                <option value="all">Toutes les spécialités</option>
                {specialities.map((speciality, index) => (
                  <option key={index} value={speciality}>{speciality}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-dental-200 transition-all hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Badge de statut */}
                <div className={`absolute top-0 right-0 h-16 w-16 overflow-hidden ${
                  doctor.status === 'active' ? 'bg-green-500' : 
                  doctor.status === 'busy' ? 'bg-amber-500' : 'bg-red-500'
                }`}>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-inherit w-8 h-24"></div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-dental-100 flex items-center justify-center">
                    {doctor.avatar ? (
                      <img src={doctor.avatar} alt={doctor.name} className="rounded-full" />
                    ) : (
                      <User className="h-8 w-8 text-dental-600" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">{doctor.name}</h3>
                    <div className="flex items-center text-dental-600 text-sm">
                      <Teeth className="h-3.5 w-3.5 mr-1" />
                      <span>{doctor.speciality}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Medal className="h-3.5 w-3.5 mr-1" />
                      <span>{doctor.experience} ans d'expérience</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{doctor.availability.days.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{doctor.availability.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {doctor.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-dental-50 text-dental-600 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Heart className="h-4 w-4 mr-1 text-dental-500" />
                    <span>{doctor.patients} patients actifs</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end space-x-2">
                  <button className="text-dental-500 text-sm font-medium hover:text-dental-700 transition-colors focus:outline-none">
                    Agenda
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-dental-500 text-sm font-medium hover:text-dental-700 transition-colors focus:outline-none">
                    Profil
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Aucun docteur trouvé</p>
            <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
