import { useParams, useNavigate } from 'react-router-dom';
import type { AppEvent } from '../App';
import { Calendar, ArrowLeft, Tag, Ticket, Globe, Mail } from 'lucide-react';
import '../styles/detail.css';

interface EventDetailProps {
  events: AppEvent[];
}

export default function EventDetail({ events }: EventDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Akce nenalezena nebo se data ještě načítají...</h2>
        <button onClick={() => navigate('/events')} className="primary-button">Zpět na přehled</button>
      </div>
    );
  }

  return (
    <div className="container detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <ArrowLeft size={16} /> Zpět
      </button>

      <div className="detail-header">
        <img src={event.imageUrl} alt={event.title} className="detail-hero-image" />
        <div className="detail-main-info">
          <h1>{event.title}</h1>
          
          <div className="detail-meta">
            <span><Calendar size={18} /> {event.dateFrom} {event.dateTo && event.dateTo !== event.dateFrom ? ` - ${event.dateTo}` : ''}</span>
            <span><Tag size={18} /> {event.categories || 'Kategorie neuvedena'}</span>
            
            {event.tickets && (
              <span><Ticket size={18} /> Vstupné: {event.tickets.replace(/ - $/, '')}</span>
            )}
            
            {event.organizerEmail && (
              <span><Mail size={18} /> <a href={`mailto:${event.organizerEmail}`}>{event.organizerEmail}</a></span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button className="primary-button" onClick={() => alert('Uloženo do lokálního kalendáře!')}>
              Uložit akci
            </button>
            
            {event.sourceUrl && (
              <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="primary-button">
                <Globe size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Více informací
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="detail-content" style={{ display: 'block' }}>
        <section>
          <h2>O akci</h2>
          {event.fullDescription ? (
             <div 
               className="event-description-html" 
               dangerouslySetInnerHTML={{ __html: event.fullDescription }} 
               style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}
             />
          ) : (
            <p>{event.description}</p>
          )}
        </section>
      </div>
    </div>
  );
}