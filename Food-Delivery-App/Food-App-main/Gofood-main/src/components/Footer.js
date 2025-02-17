import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div>
      <footer className="py-5" style={{ backgroundColor: "#2E3333", color: "#FFFFFF" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h5 style={{ color: "#FC8019", marginBottom: "16px" }}>Gwissy</h5>
              <p>Delivering happiness to your doorstep</p>
            </div>
            <div className="col-md-3 mb-4">
              <h6 style={{ color: "#FFFFFF", marginBottom: "12px" }}>Company</h6>
              <ul className="list-unstyled">
                <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="/careers" className="text-white text-decoration-none">Careers</a></li>
                <li><a href="/blog" className="text-white text-decoration-none">Blog</a></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h6 style={{ color: "#FFFFFF", marginBottom: "12px" }}>Help</h6>
              <ul className="list-unstyled">
                <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
                <li><a href="/policy" className="text-white text-decoration-none">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h6 style={{ color: "#FFFFFF", marginBottom: "12px" }}>Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="https://facebook.com" className="text-white">
                  {/* <FontAwesomeIcon icon={faFacebookF} /> */}
                </a>
                <a href="https://twitter.com" className="text-white">
                  {/* <FontAwesomeIcon icon={faTwitter} /> */}
                </a>
                <a href="https://instagram.com" className="text-white">
                  {/* <FontAwesomeIcon icon={faInstagram} /> */}
                </a>
              </div>
            </div>
          </div>
          <div className="text-center pt-4 border-top" style={{ borderColor: "#4A4F4F" }}>
            <span>© 2023 Gwissy, Inc. All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
