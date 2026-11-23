import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import PostCover from "@/components/PostCover";
import { doctor, formatDate, getPost, posts } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPost(slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/65">
          <span className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-xs font-semibold text-ink">{doctor.initials}</span>
            {doctor.name}
          </span>
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.read} min read</span>
        </div>
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <PostCover post={post} className="reveal aspect-[16/8]" />

        <p className="reveal mt-12 font-serif text-2xl leading-snug text-ink/80 italic sm:text-3xl">{post.excerpt}</p>

        <div className="mt-10 space-y-10">
          {post.body.map((block, i) => (
            <div key={i} className="reveal">
              {block.h && <h2 className="text-2xl font-semibold tracking-tight">{block.h}</h2>}
              {block.p?.map((para) => (
                <p key={para} className="mt-4 text-lg leading-relaxed text-ink/75">{para}</p>
              ))}
              {block.list && (
                <ul className="mt-5 space-y-2.5">
                  {block.list.map((li) => (
                    <li key={li} className="flex items-start gap-3 text-lg text-ink/75">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Author card + CTA */}
        <div className="reveal mt-16 flex flex-col gap-6 rounded-[2rem] bg-ink p-8 text-white sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-mint to-teal font-serif text-2xl text-ink italic">
            {doctor.initials}
          </span>
          <div className="flex-1">
            <p className="font-semibold">Written by {doctor.name}</p>
            <p className="text-sm text-white/60">{doctor.title}</p>
          </div>
          <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3 font-medium text-ink hover:bg-white">
            Book a consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-ink/45">
          This article is for general information and is not a substitute for medical advice.
        </p>
        <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-teal">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>
      </article>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Keep reading</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <PostCover post={p} className="aspect-[4/3]" />
              <h3 className="mt-4 text-lg leading-snug font-semibold transition group-hover:text-teal">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
