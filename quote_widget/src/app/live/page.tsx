"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LiveQuotePage() {
  const [params, setParams] = useState<URLSearchParams | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);

  const refreshMinutes = Math.min(
    30,
    Math.max(1, Number(params?.get("refresh")) || 5),
  );

  useEffect(() => {
    if (!params) return;

    const interval = window.setInterval(
      () => {
        setRefreshKey((previous) => previous + 1);
      },
      refreshMinutes * 60 * 1000,
    );

    return () => window.clearInterval(interval);
  }, [params, refreshMinutes]);

  if (!params) {
    return <main className="min-h-screen bg-[#0f0d0d]" />;
  }

  const svgParams = new URLSearchParams(params);
  svgParams.delete("_refresh");

  const svgUrl = `/svg?${svgParams.toString()}&_refresh=${refreshKey}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0d] p-6">
      <Image
        key={refreshKey}
        src={svgUrl}
        alt="Automatically refreshing quote"
        width={Number(params.get("width")) || 500}
        height={Number(params.get("height")) || 300}
        unoptimized
        priority
        className="h-auto max-w-full"
      />
    </main>
  );
}
