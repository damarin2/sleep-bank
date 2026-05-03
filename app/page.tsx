"use client";

import React, { useState } from 'react';

// --- 🦁 グループ分けされた動物の睡眠データ ---
const ANIMAL_TIERS = [
  {
    maxHours: 4, // 0〜3.9時間
    tierName: "2時間",
    animals: [
      { name: "キリン", emoji: "🦒", message: "超ショートスリーパー！立ったまま寝る達人です。" },
      { name: "ウマ", emoji: "🐴", message: "立ったまま器用に仮眠をとる省エネな睡眠スタイルです。" },
      { name: "ロバ", emoji: "🫏", message: "短い睡眠でもしっかり休息をとるタフな動物です。" }
    ]
  },
  {
    maxHours: 6, // 4.0〜5.9時間
    tierName: "4時間",
    animals: [
      { name: "ウシ", emoji: "🐄", message: "反芻しながら休むため、熟睡の時間は短めです。" },
      { name: "ゾウ", emoji: "🐘", message: "巨体を維持するため、食べる時間が長く睡眠は短めです。" },
      { name: "ヒツジ", emoji: "🐑", message: "群れで安全を確保しながら、短時間で睡眠をとります。" }
    ]
  },
  {
    maxHours: 8, // 6.0〜7.9時間
    tierName: "6時間",
    animals: [
      { name: "ハイイロアザラシ", emoji: "🦭", message: "水中でも陸上でも器用に寝る、なかなかの睡眠上手です。" }
    ]
  },
  {
    maxHours: 10, // 8.0〜9.9時間
    tierName: "8時間",
    animals: [
      { name: "ウサギ", emoji: "🐇", message: "実は結構寝るタイプ。安全な場所でぐっすり休みます。" },
      { name: "ブタ", emoji: "🐖", message: "人間と同じくらい理想的な睡眠時間をとる動物です。" }
    ]
  },
  {
    maxHours: 12, // 10.0〜11.9時間
    tierName: "10時間",
    animals: [
      { name: "ヒョウ", emoji: "🐆", message: "木の上でリラックス。肉食動物ならではの余裕のある睡眠です。" },
      { name: "モグラ", emoji: "🐾", message: "暗い土の中で安心しきって、たっぷり眠ります。" },
      { name: "ハリネズミ", emoji: "🦔", message: "夜に備えて、昼間は丸くなってぐっすり夢の中です。" }
    ]
  },
  {
    maxHours: 14, // 12.0〜13.9時間
    tierName: "12時間",
    animals: [
      { name: "ゴリラ", emoji: "🦍", message: "ベッドを作って寝る賢い動物！しっかり睡眠をとります。" },
      { name: "キツネ", emoji: "🦊", message: "ふかふかのしっぽに包まれて、たっぷり休息をとります。" },
      { name: "オオカミ", emoji: "🐺", message: "仲間と一緒に安心して長めの睡眠をとります。" }
    ]
  },
  {
    maxHours: 16, // 14.0〜15.9時間
    tierName: "14時間",
    animals: [
      { name: "ネコ", emoji: "🐈", message: "「寝子」の名の通り！一日中ゴロゴロしてエネルギーを充電します。" },
      { name: "ハムスター", emoji: "🐹", message: "夜中の大運動会に備えて、昼間はたっぷり爆睡します。" }
    ]
  },
  {
    maxHours: 18, // 16.0〜17.9時間
    tierName: "16時間",
    animals: [
      { name: "ホッキョクジリス", emoji: "🐿️", message: "冬眠の達人！厳しい寒さを乗り越える驚異的な睡眠力です。" }
    ]
  },
  {
    maxHours: 20, // 18.0〜19.9時間
    tierName: "18時間",
    animals: [
      { name: "アルマジロ", emoji: "🪖", message: "硬い甲羅で丸まりながら、一日の大半を寝て過ごします。" } // 丸くなるイメージでヘルメットを採用
    ]
  },
  {
    maxHours: 99, // 20.0時間以上（上限なし）
    tierName: "20時間以上",
    animals: [
      { name: "コアラ", emoji: "🐨", message: "ユーカリを消化するため、一日中寝ている伝説のスリーパー。" },
      { name: "ナマケモノ", emoji: "🦥", message: "省エネの極み！動くことすら忘れて圧倒的な睡眠を貪ります。" }
    ]
  }
];

