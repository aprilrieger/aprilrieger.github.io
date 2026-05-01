import React from "react";

const css = `
  .services-section {
    padding: 4rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .services-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
  }
  
  .services-subheading {
    font-size: 1.1rem;
    color: var(--subtext-color, #999);
    text-align: center;
    max-width: 600px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .service-card {
    padding: 2rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: border-color 0.3s ease, transform 0.2s ease, background 0.3s ease;
  }
  
  .service-card:hover {
    border-color: rgba(102, 126, 234, 0.4);
    background: rgba(102, 126, 234, 0.05);
    transform: translateY(-4px);
  }
  
  .service-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .service-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-color, #fff);
    margin-bottom: 0.75rem;
  }
  
  .service-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--subtext-color, #999);
  }
  
  .service-card:nth-child(1) .service-icon { color: #43e97b; }
  .service-card:nth-child(2) .service-icon { color: #667eea; }
  .service-card:nth-child(3) .service-icon { color: #f093fb; }
  .service-card:nth-child(4) .service-icon { color: #4facfe; }
`;

const services = [
  {
    icon: "💰",
    title: "Cloud Cost Reduction",
    description: "Cut unnecessary spend and gain visibility into where your money goes. I've delivered $75K+ in documented savings through strategic optimization and cost attribution."
  },
  {
    icon: "☸️",
    title: "Kubernetes Stability",
    description: "Stop firefighting deployments and build reliable, scalable infrastructure. From cluster architecture to production-ready Helm charts, I help teams ship with confidence."
  },
  {
    icon: "🚀",
    title: "CI/CD & Infrastructure Reliability",
    description: "Ship faster with pipelines that don't break at 2am. I design GitHub Actions workflows, Terraform modules, and automation that teams actually want to use."
  },
  {
    icon: "🤝",
    title: "Seamless Integration",
    description: "Get expert help without disrupting your existing systems. I learn your patterns first—then build solutions that feel native to your workflow, not foreign imports."
  }
];

export default function Services({ sectionId, heading }) {
  return (
    <>
      <style>{css}</style>
      <section id={sectionId} className="services-section">
        <h2 className="services-heading">{heading || "How I Help"}</h2>
        <p className="services-subheading">
          I work with engineering teams to solve infrastructure problems that slow them down—without forcing rewrites or introducing unnecessary complexity.
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
