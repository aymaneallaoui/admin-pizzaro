import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching pizzas du" },
      { status: 500 },
      { headers: { "Content-Type": "application/json" } },
      { error }
    );
  }
}
