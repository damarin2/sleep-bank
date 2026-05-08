"use client";

import React, { useState } from 'react';

// --- 型定義 ---
interface Animal { nameJa: string; nameEn: string; emoji: string; messageJa: string; messageEn: string; }
interface AnimalTier { maxHours: number; animals: Animal[]; }
interface ResultData { hours: string; quid: string; score: number; legend: string; reason: string; animal: Animal; }

const ANIMAL_TIERS: AnimalTier[] = [
  { maxHours: 0.5, animals: [{ nameJa: "渡り鳥", nameEn: "Migrating Bird", emoji: "🕊️", messageJa: "0時間。墜落する前に着陸することをお勧めするよ。", messageEn: "Zero hours? I suggest landing before you crash." }] },
  { maxHours: 2.5, animals: [{ nameJa: "キリン", nameEn: "Giraffe", emoji: "🦒", messageJa: "1.9時間？脳への血圧が心配だから早く首を休めたまえ。", messageEn: "1.9 hours? Mimicking a giraffe? Give that neck a rest." }] },
  { maxHours: 4.5, animals: [{ nameJa: "ウマ", nameEn: "Horse", emoji: "🐎", messageJa: "立ったまま寝ていたのかい？草食動物の鑑だね。", messageEn: "Sleeping while standing? A true herbivore." }] },
  { maxHours: 6.5, animals: [{ nameJa: "ゾウ", nameEn: "Elephant", emoji: "🐘", messageJa: "巨体を維持するために食べるのが忙しいんだね。", messageEn: "Too busy eating to sleep?" }] },
  { maxHours: 8.5, animals: [{ nameJa: "ウサギ", nameEn: "Rabbit", emoji: "🐇", messageJa: "目を開けたまま寝ていないかい？", messageEn: "Are you sleeping with your eyes open?" }] },
  { maxHours: 11.5, animals: [{ nameJa: "コーギー", nameEn: "Corgi", emoji: "🐶", messageJa: "実にお利口な睡眠時間だ。散歩の準備はいいかな？", messageEn: "A sensible, royal nap." }] },
  { maxHours: 14.5, animals: [{ nameJa: "アナグマ", nameEn: "Badger", emoji: "🦡", messageJa: "今日はバンクホリデーに違いない。巣穴でのんびりしたまえ。", messageEn: "Must be a bank holiday. Enjoy your sett." }] },
  { maxHours: 19.5, animals: [{ nameJa: "ネコ", nameEn: "Cat", emoji: "🐈", messageJa: "戦略的休息のマスターだ。至高の安らぎに到達したのだね。", messageEn: "A masterclass in strategic repose." }] },
  { maxHours: 99, animals: [{ nameJa: "コアラ", nameEn: "Koala", emoji: "🐨", messageJa: "22時間。君はユーカリの毒にやられたコアラだ。", messageEn: "22 hours. Congratulations, you’re a dazed koala." }] }
];

export default function RoyalSleepCardApp() {
  const [bedtime, setBedtime] = useState<string>("23:00");
  const [wakeupTime, setWakeupTime] = useState<string>("06:30");
  const [moodScore, setMoodScore] = useState<string>("5");
  const [result, setResult] = useState<ResultData | null>(null);

  const handleGenerate = () => {
    const getHours = (s: string, e: string): number => {
      const [sh, sm] = s.split(':').map(Number);
      const [eh, em] = e.split(':').map(Number);
      let diff = (eh + em/60) - (sh + sm/60);
      return diff < 0 ? diff + 24 : diff;
    };
    const hours = getHours(bedtime, wakeupTime);
    const score = parseInt(moodScore);
    const rawQuid = (hours * 50000) * (score / 8);
    const formattedQuid = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(rawQuid);

    let legend = hours <= 0.5 ? "Aviator Class" : hours <= 2.5 ? "Giraffe Class" : hours <= 4.5 ? "Napoleon Class" : hours <= 8.5 ? "World Leader Class" : hours <= 11.5 ? "Einstein Class" : hours <= 14.5 ? "Holidaymaker Class" : hours <= 19.5 ? "The Zen Master" : "Hibernation Class";
    const tier = ANIMAL_TIERS.find(t => hours < t.maxHours) || ANIMAL_TIERS[ANIMAL_TIERS.length - 1];

    setResult({ hours: hours.toFixed(1), quid: formattedQuid, score: score, legend: legend, reason: "Certified Sleep Audit", animal: tier.animals[0] });
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'serif', maxWidth: '500px', margin: '0 auto', backgroundColor: '#F4F4EE', minHeight: '100vh', color: '#000' }}>
      <h1 style={{ textAlign: 'center', color: '#004225', fontSize: '22px', letterSpacing: '3px', marginBottom: '30px', fontWeight: 'bold' }}>🏛️ THE ROYAL SLEEP BANK</h1>

      {/* --- 入力エリア --- */}
      <div style={{ backgroundColor: '#fff', padding: '25px', border: '2px solid #333', borderRadius: '8px', marginBottom: '30px', boxShadow: '5px 5px 0px #333' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>BEDTIME</label>
            <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #333' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>WAKE UP</label>
            <input type="time" value={wakeupTime} onChange={(e) => setWakeupTime(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #333' }} />
          </div>
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>MORNING CONDITION (1-8)</label>
          <select value={moodScore} onChange={(e) => setMoodScore(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #333', backgroundColor: '#fff' }}>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n.toString()}>{n}</option>)}
          </select>
        </div>
        <button onClick={handleGenerate} style={{ width: '100%', padding: '18px', backgroundColor: '#004225', color: '#D4AF37', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>ISSUE AUDIT STATEMENT</button>
      </div>

      {/* --- 結果カードエリア --- */}
      {result && (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ backgroundColor: '#004225', color: '#D4AF37', padding: '30px', borderRadius: '16px', border: '2px solid #D4AF37', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', letterSpacing: '2px' }}>OFFICIAL AUDIT</p>
            <h2 style={{ fontSize: '24px', margin: '5px 0' }}>{result.legend}</h2>
            <div style={{ fontSize: '70px', margin: '15px 0' }}>{result.animal.emoji}</div>
            
            {/* スコア表示（ただのテキストです。ボタンではありません） */}
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.08)', padding: '15px', borderRadius: '12px', margin: '20px 0' }}>
              <div>
                <p style={{ fontSize: '10px', margin: 0 }}>SLEEP SCORE</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>£{result.quid}</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', margin: 0 }}>DURATION</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{result.hours}h</p>
              </div>
            </div>

            <p style={{ fontSize: '14px', fontStyle: 'italic' }}>"{result.animal.messageEn}"</p>
            <p style={{ fontSize: '11px', opacity: 0.8 }}>({result.animal.messageJa})</p>
          </div>

          {/* 𝕏 シェアボタン（これだけは残しています） */}
          <button onClick={() => {
            const text = `🏛️ Royal Sleep Bank Audit\n🎖️ Rating: ${result.legend}\n🦁 Animal: ${result.animal.nameEn}\n💰 Score: £${result.quid}\n#RoyalSleepBank`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
          }} style={{ width: '100%', padding: '15px', backgroundColor: '#1A2421', color: '#fff', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>𝕏 SHARE RESULT</button>
        </div>
      )}

      {/* フッター：ここにリンクがないことを確認してください */}
      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#888', fontSize: '10px' }}>
        © 2026 THE ROYAL SLEEP BANK OF BRITAIN
      </footer>
    </div>
  );
}