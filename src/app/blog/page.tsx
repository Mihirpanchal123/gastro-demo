import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/BlogIndex";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Gut health,"
        accent="made simple."
        crumbs={[{ label: "Blog" }]}
        intro="Practical, doctor-reviewed articles on digestion, liver health, procedures and prevention."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <BlogIndex />
      </section>
    </>
  );
}
