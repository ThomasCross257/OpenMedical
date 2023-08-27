import { useState } from 'react';

function About() {
  const [] = useState(0);

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
            <h1>OpenMedical</h1>
                <p>OpenMedical is a free and open-source medical interface template designed to empower healthcare institutions with a user-centric and efficient digital platform.</p>

                <p>Our mission is to provide a seamless experience for both patients and medical professionals, bridging the gap between technology and healthcare. With an emphasis on open collaboration, OpenMedical welcomes contributions from developers, designers, and medical experts to shape the future of healthcare technology.</p>

                <p>Key Features:
                <ul>
                  <li>Intuitive patient appointment scheduling</li>
                  <li>Secure patient data management</li>
                  <li>Efficient communication channels between patients and healthcare providers</li>
                </ul></p>

                <p>As we move forward, our vision includes expanding the functionality of OpenMedical by integrating cutting-edge technologies such as telemedicine solutions and AI-powered diagnostics. We are committed to creating an inclusive and accessible medical interface that adapts to the evolving needs of the healthcare industry.</p>

                <p>We invite you to join us on this journey of innovation. Whether you're a healthcare professional looking to streamline patient management or a developer passionate about improving healthcare technology, your contributions are invaluable.</p>

                <p>For inquiries, collaboration opportunities, or feedback, please contact us at contact@openmedical.org.</p>
            </div>
        </div>
    </div>
  );
}

export default About;
