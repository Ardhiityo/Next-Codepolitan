import { getPost } from "@/lib/post";
import Image from "next/image";
import CopyLinkButton from "./CopyLinkButton";
import { notFound } from "next/navigation";

export default async function PostCard({ slug }: { slug: string }) {
  const post = await getPost(slug);
  if (!post) {
    return notFound();
  }
  return (
    <div className="flex flex-wrap gap-4 w-full">
      <div className="w-full md:w-[30%] bg-gray-200">
        <div className="relative h-37.5 md:h-full">
          {post.image && (
            <Image
              src={post.image.url}
              fill
              sizes="(max-width: 768px), (max-width: 1200px) 50vw, 33vw"
              alt="sample"
              className="object-cover"
              loading="eager"
            />
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="mb-4">
          <CopyLinkButton />
          <p className="text-slate-700 text-sm mt-3">
            {post.author} - {post.createdAt}
          </p>
        </div>
        <p>{post.title}</p>
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></article>
      </div>
    </div>
  );
}
