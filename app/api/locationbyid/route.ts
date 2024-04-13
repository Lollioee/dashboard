import { fetchFilteredLocationTrackingById } from '@/app/lib/select';

export async function GET(req: { nextUrl: { searchParams: any; }; }) {
    const url = req.nextUrl.searchParams
    const id = url.get('id')
    let res = await fetchFilteredLocationTrackingById(id)
    return Response.json(res)
}