import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../src/shared/prisma";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin", 12);

    const superAdminData = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "super@admin.com",
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        gender: "MALE",
      },
    });
    console.log("Super Admin Created Successfully!", superAdminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();

// superAdmin is only one in a project. here I seed super admin because in future when I add new feature to my project,
//  I need to clone this repository from github. then I command to create and active a super admin and use super admin's
//  features and its dependencies
//after create seed.ts run: npx prisma db seed
