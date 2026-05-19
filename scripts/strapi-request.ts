import qs from 'qs';
import { writeFile } from 'fs/promises';

async function fetchCMS() {
    const query = qs.stringify(
        {
            fields: ['title', 'description', 'slug', 'createdAt', 'author', 'body'],
            populate: {
                image: {
                    fields: ['url'],
                },
                sort: ['createdAt:desc'],
            },
            pagination: {
                pageSize: 5,
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );

    const response = await fetch(`http://localhost:1337/api/posts?${query}`, {
        method: 'GET'
    });

    const body = await response.json();

    await writeFile('./scripts/strapi-response.json', JSON.stringify(body, null, 2));
}

fetchCMS();