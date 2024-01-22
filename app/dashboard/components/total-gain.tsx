import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

function numeroAleatorio() {
  return Math.floor(Math.random() * 20) + 1;
}

async function getTotalGain(): Promise<string | boolean> {
  const res = await fetch(`https://dummyjson.com/carts/${numeroAleatorio()}`);
  if (res.ok) {
    throw new Error("Erro");
  }

  const data = await res.json();
  if (data.total == undefined) return false;
  return `R$ ${data.total}`;
}

export default function TotalGain() {
  const totalGain = getTotalGain();

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        }
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganho Total</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGain}</div>
            {/*<p className="text-xs text-muted-foreground">
      +20.1% from last month
</p>*/}
          </CardContent>
        </Card>
      </Suspense>
    </>
  );
}
