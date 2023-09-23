import { useState } from 'react';

function Homepage() {
  const [] = useState(0);

  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={{ width: 'auto', height: '500px', backgroundColor: 'gray' }}></div>
          </div>
          <div className="carousel-item">
            <div style={{ width: 'auto', height: '500px', backgroundColor: 'blue' }}></div>
          </div>
          <div className="carousel-item">
            <div style={{ width: 'auto', height: '500px', backgroundColor: 'green' }}></div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
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
