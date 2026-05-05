"use client";

import React, { useState } from 'react';

// --- 🦁 グループ分けされた動物の睡眠データ（バイリンガル対応） ---
const ANIMAL_TIERS = [
  {
    maxHours: 4,
    tierName: "2時間 / 2h",
    animals: [
      { nameJa: "キリン", nameEn: "Giraffe", emoji: "🦒", messageJa: "超ショートスリーパー！立ったまま寝る達人です。", messageEn: "Ultimate short sleeper! A master of sleeping standing up." },
      { nameJa: "ウマ", nameEn: "Horse", emoji: "🐴", messageJa: "立ったまま器用に仮眠をとる省エネな睡眠スタイルです。", messageEn: "An energy-saving sleep style, adept at napping while standing." },
      { nameJa: "ロバ", nameEn: "Donkey", emoji: "🫏", messageJa: "短い睡眠でもしっかり休息をとるタフな動物です。", messageEn: "A tough animal that gets proper rest even with a short sleep." }
    ]
  },
  {
    maxHours: 6,
    tierName: "4時間 / 4h",
    animals: [
      { nameJa: "ウシ", nameEn: "Cow", emoji: "🐄", messageJa: "反芻しながら休むため、熟睡の時間は短めです。", messageEn: "Rests while chewing the cud, so deep sleep is brief." },
      { nameJa: "ゾウ", nameEn: "Elephant", emoji: "🐘", messageJa: "巨体を維持するため、食べる時間が長く睡眠は短めです。", messageEn: "Sleeps less because it spends so much time eating to maintain its massive body." },
      { nameJa: "ヒツジ", nameEn: "Sheep", emoji: "🐑", messageJa: "群れで安全を確保しながら、短時間で睡眠をとります。", messageEn: "Sleeps in short bursts while ensuring safety in numbers." }
    ]
  },
  {
    maxHours: 8,
    tierName: "6時間 / 6h",
    animals: [
      { nameJa: "ハイイロアザラシ", nameEn: "Gray Seal", emoji: "🦭", messageJa: "水中でも陸上でも器用に寝る、なかなかの睡眠上手です。", messageEn: "Quite the sleep expert, snoozing effortlessly both on land and in water." }
    ]
  },
  {
    maxHours: 10,
    tierName: "8時間 / 8h",
    animals: [
      { nameJa: "ウサギ", nameEn: "Rabbit", emoji: "🐇", messageJa: "実は結構寝るタイプ。安全な場所でぐっすり休みます。", messageEn: "Actually sleeps quite a bit. Rests soundly in a safe place." },
      { nameJa: "ブタ", nameEn: "Pig", emoji: "🐖", messageJa: "人間と同じくらい理想的な睡眠時間をとる動物です。", messageEn: "An animal that gets an ideal amount of sleep, much like humans." }
    ]
  },
  {
    maxHours: 12,
    tierName: "10時間 / 10h",
    animals: [
      { nameJa: "ヒョウ", nameEn: "Leopard", emoji: "🐆", messageJa: "木の上でリラックス。肉食動物ならではの余裕のある睡眠です。", messageEn: "Relaxing up in the trees. A leisurely sleep typical of apex predators." },
      { nameJa: "モグラ", nameEn: "Mole", emoji: "🐾", messageJa: "暗い土の中で安心しきって、たっぷり眠ります。", messageEn: "Sleeps deeply and securely in the dark soil." },
      { nameJa: "ハリネズミ", nameEn: "Hedgehog", emoji: "🦔", messageJa: "夜に備えて、昼間は丸くなってぐっすり夢の中です。", messageEn: "Curled up dreaming all day to prepare for the night." }
    ]
  },
  {
    maxHours: 14,
    tierName: "12時間 / 12h",
    animals: [
      { nameJa: "ゴリラ", nameEn: "Gorilla", emoji: "🦍", messageJa: "ベッドを作って寝る賢い動物！しっかり睡眠をとります。", messageEn: "A smart animal that makes its own bed! Gets plenty of solid sleep." },
      { nameJa: "キツネ", nameEn: "Fox", emoji: "🦊", messageJa: "ふかふかのしっぽに包まれて、たっぷり休息をとります。", messageEn: "Gets plenty of rest wrapped up in its fluffy tail." },
      { nameJa: "オオカミ", nameEn: "Wolf", emoji: "🐺", messageJa: "仲間と一緒に安心して長めの睡眠をとります。", messageEn: "Takes long, secure sleeps alongside its pack." }
    ]
  },
  {
    maxHours: 16,
    tierName: "14時間 / 14h",
    animals: [
      { nameJa: "ネコ", nameEn: "Cat", emoji: "🐈", messageJa: "一日中ゴロゴロしてエネルギーを充電します。", messageEn: "Lounges around all day recharging its energy." },
      { nameJa: "ハムスター", nameEn: "Hamster", emoji: "🐹", messageJa: "夜中の大運動会に備えて、昼間はたっぷり爆睡します。", messageEn: "Sleeps heavily during the day to prep for its midnight marathon." }
    ]
  },
  {
    maxHours: 18,
    tierName: "16時間 / 16h",
    animals: [
      { nameJa: "ホッキョクジリス", nameEn: "Arctic Squirrel", emoji: "🐿️", messageJa: "冬眠の達人！厳しい寒さを乗り越える驚異的な睡眠力です。", messageEn: "A hibernation master! Incredible sleeping power to survive the bitter cold." }
    ]
  },
  {
    maxHours: 20,
    tierName: "18時間 / 18h",
    animals: [
      { nameJa: "アルマジロ", nameEn: "Armadillo", emoji: "🪖", messageJa: "硬い甲羅で丸まりながら、一日の大半を寝て過ごします。", messageEn: "Spends most of the day sleeping curled up in its hard shell." }
    ]
  },
  {
    maxHours: 99,
    tierName: "20時間以上 / 20h+",
    animals: [
      { nameJa: "コアラ", nameEn: "Koala", emoji: "🐨", messageJa: "ユーカリを消化するため、一日中寝ている伝説のスリーパー。", messageEn: "A legendary sleeper, snoozing all day to digest eucalyptus." },
      { nameJa: "ナマケモノ", nameEn: "Sloth", emoji: "🦥", messageJa: "省エネの極み！動くことすら忘れて圧倒的な睡眠を貪ります。", messageEn: "The ultimate energy saver! Forgets to even move and simply devours sleep." }
    ]
  }
];

