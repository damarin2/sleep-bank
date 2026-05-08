"use client";

import React, { useState } from 'react';

// --- 🦁 英国紳士な動物たちと査定メッセージ ---
const ANIMAL_TIERS = [
  { maxHours: 4, animals: [{ nameJa: "アーバン・フォックス", nameEn: "Urban Fox", emoji: "🦊", messageJa: "住宅ローンの金利で眠れなかったのかい？ひどい顔だよ。", messageEn: "Late night worrying about the mortgage rates? You look dreadful." }] },
  { maxHours: 6, animals: [{ nameJa: "ハト", nameEn: "Pigeon", emoji: "🕊️", messageJa: "M25の渋滞を避けるための早起きかな？悲惨な日常だね。", messageEn: "Up early to beat the M25 traffic? A truly tragic existence." }] },
  { maxHours: 8, animals: [{ nameJa: "アナグマ", nameEn: "Badger", emoji: "🦡", messageJa: "週末に庭の雑草を猛烈に抜き、天気の文句を言うには十分だ。", messageEn: "Enough energy to aggressively weed the garden and complain about the weather." }] },
  { maxHours: 10, animals: [{ nameJa: "コーギー", nameEn: "Corgi", emoji: "🐶", messageJa: "完璧で賢明な8時間。BBCラジオ4を聴く準備は万端だ。", messageEn: "A perfectly sensible 8 hours. Ready for BBC Radio 4." }] },
  { maxHours: 14, animals: [{ nameJa: "ハイランド・カウ", nameEn: "Highland Cow", emoji: "🐂", messageJa: "今日はバンクホリデー（祝日）に違いない。のんびりしたまえ。", messageEn: "Must be a bank holiday. Enjoy doing absolutely nothing." }] },
  { maxHours: 99, animals: [{ nameJa: "貴族の飼い猫", nameEn: "Aristocrat's Cat", emoji: "🐈", messageJa: "引退した貴族のような睡眠だ。仕事はあるのかい？", messageEn: "Sleeping like a retired aristocrat. Do you even have a job?" }] }
];

