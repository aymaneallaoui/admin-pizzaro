const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.pizzaroAdmin.create({
    data: {
      email: "adminMohamed@example.com",
      name: "mohamed",
      position: "Manager",
      password: "password123",
    },
  });

  console.log(`Created admin with email: ${admin.email}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
