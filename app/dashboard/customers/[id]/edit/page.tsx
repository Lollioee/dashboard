import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchFilteredUserById } from '@/app/lib/select';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const user = await fetchFilteredUserById(id);

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