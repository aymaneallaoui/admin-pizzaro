import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const Toppings = await prisma.Topping.findMany();
    return NextResponse.json(Toppings, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching Toppings du" },
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
    const Topping = await prisma.Topping.create({
      data: {
        name,
        price,
      },
    });
    console.log(Topping);
    return NextResponse.json(Topping, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating Topping" },
      { status: 500 },
      { headers: { "Content-Type": "application/json" } },
      { error }
    );
  }
}
