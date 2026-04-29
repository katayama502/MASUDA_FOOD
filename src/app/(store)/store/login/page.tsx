import Link from 'next/link';
import { Hanko } from '@/components/shared/Hanko';
import { BrushUnderline } from '@/components/shared/BrushUnderline';

export default function StoreLoginPage() {
  return (
    <div className="min-h-screen paper flex flex-col px-7 pt-10 pb-7">
      <div className="mb-7">
        <Hanko size="md">応援</Hanko>
      </div>

      <div className="flex-1">
        <p className="text-[11px] text-akane font-bold tracking-[0.2em] mb-1.5">STORE ADMIN</p>
        <h1 className="font-display text-[30px] font-bold leading-[1.3] mb-2">
          加盟店<br />
          <BrushUnderline>管理画面</BrushUnderline>
        </h1>
        <p className="text-[13px] text-sumi-3 mb-7 leading-[1.7]">
          益田めし応援団に登録された<br />飲食店オーナー専用のページです。
        </p>

        <form className="flex flex-col gap-3.5">
          <div>
            <label className="block text-[11px] text-sumi-3 mb-1.5">店舗ID または メールアドレス</label>
            <input
              type="email"
              defaultValue="yamada@masuda-meshi.jp"
              className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-sumi-3 mb-1.5">パスワード</label>
            <input
              type="password"
              defaultValue="••••••••••"
              className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors"
            />
          </div>
          <div className="flex items-center justify-between text-[12px] text-sumi-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-akane" />
              次回から自動ログイン
            </label>
            <button type="button" className="text-akane cursor-pointer">お困りの方</button>
          </div>
        </form>
      </div>

      <div className="mt-6">
        <Link
          href="/store/dashboard"
          className="block w-full text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide hover:bg-akane-deep transition-colors cursor-pointer"
        >
          ログイン
        </Link>
        <p className="text-center text-[11px] text-sumi-3 mt-3.5 leading-[1.6]">
          加盟希望のお店は{' '}
          <Link href="/store/apply" className="text-akane font-semibold cursor-pointer">
            こちらから申請
          </Link>
        </p>
      </div>
    </div>
  );
}
