import React, { useEffect, useRef, useState } from "react";

const css = `
  .about-section {
    padding: 4rem 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .about-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .about-intro {
    margin-bottom: 3rem;
  }
  
  .about-pullquote {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.6;
    padding: 1.5rem 2rem;
    border-left: 4px solid #667eea;
    background: rgba(102, 126, 234, 0.08);
    border-radius: 0 8px 8px 0;
    color: var(--text-color, #fff);
    font-style: italic;
    margin-bottom: 1.5rem;
  }
  
  .about-intro-text {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--subtext-color, #999);
    margin-bottom: 1rem;
  }
  
  /* Vertical Timeline */
  .timeline-vertical {
    position: relative;
    padding: 2rem 0;
  }
  
  .timeline-vertical::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 30%, #b06bea 60%, #43e97b 100%);
    border-radius: 3px;
  }
  
  .timeline-item-v {
    position: relative;
    margin-bottom: 3rem;
    display: flex;
    align-items: flex-start;
  }
  
  .timeline-item-v:last-child {
    margin-bottom: 0;
  }
  
  /* Alternating layout */
  .timeline-item-v:nth-child(odd) {
    flex-direction: row;
    padding-right: calc(50% + 2rem);
  }
  
  .timeline-item-v:nth-child(even) {
    flex-direction: row-reverse;
    padding-left: calc(50% + 2rem);
  }
  
  .timeline-item-v:nth-child(odd) .timeline-content-v {
    text-align: right;
  }
  
  .timeline-item-v:nth-child(even) .timeline-content-v {
    text-align: left;
  }
  
  /* Timeline dot */
  .timeline-dot-v {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #667eea;
    border: 4px solid #1a1a1a;
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .timeline-item-v:nth-child(1) .timeline-dot-v { background: #667eea; }
  .timeline-item-v:nth-child(2) .timeline-dot-v { background: #7c6bea; }
  .timeline-item-v:nth-child(3) .timeline-dot-v { background: #9b6bea; }
  .timeline-item-v:nth-child(4) .timeline-dot-v { background: #b06bea; }
  .timeline-item-v:nth-child(5) .timeline-dot-v { background: #f093fb; }
  .timeline-item-v:nth-child(6) .timeline-dot-v { background: #c76bea; }
  .timeline-item-v:nth-child(7) .timeline-dot-v { background: #43e97b; }
  
  .timeline-item-v.visible .timeline-dot-v {
    transform: translateX(-50%) scale(1.2);
    box-shadow: 0 0 20px currentColor;
  }
  
  /* Content card */
  .timeline-content-v {
    flex: 1;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .timeline-item-v:nth-child(odd) .timeline-content-v {
    transform: translateX(-30px);
  }
  
  .timeline-item-v:nth-child(even) .timeline-content-v {
    transform: translateX(30px);
  }
  
  .timeline-item-v.visible .timeline-content-v {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
  
  .timeline-year {
    font-size: 0.85rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.25rem;
    letter-spacing: 0.05em;
  }
  
  .timeline-item-v:nth-child(1) .timeline-year { color: #667eea; }
  .timeline-item-v:nth-child(2) .timeline-year { color: #7c6bea; }
  .timeline-item-v:nth-child(3) .timeline-year { color: #9b6bea; }
  .timeline-item-v:nth-child(4) .timeline-year { color: #b06bea; }
  .timeline-item-v:nth-child(5) .timeline-year { color: #f093fb; }
  .timeline-item-v:nth-child(6) .timeline-year { color: #c76bea; }
  .timeline-item-v:nth-child(7) .timeline-year { color: #43e97b; }
  
  .timeline-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-color, #fff);
    margin-bottom: 0.5rem;
  }
  
  .timeline-desc {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--subtext-color, #999);
  }
  
  .timeline-desc strong {
    color: var(--text-color, #fff);
  }
  
  .timeline-badge {
    display: inline-block;
    margin-top: 0.75rem;
    padding: 0.35rem 0.75rem;
    background: rgba(240, 147, 251, 0.15);
    border: 1px solid #f093fb;
    border-radius: 20px;
    font-size: 0.75rem;
    color: #f093fb;
    font-weight: 500;
  }
  
  /* Skills section */
  .about-skills-section {
    margin-top: 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .about-skills-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }
  
  .about-skill {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.875rem;
    color: var(--subtext-color, #999);
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }
  
  .about-skill:hover {
    border-color: #667eea;
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .timeline-vertical::before {
      left: 20px;
    }
    
    .timeline-item-v,
    .timeline-item-v:nth-child(odd),
    .timeline-item-v:nth-child(even) {
      flex-direction: row;
      padding-left: 50px;
      padding-right: 0;
    }
    
    .timeline-item-v:nth-child(odd) .timeline-content-v,
    .timeline-item-v:nth-child(even) .timeline-content-v {
      text-align: left;
      transform: translateX(20px);
    }
    
    .timeline-dot-v {
      left: 20px;
    }
    
    .timeline-item-v.visible .timeline-dot-v {
      transform: translateX(-50%) scale(1.2);
    }
  }
`;

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`timeline-item-v ${isVisible ? "visible" : ""}`}>
      <div className="timeline-dot-v" />
      <div className="timeline-content-v">
        <div className="timeline-year">{item.years}</div>
        <h3 className="timeline-title">{item.title}</h3>
        <p className="timeline-desc" dangerouslySetInnerHTML={{ __html: item.description }} />
        {item.badge && <span className="timeline-badge">{item.badge}</span>}
      </div>
    </div>
  );
}

