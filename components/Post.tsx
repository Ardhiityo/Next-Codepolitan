import Image from "next/image";
import Link from "next/link";

export default async function Post({
  title,
  slug,
  image,
  body,
}: {
  title: string;
  slug: string;
  image: string;
  body: string;
}) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-wrap gap-4 w-full">
        <div className="w-full md:w-[30%] bg-gray-200">
          <div className="relative h-37.5 md:h-full">
            {image && (
              <Image
                src={image}
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
          <p>{title}</p>
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: body }}
          ></article>
        </div>
      </div>
    </Link>
  );
}
