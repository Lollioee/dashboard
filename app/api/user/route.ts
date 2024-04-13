import { fetchFilteredUsers } from '@/app/lib/select';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || ''
    const page = url.searchParams.get('page') || '1'
    let res = await fetchFilteredUsers(query, Number(page))

    return Response.json(res)
}