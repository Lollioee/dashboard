'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    userName: z.string(),
    userID: z.string(),
    status: z.enum(['off', 'on']),
    date: z.string(),
});

const CreateUser = FormSchema.omit({ id: true, date: true });

export async function createUser(formData: FormData) {
    const { userName, userID, status } = CreateUser.parse({
        userName: formData.get('userName'),
        userID: formData.get('userID'),
        status: formData.get('status'),
    });
    const emgy_status = "off"
    await sql`
    INSERT INTO user_records (id, name, switch, emgy_status)
    VALUES (${userID}, ${userName}, ${status}, ${emgy_status})
    ON CONFLICT (id) DO UPDATE
    SET switch = EXCLUDED.switch,
    emgy_status = EXCLUDED.emgy_status;
  `;

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

const UpdateUser = FormSchema.omit({ id: true, date: true, userID: true, status:true });

export async function updateUser(id: string, formData: FormData) {
  const { userName } = UpdateUser.parse({
    userName: formData.get('userName'),
  });
 
  await sql`
    UPDATE user_records
    SET name = ${userName}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM location_records WHERE user_id = ${id}`;
    await sql`DELETE FROM user_records WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}