import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";

export async function GET(req) {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders, { status: 200 });
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
