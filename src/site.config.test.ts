import { describe, it, expect } from "vitest";
import { siteConfig } from "./site.config";

describe("siteConfig", () => {
  describe("required fields", () => {
    it("has a name", () => {
      expect(siteConfig.name).toBeDefined();
      expect(siteConfig.name.length).toBeGreaterThan(0);
    });

    it("has a title", () => {
      expect(siteConfig.title).toBeDefined();
      expect(siteConfig.title.length).toBeGreaterThan(0);
    });

    it("has a description", () => {
      expect(siteConfig.description).toBeDefined();
      expect(siteConfig.description.length).toBeGreaterThan(0);
    });

    it("has a valid URL", () => {
      expect(siteConfig.url).toBeDefined();
      expect(() => new URL(siteConfig.url)).not.toThrow();
    });
  });

  describe("navigation", () => {
    it("has at least one nav item", () => {
      expect(siteConfig.nav.length).toBeGreaterThan(0);
    });

    it("nav items have label and href", () => {
      for (const item of siteConfig.nav) {
        expect(item.label).toBeDefined();
        expect(item.label.length).toBeGreaterThan(0);
        expect(item.href).toBeDefined();
        expect(item.href.startsWith("/")).toBe(true);
      }
    });
  });

  describe("social links", () => {
    it("has valid GitHub URL", () => {
      expect(() => new URL(siteConfig.social.github)).not.toThrow();
      expect(siteConfig.social.github).toContain("github.com");
    });

    it("has valid LinkedIn URL", () => {
      expect(() => new URL(siteConfig.social.linkedin)).not.toThrow();
      expect(siteConfig.social.linkedin).toContain("linkedin.com");
    });

    it("has valid email", () => {
      expect(siteConfig.social.emailDisplay).toContain("@");
      expect(siteConfig.social.emailMailto.startsWith("mailto:")).toBe(true);
    });
  });

  describe("credibility items", () => {
    it("has credibility entries", () => {
      expect(siteConfig.credibility.length).toBeGreaterThan(0);
    });

    it("each credibility item has label and detail", () => {
      for (const item of siteConfig.credibility) {
        expect(item.label).toBeDefined();
        expect(item.detail).toBeDefined();
      }
    });
  });

  describe("talks", () => {
    it("has talks entries", () => {
      expect(siteConfig.talks.length).toBeGreaterThan(0);
    });

    it("each talk has required fields", () => {
      for (const talk of siteConfig.talks) {
        expect(talk.year).toBeDefined();
        expect(talk.venue).toBeDefined();
        expect(talk.title).toBeDefined();
        expect(talk.topics.length).toBeGreaterThan(0);
      }
    });

    it("talks are sorted by year descending", () => {
      const years = siteConfig.talks.map((t) => t.year);
      const sorted = [...years].sort((a, b) => b - a);
      expect(years).toEqual(sorted);
    });
  });
});
