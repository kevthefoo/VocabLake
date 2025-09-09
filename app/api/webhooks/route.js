import { NextResponse } from "next/server";
import addUser from "@/lib/addUser";

// Receive data from Clerk when there is a new user created
export async function POST(req) {
    const body = await req.json();
    const userId = body.data.id;
    const userEmail = body.data.email_addresses[0];
    // Add user data to the supabase
    const response = await addUser(userId, userEmail);

    return NextResponse.json({ result: "success!" }, { status: 200 });
}
