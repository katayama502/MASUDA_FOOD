import type { Config } from "@netlify/functions";

/**
 * 未通知の新着出品を会員にLINE通知する
 * 対応APIルート: /api/cron/notify-new-listing
 */
export default async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.CRON_SECRET;

  if (!baseUrl || !secret) {
    console.error("Missing NEXT_PUBLIC_SITE_URL or CRON_SECRET");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/notify-new-listing`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  console.log("notify-new-listing:", res.status, await res.text());
};

export const config: Config = {
  schedule: "*/2 * * * *",
};
