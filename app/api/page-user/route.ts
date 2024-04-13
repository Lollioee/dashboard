import { fetchUsersPages } from '@/app/lib/select';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || ''
    let res = await fetchUsersPages(query)

    return Response.json(res)
}