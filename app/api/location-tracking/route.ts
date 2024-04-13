import { fetchFilteredLocationTracking } from '@/app/lib/data';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || ''
    const page = url.searchParams.get('page') || '1'
    let res = await fetchFilteredLocationTracking(query, Number(page))

    return Response.json(res)
}