import { fetchUsersPages } from '@/app/lib/select';

export async function GET(req: { nextUrl: { searchParams: any; }; }) {
    const url = req.nextUrl.searchParams
    const query = url.get('query')
    let res = await fetchUsersPages(query)

    return Response.json(res)
}