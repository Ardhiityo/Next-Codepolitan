import { revalidateTag } from "next/cache";
import { CACHE_TAG_POST } from "@/lib/post";

export async function POST(request: Request) {
    const payload = await request.json();
    //revalidateTag(CACHE_TAG_POST, 'max') = akan melakukan revalidate ketika di trigger karena ada perubahan
    //setelah di trigger akan melakukan fetch sesuai tags nya ketika fetch
    if (payload.model == 'post') revalidateTag(CACHE_TAG_POST, 'max');

    return new Response(null, { status: 204 });
}