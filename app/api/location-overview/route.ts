import { fetchFilteredLocationTrackingNoSearch } from '@/app/lib/select';

export async function GET() {
    let res = await fetchFilteredLocationTrackingNoSearch()
    return Response.json(res)
}