import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside"
        accent="the clinic."
        crumbs={[{ label: "Media" }, { label: "Gallery" }]}
        intro="A look at our spaces, technology, team and community events. (Placeholder tiles — real clinic photos go here.)"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <GalleryGrid />
      </section>
    </>
  );
}
