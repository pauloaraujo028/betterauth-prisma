"use server";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "./users";

export async function getOrganizations() {
  const { currentUser } = await getCurrentUser();

  const members = await db.member.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  const organizations = await db.organization.findMany({
    where: {
      id: {
        in: members.map((member) => member.organizationId),
      },
    },
  });

  return organizations;
}

export async function getActiveOrganization(userId: string) {
  const memberUser = await db.member.findFirst({
    where: {
      userId,
    },
  });

  if (!memberUser) return null;

  const activeOrganization = await db.organization.findFirst({
    where: {
      id: memberUser.organizationId,
    },
  });

  return activeOrganization;
}
