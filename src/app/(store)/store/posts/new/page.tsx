'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/shared/AppHeader';
import { CameraIcon, TrashIcon } from '@/components/shared/Icons';
import Link from 'next/link';

const PRESET_TITLES = ['唐揚げ弁当', '肉じゃが', '焼き魚', 'おにぎりセット', '煮物 小鉢'];

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState(3);
  const [from, setFrom] = useState('19:30');
  const [until, setUntil] = useState('21:00');
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-kinari">
      <AppHeader title="今日の余り物" backHref="/store/dashboard" />

      <div className="px-5 pb-24 flex flex-col gap-4">
        {/* Photo upload */}
        <button
          onClick={() =>
            setPhoto(
              'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop'
            )
          }
          className="relative h-44 border-[1.5px] border-dashed border-kinari-3 rounded-l flex flex-col items-center justify-center gap-2 text-sumi-3 cursor-pointer overflow-hidden"
          style={photo ? { background: `url(${photo}) center/cover` } : { background: '#EDE5D5' }}
        >
          {!photo && (
            <>
              <CameraIcon />
              <span className="text-[13px]">写真を1枚（任意）</span>
            </>
          )}
          {photo && (
            <span className="absolute bottom-2.5 right-2.5 bg-sumi/85 text-shiro text-[11px] px-2.5 py-1 rounded-pill">
              差し替え
            </span>
          )}
        </button>

        {/* Title */}
        <div>
          <label className="block text-[11px] text-sumi-3 mb-1.5">品目名</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="例: 唐揚げ弁当"
            className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors"
          />
          {/* Preset chips */}
          <div className="flex gap-1.5 overflow-x-auto mt-1.5 pb-1 h-scroll">
            {PRESET_TITLES.map(t => (
              <button
                key={t}
                onClick={() => setTitle(t)}
                className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-pill border transition-colors cursor-pointer"
                style={{
                  background: title === t ? '#1F1B17' : '#FBF8F1',
                  color:      title === t ? '#FBF8F1' : '#3A332D',
                  borderColor: title === t ? '#1F1B17' : '#DCD0B8',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[11px] text-sumi-3 mb-1.5">ひとこと（任意）</label>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="揚げたて。19時に詰め直しました。"
            className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors resize-none min-h-[80px]"
          />
        </div>

        {/* Qty stepper */}
        <div>
          <label className="block text-[11px] text-sumi-3 mb-1.5">数量</label>
          <div className="bg-shiro border border-kinari-3 rounded-m px-3.5 py-2 flex items-center gap-3.5">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full border border-kinari-3 bg-shiro flex items-center justify-center text-[18px] cursor-pointer hover:bg-kinari-2 transition-colors"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <p className="font-display font-bold text-[32px] leading-none">{qty}</p>
              <p className="text-[11px] text-sumi-3">人前</p>
            </div>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-9 h-9 rounded-full border border-kinari-3 bg-shiro flex items-center justify-center text-[18px] cursor-pointer hover:bg-kinari-2 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Time range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-sumi-3 mb-1.5">受け取り開始</label>
            <input
              type="time"
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-sumi-3 mb-1.5">受け取り終了</label>
            <input
              type="time"
              value={until}
              onChange={e => setUntil(e.target.value)}
              className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors"
            />
          </div>
        </div>

        {/* Notification preview */}
        <div className="bg-[#FFF7F1] border border-dashed border-akane-soft rounded-m px-3.5 py-3">
          <p className="text-[10px] font-bold text-akane tracking-[0.1em] mb-1">会員へのプッシュ通知（プレビュー）</p>
          <p className="text-[13px] text-sumi-2 leading-[1.5]">
            <b>やま田食堂</b>に「{title || '—'}」が{qty}人分でました。受け取り {from}〜{until}
          </p>
        </div>

        {/* Submit */}
        <Link
          href="/store/dashboard"
          className={[
            'block w-full text-center font-semibold rounded-pill py-[15px] text-[15px] tracking-wide transition-colors cursor-pointer',
            title
              ? 'bg-akane text-shiro hover:bg-akane-deep active:scale-[0.98]'
              : 'bg-kinari-3 text-sumi-3 pointer-events-none',
          ].join(' ')}
        >
          投稿して通知する
        </Link>
        <p className="text-center text-[11px] text-sumi-3">
          優先順: 大将 → 5分後におなじみ → 10分後にさんぽ
        </p>
      </div>
    </div>
  );
}
