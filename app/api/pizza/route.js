import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";

export async function GET(req) {
  try {
    const pizzas = await prisma.pizza.findMany();
    return NextResponse.json(pizzas, { status: 200 });
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

export async function POST(req) {
  let { name, price } = await req.json();
  price = parseFloat(price);

  try {
    const pizza = await prisma.pizza.create({
      data: {
        name,
        price,
      },
    });
    console.log(pizza);
    return NextResponse.json(pizza, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating pizza" },
      { status: 500 },
      { headers: { "Content-Type": "application/json" } },
      { error }
    );
  }
}
