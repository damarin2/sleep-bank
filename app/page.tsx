"use client";

import React, { useState } from 'react';

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

    // 💡 ワコールの記事を基にした「偉人クラス」判定
    let legend = "";
    if (sleepHours <= 4) legend = "Napoleon Class (Genius or Workaholic)";
    else if (sleepHours <= 6) legend = "Haruki Murakami Class (Disciplined)";
    else if (sleepHours <= 9) legend = "Obama & Gates Class (Global Leader)";
    else if (sleepHours <= 11) legend = "Einstein Class (The Genius Sleeper)";
    else legend = "King Kazu Class (Pro-Athlete Recovery)";

    const earnedQuid = sleepHours * 50000;
    const compactFormatter = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 });
    const formattedQuid = compactFormatter.format(earnedQuid);

    let animal = ANIMAL_TIERS.find(t => sleepHours < t.maxHours)?.animals[0];
    setMatchedAnimal(animal);

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
🎖️ Legend：${legend}
${line}
🇬🇧 ${animal?.messageEn}
🇯🇵 ${animal?.messageJa}

🗣️ EN: ${commentEn}
🗣️ JP: ${commentJa}

👇Open your account (It's free!)
#RoyalSleepBank #SleepDiaryUK
`.trim());
  };

  // 共通の文字スタイル
  const labelStyle: React.CSSProperties = { 
    fontSize: '14px', 
    fontWeight: 'bold', 
    color: '#000000', // 真っ黒にして読みやすく
    display: 'block',
    marginBottom: '5px' 
  };

  const inputStyle: React.CSSProperties = { 
    width: '100%', 
    padding: '12px', 
    fontSize: '16px', 
    color: '#000000', 
    border: '2px solid #333333', // 枠線を太く・濃く
    borderRadius: '4px',
    backgroundColor: '#FFFFFF'
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'serif', maxWidth: '500px', margin: '0 auto', backgroundColor: '#F4F4EE', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#004225', borderBottom: '2px solid #D4AF37', paddingBottom: '10px', fontSize: '24px' }}>
        🏛️ The Royal Sleep Bank
      </h1>
      
      <div style={{ backgroundColor: '#ffffff', padding: '25px', border: '2px solid #D1D1C6', borderRadius: '8px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Bedtime 💤</label>
            <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Wake up ☀️</label>
            <input type="time" value={wakeupTime} onChange={(e) => setWakeupTime(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Morning Condition (1-8)</label>
          <select value={moodScore} onChange={(e) => setMoodScore(e.target.value)} style={inputStyle}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n === 8 ? "8 - Excellent 🎩" : n === 1 ? "1 - Ghastly 💀" : n}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleGenerateText} 
          style={{ width: '100%', padding: '18px', backgroundColor: '#004225', color: '#D4AF37', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
        >
          Generate Statement
        </button>
      </div>

      <textarea 
        value={text} 
        readOnly 
        rows={14} 
        style={{ width: '100%', marginTop: '25px', padding: '15px', fontFamily: 'monospace', fontSize: '14px', color: '#000000', border: '2px solid #333333', backgroundColor: '#ffffff', borderRadius: '4px' }} 
      />

      <button 
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)} 
        style={{ width: '100%', padding: '15px', backgroundColor: '#1A2421', color: '#ffffff', marginTop: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', border: 'none' }}
      >
        𝕏 Share via Telegraph
      </button>

      <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '2px solid #D1D1C6', paddingTop: '30px' }}>
        <p style={{ color: '#333333', fontStyle: 'italic', marginBottom: '15px' }}>If you enjoyed this absolute rubbish...</p>
        <a 
          href="YOUR_LINK_HERE" 
          target="_blank" 
          style={{ 
            display: 'inline-block', 
            padding: '12px 24px', 
            backgroundColor: '#004225', 
            color: '#D4AF37', 
            fontSize: '16px', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            borderRadius: '4px' 
          }}
        >
          🫖 Buy me a proper brew (£2.50)
        </a>
      </div>
    </div>
  );
}