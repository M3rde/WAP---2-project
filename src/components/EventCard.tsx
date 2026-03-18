import { Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AppEvent } from '../App';
import '../styles/eventCard.css';

interface EventCardProps {
  event: AppEvent;
  toggleSaved: (id: number) => void;
}

export default function EventCard({ event, toggleSaved }: EventCardProps) {

  function handleSavedClick (e: React.MouseEvent) {
    e.preventDefault(); // Zabrání přechodu na odkaz
    toggleSaved(event.id);
  };

  return (
    <article className="event-card">
      <Link to={`/event/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="event-image-container">
          <img src={event.imageUrl} alt={event.title} className="event-image" />
          
          <div className="event-actions">
            <button className={`action-btn ${event.isSaved ? 'active' : ''}`} onClick={handleSavedClick}>
              <Bookmark size={16} color={event.isSaved ? "var(--accent-color)" : "currentColor"} />
            </button>
            <button className="action-btn">
              <Share2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="event-info">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <span className="event-location">{event.categories}</span>
        </div>
      </Link>
    </article>
  );
}