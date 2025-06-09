import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const todos = await prisma.todo.findMany();
        return NextResponse.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Failed to fetch todo{s}" }, { status: 500 });
    }
}

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

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const todo = await prisma.todo.delete({
            where: { id: id },
        });
        return NextResponse.json(todo, { status: 200 });

    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const todo = await prisma.todo.findUnique({
            where: { id: id },
        });
        
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        
        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: { completed: !todo.completed },
        });
        return NextResponse.json(todo, { status: 200 });

    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
}