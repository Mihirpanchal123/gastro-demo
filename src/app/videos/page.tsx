import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VideoLibrary from "@/components/VideoLibrary";

export const metadata: Metadata = { title: "Videos" };

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Patient stories &"
        accent="awareness talks."
        crumbs={[{ label: "Media" }, { label: "Videos" }]}
        intro="Hear from patients in their own words, and learn about common gut and liver conditions in short, easy-to-follow talks."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <VideoLibrary />
      </section>
    </>
  );
}
