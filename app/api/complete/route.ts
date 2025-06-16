import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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