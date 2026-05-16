"use client";

import React, { useState } from 'react';

// --- 型定義 ---
interface Animal { 
  nameJa: string; 
  nameEn: string; 
  emoji: string; 
  messageJa: string; 
  messageEn: string;
}
interface AnimalTier { maxHours: number; animals: Animal[]; }
interface ResultData { hours: string; quid: string; score: number; legend: string; animal: Animal; }

const ANIMAL_TIERS: AnimalTier[] = [
  { maxHours: 0.5, animals: [{ nameJa: "渡り鳥", nameEn: "Migrating Bird", emoji: "🕊️", messageJa: "0時間。空を飛びながら脳を半分ずつ寝かせているのかい？墜落する前に着陸することをお勧めするよ。", messageEn: "Zero hours? Are you sleeping with half your brain while flying? I suggest landing before you crash." }] },
  { maxHours: 2.5, animals: [{ nameJa: "キリン", nameEn: "Giraffe", emoji: "🦒", messageJa: "1.9時間？キリンの真似かい？脳への血圧が心配だから早く長い首を休めたまえ。", messageEn: "1.9 hours? Mimicking a giraffe? Give that long neck a rest." }] },
  { maxHours: 4.5, animals: [{ nameJa: "ウマ", nameEn: "Horse", emoji: "🐎", messageJa: "立ったまま寝ていたのかい？草食動物の鑑だね。常に警戒を怠らないのは立派だよ。", messageEn: "Sleeping while standing? A true herbivore. Your vigilance is commendable." }] },
  { maxHours: 6.5, animals: [{ nameJa: "ゾウ", nameEn: "Elephant", emoji: "🐘", messageJa: "巨体を維持するために食べるのが忙しいんだね。睡眠不足で足元がふらつかないように。", messageEn: "Too busy eating to sleep? I suppose maintaining that bulk takes priority over a proper nap." }] },
  { maxHours: 8.5, animals: [{ nameJa: "ウサギ", nameEn: "Rabbit", emoji: "🐇", messageJa: "人間並みの睡眠時間だが心休まる暇はなさそうだ。目を開けたまま寝ていないかい？", messageEn: "Human levels of rest, yet you still look startled. Are you sleeping with your eyes open?" }] },
  { maxHours: 11.5, animals: [{ nameJa: "コーギー", nameEn: "Corgi", emoji: "🐶", messageJa: "実にお利口な睡眠時間だ。ロイヤルな気分で散歩に出かける準備はできているかな？", messageEn: "A sensible, royal nap. Ready for a brisk walk?" }] },
  { maxHours: 14.5, animals: [{ nameJa: "アナグマ", nameEn: "Badger", emoji: "🦡", messageJa: "今日はバンクホリデー（祝日）に違いない。巣穴でのんびりしたまえ。夜中に庭を荒らす気力も十分だね。", messageEn: "Must be a bank holiday. Enjoy doing absolutely nothing in your sett." }] },
  { maxHours: 19.5, animals: [{ nameJa: "ネコ", nameEn: "Cat", emoji: "🐈", messageJa: "戦略的休息のマスターだね。人間がたどり着けない、至高の安らぎに到達しただけなのだから。", messageEn: "A masterclass in strategic repose. You’ve achieved a level of serenity humans can only dream of." }] },
  { maxHours: 99, animals: [{ nameJa: "コアラ", nameEn: "Koala", emoji: "🐨", messageJa: "22時間。おめでとう、君はユーカリの毒にやられたコアラだ。もはや銀行口座を解約しても気づかないだろうね。", messageEn: "22 hours. Congratulations, you’re a koala dazed by eucalyptus. You wouldn’t even notice if we closed your account." }] }
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

    setResult({ hours: hours.toFixed(1), quid: formattedQuid, score: score, legend: legend, animal: tier.animals[0] });
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
            <p style={{ fontSize: '10px', letterSpacing: '2px' }}>OFFICIAL AUDIT REPORT</p>
            <h2 style={{ fontSize: '24px', margin: '5px 0 0 0', fontWeight: 'normal' }}>{result.legend}</h2>
            <p style={{ fontSize: '14px', margin: '2px 0 10px 0', opacity: 0.9, fontWeight: 'bold' }}>- {result.animal.nameJa} ({result.animal.nameEn}) -</p>

            <div style={{ fontSize: '75px', margin: '20px 0' }}>{result.animal.emoji}</div>
            
            {/* スコア・時間表示 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.08)', padding: '15px 10px', borderRadius: '12px', margin: '20px 0' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', margin: 0, opacity: 0.8 }}>TOTAL BALANCE</p>
                <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '2px 0' }}>£{result.quid}</p>
                <p style={{ fontSize: '8px', margin: '2px 0 0 0', opacity: 0.6, fontFamily: 'monospace' }}>
                  Rate: £50K × {result.hours}h × {result.score}/8
                </p>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(212, 175, 55, 0.3)' }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', margin: 0, opacity: 0.8 }}>AUDITED DURATION</p>
                <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '2px 0' }}>{result.hours}h</p>
                <p style={{ fontSize: '8px', margin: '2px 0 0 0', opacity: 0.6 }}>Certified standard</p>
              </div>
            </div>

            <p style={{ fontSize: '15px', fontStyle: 'italic', margin: '15px 0 5px 0', lineHeight: '1.4' }}>"{result.animal.messageEn}"</p>
            <p style={{ fontSize: '11px', opacity: 0.8, margin: 0 }}>({result.animal.messageJa})</p>
          </div>

          {/* 𝕏 シェアボタン */}
          <button onClick={() => {
            const text = `🏛️ Royal Sleep Bank Audit\n🎖️ Rating: ${result.legend} (${result.animal.nameEn})\n💰 Score: £${result.quid}\n📊 Formula: £50K × ${result.hours}h × ${result.score}/8\n#RoyalSleepBank`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
          }} style={{ width: '100%', padding: '15px', backgroundColor: '#1A2421', color: '#fff', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>𝕏 SHARE RESULT</button>
        </div>
      )}

      {/* --- フッター（セキュリティ宣言を追加！） --- */}
      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#888', fontSize: '10px', lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 4px 0', fontStyle: 'italic', letterSpacing: '0.5px' }}>
          🔒 your data never leaves this device. No servers. No tracking.
        </p>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © 2026 THE ROYAL SLEEP BANK OF BRITAIN
        </p>
      </footer>
    </div>
  );
}