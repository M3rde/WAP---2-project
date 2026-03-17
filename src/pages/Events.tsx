import EventCard from '../components/EventCard';
import { mockEvents } from '../data/mockEvents';
import '../styles/events.css';

export default function Events() {
  return (
    <div className="container page-container">
      <div className="events-header">
        <h1 className="section-title">Všechny dostupné akce</h1>
      </div>

      <div className="events-grid">
        {mockEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}