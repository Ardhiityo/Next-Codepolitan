import { getPost } from "@/lib/post"
import Image from "next/image"
import Link from "next/link"
import CopyLinkButton from "./CopyLinkButton";

export default async function PostCard({ title }: { title: string }) {
    const post = await getPost(title);
    return (
        <Link href={`/blog/${title}`}>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="w-full md:w-[30%] bg-gray-200">
                    <div className="relative h-37.5 md:h-full">
                        {post.image && (
                            <Image
                                src={post.image}
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
                   <CopyLinkButton/>
                    <article
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    ></article>
                </div>
            </div>
        </Link>
    )
}