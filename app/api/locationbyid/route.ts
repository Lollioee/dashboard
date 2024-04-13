import { fetchFilteredLocationTrackingById } from '@/app/lib/select';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id') || ''
    let res = await fetchFilteredLocationTrackingById(id)
    return Response.json(res)
}