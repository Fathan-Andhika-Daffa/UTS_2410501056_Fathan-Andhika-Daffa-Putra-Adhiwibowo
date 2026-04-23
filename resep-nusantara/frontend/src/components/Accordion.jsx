import { useState, useRef } from 'react';
import './Accordion.css';

export function Accordion({ ingredients, steps }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className='accordion'>
      <button className='accordion-trigger' onClick={() => setOpen(!open)}>
        <span>Lihat Langkah Memasak ({steps.length} langkah)</span>
        <span className={`arrow ${open ? 'open' : ''}`}>▼</span>
      </button>

      <div className={`accordion-body ${open ? 'open' : ''}`}
           style={{ maxHeight: open ? bodyRef.current?.scrollHeight+'px' : '0' }}
           ref={bodyRef}>
        <div className='ingredients-wrap'>
          {ingredients.map((ing, i) => <span key={i} className='pill'>{ing}</span>)}
        </div>
        <ol className='steps-list'>
          {steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>
    </div>
  );
}