export default function TwitterShareExperiment() {
  const [bedtime, setBedtime] = useState<string>("23:00");
  const [wakeupTime, setWakeupTime] = useState<string>("07:00");
  const [mood, setMood] = useState<string>("boast");
  const [text, setText] = useState<string>("");
  const [matchedAnimal, setMatchedAnimal] = useState<any>(null);

  const getSleepDuration = (bed: string, wake: string): number => {
    if (!bed || !wake) return 0;
    const [bedHour, bedMin] = bed.split(':').map(Number);
    const [wakeHour, wakeMin] = wake.split(':').map(Number);
    
    let bedDecimal = bedHour + (bedMin / 60);
    let wakeDecimal = wakeHour + (wakeMin / 60);
    
    if (wakeDecimal < bedDecimal) {
      wakeDecimal += 24;
    }
    
    return wakeDecimal - bedDecimal;
  };

  const handleGenerateText = () => {
    const hours = getSleepDuration(bedtime, wakeupTime);
    const displayHours = Number.isInteger(hours) ? hours : hours.toFixed(1);

    const earnedZzz = hours * 100000;
    const formattedZzz = earnedZzz.toLocaleString();

    let possibleAnimals: any[] = [];
    let currentTierName = "";

    for (const tier of ANIMAL_TIERS) {
      if (hours < tier.maxHours) {
        possibleAnimals = tier.animals;
        currentTierName = tier.tierName;
        break;
      }
    }

    const randomIndex = Math.floor(Math.random() * possibleAnimals.length);
    const randomAnimal = possibleAnimals[randomIndex];
    
    setMatchedAnimal({ ...randomAnimal, tierName: currentTierName });

    const line = `───────────────`;
    
    // 気分コメントのバイリンガル設定
    let commentJa = "";
    let commentEn = "";

    if (mood === "boast") {
      commentJa = "圧倒的睡眠！これで今日も絶好調だぜ👑";
      commentEn = "Overwhelming sleep! Feeling absolutely invincible today👑";
    } else if (mood === "humble") {
      commentJa = "今日もコツコツ睡眠預金を積み立てました🍵";
      commentEn = "Steadily built up my sleep savings again today🍵";
    } else if (mood === "tired") {
      commentJa = "なんとか寝たけど、もっとがっつり寝たい🥺";
      commentEn = "Barely slept, I just want to crash for hours🥺";
    }

    const generatedString = `
🏧 睡眠預金 / Sleep Bank 🏧
${line}
🛌 時間 / Time：${displayHours}h (${bedtime}〜${wakeupTime})
🦁 動物 / Animal：${randomAnimal.nameJa} (${randomAnimal.nameEn}) ${randomAnimal.emoji}
💰 預金 / Deposit：${formattedZzz} Zzz
${line}
🇯🇵 ${randomAnimal.messageJa}
🇬🇧 ${randomAnimal.messageEn}

🗣️ JP: ${commentJa}
🗣️ EN: ${commentEn}

👇あなたも睡眠を価値に変える
#BANK_OF_Zzz #睡眠貯金
`.trim();

    setText(generatedString);
  };

  const handleShare = () => {
    if (!text) {
      alert("先にテキストを生成してください！ / Please generate text first!");
      return;
    }
    const encodedText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#111', fontWeight: 'bold' }}>🐦 睡眠動物診断 / Sleep Animal Test</h2>

      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#111' }}>寝た時間 / Bedtime 💤</label>
            <input 
              type="time" 
              value={bedtime} 
              onChange={(e) => setBedtime(e.target.value)}
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #9ca3af', backgroundColor: '#fff', color: '#111', fontSize: '16px', fontWeight: 'bold' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#111' }}>起きた時間 / Wakeup ☀️</label>
            <input 
              type="time" 
              value={wakeupTime} 
              onChange={(e) => setWakeupTime(e.target.value)}
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #9ca3af', backgroundColor: '#fff', color: '#111', fontSize: '16px', fontWeight: 'bold' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#111' }}>気分は？ / How are you feeling?</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #9ca3af', backgroundColor: '#fff', color: '#111', fontSize: '16px', fontWeight: 'bold' }}
          >
            <option value="boast">👑 めちゃくちゃ自慢したい！ (Thriving!)</option>
            <option value="humble">🍵 控えめに報告したい (Just okay)</option>
            <option value="tired">🥺 疲れをアピールしたい (Exhausted...)</option>
          </select>
        </div>

        <button
          onClick={handleGenerateText}
          style={{ width: '100%', padding: '12px', backgroundColor: '#fbbf24', color: '#111', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          ✨ 自分の動物タイプを発行 / Generate!
        </button>
      </div>

      {matchedAnimal && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', border: '3px dashed #fbbf24', borderRadius: '12px', marginBottom: '20px' }}>
          <p style={{ margin: 0, color: '#555', fontSize: '14px', fontWeight: 'bold' }}>＼ あなたの睡眠は… / Your sleep is... ／</p>
          <div style={{ fontSize: '60px', margin: '10px 0' }}>{matchedAnimal.emoji}</div>
          <h3 style={{ margin: 0, fontSize: '24px', color: '#111' }}>
            【{matchedAnimal.nameJa} / {matchedAnimal.nameEn}】
          </h3>
          <p style={{ fontSize: '15px', color: '#222', marginTop: '15px', lineHeight: '1.6', fontWeight: 'bold' }}>
            🇯🇵 {matchedAnimal.messageJa}
          </p>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '5px', lineHeight: '1.6', fontWeight: 'bold' }}>
            🇬🇧 {matchedAnimal.messageEn}
          </p>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #9ca3af', backgroundColor: '#fff', color: '#111', fontSize: '14px', fontWeight: '500', resize: 'none', marginBottom: '15px', lineHeight: '1.5' }}
      />

      <button
        onClick={handleShare}
        style={{ width: '100%', padding: '14px', backgroundColor: '#1DA1F2', color: 'white', border: 'none', borderRadius: '9999px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(29, 161, 242, 0.3)' }}
      >
        🐦 Xにシェア / Share on X
      </button>
    </div>
  );
}

