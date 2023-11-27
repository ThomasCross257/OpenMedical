import { useState } from 'react';
import img1 from '../img/pexels-chokniti-khongchum-3938023.jpg';
import img2 from '../img/pexels-cottonbro-studio-7579831.jpg';
import img3 from '../img/pexels-photomix-company-1001897.jpg';
import img4 from '../img/pexels-pixabay-356040.jpg';

function Homepage() {
  const [] = useState(0);

  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={{ width: 'auto', height: '600px', backgroundColor: '#FFFF0' }}>
              <img src={img1} className="d-block w-100" alt="..." style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ width: 'auto', height: '600px', backgroundColor: '#FFFF0' }}>
              <img src={img2} className="d-block w-100" alt="..." style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ width: 'auto', height: '600px', backgroundColor: '#FFFF0' }}>
              <img src={img3} className="d-block w-100" alt="..." style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ width: 'auto', height: '600px', backgroundColor: '#FFFF0' }}>
              <img src={img4} className="d-block w-100" alt="..." style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={{ width: '65%', bottom: '0' }}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={{ width: '65%', bottom: '0' }}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="d-flex justify-content-center row">
        <div className="col-md-3">
          <div className='card mt-5'>
            <div className='card-header'>
              <h5>Fast and Responsive Page</h5>
            </div>
            <div className='card-body'>
              <p>State of the art technology makes it quick and easy to access your documents or doctors in case of an emergency.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className='card mt-5'>
            <div className='card-header'>
              <h5>Easy to Use</h5>
            </div>
            <div className='card-body'>
              <p>Simple, straightforward interface for managing and scheduling appointments</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className='card mt-5'>
            <div className='card-header'>
              <h5>Secure</h5>
            </div>
            <div className='card-body'>
              <p>OpenPortal is HIPAA compliant and uses industry standard encryption to protect your data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
