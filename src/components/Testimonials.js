import React from "react";
import testimonialsData from "../../content/sections/testimonials/testimonials.json";

const css = `
  .testimonials-section {
    padding: 4rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .testimonials-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .testimonial-card {
    padding: 2rem;
    border-radius: 8px;
    background: #1a1a1a;
    border: 6px solid #667eea;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 220px;
    transition: border-color 0.3s ease, transform 0.2s ease;
  }
  
  .testimonial-card:hover {
    transform: translateY(-4px);
  }
  
  .testimonial-card:nth-child(2) {
    border-color: #f093fb;
  }
  
  .testimonial-card:nth-child(3) {
    border-color: #4facfe;
  }
  
  .testimonial-card:nth-child(4) {
    border-color: #43e97b;
  }
  
  .testimonial-quote-mark {
    font-size: 4rem;
    line-height: 1;
    font-family: Georgia, serif;
    position: absolute;
    top: 0.5rem;
    left: 1.5rem;
  }
  
  .testimonial-card:nth-child(1) .testimonial-quote-mark { color: #667eea; }
  .testimonial-card:nth-child(2) .testimonial-quote-mark { color: #f093fb; }
  .testimonial-card:nth-child(3) .testimonial-quote-mark { color: #4facfe; }
  .testimonial-card:nth-child(4) .testimonial-quote-mark { color: #43e97b; }
  
  .testimonial-quote {
    font-size: 1rem;
    line-height: 1.7;
    color: #e0e0e0;
    margin: 0 0 auto 0;
    padding-top: 1.5rem;
    font-weight: 400;
  }
  
  .testimonial-attribution {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #333;
  }
  
  .testimonial-author {
    font-weight: 700;
    color: #ffffff;
    font-size: 1rem;
  }
  
  .testimonial-card:nth-child(1) .testimonial-author { color: #667eea; }
  .testimonial-card:nth-child(2) .testimonial-author { color: #f093fb; }
  .testimonial-card:nth-child(3) .testimonial-author { color: #4facfe; }
  .testimonial-card:nth-child(4) .testimonial-author { color: #43e97b; }
  
  .testimonial-role {
    font-size: 0.875rem;
    color: #999;
    margin-top: 0.25rem;
  }
`;

export default function Testimonials({ sectionId, heading }) {
  const testimonials = testimonialsData?.testimonials || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <>
      <style>{css}</style>
      <section id={sectionId} className="testimonials-section">
        <h2 className="testimonials-heading">{heading}</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-attribution">
                <span className="testimonial-author">{testimonial.author}</span>
                <span className="testimonial-role">
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
