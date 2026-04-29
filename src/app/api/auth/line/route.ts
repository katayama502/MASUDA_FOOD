/**
 * POST /api/auth/line
 * LIFF から送られた LINE id_token を検証し、Supabase セッションを設定する
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

interface LineTokenPayload {
  sub: string;       // LINE user ID
  name: string;
  picture?: string;
  email?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { id_token } = await req.json();
    if (!id_token || typeof id_token !== 'string') {
      return NextResponse.json({ error: 'id_token が必要です' }, { status: 400 });
    }

    // LINE ID Token 検証
    const verifyRes = await fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        id_token,
        client_id: process.env.LINE_CHANNEL_ID!,
      }),
    });

    if (!verifyRes.ok) {
      const err = await verifyRes.json();
      console.error('[auth/line] LINE verify failed:', err);
      return NextResponse.json({ error: 'LINEトークンが無効です' }, { status: 401 });
    }

    const lineUser: LineTokenPayload = await verifyRes.json();

    // Supabase admin: users テーブルで line_user_id を検索 or 作成
    const admin = createAdminClient();

    const { data: existingUserRaw } = await admin
      .from('users')
      .select('id, email')
      .eq('line_user_id', lineUser.sub)
      .maybeSingle();
    const existingUser = existingUserRaw as { id: string; email: string | null } | null;

    let supabaseUserId: string;

    if (existingUser?.id) {
      supabaseUserId = existingUser.id;
    } else {
      // 新規ユーザーを auth.users に作成
      const email = lineUser.email ?? `line_${lineUser.sub}@masuda-meshi.local`;
      const { data: newAuthUser, error: createErr } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          display_name: lineUser.name,
          line_user_id: lineUser.sub,
          avatar_url: lineUser.picture,
        },
      });

      if (createErr || !newAuthUser.user) {
        console.error('[auth/line] createUser error:', createErr);
        return NextResponse.json({ error: 'ユーザー作成に失敗しました' }, { status: 500 });
      }

      supabaseUserId = newAuthUser.user.id;

      // users プロファイルを更新（trigger で INSERT 済みのはず）
      await admin
        .from('users')
        .update({
          line_user_id: lineUser.sub,
          display_name: lineUser.name,
          email,
        })
        .eq('id', supabaseUserId);
    }

    // マジックリンク的な方式でセッションを発行
    // （本来は signInWithOtp などを使うが、LINE独自フローのため admin.generateLink を使用）
    const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
      type: 'magiclink',
      email: existingUser?.email ?? `line_${lineUser.sub}@masuda-meshi.local`,
    });

    if (linkErr || !link) {
      console.error('[auth/line] generateLink error:', linkErr);
      return NextResponse.json({ error: 'セッションの発行に失敗しました' }, { status: 500 });
    }

    // クライアントがこの action_link にリダイレクトして Cookie を取得する
    return NextResponse.json({
      ok: true,
      action_link: link.properties.action_link,
      user_id: supabaseUserId,
    });
  } catch (e) {
    console.error('[auth/line] unexpected error:', e);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
