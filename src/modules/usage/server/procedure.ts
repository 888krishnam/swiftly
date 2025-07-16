import { getUsageStatus } from "@/lib/usage";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const usageRouter = createTRPCRouter({
  status: protectedProcedure.query(async () => {
    try {
      const result = await getUsageStatus();
      console.log("RESULT OF CREDITS", result);
      return result;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      return null;
    }
  }),
});
