import type { Config } from "@netlify/functions";

/**
 * 期限切れ予約を expired に更新する
 * 対応APIルート: /api/cron/expire-reservations
 */
export default async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.CRON_SECRET;

  if (!baseUrl || !secret) {
    console.error("Missing NEXT_PUBLIC_SITE_URL or CRON_SECRET");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/expire-reservations`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  console.log("expire-reservations:", res.status, await res.text());
};

export const config: Config = {
  schedule: "*/30 * * * *",
};
