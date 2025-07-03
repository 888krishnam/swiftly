"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}));
  return (
    <>
      <Input value={value} onChange={(e) => setValue(e.target.value)}/>
      <Button onClick={ () => invoke.mutate({ value: value }) }>
        Invoke Background Job
      </Button>
    </>
  );
}

export default Page;