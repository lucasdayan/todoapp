import { NextRequest } from "next/server";
import { prisma } from "@/db/db";

export async function GET(req: NextRequest) {
  const tasks = await prisma.todo.findMany();
  return Response.json(tasks);
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    const task = await prisma.todo.create({
      data: {
        completed: false,
        title: title,
      },
    });
    return Response.json(task);
  } catch (error) {
    return Response.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    const deletedTask = await prisma.todo.delete({
      where: {
        id: query as string,
      },
    });
    return Response.json(deletedTask);
  } catch (error) {
    return Response.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    const updatedTask = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    });
    return Response.json(updatedTask);
  } catch (error) {
    return Response.error();
  }
}
