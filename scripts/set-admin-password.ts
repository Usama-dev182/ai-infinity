/**
 * Rotates the password of an existing admin user. Changes nothing else.
 *
 *   ADMIN_PASSWORD='<new password, 12+ chars>' npm run admin:set-password
 *   ADMIN_EMAIL=other-admin@example.com ADMIN_PASSWORD='…' npm run admin:set-password
 *
 * Uses DATABASE_URL (loaded from .env). Never creates users and never touches other
 * tables, so it is safe to run against production — unlike `npm run db:seed`, which
 * rewrites the seeded blog posts.
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const DEFAULT_ADMIN_EMAIL = "admin@aiinfinitylabs.com";

async function main() {
  const email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (password.length < 12) {
    throw new Error("Set ADMIN_PASSWORD to the new password (at least 12 characters).");
  }
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  try {
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, role: true } });
    if (!user) throw new Error(`No user with email ${email}. Nothing was changed.`);
    if (user.role !== "ADMIN") throw new Error(`${email} is not an ADMIN. Nothing was changed.`);
    await prisma.user.update({ where: { id: user.id }, data: { password: await hash(password, 12) } });
    console.log(`Password updated for ${email}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
