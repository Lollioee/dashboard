import { fetchFilteredLocationTracking } from '@/app/lib/data';

export async function GET(req: { nextUrl: { searchParams: any; }; }) {
    const url = req.nextUrl.searchParams
    const query = url.get('query')
    const page = url.get('page')
    let res = await fetchFilteredLocationTracking(query, page)

    return Response.json(res)
}