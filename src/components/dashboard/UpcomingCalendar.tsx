
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { addDays, format, isSameDay, isToday, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from 'lucide-react';

type CalendarEvent = {
  id: number;
  date: Date;
  count: number;
  details?: Array<{
    id: number;
    time: string;
    type: string;
    patientName: string;
  }>;
};

interface UpcomingCalendarProps {
  events?: CalendarEvent[];
}

const UpcomingCalendar: React.FC<UpcomingCalendarProps> = ({ events = [] }) => {
  // Aujourd'hui
  const today = new Date();
  
  // Date sélectionnée (par défaut aujourd'hui)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(today);
  
  // État pour la vue du mois
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  
  // Générer des données factices pour afficher des événements sur le calendrier
  const generateMockEvents = (): CalendarEvent[] => {
    const mockEvents: CalendarEvent[] = [];
    
    // Types de rendez-vous possibles
    const appointmentTypes = [
      'Consultation', 'Détartrage', 'Traitement de canal', 
      'Extraction', 'Pose de couronne', 'Blanchiment', 'Contrôle'
    ];
    
    // Patients
    const patientNames = [
      'Martin Dubois', 'Sophie Laurent', 'Philippe Moreau',
      'Isabelle Bernard', 'Thomas Petit', 'Emma Lefevre',
      'Lucas Girard', 'Camille Fournier', 'Hugo Morel'
    ];
    
    // Créer des événements pour tous les jours du mois courant
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Ajouter des événements aléatoires pour environ 50% des jours du mois
    daysInMonth.forEach((day, index) => {
      // Pour 50% des jours, ajouter des événements
      if (Math.random() > 0.5) {
        const eventCount = Math.floor(Math.random() * 4) + 1; // 1 à 4 événements par jour
        
        // Créer les détails des événements pour ce jour
        const eventDetails = Array.from({ length: eventCount }).map((_, i) => {
          const hour = 8 + Math.floor(Math.random() * 10); // Entre 8h et 18h
          const minute = Math.random() > 0.5 ? '00' : '30';
          const type = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
          const patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
          
          return {
            id: i + 1,
            time: `${hour}:${minute}`,
            type,
            patientName
          };
        });
        
        // Trier les détails par heure
        eventDetails.sort((a, b) => a.time.localeCompare(b.time));
        
        mockEvents.push({
          id: index + 1,
          date: day,
          count: eventCount,
          details: eventDetails
        });
      }
    });
    
    return mockEvents;
  };
  
  // Générer ou mettre à jour les événements lorsque le mois change
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(events.length ? events : generateMockEvents());
  
  // Mettre à jour les événements lorsque le mois change
  useEffect(() => {
    if (events.length === 0) {
      setCalendarEvents(generateMockEvents());
    }
  }, [currentMonth, events]);

  // Personnalisation du rendu des jours du calendrier
  const customDayRender = (day: Date, events: CalendarEvent[]) => {
    // Trouver les événements pour ce jour
    const dayEvents = events.filter(event => isSameDay(day, event.date));
    const hasEvents = dayEvents.length > 0;
    
    const isCurrentMonth = isSameMonth(day, currentMonth);
    
    return (
      <div className="relative h-8 w-8 p-0 flex items-center justify-center">
        <span className={cn(
          isCurrentMonth ? "" : "text-gray-300",
          isToday(day) && "font-bold"
        )}>
          {format(day, 'd')}
        </span>
        {hasEvents && (
          <span 
            className={cn(
              "absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
              isSameDay(day, selectedDate) ? "bg-white" : "bg-dental-500"
            )}
          />
        )}
      </div>
    );
  };

  // Navigation du mois
  const handlePreviousMonth = () => {
    const prevMonth = subDays(currentMonth, 30);
    setCurrentMonth(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = addDays(currentMonth, 30);
    setCurrentMonth(nextMonth);
  };

  // Ajouter un nouvel événement
  const handleAddEvent = () => {
    if (!selectedDate) return;
    
    // Simuler l'ajout d'un événement
    toast({
      title: "Nouveau rendez-vous",
      description: `Rendez-vous ajouté pour le ${format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}`,
    });
    
    // Dans une vraie application, on ouvrirait une modale pour ajouter un événement
    // puis on l'ajouterait à la liste des événements
  };

  // Liste des événements pour le jour sélectionné
  const selectedDateEvents = calendarEvents.filter(
    event => selectedDate && isSameDay(event.date, selectedDate)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center p-6 pb-2">
        <h2 className="text-lg font-semibold">Calendrier</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlePreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Mois précédent"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Mois suivant"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 md:divide-x">
        <div className="p-4 md:col-span-4">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={fr}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md pointer-events-auto"
            classNames={{
              day_selected: "bg-dental-500 text-white hover:bg-dental-600 focus:bg-dental-600",
              day_today: "bg-dental-50 text-dental-900",
            }}
            components={{
              Day: ({ date, ...props }) => (
                <button {...props}>
                  {customDayRender(date, calendarEvents)}
                </button>
              ),
            }}
          />
        </div>
        
        <div className="p-4 md:col-span-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">
              {selectedDate ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr }) : 'Sélectionner une date'}
            </h3>
            
            <button 
              onClick={handleAddEvent}
              className="text-xs bg-dental-500 text-white px-2 py-1 rounded hover:bg-dental-600 transition-colors"
            >
              + Ajouter
            </button>
          </div>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {selectedDateEvents.map(event => 
                event.details?.map((detail, idx) => (
                  <div key={`${event.id}-${idx}`} className="p-2 bg-dental-50 rounded-lg hover:bg-dental-100 transition-colors">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{detail.type}</span>
                      <span className="text-dental-700 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {detail.time}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {detail.patientName}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Aucun rendez-vous ce jour</p>
              <p className="text-xs text-gray-400 mt-1">Cliquez sur "Ajouter" pour créer un nouveau rendez-vous</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingCalendar;
