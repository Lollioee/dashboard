import { parse } from 'uuid';
const { v4: uuidv4 } = require('uuid');

export async function insertLocation(client, user) {
    const parsedTimestamp = new Date(user.createAt);
    const longitude = parseFloat(user.longitude);
    const latitude = parseFloat(user.latitude);
    // const id = parse(user.id);
    // 生成一个 UUID 作为 id
    const id = uuidv4();
    try {
        await client.sql`
            INSERT INTO location_records (id, user_id, longtitude, latitude, createAt)
            VALUES (${id}, ${user.id}, ${longitude}, ${latitude}, ${parsedTimestamp})
            ON CONFLICT (id) DO NOTHING;
        `;
        console.log(`Inserted location: ${id}`);
    } catch (error) {
        console.error('Error inserting location:', error);
        throw error;
    }
}

export async function insertUser(client, user) {
    try {
        await client.sql`
            INSERT INTO user_records (id, name, switch, emgy_status)
            VALUES (${user.id}, ${user.name}, ${user.on_off}, ${user.emgy_status})
            ON CONFLICT (id) DO UPDATE
            SET switch = EXCLUDED.switch,
            emgy_status = EXCLUDED.emgy_status;
        `;
        console.log(`Inserted user: ${user.name}`);
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}
