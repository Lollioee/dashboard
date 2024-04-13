import { NextResponse } from "next/server";
import { insertLocation } from '@/app/lib/insert'
import { insertUser } from '@/app/lib/insert'
const { db } = require('@vercel/postgres');

export async function POST(request: Request) {
    let client;
    try {
        client = await db.connect();
        const contentType = request.headers.get('X-Content-Type');
        // console.log(contentType)
        const data = await request.json();
        // console.log(data);

        if (contentType === 'location') {
            await insertLocation(client, data);
        }
        if (contentType === 'user') {
            await insertUser(client, data);
        }

        return NextResponse.json({
            data,
        })
    } catch (error) {
        console.error("Error inserting location data:", error);
        // 返回错误响应
        return NextResponse.error();
    } finally {
        // 无论操作成功还是失败，都要确保释放数据库连接
        await client.end();
    }
}

