import { fetchLocationTrackingPages } from '@/app/lib/data';

export async function GET(req: { nextUrl: { searchParams: any; }; }) {
    const url = req.nextUrl.searchParams
    const query = url.get('query')
    let res = await fetchLocationTrackingPages(query)

    return Response.json(res)
}