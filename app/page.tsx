import HomeClient from "@/components/HomeClient";
import { Suspense } from "react";
export const dynamic = "force-dynamic";


export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading page...</div>}>
      <HomeClient />
      </Suspense>
      );
}
