import PostCard from "@/components/PostCard";
import { getAllPost, getPost } from "@/lib/post";
import type { Metadata } from "next";

//akan memaksa fetch ulang tanpa cache ketika dimuat
// export const dynamic = 'force-dynamic';

//atau

//akan memaksa fetch ulang tanpa cache tetapi menunggu selama beberapa saat
// export const revalidate = 50; //cache selama 50s tetapi setelah itu fetch ulang


// Apabila hasil dari generateStaticParams tidak ada, namun dalam hasil diluar build ada maka jika false akan error dengan npm run start
export const dynamicParams = false // true | false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

//akan berguna jika tidak menggunakan export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  const body = await getAllPost();

  return body.data.map((post) => ({
    slug: post.slug
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostCard slug={slug} />;
}
