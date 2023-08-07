import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/server/db/client";

export async function POST(request, res) {
  if (request.method === "POST") {
    const { email, password } = await request.json();
    const user = await prisma.PizzaroAdmin.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (user && user.password === password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } else {
    return NextResponse.error("Method not allowed", 405);
  }
}
