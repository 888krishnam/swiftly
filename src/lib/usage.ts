import { RateLimiterPrisma } from "rate-limiter-flexible";

import { auth } from "@clerk/nextjs/server";
import prisma from "./db";

const FREE_POINTS = 5;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60;
export const MESSAGE_REQUEST_COST = 1;

export async function getUsageTracker() {
  const { has } = await auth();
  const hasProAccess = has({ plan: "premium" });
  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasProAccess ? PRO_POINTS : FREE_POINTS,
    duration: DURATION,
  });

  return usageTracker;
}

export async function consumeCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("user not authenticated");
  }

  const usageTracker = await getUsageTracker();

  const result = await usageTracker.consume(userId, MESSAGE_REQUEST_COST);
  return result;
}

export async function getUsageStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authorized");

  const usageTracker = await getUsageTracker();
  const result = usageTracker.get(userId);

  return result;
}
