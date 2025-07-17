import Link from "next/link";
import { CoinsIcon, CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
  points: number;
  msBeforeNext: number;
}

export const Usage = ({ points, msBeforeNext }: Props) => {
  const { has } = useAuth();
  const isOnFreePlan = has?.({ plan: "free_user" });

  const resetTime = useMemo(() => {
    try {
      return formatDuration(
        intervalToDuration({
          start: new Date(),
          end: new Date(Date.now() + msBeforeNext),
        }),
        {
          format: ["months", "days", "hours"],
        }
      )
    } catch (error) {
      console.error("Error formatting duration:", error);
      return "soon";
    }
  }, [msBeforeNext]);

  return (
    <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">{points} credits remaining</p>
          <p className="text-sm text-muted-foreground">
            Resets in{" "}{resetTime}
          </p>
        </div>
        {isOnFreePlan && (
          <Button asChild size={"sm"} variant={"default"} className="ml-auto">
            <Link href="/pricing">
              <CrownIcon /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export const CreditsInNavbar = () => {
  const trpc = useTRPC();
  const { data: usage } = useQuery(trpc.usage.status.queryOptions());

  return (
    <span className="flex gap-2 items-center">
      <CoinsIcon className="text-yellow-500" /> {usage?.remainingPoints || 5}{" "}
      Credits
    </span>
  );
};
