import { useState } from 'react';
import EventCard from '../components/EventCard';
import type { AppEvent } from '../App';

interface EventsProps {
  events: AppEvent[];
  toggleSaved: (id: number) => void;
}

export default function Events({ events, toggleSaved }: EventsProps) {
  const [displayCount, setDisplayCount] = useState(50);
  const displayedEvents = events.slice(0, displayCount);

  return (
    <div className="container page-container">
      <div className="akce-header">
        <h1 className="section-title">Všechny dostupné akce</h1>
      </div>

      <div className="events-grid">
        {displayedEvents.map(event => (
          <EventCard key={event.id} event={event} toggleSaved={toggleSaved} />
        ))}
      </div>

      {displayCount < events.length && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            className="primary-button" 
            onClick={() => setDisplayCount(prev => prev + 50)}
          >
            Načíst další akce
          </button>
        </div>
      )}
    </div>
  );
}