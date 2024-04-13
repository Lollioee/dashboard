import { fetchFilteredUsers } from '@/app/lib/select';

export async function GET(req: { nextUrl: { searchParams: any; }; }) {
    const url = req.nextUrl.searchParams
    const query = url.get('query')
    const page = url.get('page')
    let res = await fetchFilteredUsers(query, page)

    return Response.json(res)
}