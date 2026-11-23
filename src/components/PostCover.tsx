import type { Post } from "@/lib/site";

/** Generated cover art for blog posts (stands in for real photography). */
export default function PostCover({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${post.hue} transition duration-700 group-hover:scale-105`} />
      <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full border border-white/25" aria-hidden />
      <div className="absolute -right-2 -bottom-2 h-28 w-28 rounded-full border border-white/20" aria-hidden />
      <span className="absolute top-4 left-4 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur">
        {post.category}
      </span>
      <span className="absolute bottom-4 left-5 font-serif text-6xl text-white/30 italic">{post.read}′</span>
    </div>
  );
}
