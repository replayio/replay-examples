import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (req.method === "DELETE") {
    const todo = await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    return res.json(todo);
  }

  if (req.method === "PUT") {
    const { completed, title } = req.body;
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed, title },
    });
    return res.json(todo);
  }
}
