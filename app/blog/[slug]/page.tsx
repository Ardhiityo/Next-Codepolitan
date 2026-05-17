import PostCard from "@/components/PostCard";
import { getAllPost, getPost } from "@/lib/post";
import type { Metadata } from 'next'

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    return {
        title: post.title
    }
}

export async function generateStaticParams() {
    const posts = await getAllPost();

    return posts.map((post) => ({
        slug: post
    }))
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <PostCard title={slug} />
    )
}