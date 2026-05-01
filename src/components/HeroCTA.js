import React from "react";

const css = `
  .hero-cta-section {
    padding: 2rem 1.5rem 4rem;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  
  .hero-cta-button {
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .hero-cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  
  .hero-cta-subtext {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: var(--subtext-color, #999);
  }
`;

export default function HeroCTA() {
  return (
    <>
      <style>{css}</style>
      <div className="hero-cta-section">
        <a href="#contact" className="hero-cta-button">
          Let's Talk
        </a>
        <p className="hero-cta-subtext">
          Free consultation to discuss your infrastructure challenges
        </p>
      </div>
    </>
  );
}
