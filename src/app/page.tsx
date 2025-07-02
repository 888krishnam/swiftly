"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}));
  return (
    <>
      <h1>Test</h1>
      <Button onClick={ () => invoke.mutate({ text: "hello" }) }>
        Invoke Background Job
      </Button>
    </>
  );
}

export default Page;