import { fetchLocationTrackingPages } from '@/app/lib/data';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || ''
    let res = await fetchLocationTrackingPages(query)

    return Response.json(res)
}