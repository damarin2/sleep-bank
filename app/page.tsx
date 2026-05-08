"use client";

import React, { useState } from 'react';

// 動物データはそのまま活用（省略せずコードに含めます）
const ANIMAL_TIERS = [
  { maxHours: 4, tierName: "2h", animals: [{ nameJa: "アーバン・フォックス", nameEn: "Urban Fox", emoji: "🦊", messageJa: "住宅ローンの金利で眠れなかったのかい？ひどい顔だよ。", messageEn: "Late night worrying about the mortgage rates? You look dreadful." }] },
  { maxHours: 6, tierName: "4h", animals: [{ nameJa: "ハト", nameEn: "Pigeon", emoji: "🕊️", messageJa: "M25の渋滞を避けるための早起きかな？悲惨な日常だね。", messageEn: "Up early to beat the M25 traffic? A truly tragic existence." }] },
  { maxHours: 8, tierName: "6h", animals: [{ nameJa: "アナグマ", nameEn: "Badger", emoji: "🦡", messageJa: "週末に庭の雑草を猛烈に抜き、天気の文句を言うには十分だ。", messageEn: "Enough energy to aggressively weed the garden and complain about the weather." }] },
  { maxHours: 10, tierName: "8h", animals: [{ nameJa: "コーギー", nameEn: "Corgi", emoji: "🐶", messageJa: "完璧で賢明な8時間。BBCラジオ4を聴く準備は万端だ。", messageEn: "A perfectly sensible 8 hours. Ready for BBC Radio 4." }] },
  { maxHours: 14, tierName: "12h", animals: [{ nameJa: "ハイランド・カウ", nameEn: "Highland Cow", emoji: "🐂", messageJa: "今日はバンクホリデー（祝日）に違いない。のんびりしたまえ。", messageEn: "Must be a bank holiday. Enjoy doing absolutely nothing." }] },
  { maxHours: 99, tierName: "14h+", animals: [{ nameJa: "貴族の飼い猫", nameEn: "Aristocrat's Cat", emoji: "🐈", messageJa: "引退した貴族のような睡眠だ。仕事はあるのかい？", messageEn: "Sleeping like a retired aristocrat. Do you even have a job?" }] }
];

export default function SleepDiaryApp() {
  const [bedtime, setBedtime] = useState<string>("23:00");
  const [wakeupTime, setWakeupTime] = useState<string>("06:30");
  // 💡 気分を1-8のスコア（初期値は真ん中の5）に変更
  const [moodScore, setMoodScore] = useState<string>("5");
  const [text, setText] = useState<string>("");
  const [matchedAnimal, setMatchedAnimal] = useState<any>(null);

  const handleGenerateText = () => {
    const hours = (startTime: string, endTime: string) => {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      let s = sh + sm/60, e = eh + em/60;
      return e < s ? e + 24 - s : e - s;
    };

    const sleepHours = hours(bedtime, wakeupTime);
    const displayHours = sleepHours.toFixed(1);
    const earnedQuid = sleepHours * 50000;
    const compactFormatter = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 });
    const formattedQuid = compactFormatter.format(earnedQuid);

    let animal = ANIMAL_TIERS.find(t => sleepHours < t.maxHours)?.animals[0];
    setMatchedAnimal(animal);

    // 💡 スコアに応じたシニカルな判定ロジック
    const score = parseInt(moodScore);
    let commentJa = "", commentEn = "";
    if (score >= 7) {
      commentJa = "素晴らしい。今日も一日乗り切ろう。🎩";
      commentEn = "Splendid. Ready to face the day.";
    } else if (score >= 5) {
      commentJa = "まあまあ。文句は言えないね。🌂";
      commentEn = "Mustn't grumble, I suppose.";
    } else if (score >= 3) {
      commentJa = "クタクタだ。早くベッドに戻りたい。🛌";
      commentEn = "Absolutely shattered. Barely functioning.";
    } else {
      commentJa = "最悪の目覚めだ。濃い紅茶が必要。🫖";
      commentEn = "In desperate need of a proper brew.";
    }

    const line = `━━━━━━━━━━━━━━━`;
    setText(`
🏛️ The Royal Sleep Bank 🏛️
${line}
🛌 Time：${displayHours}h
🦁 Animal：${animal?.nameEn} ${animal?.emoji}
💰 Balance：£${formattedQuid}
⭐️ Condition：${moodScore}/8
${line}
🇬🇧 ${animal?.messageEn}
🇯🇵 ${animal?.messageJa}

🗣️ EN: ${commentEn}
🗣️ JP: ${commentJa}

#RoyalSleepBank #SleepDiaryUK
`.trim());
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif', maxWidth: '500px', margin: '0 auto', backgroundColor: '#F4F4EE', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#004225', borderBottom: '1px solid #D4AF37' }}>🏛️ The Royal Sleep Bank</h2>
      
      <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #D1D1C6', borderRadius: '4px', marginTop: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Bedtime</label>
            <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} style={{ width: '100%', padding: '10px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Wake up</label>
            <input type="time" value={wakeupTime} onChange={(e) => setWakeupTime(e.target.value)} style={{ width: '100%', padding: '10px' }} />
          </div>
        </div>

        {/* 💡 ここが1-8のセレクトボックスに変更した部分 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Morning Condition (1-8)</label>
          <select 
            value={moodScore} 
            onChange={(e) => setMoodScore(e.target.value)} 
            style={{ width: '100%', padding: '10px', fontFamily: 'sans-serif' }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n === 8 ? "8 (Excellent)" : n === 1 ? "1 (Ghastly)" : n}</option>
            ))}
          </select>
        </div>

        <button onClick={handleGenerateText} style={{ width: '100%', padding: '15px', backgroundColor: '#004225', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
          Generate Statement
        </button>
      </div>

      <textarea value={text} readOnly rows={12} style={{ width: '100%', marginTop: '20px', padding: '15px', fontFamily: 'monospace', fontSize: '12px' }} />

      <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)} style={{ width: '100%', padding: '12px', backgroundColor: '#1A2421', color: '#fff', marginTop: '10px', cursor: 'pointer' }}>
        𝕏 Share via Telegraph
      </button>

      <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #D1D1C6', paddingTop: '20px' }}>
        <a href="YOUR_LINK_HERE" target="_blank" style={{ color: '#004225', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>🫖 Buy me a proper brew (£2.50)</a>
      </div>
    </div>
  );
}