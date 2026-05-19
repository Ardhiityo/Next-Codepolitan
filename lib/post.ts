import qs from "qs";
import { marked } from "marked";

const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const baseURL = `${strapiURL}/api/posts`;

export const CACHE_TAG_POST = 'posts';

type PostsResponse = {
  data: [
    {
      id: number;
      documentId: string;
      title: string;
      description: string;
      slug: string;
      createdAt: string;
      author: string;
      body: string;
      image: {
        id: number;
        documentId: string;
        url: string;
      };
    },
  ];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type PostResponse = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  author: string;
  body: string;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
};

export async function getAllPost(page: number = 1) {
  const query = qs.stringify(
    {
      fields: ["title", "description", "slug", "createdAt", "author", "body"],
      populate: {
        image: {
          fields: ["url"],
        },
        sort: ["createdAt:desc"],
      },
      pagination: {
        pageSize: 5,
        page: page
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );

  //{ next: { revalidate: 3600 } } = akan melakukan fetch ulang setelah 30s, jika belum maka ambil dari cache
  const response = await fetch(`${baseURL}?${query}`, { next: { tags: [CACHE_TAG_POST] } });

  const body: PostsResponse = await response.json();

  const data = await Promise.all(
    body.data.map(async (post) => {
      return {
        ...post,
        body: await marked.parse(post.body),
        createdAt: new Date(post.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        image: {
          ...post.image,
          url: `${strapiURL}${post.image.url}`,
        },
      };
    }),
  );

  return {
    data: data,
    meta: body.meta,
  };
}

export async function getPost(slug: string) {
  const query = qs.stringify(
    {
      fields: ["title", "description", "slug", "createdAt", "author", "body"],
      populate: {
        image: {
          fields: ["url"],
        },
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );

  const response = await fetch(`${baseURL}?${query}`, { next: { tags: [CACHE_TAG_POST] } });

  const body = await response.json();
  const data: PostResponse = body.data[0];

  if (!data) return null;

  return {
    ...data,
    body: await marked.parse(data.body),
    createdAt: new Date(data.createdAt).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    image: {
      ...data.image,
      url: `${strapiURL}${data.image.url}`,
    },
  };
}
