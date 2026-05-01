import React from "react";
import {
  ContactSection,
  HeroSection,
  Page,
  ProjectsSection,
  Seo,
} from "gatsby-theme-portfolio-minimal";
import HeroCTA from "../components/HeroCTA";
import Services from "../components/Services";
import FeaturedTestimonial from "../components/FeaturedTestimonial";
import About from "../components/About";
import CTABanner from "../components/CTABanner";

export default function IndexPage() {
  return (
    <>
      <Seo title="April Rieger | Infrastructure & Kubernetes Consulting" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        <HeroCTA />
        <Services sectionId="services" heading="How I Help" />
        <FeaturedTestimonial sectionId="featured-testimonials" />
        <About sectionId="about" heading="Background" />
        <ProjectsSection sectionId="projects" heading="Selected Work" />
        <CTABanner />
        <ContactSection sectionId="contact" heading="Get In Touch" />
      </Page>
    </>
  );
}
