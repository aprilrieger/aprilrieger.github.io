import React from "react";

const css = `
  .featured-testimonial-section {
    padding: 4rem 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .featured-testimonial-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .featured-testimonial-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .featured-testimonial-card {
    padding: 2rem;
    border-radius: 8px;
    background: var(--card-background-color);
    border: 1px solid var(--box-shadow-color);
    border-left: 4px solid #43e97b;
    position: relative;
  }
  
  .featured-testimonial-card:nth-child(2) {
    border-left-color: #667eea;
  }
  
  .featured-testimonial-quote {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--text-color);
    margin: 0 0 1.5rem 0;
    font-style: italic;
  }
  
  .featured-testimonial-author {
    font-weight: 700;
    font-size: 0.95rem;
  }
  
  .featured-testimonial-card:nth-child(1) .featured-testimonial-author {
    color: #43e97b;
  }
  
  .featured-testimonial-card:nth-child(2) .featured-testimonial-author {
    color: #667eea;
  }
  
  .featured-testimonial-role {
    font-size: 0.85rem;
    color: var(--subtext-color);
    margin-top: 0.25rem;
  }
`;

const featuredTestimonials = [
  {
    quote: "Huge wins clearing out EFS storage, potentially saving many thousands of dollars annually. April's focus on AWS cost controls delivered wins across the board.",
    author: "Nicholas Steinwachs",
    role: "CEO, Notch8"
  },
  {
    quote: "I've been really impressed with how April's been able to keep the ship running while onboarding a person who's new to Kubernetes and Rancher. It's a lot for any one person.",
    author: "Max Kadel",
    role: "Platform Engineer, Notch8"
  }
];

export default function FeaturedTestimonial({ sectionId }) {
  return (
    <>
      <style>{css}</style>
      <section id={sectionId} className="featured-testimonial-section">
        <div className="featured-testimonial-grid">
          {featuredTestimonials.map((testimonial, index) => (
            <div key={index} className="featured-testimonial-card">
              <p className="featured-testimonial-quote">"{testimonial.quote}"</p>
              <div className="featured-testimonial-author">{testimonial.author}</div>
              <div className="featured-testimonial-role">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
