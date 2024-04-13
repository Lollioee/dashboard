import { UsersTable, LocationTrackingTable } from './definitions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const Users = await sql<UsersTable>`
        SELECT
          user_records.id,
          user_records.name,
          user_records.switch AS status
        FROM user_records
        WHERE
          user_records.id ILIKE ${`%${query}%`} OR
          user_records.name ILIKE ${`%${query}%`} OR
          user_records.switch ILIKE ${`%${query}%`}
        ORDER BY 
          CASE WHEN user_records.switch = 'on' THEN 0 ELSE 1 END,
          user_records.name ASC,
          user_records.id ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return Users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUsersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM user_records
      WHERE
        user_records.id ILIKE ${`%${query}%`} OR
        user_records.name ILIKE ${`%${query}%`} OR
        user_records.switch ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return { pages: totalPages };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
}

export async function fetchFilteredUserById(
  id: string,
) {
  noStore();

  try {
    const Users = await sql<UsersTable>`
        SELECT
          user_records.id,
          user_records.name,
          user_records.switch AS status
        FROM user_records
        WHERE
          user_records.id = ${id}
      `;

    return Users.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchFilteredLocationTrackingById(
  id: string
) {
  noStore();

  try {
    const locationTrackings = await sql<LocationTrackingTable>`
    SELECT
      location_records.user_id,
      user_records.name,
      location_records.longtitude,
      location_records.latitude
    FROM user_records
    JOIN (
          SELECT
            user_id,
            longtitude,
            latitude,
            createat,
            ROW_NUMBER() OVER (PARTITION BY user_id, longtitude, latitude ORDER BY createat ASC) AS row_num
          FROM
            location_records
          ) AS location_records
    ON user_records.id = location_records.user_id
    WHERE
      location_records.user_id = ${id}
      AND location_records.row_num = 1
    ORDER BY 
    location_records.createat ASC
    LIMIT 50;
    `;

    return locationTrackings.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch locationTrackingbyid.');
  }
}

export async function fetchFilteredLocationTrackingNoSearch() {
  noStore();

  try {
    const locationTrackings = await sql<LocationTrackingTable>`
      SELECT
        user_records.id,
        user_records.name,
        user_records.switch AS status,
        user_records.emgy_status,
        location_records.longtitude,
        location_records.latitude
      FROM user_records
      JOIN location_records ON user_records.id = location_records.user_id
      WHERE
        location_records.createAt = (
          SELECT
            MAX(createAt)
          FROM location_records
          WHERE
            user_id = user_records.id
        )
        AND user_records.switch = 'on'
      ORDER BY 
        CASE WHEN user_records.switch = 'on' THEN 0 ELSE 1 END,
        user_records.name ASC,
        user_records.id ASC
    `;

    return locationTrackings.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch locationTrackingNoSearch.');
  }
}
