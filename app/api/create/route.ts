import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description } = body;

        if (!title) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const todo = await prisma.todo.create({
            data: {
                title: title,
                description: description,
            }
        });
        return NextResponse.json(todo, { status: 201 });

    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
}
