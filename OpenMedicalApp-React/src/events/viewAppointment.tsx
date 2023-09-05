// CustomEvent.tsx
import React, { useState } from 'react';
import Modal from '../components/appointmentModal';
const AppointmentEvent: React.FC<any> = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    return (
      <div className="custom-event">
        <a href="#" className="link-light" onClick={toggleModal}>
          {event.title}
        </a>
        {showModal && (
          <Modal
            isOpen={showModal}
            onRequestClose={toggleModal}
            event={event}
          />
        )}
      </div>
    );
  };

  export default AppointmentEvent;
  