function ScrollBlock({ children, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
}

export default function About({ sectionId, heading }) {
  const timeline = [
    {
      title: "U.S. Navy",
      years: "2003–2012",
      description: "Nine years of service developing <strong>discipline, leadership</strong>, and the ability to perform under pressure. Learned to work within complex systems and adapt to rapidly changing requirements."
    },
    {
      title: "Design School",
      years: "Graduated 2018",
      description: "Studied <strong>graphic design and web design</strong>, building a foundation in visual communication, user experience, and the creative process that still informs how I approach technical problems."
    },
    {
      title: "Digital Director",
      years: "2017–2020",
      description: "Led the digital department at <strong>Girls in Tech</strong>, managing project lifecycles, chapter coordination, and championing technology innovation. Built a foundation in cross-functional leadership."
    },
    {
      title: "Mid-Level Software Engineer",
      years: "2020–2022",
      description: "Joined <strong>Notch8</strong> building full-stack applications with <strong>Ruby on Rails</strong>. Led design and development projects, contributed to client codebases, and mentored junior engineers through regular 1:1s."
    },
    {
      title: "Interaction Design Faculty",
      years: "2020–2021",
      description: "Taught <strong>Interaction Design at NewSchool of Architecture & Design</strong>. Designed curriculum bridging design principles and software development, creating hands-on assignments simulating real-world engineering scenarios."
    },
    {
      title: "Senior Software Engineer",
      years: "2022–2025",
      description: "At <strong>Scientist.com</strong>, led migration from GitLab to GitHub across 20+ projects. Orchestrated decommissioning of legacy clusters, migrating 10 client deployments to optimized infrastructure—delivering <strong>$75K in savings</strong>."
    },
    {
      title: "Senior Software Engineer, Platform & Infrastructure Team Lead",
      years: "2025–Present",
      description: "Back at <strong>Notch8</strong>, architecting cloud-native applications and infrastructure with <strong>Kubernetes, Terraform, and AWS</strong>. Mentoring engineers on IaC principles while ensuring scalable, maintainable systems."
    }
  ];

  const skills = [
    "Kubernetes", "Helm", "Terraform", "AWS", "GitHub Actions",
    "Ruby on Rails", "Docker", "CI/CD", "Cost Optimization"
  ];

  return (
    <>
      <style>{css}</style>
      <section id={sectionId} className="about-section">
        <h2 className="about-heading">{heading}</h2>
        
        <div className="about-intro">
          <blockquote className="about-pullquote">
            "After 12+ years across design, full-stack development, and platform engineering, I've learned that the best infrastructure solutions don't require starting over—they integrate into how your team already works."
          </blockquote>
          <p className="about-intro-text">
            I bring a unique combination: the discipline of military service, the user empathy of a designer, and the technical depth of a platform engineer. When I join your team, I learn your patterns first—then build solutions that feel native to your workflow.
          </p>
        </div>

        <div className="timeline-vertical">
          {timeline.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>

        <ScrollBlock className="about-skills-section">
          <div className="about-skills">
            {skills.map((skill) => (
              <span key={skill} className="about-skill">{skill}</span>
            ))}
          </div>
        </ScrollBlock>
      </section>
    </>
  );
}
