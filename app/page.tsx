"use client";

import React, { useState } from 'react';

// --- 🦁 生態学的データに基づいた動物階級 ---
const ANIMAL_TIERS = [
  { maxHours: 3.5, animals: [{ nameJa: "ウマ", nameEn: "Horse", emoji: "🐎", messageJa: "立ったまま寝ていたのかい？草食動物の鑑だね。常に警戒を怠らないのは立派だよ。", messageEn: "Sleeping while standing? A true herbivore. Your vigilance is commendable, if not slightly paranoid." }] },
  { maxHours: 5.5, animals: [{ nameJa: "ゾウ", nameEn: "Elephant", emoji: "🐘", messageJa: "食べるのに忙しくて寝る暇がないんだね。巨体を維持するのは大変だろう？", messageEn: "Too busy eating to sleep? I suppose maintaining that bulk takes priority over rest." }] },
  { maxHours: 8.5, animals: [{ nameJa: "ウサギ", nameEn: "Rabbit", emoji: "🐇", messageJa: "目を開けたまま寝ていないかい？人間並みの睡眠時間だが、心休まる暇はなさそうだ。", messageEn: "Sleeping with eyes open? You’ve reached human levels, yet you still look startled." }] },
  { maxHours: 10.5, animals: [{ nameJa: "コーギー", nameEn: "Corgi", emoji: "🐶", messageJa: "王室の愛犬らしい、実にお利口な睡眠時間だ。散歩の準備は万端かな？", messageEn: "A sensible, royal nap. Ready for a brisk walk and some BBC Radio 4?" }] },
  { maxHours: 13.5, animals: [{ nameJa: "アナグマ", nameEn: "Badger", emoji: "🦡", messageJa: "巣穴にこもってじっくり寝たね。夜中に庭を荒らす準備は万端というわけだ。", messageEn: "Deep in your sett, I presume. Perfectly rested to cause chaos in the garden tonight." }] },
  { maxHours: 99, animals: [{ nameJa: "ネコ", nameEn: "Cat", emoji: "🐈", messageJa: "もはや狩りすら忘れたのかい？エネルギー温存という名の、ただの怠慢だね。", messageEn: "Forgotten how to hunt? 'Energy conservation' is a very polite way to say lazy." }] }
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
    const rawQuid = (hours * 50000) * (score / 8);
    const formattedQuid = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(rawQuid);

    // 💡 偉人格付けの根拠（生態学的理由）
    let legend = "";
    let reason = "";
    if (hours <= 3.5) {
      legend = "Napoleon Class";
      reason = "Ecological Category: Herbivore Alert. Like a Horse, you barely rest to stay safe.";
    } else if (hours <= 5.5) {
      legend = "Murakami Class";
      reason = "Ecological Category: Giant Grazer. Like an Elephant, survival takes more time than sleep.";
    } else if (hours <= 8.5) {
      legend = "Obama & Gates Class";
      reason = "Ecological Category: Social Mammal. Like a Rabbit, you maintain a balanced yet cautious rest.";
    } else if (hours <= 11.5) {
      legend = "Einstein Class";
      reason = "Ecological Category: Protected Pet. Like a Dog, you have the luxury of secure, long sleep.";
    } else if (hours <= 13.5) {
      legend = "Aristocrat Class";
      reason = "Ecological Category: Burrower. Like a Badger, you value the darkness of your den.";
    } else {
      legend = "King Kazu Class";
      reason = "Ecological Category: Apex Predator. Like a Cat, you sleep because you have no enemies.";
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
          ISSUE AUDIT STATEMENT
        </button>
      </div>

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
            <p style={{ fontSize: '11px', letterSpacing: '4px', margin: '0 0 10px 0', opacity: 0.8 }}>OFFICIAL AUDIT</p>
            <h2 style={{ fontSize: '28px', margin: '0', fontWeight: 'normal' }}>🎖️ {result.legend}</h2>
            <p style={{ fontSize: '11px', fontStyle: 'italic', margin: '8px 0 20px 0', opacity: 0.8, borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '15px' }}>
              {result.reason}
            </p>

            <div style={{ fontSize: '70px', margin: '15px 0' }}>{result.animal.emoji}</div>

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
                <p style={{ fontSize: '8px', margin: 0, opacity: 0.6 }}>Certified Biological Data</p>
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
            const text = `🏛️ The Royal Sleep Bank\n🎖️ Rating: ${result.legend}\n🦁 Animal: ${result.animal.nameEn}\n💰 Balance: £${result.quid}\n\n"${result.animal.messageEn}"\n#RoyalSleepBank`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
          }} style={{ width: '100%', padding: '16px', backgroundColor: '#1A2421', color: '#fff', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            𝕏 SHARE YOUR AUDIT
          </button>
        </div>
      )}

      {/* 投げ銭 */}
      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '2px solid #D1D1C6', paddingTop: '30px' }}>
        <p style={{ fontSize: '14px', color: '#333', fontStyle: 'italic', marginBottom: '15px' }}>
          The Manager's tea cup is currently empty.
        </p>
        <a href="YOUR_LINK_HERE" target="_blank" style={{ color: '#004225', fontWeight: 'bold', textDecoration: 'none', border: '2px solid #004225', padding: '12px 24px', borderRadius: '4px', display: 'inline-block', backgroundColor: '#fff' }}>
          🫖 Buy the Manager a proper brew (£2.50)
        </a>
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