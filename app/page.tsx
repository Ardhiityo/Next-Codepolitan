import Heading from "@/components/Heading";
import { getAllPost } from "@/lib/post";
import Post from "@/components/Post";

export default async function Home() {
  const files = await getAllPost();
  return (
    <>
      <Heading>Home Page</Heading>
      <main className="flex flex-col gap-8">
        {files.map(file => <Post key={file} title={file} />)}
      </main>
    </>
  );
}
