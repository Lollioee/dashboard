import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchFilteredUserById } from '@/app/lib/select';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    let userId;
    if (id.includes('%')) {
        userId = decodeURIComponent(id);
    } else {
        userId = id;
    }
    // console.log(userId);
    const user = await fetchFilteredUserById(userId);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/customers' },
                    {
                        label: 'Edit User',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form user={user} />
        </main>
    );
}