import React from "react";

const css = `
  .cta-banner-section {
    padding: 4rem 1.5rem;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  
  .cta-banner-content {
    padding: 3rem 2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border: 1px solid rgba(102, 126, 234, 0.2);
  }
  
  .cta-banner-heading {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color, #fff);
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  
  .cta-banner-subtext {
    font-size: 1rem;
    color: var(--subtext-color, #999);
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-banner-button {
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
  
  .cta-banner-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

export default function CTABanner({ 
  heading = "Ready to reduce cloud costs or stabilize your infrastructure?",
  subtext = "Let's discuss your challenges and explore how I can help.",
  buttonText = "Let's Talk",
  link = "#contact"
}) {
  return (
    <>
      <style>{css}</style>
      <section className="cta-banner-section">
        <div className="cta-banner-content">
          <h2 className="cta-banner-heading">{heading}</h2>
          <p className="cta-banner-subtext">{subtext}</p>
          <a href={link} className="cta-banner-button">
            {buttonText}
          </a>
        </div>
      </section>
    </>
  );
}
