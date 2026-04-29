import type { Config } from "@netlify/functions";

/**
 * 月次精算データを生成する（毎月末 23:55）
 * 対応APIルート: /api/cron/monthly-payout
 */
export default async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.CRON_SECRET;

  if (!baseUrl || !secret) {
    console.error("Missing NEXT_PUBLIC_SITE_URL or CRON_SECRET");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/monthly-payout`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  console.log("monthly-payout:", res.status, await res.text());
};

export const config: Config = {
  schedule: "55 23 28-31 * *",
};
