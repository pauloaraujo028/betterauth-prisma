"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getOrganizations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const currentUser = await db.member.findFirst({
    where: {},
  });

  if (!currentUser) {
    redirect("/auth/login");
  }

  const organizations = await db.organization.findMany({
    where: {},
  });

  return organizations;
}
