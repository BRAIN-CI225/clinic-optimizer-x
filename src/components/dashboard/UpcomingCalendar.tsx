
import React from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { addDays, format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type CalendarEvent = {
  id: number;
  date: Date;
  count: number;
};

interface UpcomingCalendarProps {
  events?: CalendarEvent[];
}

const UpcomingCalendar: React.FC<UpcomingCalendarProps> = ({ events = [] }) => {
  // Aujourd'hui
  const today = new Date();
  
  // Date sélectionnée (par défaut aujourd'hui)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(today);

  // Personnalisation du rendu des jours du calendrier
  const customDayRender = (day: Date, events: CalendarEvent[]) => {
    // Trouver les événements pour ce jour
    const dayEvents = events.filter(event => isSameDay(day, event.date));
    const hasEvents = dayEvents.length > 0;
    
    return (
      <div className="relative h-8 w-8 p-0 flex items-center justify-center">
        <span>{format(day, 'd')}</span>
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

  // Liste des événements pour le jour sélectionné
  const selectedDateEvents = events.filter(
    event => selectedDate && isSameDay(event.date, selectedDate)
  );

  // Générer des données factices pour afficher des événements sur le calendrier
  const generateMockEvents = (): CalendarEvent[] => {
    const mockEvents: CalendarEvent[] = [];
    
    // Ajouter des événements aléatoires sur les 14 prochains jours
    for (let i = 0; i < 10; i++) {
      const dayOffset = Math.floor(Math.random() * 14);
      const eventCount = Math.floor(Math.random() * 5) + 1;
      
      mockEvents.push({
        id: i + 1,
        date: addDays(today, dayOffset),
        count: eventCount
      });
    }
    
    return mockEvents;
  };

  // Si aucun événement n'est fourni, générer des données factices
  const calendarEvents = events.length ? events : generateMockEvents();

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold p-6 pb-2">Calendrier</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-7 md:divide-x">
        <div className="p-4 md:col-span-4">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={fr}
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
          <h3 className="text-sm font-medium mb-3">
            {selectedDate ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr }) : 'Sélectionner une date'}
          </h3>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2">
              {Array.from({ length: selectedDateEvents[0].count }).map((_, idx) => (
                <div key={idx} className="p-2 bg-dental-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{Math.random() > 0.5 ? 'Consultation' : 'Détartrage'}</span>
                    <span className="text-dental-700">
                      {`${8 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '00' : '30'}`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Patient: {Math.random() > 0.5 ? 'Martin Dubois' : 'Julie Lambert'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Aucun rendez-vous ce jour</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingCalendar;
