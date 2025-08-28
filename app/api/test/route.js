import { NextResponse } from "next/server";

export async function GET(req, res) {
    console.log("yooooo");
    return NextResponse.json({ result: "kevin" });
}