export default function TwitterShareExperiment() {
  const [hours, setHours] = useState<number>(7);
  const [mood, setMood] = useState<string>("boast");
  const [text, setText] = useState<string>("");
  const [matchedAnimal, setMatchedAnimal] = useState<any>(null);

  const handleGenerateText = () => {
    // 預金（Zzz）の計算
    const earnedZzz = hours * 100000;
    const formattedZzz = earnedZzz.toLocaleString();

    // --- 🌟 ランダム動物マッチングロジック ---
    let possibleAnimals: any[] = [];
    let currentTierName = "";

    // 1. 睡眠時間がどのグループ（階層）に入るか探す
    for (const tier of ANIMAL_TIERS) {
      if (hours < tier.maxHours) {
        possibleAnimals = tier.animals;
        currentTierName = tier.tierName;
        break; // グループが見つかったら探すのをやめる
      }
    }

    // 2. 見つかったグループの動物リストの中から、ランダムに1匹選ぶ（ガチャ！）
    const randomIndex = Math.floor(Math.random() * possibleAnimals.length);
    const randomAnimal = possibleAnimals[randomIndex];
    
    // 画面表示用に、動物データに「〇時間級」という情報もくっつけて保存する
    setMatchedAnimal({ ...randomAnimal, tierName: currentTierName });

    // --- 📝 明細書風テキストの作成 ---
    const line = `───────────────`;
    let comment = "";

    if (mood === "boast") {
      comment = "圧倒的睡眠！これで今日も絶好調だぜ👑";
    } else if (mood === "humble") {
      comment = "今日もコツコツ睡眠預金を積み立てました🍵";
    } else if (mood === "tired") {
      comment = "なんとか寝たけど、もっとがっつり寝たい🥺";
    }

    const generatedString = `
🏧 睡眠預金の明細書 🏧
${line}
🛌 睡眠時間：${hours}時間
🦁 あなたの動物：${randomAnimal.name}級 ${randomAnimal.emoji}
💰 本日の預金：${formattedZzz} Zzz
${line}
🗣️ ${comment}

👇あなたも睡眠を価値に変える
#BANK_OF_Zzz #睡眠貯金
`.trim();

    setText(generatedString);
  };

  const handleShare = () => {
    if (!text) {
      alert("先にテキストを生成してください！");
      return;
    }
    const encodedText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>🐦 動物睡眠診断 ＆ Xシェア</h2>

      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>本日の睡眠時間は？</label>
          <input 
            type="number" 
            step="0.5"
            value={hours} 
            onChange={(e) => setHours(Number(e.target.value))}
            style={{ padding: '8px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
          /> 時間
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>今の気分は？</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="boast">👑 めちゃくちゃ自慢したい！</option>
            <option value="humble">🍵 控えめに報告したい</option>
            <option value="tired">🥺 疲れをアピールしたい</option>
          </select>
        </div>

        <button
          onClick={handleGenerateText}
          style={{ width: '100%', padding: '10px', backgroundColor: '#fbbf24', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ✨ 自分の動物タイプと明細を発行する！
        </button>
      </div>

      {/* --- 🌟 判定された動物のカード表示 --- */}
      {matchedAnimal && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', border: '2px dashed #fbbf24', borderRadius: '12px', marginBottom: '20px' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>＼ あなたの睡眠は… ／</p>
          <div style={{ fontSize: '60px', margin: '10px 0' }}>{matchedAnimal.emoji}</div>
          <h3 style={{ margin: 0, fontSize: '24px' }}>【{matchedAnimal.name}（{matchedAnimal.tierName}級）】</h3>
          <p style={{ fontSize: '14px', color: '#555', marginTop: '10px', lineHeight: '1.5' }}>
            {matchedAnimal.message}
          </p>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={9}
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '15px', resize: 'none', marginBottom: '15px' }}
      />

      <button
        onClick={handleShare}
        style={{ width: '100%', padding: '14px', backgroundColor: '#1DA1F2', color: 'white', border: 'none', borderRadius: '9999px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        🐦 Xに結果をシェアする
      </button>
    </div>
  );
}