export default function RoyalSleepCardApp() {
  const [bedtime, setBedtime] = useState<string>("23:00");
  const [wakeupTime, setWakeupTime] = useState<string>("06:30");
  const [moodScore, setMoodScore] = useState<string>("5");
  const [result, setResult] = useState<any>(null);

  const handleGenerate = () => {
    const getHours = (s: string, e: string) => {
      const [sh, sm] = s.split(':').map(Number);
      const [eh, em] = e.split(':').map(Number);
      let diff = (eh + em/60) - (sh + sm/60);
      return diff < 0 ? diff + 24 : diff;
    };

    const hours = getHours(bedtime, wakeupTime);
    const score = parseInt(moodScore);
    
    // 💡 査定計算: 単価5万ポンド × 時間 × (スコア/満点)
    const rawQuid = (hours * 50000) * (score / 8);
    const formattedQuid = new Intl.NumberFormat('en-GB', { 
      notation: 'compact', 
      maximumFractionDigits: 1 
    }).format(rawQuid);

    // 💡 偉人格付けの根拠
    let legend = "";
    let reason = "";
    if (hours <= 4) {
      legend = "Napoleon Class";
      reason = "Less than 4h: Short sleepers who focus on conquest over comfort.";
    } else if (hours <= 6) {
      legend = "Murakami Class";
      reason = "5-6h: Methodical rest for the disciplined mind.";
    } else if (hours <= 9) {
      legend = "Obama & Gates Class";
      reason = "7-9h: The golden standard for global decision makers.";
    } else if (hours <= 11) {
      legend = "Einstein Class";
      reason = "10h+: Essential deep recovery for high-level genius.";
    } else {
      legend = "King Kazu Class";
      reason = "12h+: Professional-grade physical and mental restoration.";
    }

    const animal = ANIMAL_TIERS.find(t => hours < t.maxHours)?.animals[0];

    setResult({
      hours: hours.toFixed(1),
      quid: formattedQuid,
      score: score,
      legend: legend,
      reason: reason,
      animal: animal
    });
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: '"Georgia", serif', maxWidth: '500px', margin: '0 auto', backgroundColor: '#F4F4EE', minHeight: '100vh', color: '#000' }}>
      
      <h1 style={{ textAlign: 'center', color: '#004225', fontSize: '20px', letterSpacing: '2px', marginBottom: '30px' }}>🏛️ THE ROYAL SLEEP BANK</h1>

      {/* --- 入力セクション（視認性向上版） --- */}
      <div style={{ backgroundColor: '#fff', padding: '25px', border: '2px solid #333', borderRadius: '8px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>BEDTIME</label>
            <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #444', fontSize: '16px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>WAKE UP</label>
            <input type="time" value={wakeupTime} onChange={(e) => setWakeupTime(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #444', fontSize: '16px' }} />
          </div>
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>MORNING CONDITION (1-8)</label>
          <select value={moodScore} onChange={(e) => setMoodScore(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #444', fontSize: '16px', backgroundColor: '#fff' }}>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n === 8 ? "8 (Splendid)" : n === 1 ? "1 (Ghastly)" : n}</option>)}
          </select>
        </div>
        <button onClick={handleGenerate} style={{ width: '100%', padding: '18px', backgroundColor: '#004225', color: '#D4AF37', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', borderRadius: '4px' }}>
          ISSUE STATEMENT
        </button>
      </div>

      {/* --- 💡 なぜその結果なのかがわかる「カード型UI」 --- */}
      {result && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <div style={{ 
            backgroundColor: '#004225', 
            backgroundImage: 'linear-gradient(145deg, #004225 0%, #002515 100%)',
            color: '#D4AF37', 
            padding: '30px', 
            borderRadius: '16px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '2px solid #D4AF37',
            textAlign: 'center',
            position: 'relative'
          }}>
            <p style={{ fontSize: '11px', letterSpacing: '4px', margin: '0 0 10px 0', opacity: 0.8 }}>AUDIT REPORT</p>
            
            <h2 style={{ fontSize: '28px', margin: '0', fontWeight: 'normal' }}>🎖️ {result.legend}</h2>
            {/* 💡 偉人格付けの根拠を表示 */}
            <p style={{ fontSize: '11px', fontStyle: 'italic', margin: '8px 0 20px 0', opacity: 0.8, borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '15px' }}>
              {result.reason}
            </p>

            <div style={{ fontSize: '70px', margin: '15px 0' }}>{result.animal.emoji}</div>

            {/* 💡 残高と計算の内訳を表示 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', backgroundColor: 'rgba(255,255,255,0.07)', padding: '20px 10px', borderRadius: '12px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', margin: 0, opacity: 0.7 }}>TOTAL BALANCE</p>
                <p style={{ fontSize: '24px', margin: '2px 0', fontWeight: 'bold' }}>£{result.quid}</p>
                <p style={{ fontSize: '8px', margin: 0, opacity: 0.6 }}>Rate: £50K × {result.hours}h × {result.score}/8</p>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(212, 175, 55, 0.4)' }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', margin: 0, opacity: 0.7 }}>SLEEP DURATION</p>
                <p style={{ fontSize: '24px', margin: '2px 0', fontWeight: 'bold' }}>{result.hours}h</p>
                <p style={{ fontSize: '8px', margin: 0, opacity: 0.6 }}>Certified by Royal Bank</p>
              </div>
            </div>

            <p style={{ fontSize: '15px', fontStyle: 'italic', lineHeight: '1.6', margin: '20px 0 5px 0' }}>
              "{result.animal.messageEn}"
            </p>
            <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
              ({result.animal.messageJa})
            </p>
          </div>

          <button onClick={() => {
            const text = `🏛️ The Royal Sleep Bank\n🎖️ Rating: ${result.legend}\n🛌 Sleep: ${result.hours}h\n💰 Balance: £${result.quid}\n\n"${result.animal.messageEn}"\n#RoyalSleepBank`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
          }} style={{ width: '100%', padding: '16px', backgroundColor: '#1A2421', color: '#fff', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            𝕏 SHARE YOUR AUDIT
          </button>
        </div>
      )}

      {/* --- 投げ銭セクション（世界観の作り込み版） --- */}
      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '2px solid #D1D1C6', paddingTop: '30px' }}>
        <p style={{ fontSize: '14px', color: '#333', fontStyle: 'italic', marginBottom: '15px' }}>
          Satisfied with our banking services? <br/>
          The Manager's tea cup is currently empty.
        </p>
        <a href="YOUR_LINK_HERE" target="_blank" style={{ 
          color: '#004225', 
          fontWeight: 'bold', 
          textDecoration: 'none', 
          border: '2px solid #004225', 
          padding: '12px 24px', 
          borderRadius: '4px', 
          display: 'inline-block',
          backgroundColor: '#fff'
        }}>
          🫖 Buy the Manager a proper brew (£2.50)
        </a>
        <p style={{ fontSize: '10px', color: '#888', marginTop: '10px' }}>*Investment in tea does not guarantee better sleep.</p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}