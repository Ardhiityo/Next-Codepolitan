import Heading from "@/components/Heading";
import { getAllPost } from "@/lib/post";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const body = await getAllPost(parsePaginationParam(params.page ?? 1));
  const { data } = body;
  const { meta } = body;
  return (
    <>
      <Heading>Blog Page</Heading>
      <Pagination meta={meta} />
      <main className="flex flex-col gap-8">
        {data.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            slug={post.slug}
            body={post.body}
            image={post.image.url}
          />
        ))}
      </main>
    </>
  );
}

function parsePaginationParam(page: string | number) {
  const currentPage = Number(page);
  if (!currentPage) {
    return 1;
  }
  return currentPage;
}