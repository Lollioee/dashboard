import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/customers' },
          {
            label: 'Create User',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}