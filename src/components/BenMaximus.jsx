"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&display=swap');

    .app-wrap, .app-wrap *, .app-wrap *::before, .app-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --sand: #f5efe6;
      --sand-dark: #e8ddd0;
      --navy: #1a3a5c;
      --navy-light: #2a5080;
      --terra: #b84c2b;
      --gold: #c8963e;
      --gold-light: #e8b865;
      --cream: #faf7f2;
      --ink: #1a1a2e;
      --muted: #6b7280;
      --success: #2d6a4f;
      --success-bg: #d8f3dc;
      --error: #c1121f;
      --error-bg: #ffe0e0;
      --white: #ffffff;
    }

    .app-wrap { font-family: 'Cormorant Garamond', Georgia, serif; color: var(--ink); }

    .app-wrap {
      min-height: 100vh;
      background: var(--sand);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow-x: hidden;
    }

    /* Decorative background pattern */
    .app-wrap::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        radial-gradient(circle at 20% 20%, rgba(26,58,92,0.06) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(200,150,62,0.07) 0%, transparent 50%),
        radial-gradient(circle at 60% 10%, rgba(184,76,43,0.04) 0%, transparent 40%);
      pointer-events: none;
      z-index: 0;
    }

    .header {
      width: 100%;
      max-width: 900px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 32px 0;
      position: relative;
      z-index: 1;
    }

    .logo {
      font-family: 'Frank Ruhl Libre', serif;
      font-size: 2rem;
      font-weight: 900;
      color: var(--navy);
      letter-spacing: -0.5px;
      direction: rtl;
    }

    .logo-sub {
      font-family: 'Cinzel', serif;
      font-size: 0.7rem;
      color: var(--gold);
      letter-spacing: 3px;
      text-transform: uppercase;
      display: block;
      margin-top: -4px;
    }

    .score-bar {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .score-item {
      text-align: center;
    }

    .score-num {
      font-family: 'Cinzel', serif;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1;
    }

    .score-num.correct { color: var(--success); }
    .score-num.wrong { color: var(--terra); }
    .score-label {
      font-size: 0.65rem;
      color: var(--muted);
      letter-spacing: 2px;
      text-transform: uppercase;
      font-family: 'Cormorant Garamond', serif;
    }

    .main-content {
      width: 100%;
      max-width: 680px;
      padding: 32px 20px 60px;
      position: relative;
      z-index: 1;
    }

    /* ── WELCOME SCREEN ── */
    .welcome-card {
      background: var(--white);
      border-radius: 24px;
      padding: 52px 48px;
      box-shadow: 0 20px 80px rgba(26,58,92,0.12), 0 4px 20px rgba(26,58,92,0.08);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .welcome-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--navy), var(--gold), var(--terra));
    }

    .welcome-hebrew {
      font-family: 'Frank Ruhl Libre', serif;
      font-size: 4rem;
      color: var(--navy);
      direction: rtl;
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .welcome-title {
      font-family: 'Cinzel', serif;
      font-size: 1rem;
      letter-spacing: 4px;
      color: var(--gold);
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    .welcome-desc {
      font-size: 1.15rem;
      color: var(--muted);
      line-height: 1.7;
      max-width: 460px;
      margin: 0 auto 36px;
    }

    .mode-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 32px;
    }

    .mode-btn {
      padding: 16px 12px;
      border: 2px solid var(--sand-dark);
      border-radius: 12px;
      background: var(--cream);
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1rem;
      color: var(--ink);
    }

    .mode-btn:hover { border-color: var(--navy); background: var(--sand); }

    .mode-btn.active {
      border-color: var(--navy);
      background: var(--navy);
      color: var(--white);
    }

    .mode-icon { font-size: 1.5rem; display: block; margin-bottom: 6px; }
    .mode-label { font-weight: 600; display: block; }
    .mode-sub { font-size: 0.8rem; color: inherit; opacity: 0.7; }

    .start-btn {
      background: var(--navy);
      color: var(--white);
      border: none;
      border-radius: 50px;
      padding: 16px 52px;
      font-family: 'Cinzel', serif;
      font-size: 1rem;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.25s;
      box-shadow: 0 6px 24px rgba(26,58,92,0.3);
    }

    .start-btn:hover {
      background: var(--navy-light);
      transform: translateY(-2px);
      box-shadow: 0 10px 32px rgba(26,58,92,0.35);
    }

    /* ── FLASHCARD ── */
    .card-wrap {
      perspective: 1200px;
    }

    .flashcard {
      background: var(--white);
      border-radius: 24px;
      padding: 56px 48px 44px;
      box-shadow: 0 20px 80px rgba(26,58,92,0.12), 0 4px 20px rgba(26,58,92,0.06);
      position: relative;
      overflow: hidden;
      animation: cardIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }

    @keyframes cardIn {
      from { opacity: 0; transform: translateY(24px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .flashcard::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--navy), var(--gold), var(--terra));
    }

    .card-type-badge {
      position: absolute;
      top: 18px;
      right: 20px;
      font-family: 'Cinzel', serif;
      font-size: 0.6rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold);
      border: 1px solid var(--gold-light);
      border-radius: 50px;
      padding: 3px 10px;
    }

    .card-counter {
      position: absolute;
      top: 18px;
      left: 20px;
      font-size: 0.75rem;
      color: var(--muted);
      font-family: 'Cormorant Garamond', serif;
    }

    .hebrew-display {
      font-family: 'Frank Ruhl Libre', serif;
      font-size: clamp(2rem, 6vw, 3.5rem);
      color: var(--navy);
      direction: rtl;
      text-align: center;
      line-height: 1.3;
      margin: 8px 0 16px;
      font-weight: 500;
    }

    .transliteration {
      text-align: center;
      font-style: italic;
      color: var(--gold);
      font-size: 1.1rem;
      margin-bottom: 40px;
      letter-spacing: 0.5px;
    }

    .divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--sand-dark), transparent);
      margin: 0 auto 32px;
    }

    .answer-label {
      font-family: 'Cinzel', serif;
      font-size: 0.65rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 10px;
      display: block;
      text-align: center;
    }

    .answer-input {
      width: 100%;
      padding: 14px 20px;
      border: 2px solid var(--sand-dark);
      border-radius: 12px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.15rem;
      color: var(--ink);
      background: var(--cream);
      outline: none;
      transition: border-color 0.2s;
      text-align: center;
    }

    .answer-input:focus { border-color: var(--navy); background: var(--white); }

    .submit-row {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .btn-primary {
      flex: 1;
      background: var(--navy);
      color: var(--white);
      border: none;
      border-radius: 12px;
      padding: 14px 24px;
      font-family: 'Cinzel', serif;
      font-size: 0.8rem;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary:hover:not(:disabled) { background: var(--navy-light); transform: translateY(-1px); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-secondary {
      padding: 14px 20px;
      background: transparent;
      color: var(--muted);
      border: 2px solid var(--sand-dark);
      border-radius: 12px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover { border-color: var(--muted); color: var(--ink); }

    /* ── CHECKING STATE ── */
    .checking-screen {
      text-align: center;
      padding: 80px 40px;
    }

    .checking-spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--sand-dark);
      border-top-color: var(--navy);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .checking-text {
      font-family: 'Cinzel', serif;
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: var(--muted);
      text-transform: uppercase;
    }

    /* ── RESULT SCREEN ── */
    .result-card {
      background: var(--white);
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 20px 80px rgba(26,58,92,0.12);
      animation: cardIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
      position: relative;
      overflow: hidden;
    }

    .result-card.correct-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--success), #52b788);
    }

    .result-card.wrong-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--terra), var(--gold));
    }

    .result-icon { font-size: 3.5rem; display: block; text-align: center; margin-bottom: 16px; }

    .result-heading {
      font-family: 'Cinzel', serif;
      font-size: 1.3rem;
      text-align: center;
      margin-bottom: 8px;
    }

    .result-heading.correct-text { color: var(--success); }
    .result-heading.wrong-text { color: var(--terra); }

    .result-hebrew {
      font-family: 'Frank Ruhl Libre', serif;
      font-size: 2.2rem;
      color: var(--navy);
      direction: rtl;
      text-align: center;
      margin: 20px 0 4px;
    }

    .result-english {
      text-align: center;
      font-size: 1.15rem;
      color: var(--muted);
      font-style: italic;
      margin-bottom: 12px;
    }

    .your-answer {
      text-align: center;
      background: var(--sand);
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 0.95rem;
      color: var(--ink);
      margin-bottom: 28px;
    }

    .your-answer span { color: var(--muted); font-size: 0.85rem; }

    .result-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .btn-mnemonic {
      background: linear-gradient(135deg, var(--terra), var(--gold));
      color: var(--white);
      border: none;
      border-radius: 12px;
      padding: 15px 24px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.25s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .btn-mnemonic:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,76,43,0.3); }
    .btn-mnemonic:disabled { opacity: 0.6; cursor: not-allowed; }

    /* ── MNEMONIC SCREEN ── */
    .mnemonic-card {
      background: var(--white);
      border-radius: 24px;
      box-shadow: 0 20px 80px rgba(26,58,92,0.12);
      overflow: hidden;
      animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1);
    }

    .mnemonic-header {
      background: linear-gradient(135deg, var(--navy), var(--navy-light));
      padding: 28px 36px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mnemonic-note { font-size: 2rem; }

    .mnemonic-header-text h3 {
      font-family: 'Cinzel', serif;
      color: var(--gold-light);
      font-size: 0.75rem;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .mnemonic-header-text p {
      color: var(--white);
      font-size: 1.1rem;
      margin-top: 2px;
    }

    .mnemonic-word-display {
      padding: 24px 36px;
      background: var(--cream);
      border-bottom: 1px solid var(--sand-dark);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .mnemonic-hebrew {
      font-family: 'Frank Ruhl Libre', serif;
      font-size: 2.2rem;
      color: var(--navy);
      direction: rtl;
    }

    .mnemonic-arrow { color: var(--gold); font-size: 1.5rem; }

    .mnemonic-english {
      font-size: 1.2rem;
      font-style: italic;
      color: var(--muted);
    }

    .mnemonic-body {
      padding: 32px 36px;
      white-space: pre-wrap;
      font-size: 1rem;
      line-height: 1.8;
      color: var(--ink);
      font-family: 'Cormorant Garamond', serif;
      border-bottom: 1px solid var(--sand-dark);
      max-height: 400px;
      overflow-y: auto;
    }

    .mnemonic-body::-webkit-scrollbar { width: 6px; }
    .mnemonic-body::-webkit-scrollbar-track { background: var(--sand); }
    .mnemonic-body::-webkit-scrollbar-thumb { background: var(--sand-dark); border-radius: 3px; }

    .mnemonic-footer {
      padding: 20px 36px;
      display: flex;
      gap: 12px;
    }

    /* ── PROGRESS BAR ── */
    .progress-strip {
      width: 100%;
      max-width: 680px;
      padding: 0 20px;
      margin-bottom: -12px;
      position: relative;
      z-index: 1;
    }

    .progress-bar-wrap {
      height: 3px;
      background: var(--sand-dark);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--navy), var(--gold));
      transition: width 0.5s ease;
    }

    /* ── CATEGORY TAGS ── */
    .category-tag {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 0.58rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 50px;
      background: var(--sand);
      color: var(--muted);
      border: 1px solid var(--sand-dark);
      margin-bottom: 20px;
    }

    /* ── STATS FOOTER ── */
    .stats-row {
      display: flex;
      gap: 24px;
      justify-content: center;
      font-size: 0.85rem;
      color: var(--muted);
      margin-top: 20px;
    }

    .streak { color: var(--gold); font-weight: 600; }

    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
    .pulse { animation: pulse 0.4s ease; }
  `}</style>
);

// ─── VOCABULARY DATA ──────────────────────────────────────────────────────────
const VOCAB_CARDS = [
  { id:1, hebrew:"שָׁלוֹם", transliteration:"Shalom", english:"hello / peace / goodbye", category:"greetings" },
  { id:2, hebrew:"בֹּקֶר טוֹב", transliteration:"Boker tov", english:"good morning", category:"greetings" },
  { id:3, hebrew:"עֶרֶב טוֹב", transliteration:"Erev tov", english:"good evening", category:"greetings" },
  { id:4, hebrew:"לַיְלָה טוֹב", transliteration:"Layla tov", english:"good night", category:"greetings" },
  { id:5, hebrew:"תּוֹדָה", transliteration:"Toda", english:"thank you", category:"greetings" },
  { id:6, hebrew:"בְּבַקָּשָׁה", transliteration:"Bevakasha", english:"please / you're welcome", category:"greetings" },
  { id:7, hebrew:"סְלִיחָה", transliteration:"Slicha", english:"excuse me / sorry", category:"greetings" },
  { id:8, hebrew:"כֵּן", transliteration:"Ken", english:"yes", category:"basics" },
  { id:9, hebrew:"לֹא", transliteration:"Lo", english:"no", category:"basics" },
  { id:10, hebrew:"אוּלַי", transliteration:"Ulay", english:"maybe / perhaps", category:"basics" },
  { id:11, hebrew:"מָה", transliteration:"Ma", english:"what", category:"questions" },
  { id:12, hebrew:"מִי", transliteration:"Mi", english:"who", category:"questions" },
  { id:13, hebrew:"אֵיפֹה", transliteration:"Eifo", english:"where", category:"questions" },
  { id:14, hebrew:"מָתַי", transliteration:"Matai", english:"when", category:"questions" },
  { id:15, hebrew:"לָמָּה", transliteration:"Lama", english:"why", category:"questions" },
  { id:16, hebrew:"אֵיךְ", transliteration:"Eich", english:"how", category:"questions" },
  { id:17, hebrew:"כַּמָּה", transliteration:"Kama", english:"how much / how many", category:"questions" },
  { id:18, hebrew:"אֲנִי", transliteration:"Ani", english:"I / me", category:"pronouns" },
  { id:19, hebrew:"אַתָּה", transliteration:"Ata", english:"you (masculine)", category:"pronouns" },
  { id:20, hebrew:"אַתְּ", transliteration:"At", english:"you (feminine)", category:"pronouns" },
  { id:21, hebrew:"הוּא", transliteration:"Hu", english:"he / it (masculine)", category:"pronouns" },
  { id:22, hebrew:"הִיא", transliteration:"Hi", english:"she / it (feminine)", category:"pronouns" },
  { id:23, hebrew:"אֲנַחְנוּ", transliteration:"Anachnu", english:"we", category:"pronouns" },
  { id:24, hebrew:"אַתֶּם", transliteration:"Atem", english:"you (plural)", category:"pronouns" },
  { id:25, hebrew:"הֵם", transliteration:"Hem", english:"they", category:"pronouns" },
  { id:26, hebrew:"אֶחָד", transliteration:"Echad", english:"one", category:"numbers" },
  { id:27, hebrew:"שְׁתַּיִם", transliteration:"Shtayim", english:"two", category:"numbers" },
  { id:28, hebrew:"שָׁלֹשׁ", transliteration:"Shalosh", english:"three", category:"numbers" },
  { id:29, hebrew:"אַרְבַּע", transliteration:"Arba", english:"four", category:"numbers" },
  { id:30, hebrew:"חָמֵשׁ", transliteration:"Chamesh", english:"five", category:"numbers" },
  { id:31, hebrew:"שֵׁשׁ", transliteration:"Shesh", english:"six", category:"numbers" },
  { id:32, hebrew:"שֶׁבַע", transliteration:"Sheva", english:"seven", category:"numbers" },
  { id:33, hebrew:"שְׁמֹנֶה", transliteration:"Shmone", english:"eight", category:"numbers" },
  { id:34, hebrew:"תֵּשַׁע", transliteration:"Tesha", english:"nine", category:"numbers" },
  { id:35, hebrew:"עֶשֶׂר", transliteration:"Eser", english:"ten", category:"numbers" },
  { id:36, hebrew:"מֵאָה", transliteration:"Meah", english:"hundred", category:"numbers" },
  { id:37, hebrew:"אֶלֶף", transliteration:"Elef", english:"thousand", category:"numbers" },
  { id:38, hebrew:"לִהְיוֹת", transliteration:"Lihyot", english:"to be", category:"verbs" },
  { id:39, hebrew:"לָלֶכֶת", transliteration:"Lalechet", english:"to go / to walk", category:"verbs" },
  { id:40, hebrew:"לָבוֹא", transliteration:"Lavo", english:"to come", category:"verbs" },
  { id:41, hebrew:"לֶאֱכֹל", transliteration:"Le'echol", english:"to eat", category:"verbs" },
  { id:42, hebrew:"לִשְׁתּוֹת", transliteration:"Lishtot", english:"to drink", category:"verbs" },
  { id:43, hebrew:"לִישֹׁן", transliteration:"Lishon", english:"to sleep", category:"verbs" },
  { id:44, hebrew:"לִקְנוֹת", transliteration:"Liknot", english:"to buy", category:"verbs" },
  { id:45, hebrew:"לִמְכֹּר", transliteration:"Limkor", english:"to sell", category:"verbs" },
  { id:46, hebrew:"לְדַבֵּר", transliteration:"Ledaber", english:"to speak / to talk", category:"verbs" },
  { id:47, hebrew:"לִשְׁמֹעַ", transliteration:"Lishmoa", english:"to hear / to listen", category:"verbs" },
  { id:48, hebrew:"לִרְאוֹת", transliteration:"Lirot", english:"to see / to watch", category:"verbs" },
  { id:49, hebrew:"לִכְתֹּב", transliteration:"Likhtov", english:"to write", category:"verbs" },
  { id:50, hebrew:"לִקְרֹא", transliteration:"Likro", english:"to read / to call", category:"verbs" },
  { id:51, hebrew:"לַעֲשׂוֹת", transliteration:"La'asot", english:"to do / to make", category:"verbs" },
  { id:52, hebrew:"לָתֵת", transliteration:"Latet", english:"to give", category:"verbs" },
  { id:53, hebrew:"לָקַחַת", transliteration:"Lakachat", english:"to take", category:"verbs" },
  { id:54, hebrew:"לְאַהֵב", transliteration:"Le'ahev", english:"to love", category:"verbs" },
  { id:55, hebrew:"לִרְצוֹת", transliteration:"Lirtzot", english:"to want", category:"verbs" },
  { id:56, hebrew:"לָדַעַת", transliteration:"Lada'at", english:"to know", category:"verbs" },
  { id:57, hebrew:"לַחְשֹׁב", transliteration:"Lachshov", english:"to think", category:"verbs" },
  { id:58, hebrew:"לְהַבִּין", transliteration:"Lehavin", english:"to understand", category:"verbs" },
  { id:59, hebrew:"לִשְׁאֹל", transliteration:"Lish'ol", english:"to ask", category:"verbs" },
  { id:60, hebrew:"לַעֲנוֹת", transliteration:"La'anot", english:"to answer / to reply", category:"verbs" },
  { id:61, hebrew:"לַעֲזֹר", transliteration:"La'azor", english:"to help", category:"verbs" },
  { id:62, hebrew:"לְהַגִּיד", transliteration:"Lehagid", english:"to say / to tell", category:"verbs" },
  { id:63, hebrew:"לְחַכּוֹת", transliteration:"Lechakot", english:"to wait", category:"verbs" },
  { id:64, hebrew:"לְהַתְחִיל", transliteration:"Lehatchil", english:"to start / to begin", category:"verbs" },
  { id:65, hebrew:"לִגְמֹר", transliteration:"Ligmor", english:"to finish / to complete", category:"verbs" },
  { id:66, hebrew:"לִנְסֹעַ", transliteration:"Linso'a", english:"to travel / to drive", category:"verbs" },
  { id:67, hebrew:"לְהַגִּיעַ", transliteration:"Lehagi'a", english:"to arrive / to reach", category:"verbs" },
  { id:68, hebrew:"לָצֵאת", transliteration:"Latzet", english:"to leave / to exit", category:"verbs" },
  { id:69, hebrew:"לִפְגֹּשׁ", transliteration:"Lifgosh", english:"to meet", category:"verbs" },
  { id:70, hebrew:"לִשְׂחֹק", transliteration:"Lisachek", english:"to play", category:"verbs" },
  { id:71, hebrew:"לִלְמֹד", transliteration:"Lilmod", english:"to study / to learn", category:"verbs" },
  { id:72, hebrew:"לְלַמֵּד", transliteration:"Lelamad", english:"to teach", category:"verbs" },
  { id:73, hebrew:"לַעֲבֹד", transliteration:"La'avod", english:"to work", category:"verbs" },
  { id:74, hebrew:"לִגּוּר", transliteration:"Ligur", english:"to live / to reside", category:"verbs" },
  { id:75, hebrew:"לִנְסּוֹת", transliteration:"Linasot", english:"to try", category:"verbs" },
  { id:76, hebrew:"לְהַכִּיר", transliteration:"Lehakir", english:"to know (a person) / to recognize", category:"verbs" },
  { id:77, hebrew:"לִשְׁכֹּחַ", transliteration:"Lishkoach", english:"to forget", category:"verbs" },
  { id:78, hebrew:"לִזְכֹּר", transliteration:"Lizkor", english:"to remember", category:"verbs" },
  { id:79, hebrew:"לְהַרְגִּישׁ", transliteration:"Lehargish", english:"to feel", category:"verbs" },
  { id:80, hebrew:"לִצְחֹק", transliteration:"Litzchoq", english:"to laugh", category:"verbs" },
  { id:81, hebrew:"לִבְכּוֹת", transliteration:"Livkot", english:"to cry", category:"verbs" },
  { id:82, hebrew:"לָרוּץ", transliteration:"Larutz", english:"to run", category:"verbs" },
  { id:83, hebrew:"לִשְׁבֹּת", transliteration:"Lishbot", english:"to rest / to strike", category:"verbs" },
  { id:84, hebrew:"לִפְתֹּחַ", transliteration:"Liftoach", english:"to open", category:"verbs" },
  { id:85, hebrew:"לִסְגֹּר", transliteration:"Lisghor", english:"to close", category:"verbs" },
  { id:86, hebrew:"הַיּוֹם", transliteration:"Hayom", english:"today", category:"time" },
  { id:87, hebrew:"מָחָר", transliteration:"Machar", english:"tomorrow", category:"time" },
  { id:88, hebrew:"אֶתְמוֹל", transliteration:"Etmol", english:"yesterday", category:"time" },
  { id:89, hebrew:"עַכְשָׁיו", transliteration:"Achshav", english:"now", category:"time" },
  { id:90, hebrew:"אַחַר כָּךְ", transliteration:"Achar kach", english:"later / afterwards", category:"time" },
  { id:91, hebrew:"לִפְנֵי", transliteration:"Lifnei", english:"before / in front of", category:"time" },
  { id:92, hebrew:"אַחֲרֵי", transliteration:"Acharei", english:"after / behind", category:"time" },
  { id:93, hebrew:"שָׁעָה", transliteration:"Sha'a", english:"hour / o'clock", category:"time" },
  { id:94, hebrew:"דַּקָּה", transliteration:"Daka", english:"minute", category:"time" },
  { id:95, hebrew:"יוֹם", transliteration:"Yom", english:"day", category:"time" },
  { id:96, hebrew:"שָׁבוּעַ", transliteration:"Shavua", english:"week", category:"time" },
  { id:97, hebrew:"חֹדֶשׁ", transliteration:"Chodesh", english:"month", category:"time" },
  { id:98, hebrew:"שָׁנָה", transliteration:"Shana", english:"year", category:"time" },
  { id:99, hebrew:"בֹּקֶר", transliteration:"Boker", english:"morning", category:"time" },
  { id:100, hebrew:"צָהֳרַיִם", transliteration:"Tzohorayim", english:"noon / afternoon", category:"time" },
  { id:101, hebrew:"עֶרֶב", transliteration:"Erev", english:"evening", category:"time" },
  { id:102, hebrew:"לַיְלָה", transliteration:"Layla", english:"night", category:"time" },
  { id:103, hebrew:"מִשְׁפָּחָה", transliteration:"Mishpacha", english:"family", category:"family" },
  { id:104, hebrew:"אָבָּא", transliteration:"Aba", english:"father / dad", category:"family" },
  { id:105, hebrew:"אִמָּא", transliteration:"Ima", english:"mother / mom", category:"family" },
  { id:106, hebrew:"אָח", transliteration:"Ach", english:"brother", category:"family" },
  { id:107, hebrew:"אָחוֹת", transliteration:"Achot", english:"sister", category:"family" },
  { id:108, hebrew:"בֵּן", transliteration:"Ben", english:"son", category:"family" },
  { id:109, hebrew:"בַּת", transliteration:"Bat", english:"daughter", category:"family" },
  { id:110, hebrew:"סָבָא", transliteration:"Saba", english:"grandfather", category:"family" },
  { id:111, hebrew:"סָבְתָא", transliteration:"Savta", english:"grandmother", category:"family" },
  { id:112, hebrew:"בַּעַל", transliteration:"Ba'al", english:"husband", category:"family" },
  { id:113, hebrew:"אִשָּׁה", transliteration:"Isha", english:"wife / woman", category:"family" },
  { id:114, hebrew:"מַיִם", transliteration:"Mayim", english:"water", category:"food" },
  { id:115, hebrew:"לֶחֶם", transliteration:"Lechem", english:"bread", category:"food" },
  { id:116, hebrew:"בָּשָׂר", transliteration:"Basar", english:"meat", category:"food" },
  { id:117, hebrew:"עוֹף", transliteration:"Of", english:"chicken / poultry", category:"food" },
  { id:118, hebrew:"דָּג", transliteration:"Dag", english:"fish", category:"food" },
  { id:119, hebrew:"יֶרֶק", transliteration:"Yerek", english:"vegetable", category:"food" },
  { id:120, hebrew:"פְּרִי", transliteration:"Pri", english:"fruit", category:"food" },
  { id:121, hebrew:"חָלָב", transliteration:"Chalav", english:"milk", category:"food" },
  { id:122, hebrew:"קָפֶה", transliteration:"Kafe", english:"coffee", category:"food" },
  { id:123, hebrew:"תֵּה", transliteration:"Te", english:"tea", category:"food" },
  { id:124, hebrew:"מִסְעָדָה", transliteration:"Mis'ada", english:"restaurant", category:"food" },
  { id:125, hebrew:"תַּפְרִיט", transliteration:"Tafrit", english:"menu", category:"food" },
  { id:126, hebrew:"אֲרוּחָה", transliteration:"Arucha", english:"meal", category:"food" },
  { id:127, hebrew:"בֵּיצָה", transliteration:"Beitza", english:"egg", category:"food" },
  { id:128, hebrew:"סֻכָּר", transliteration:"Sukar", english:"sugar", category:"food" },
  { id:129, hebrew:"מֶלַח", transliteration:"Melach", english:"salt", category:"food" },
  { id:130, hebrew:"שֶׁמֶן", transliteration:"Shemen", english:"oil", category:"food" },
  { id:131, hebrew:"אָדֹם", transliteration:"Adom", english:"red", category:"colors" },
  { id:132, hebrew:"כָּחֹל", transliteration:"Kachol", english:"blue", category:"colors" },
  { id:133, hebrew:"יָרֹק", transliteration:"Yarok", english:"green", category:"colors" },
  { id:134, hebrew:"צָהֹב", transliteration:"Tzahov", english:"yellow", category:"colors" },
  { id:135, hebrew:"לָבָן", transliteration:"Lavan", english:"white", category:"colors" },
  { id:136, hebrew:"שָׁחֹר", transliteration:"Shachor", english:"black", category:"colors" },
  { id:137, hebrew:"כָּתֹם", transliteration:"Katom", english:"orange", category:"colors" },
  { id:138, hebrew:"סָגֹל", transliteration:"Sagol", english:"purple", category:"colors" },
  { id:139, hebrew:"חוּם", transliteration:"Chum", english:"brown", category:"colors" },
  { id:140, hebrew:"אָפֹר", transliteration:"Afor", english:"gray", category:"colors" },
  { id:141, hebrew:"יָמִין", transliteration:"Yamin", english:"right", category:"directions" },
  { id:142, hebrew:"שְׂמֹאל", transliteration:"Smol", english:"left", category:"directions" },
  { id:143, hebrew:"יָשָׁר", transliteration:"Yashar", english:"straight / directly / honest", category:"directions" },
  { id:144, hebrew:"אֲחוֹרָה", transliteration:"Achora", english:"back / backward", category:"directions" },
  { id:145, hebrew:"קָדִימָה", transliteration:"Kadima", english:"forward / ahead", category:"directions" },
  { id:146, hebrew:"מַעְלָה", transliteration:"Ma'ala", english:"up / upstairs", category:"directions" },
  { id:147, hebrew:"מַטָּה", transliteration:"Mata", english:"down / downstairs", category:"directions" },
  { id:148, hebrew:"רְחוֹב", transliteration:"Rechov", english:"street", category:"directions" },
  { id:149, hebrew:"פִּנָּה", transliteration:"Pina", english:"corner", category:"directions" },
  { id:150, hebrew:"קָרוֹב", transliteration:"Karov", english:"near / close / soon", category:"directions" },
  { id:151, hebrew:"רָחוֹק", transliteration:"Rachok", english:"far / distant", category:"directions" },
  { id:152, hebrew:"צָפוֹן", transliteration:"Tzafon", english:"north", category:"directions" },
  { id:153, hebrew:"דָּרוֹם", transliteration:"Darom", english:"south", category:"directions" },
  { id:154, hebrew:"מִזְרַח", transliteration:"Mizrach", english:"east", category:"directions" },
  { id:155, hebrew:"מַעֲרַב", transliteration:"Ma'arav", english:"west", category:"directions" },
  { id:156, hebrew:"טוֹב", transliteration:"Tov", english:"good", category:"adjectives" },
  { id:157, hebrew:"רַע", transliteration:"Ra", english:"bad / evil", category:"adjectives" },
  { id:158, hebrew:"גָּדוֹל", transliteration:"Gadol", english:"big / large / great", category:"adjectives" },
  { id:159, hebrew:"קָטָן", transliteration:"Katan", english:"small / little", category:"adjectives" },
  { id:160, hebrew:"חָדָשׁ", transliteration:"Chadash", english:"new", category:"adjectives" },
  { id:161, hebrew:"יָשָׁן", transliteration:"Yashan", english:"old (object)", category:"adjectives" },
  { id:162, hebrew:"זָקֵן", transliteration:"Zaken", english:"old (person) / elderly", category:"adjectives" },
  { id:163, hebrew:"צָעִיר", transliteration:"Tza'ir", english:"young", category:"adjectives" },
  { id:164, hebrew:"יָפֶה", transliteration:"Yafe", english:"beautiful / nice / pretty", category:"adjectives" },
  { id:165, hebrew:"חָשׁוּב", transliteration:"Chashuv", english:"important", category:"adjectives" },
  { id:166, hebrew:"קַל", transliteration:"Kal", english:"easy / light (weight)", category:"adjectives" },
  { id:167, hebrew:"קָשֶׁה", transliteration:"Kashe", english:"hard / difficult", category:"adjectives" },
  { id:168, hebrew:"חַם", transliteration:"Cham", english:"hot / warm", category:"adjectives" },
  { id:169, hebrew:"קַר", transliteration:"Kar", english:"cold", category:"adjectives" },
  { id:170, hebrew:"מָהִיר", transliteration:"Mahir", english:"fast / quick", category:"adjectives" },
  { id:171, hebrew:"אִיטִי", transliteration:"Iti", english:"slow", category:"adjectives" },
  { id:172, hebrew:"מְעַנְיֵן", transliteration:"Me'anyen", english:"interesting", category:"adjectives" },
  { id:173, hebrew:"שָׂמֵחַ", transliteration:"Sameach", english:"happy / joyful", category:"adjectives" },
  { id:174, hebrew:"עָצוּב", transliteration:"Atzuv", english:"sad", category:"adjectives" },
  { id:175, hebrew:"עָיֵף", transliteration:"Ayef", english:"tired", category:"adjectives" },
  { id:176, hebrew:"רָעֵב", transliteration:"Ra'ev", english:"hungry", category:"adjectives" },
  { id:177, hebrew:"צָמֵא", transliteration:"Tzame", english:"thirsty", category:"adjectives" },
  { id:178, hebrew:"חוֹלֶה", transliteration:"Choleh", english:"sick / ill", category:"adjectives" },
  { id:179, hebrew:"בָּרִיא", transliteration:"Bari", english:"healthy", category:"adjectives" },
  { id:180, hebrew:"חָזָק", transliteration:"Chazak", english:"strong", category:"adjectives" },
  { id:181, hebrew:"חָלָשׁ", transliteration:"Chalash", english:"weak", category:"adjectives" },
  { id:182, hebrew:"נָכוֹן", transliteration:"Nachon", english:"correct / right / true", category:"adjectives" },
  { id:183, hebrew:"לֹא נָכוֹן", transliteration:"Lo nachon", english:"wrong / incorrect", category:"adjectives" },
  { id:184, hebrew:"אֶפְשָׁרִי", transliteration:"Efshari", english:"possible", category:"adjectives" },
  { id:185, hebrew:"בַּיִת", transliteration:"Bayit", english:"house / home", category:"places" },
  { id:186, hebrew:"עִיר", transliteration:"Ir", english:"city", category:"places" },
  { id:187, hebrew:"כְּפַר", transliteration:"Kfar", english:"village", category:"places" },
  { id:188, hebrew:"בֵּית סֵפֶר", transliteration:"Beit sefer", english:"school", category:"places" },
  { id:189, hebrew:"בֵּית חוֹלִים", transliteration:"Beit cholim", english:"hospital", category:"places" },
  { id:190, hebrew:"חֲנוּת", transliteration:"Chanut", english:"store / shop", category:"places" },
  { id:191, hebrew:"שׁוּק", transliteration:"Shuk", english:"market", category:"places" },
  { id:192, hebrew:"בַּנְק", transliteration:"Bank", english:"bank", category:"places" },
  { id:193, hebrew:"תַּחֲנָה", transliteration:"Tachana", english:"station / stop", category:"places" },
  { id:194, hebrew:"שְׂדֵה תְּעוּפָה", transliteration:"Sde te'ufa", english:"airport", category:"places" },
  { id:195, hebrew:"מָלוֹן", transliteration:"Malon", english:"hotel", category:"places" },
  { id:196, hebrew:"פַּארְק", transliteration:"Park", english:"park", category:"places" },
  { id:197, hebrew:"יָם", transliteration:"Yam", english:"sea / ocean", category:"places" },
  { id:198, hebrew:"הַר", transliteration:"Har", english:"mountain", category:"places" },
  { id:199, hebrew:"מִדְבָּר", transliteration:"Midbar", english:"desert", category:"places" },
  { id:200, hebrew:"כְּנֶסֶת", transliteration:"Knesset", english:"Israeli parliament / synagogue", category:"places" },
  { id:201, hebrew:"רֹאשׁ", transliteration:"Rosh", english:"head", category:"body" },
  { id:202, hebrew:"פָּנִים", transliteration:"Panim", english:"face", category:"body" },
  { id:203, hebrew:"עַיִן", transliteration:"Ayin", english:"eye", category:"body" },
  { id:204, hebrew:"אֹזֶן", transliteration:"Ozen", english:"ear", category:"body" },
  { id:205, hebrew:"אַף", transliteration:"Af", english:"nose", category:"body" },
  { id:206, hebrew:"פֶּה", transliteration:"Pe", english:"mouth", category:"body" },
  { id:207, hebrew:"יָד", transliteration:"Yad", english:"hand / arm", category:"body" },
  { id:208, hebrew:"רֶגֶל", transliteration:"Regel", english:"foot / leg", category:"body" },
  { id:209, hebrew:"לֵב", transliteration:"Lev", english:"heart", category:"body" },
  { id:210, hebrew:"גּוּף", transliteration:"Guf", english:"body", category:"body" },
  { id:211, hebrew:"אֵיךְ מַגִּיעִים לְ...?", transliteration:"Eich magi'im le...?", english:"How do I get to...?", category:"phrases" },
  { id:212, hebrew:"כַּמָּה זֶה עוֹלֶה?", transliteration:"Kama ze ole?", english:"How much does this cost?", category:"phrases" },
  { id:213, hebrew:"אֲנִי לֹא מֵבִין", transliteration:"Ani lo mevin", english:"I don't understand", category:"phrases" },
  { id:214, hebrew:"אֲנִי לֹא יוֹדֵעַ", transliteration:"Ani lo yode'a", english:"I don't know", category:"phrases" },
  { id:215, hebrew:"דַּבֵּר לְאַט", transliteration:"Daber le'at", english:"Speak slowly", category:"phrases" },
  { id:216, hebrew:"אֶפְשָׁר לְ...?", transliteration:"Efshar le...?", english:"Is it possible to...? / May I...?", category:"phrases" },
  { id:217, hebrew:"יֵשׁ לְךָ...?", transliteration:"Yesh lecha...?", english:"Do you have...?", category:"phrases" },
  { id:218, hebrew:"מָה שְׁמֶךָ?", transliteration:"Ma shimcha?", english:"What is your name?", category:"phrases" },
  { id:219, hebrew:"שְׁמִי...", transliteration:"Shmi...", english:"My name is...", category:"phrases" },
  { id:220, hebrew:"מָה שְׁלוֹמְךָ?", transliteration:"Ma shlomcha?", english:"How are you?", category:"phrases" },
  { id:221, hebrew:"בְּסֵדֶר", transliteration:"Beseder", english:"OK / fine / alright", category:"phrases" },
  { id:222, hebrew:"מַצּוּיָן", transliteration:"Metzuyan", english:"excellent / outstanding", category:"phrases" },
  { id:223, hebrew:"נָעִים מְאֹד", transliteration:"Na'im me'od", english:"nice to meet you / very pleasant", category:"phrases" },
  { id:224, hebrew:"כֶּסֶף", transliteration:"Kesef", english:"money / silver", category:"nouns" },
  { id:225, hebrew:"זְמַן", transliteration:"Zman", english:"time", category:"nouns" },
  { id:226, hebrew:"מָקוֹם", transliteration:"Makom", english:"place / spot / room", category:"nouns" },
  { id:227, hebrew:"דֶּרֶךְ", transliteration:"Derech", english:"way / road / path", category:"nouns" },
  { id:228, hebrew:"עֲבוֹדָה", transliteration:"Avoda", english:"work / job / labor", category:"nouns" },
  { id:229, hebrew:"שֵׁם", transliteration:"Shem", english:"name", category:"nouns" },
  { id:230, hebrew:"אִישׁ", transliteration:"Ish", english:"man / person", category:"nouns" },
  { id:231, hebrew:"יֶלֶד", transliteration:"Yeled", english:"child / boy", category:"nouns" },
  { id:232, hebrew:"יַלְדָּה", transliteration:"Yalda", english:"girl", category:"nouns" },
  { id:233, hebrew:"חָבֵר", transliteration:"Chaver", english:"friend (male)", category:"nouns" },
  { id:234, hebrew:"חֲבֵרָה", transliteration:"Chavera", english:"friend (female) / girlfriend", category:"nouns" },
  { id:235, hebrew:"עוֹלָם", transliteration:"Olam", english:"world / forever", category:"nouns" },
  { id:236, hebrew:"חַיִּים", transliteration:"Chayyim", english:"life", category:"nouns" },
  { id:237, hebrew:"אַהֲבָה", transliteration:"Ahava", english:"love", category:"nouns" },
  { id:238, hebrew:"שָׂמְחָה", transliteration:"Simcha", english:"joy / happiness / celebration", category:"nouns" },
  { id:239, hebrew:"בְּעָיָה", transliteration:"Be'aya", english:"problem", category:"nouns" },
  { id:240, hebrew:"שְׁאֵלָה", transliteration:"She'ela", english:"question", category:"nouns" },
  { id:241, hebrew:"תְּשׁוּבָה", transliteration:"Teshuva", english:"answer / reply", category:"nouns" },
  { id:242, hebrew:"סֵפֶר", transliteration:"Sefer", english:"book", category:"nouns" },
  { id:243, hebrew:"מִלָּה", transliteration:"Mila", english:"word", category:"nouns" },
  { id:244, hebrew:"שָׂפָה", transliteration:"Safa", english:"language / lip", category:"nouns" },
  { id:245, hebrew:"עִברִית", transliteration:"Ivrit", english:"Hebrew (language)", category:"nouns" },
  { id:246, hebrew:"אַנְגְּלִית", transliteration:"Anglit", english:"English (language)", category:"nouns" },
  { id:247, hebrew:"אֶרֶץ", transliteration:"Eretz", english:"land / country", category:"nouns" },
  { id:248, hebrew:"עָנָן", transliteration:"Anan", english:"cloud", category:"nouns" },
  { id:249, hebrew:"שֶׁמֶשׁ", transliteration:"Shemesh", english:"sun", category:"nouns" },
  { id:250, hebrew:"גֶּשֶׁם", transliteration:"Geshem", english:"rain", category:"nouns" },
  { id:251, hebrew:"רוּחַ", transliteration:"Ruach", english:"wind / spirit", category:"nouns" },
  { id:252, hebrew:"צִיפּוֹר", transliteration:"Tzipor", english:"bird", category:"nouns" },
  { id:253, hebrew:"כֶּלֶב", transliteration:"Kelev", english:"dog", category:"nouns" },
  { id:254, hebrew:"חָתוּל", transliteration:"Chatul", english:"cat", category:"nouns" },
  { id:255, hebrew:"עֵץ", transliteration:"Etz", english:"tree / wood", category:"nouns" },
  { id:256, hebrew:"פֶּרַח", transliteration:"Perach", english:"flower", category:"nouns" },
  { id:257, hebrew:"דֶּרֶךְ", transliteration:"Derech", english:"way / road / path", category:"nouns" },
  { id:258, hebrew:"אֱמֶת", transliteration:"Emet", english:"truth", category:"nouns" },
  { id:259, hebrew:"שָׁלוֹם", transliteration:"Shalom", english:"peace / hello", category:"nouns" },
  { id:260, hebrew:"עִם", transliteration:"Im", english:"with", category:"prepositions" },
  { id:261, hebrew:"בְּלִי", transliteration:"Bli", english:"without", category:"prepositions" },
  { id:262, hebrew:"שֶׁל", transliteration:"Shel", english:"of / belonging to", category:"prepositions" },
  { id:263, hebrew:"עַל", transliteration:"Al", english:"on / about / over", category:"prepositions" },
  { id:264, hebrew:"בֵּין", transliteration:"Bein", english:"between", category:"prepositions" },
  { id:265, hebrew:"מִן / מִ", transliteration:"Min / Mi", english:"from", category:"prepositions" },
  { id:266, hebrew:"עַד", transliteration:"Ad", english:"until / up to", category:"prepositions" },
  { id:267, hebrew:"בִּגְלַל", transliteration:"Biglal", english:"because of / due to", category:"prepositions" },
  { id:268, hebrew:"כְּמוֹ", transliteration:"Kmo", english:"like / as / such as", category:"prepositions" },
  { id:269, hebrew:"בִּשְׁבִיל", transliteration:"Bishvil", english:"for / for the sake of", category:"prepositions" },
  { id:270, hebrew:"לְיַד", transliteration:"Leyad", english:"next to / beside", category:"prepositions" },
  { id:271, hebrew:"מֵאָחוֹר", transliteration:"Me'achor", english:"behind / from behind", category:"prepositions" },
  { id:272, hebrew:"מְאֹד", transliteration:"Me'od", english:"very / much", category:"adverbs" },
  { id:273, hebrew:"גַּם", transliteration:"Gam", english:"also / too", category:"adverbs" },
  { id:274, hebrew:"רַק", transliteration:"Rak", english:"only / just", category:"adverbs" },
  { id:275, hebrew:"כְּבָר", transliteration:"Kvar", english:"already", category:"adverbs" },
  { id:276, hebrew:"עֲדַיִן", transliteration:"Adayin", english:"still / yet", category:"adverbs" },
  { id:277, hebrew:"אוֹ", transliteration:"O", english:"or", category:"conjunctions" },
  { id:278, hebrew:"וְ", transliteration:"Ve", english:"and", category:"conjunctions" },
  { id:279, hebrew:"אֲבָל", transliteration:"Aval", english:"but / however", category:"conjunctions" },
  { id:280, hebrew:"כִּי", transliteration:"Ki", english:"because / that", category:"conjunctions" },
  { id:281, hebrew:"אִם", transliteration:"Im", english:"if", category:"conjunctions" },
  { id:282, hebrew:"כְּשֶׁ", transliteration:"Keshe", english:"when (temporal)", category:"conjunctions" },
  { id:283, hebrew:"חֻפְשָׁה", transliteration:"Chufsha", english:"vacation / holiday", category:"nouns" },
  { id:284, hebrew:"מֻסִיקָה", transliteration:"Musika", english:"music", category:"nouns" },
  { id:285, hebrew:"שִׁיר", transliteration:"Shir", english:"song / poem", category:"nouns" },
  { id:286, hebrew:"סֶרֶט", transliteration:"Seret", english:"movie / film / tape", category:"nouns" },
  { id:287, hebrew:"תֵּאָטְרוֹן", transliteration:"Te'atron", english:"theater", category:"nouns" },
  { id:288, hebrew:"מִכְתָּב", transliteration:"Michtav", english:"letter (written)", category:"nouns" },
  { id:289, hebrew:"טֶלֶפוֹן", transliteration:"Telefon", english:"telephone", category:"nouns" },
  { id:290, hebrew:"מְחַשֵּׁב", transliteration:"Mechashev", english:"computer", category:"nouns" },
  { id:291, hebrew:"אֶחָד-עָשָׂר", transliteration:"Achad-asar", english:"eleven", category:"numbers" },
  { id:292, hebrew:"עֶשְׂרִים", transliteration:"Esrim", english:"twenty", category:"numbers" },
  { id:293, hebrew:"שְׁלוֹשִׁים", transliteration:"Shloshim", english:"thirty", category:"numbers" },
  { id:294, hebrew:"חֲמִישִּׁים", transliteration:"Chamishim", english:"fifty", category:"numbers" },
  { id:295, hebrew:"מַה זֶּה?", transliteration:"Ma ze?", english:"What is this?", category:"phrases" },
  { id:296, hebrew:"זֶה", transliteration:"Ze", english:"this (masculine)", category:"basics" },
  { id:297, hebrew:"זֹאת", transliteration:"Zot", english:"this (feminine)", category:"basics" },
  { id:298, hebrew:"הַכֹּל", transliteration:"Hakol", english:"everything / all", category:"basics" },
  { id:299, hebrew:"כְּלוּם", transliteration:"Klum", english:"nothing / anything", category:"basics" },
  { id:300, hebrew:"מִישֶׁהוּ", transliteration:"Mishehu", english:"someone / somebody", category:"basics" },
];

// ─── SENTENCE CARDS ───────────────────────────────────────────────────────────
const SENTENCE_CARDS = [
  { id:1001, hebrew:"אֲנִי רוֹצֶה לֶאֱכֹל עַכְשָׁיו", transliteration:"Ani rotze le'echol achshav", english:"I want to eat now", category:"sentence" },
  { id:1002, hebrew:"הַמִּסְעָדָה הַזֹּאת טוֹבָה מְאֹד", transliteration:"Hamis'ada hazot tova me'od", english:"This restaurant is very good", category:"sentence" },
  { id:1003, hebrew:"אֵיפֹה הַתַּחֲנָה?", transliteration:"Eifo hatachana?", english:"Where is the station?", category:"sentence" },
  { id:1004, hebrew:"הַחָבֵר שֶׁלִּי גָּר בָּעִיר", transliteration:"Hachaver sheli gar ba'ir", english:"My friend lives in the city", category:"sentence" },
  { id:1005, hebrew:"הַיּוֹם חַם מְאֹד", transliteration:"Hayom cham me'od", english:"Today is very hot", category:"sentence" },
  { id:1006, hebrew:"אֲנִי לֹא מֵבִין עִברִית טוֹב", transliteration:"Ani lo mevin Ivrit tov", english:"I don't understand Hebrew well", category:"sentence" },
  { id:1007, hebrew:"כַּמָּה עוֹלֶה הַסֵּפֶר הַזֶּה?", transliteration:"Kama ole hasefer haze?", english:"How much does this book cost?", category:"sentence" },
  { id:1008, hebrew:"הַיֶּלֶד שָׂמֵחַ כִּי הוּא אוֹכֵל פְּרִי", transliteration:"Hayeled sameach ki hu ochel pri", english:"The boy is happy because he is eating fruit", category:"sentence" },
  { id:1009, hebrew:"אִמָּא שֶׁלִּי עוֹבֶדֶת בַּבֵּית חוֹלִים", transliteration:"Ima sheli ovedet babeit cholim", english:"My mother works in the hospital", category:"sentence" },
  { id:1010, hebrew:"אֲנִי לוֹמֵד עִברִית כִּי הִיא שָׂפָה יָפָה", transliteration:"Ani lomed Ivrit ki hi safa yafa", english:"I am studying Hebrew because it is a beautiful language", category:"sentence" },
  { id:1011, hebrew:"הוּא צָמֵא וְרוֹצֶה לִשְׁתּוֹת מַיִם", transliteration:"Hu tzame verotze lishtot mayim", english:"He is thirsty and wants to drink water", category:"sentence" },
  { id:1012, hebrew:"הַמִּשְׁפָּחָה שֶׁלִּי גָּדוֹלָה וְשָׂמֵחָה", transliteration:"Hamishpacha sheli gdola vesameacha", english:"My family is big and happy", category:"sentence" },
  { id:1013, hebrew:"לְמַה אַתָּה מְחַכֶּה?", transliteration:"Lema ata mechaake?", english:"What are you waiting for?", category:"sentence" },
  { id:1014, hebrew:"אֲנִי אוֹהֵב קָפֶה בַּבֹּקֶר", transliteration:"Ani ohev kafe baboker", english:"I love coffee in the morning", category:"sentence" },
  { id:1015, hebrew:"הַדֶּרֶךְ לַיָּם קְצָרָה מְאֹד", transliteration:"Haderech layam ktzara me'od", english:"The way to the sea is very short", category:"sentence" },
  { id:1016, hebrew:"אַתָּה צוֹדֵק — זֶה קָשֶׁה", transliteration:"Ata tzodek — ze kashe", english:"You are right — this is difficult", category:"sentence" },
  { id:1017, hebrew:"הִיא לֹא יוֹדַעַת אֵיפֹה הֶחָנוּת", transliteration:"Hi lo yoda'at eifo hechanut", english:"She doesn't know where the store is", category:"sentence" },
  { id:1018, hebrew:"בֹּקֶר טוֹב! אֵיךְ אַתָּה הַיּוֹם?", transliteration:"Boker tov! Eich ata hayom?", english:"Good morning! How are you today?", category:"sentence" },
  { id:1019, hebrew:"אֲנִי צָרִיךְ לָלֶכֶת הַבַּיְתָה עַכְשָׁיו", transliteration:"Ani tzarich lalechet habayta achshav", english:"I need to go home now", category:"sentence" },
  { id:1020, hebrew:"הַכֶּלֶב שֶׁלּוֹ גָּדוֹל וְחָזָק", transliteration:"Hakelev shelo gadol vechazak", english:"His dog is big and strong", category:"sentence" },
  { id:1021, hebrew:"שְׁנֵי חֲבֵרִים שֶׁלִּי גָּרִים בְּיְרוּשָׁלַיִם", transliteration:"Shnei chaverim sheli garim biyrushalayim", english:"Two of my friends live in Jerusalem", category:"sentence" },
  { id:1022, hebrew:"אֲנִי לֹא אוֹהֵב לֶאֱכֹל בָּשָׂר", transliteration:"Ani lo ohev le'echol basar", english:"I don't like to eat meat", category:"sentence" },
  { id:1023, hebrew:"הַשָּׁמַיִם כְּחוֹלִים וְיָפִים הַיּוֹם", transliteration:"Hashamayim kcholim veyafim hayom", english:"The sky is blue and beautiful today", category:"sentence" },
  { id:1024, hebrew:"אֵיךְ אוֹמְרִים 'שָׁלוֹם' בְּאַנְגְּלִית?", transliteration:"Eich omrim 'shalom' beAnglit?", english:"How do you say 'shalom' in English?", category:"sentence" },
  { id:1025, hebrew:"אֲנִי עָיֵף כִּי עָבַדְתִּי כָּל הַיּוֹם", transliteration:"Ani ayef ki avadti kol hayom", english:"I am tired because I worked all day", category:"sentence" },
  { id:1026, hebrew:"הַמוּסִיקָה הַזֹּאת יָפָה מְאֹד", transliteration:"Hamusika hazot yafa me'od", english:"This music is very beautiful", category:"sentence" },
  { id:1027, hebrew:"יֵשׁ לְךָ אֶחָד שֶׁקֶל?", transliteration:"Yesh lecha echad shekel?", english:"Do you have one shekel?", category:"sentence" },
  { id:1028, hebrew:"הוּא יוֹדֵעַ לְדַבֵּר שָׁלֹשׁ שָׂפוֹת", transliteration:"Hu yode'a ledaber shalosh safot", english:"He knows how to speak three languages", category:"sentence" },
  { id:1029, hebrew:"מָחָר אֲנַחְנוּ נוֹסְעִים לַיָּם", transliteration:"Machar anachnu nos'im layam", english:"Tomorrow we are going to the sea", category:"sentence" },
  { id:1030, hebrew:"אֲנִי זוֹכֵר אֶת שְׁמֶךָ", transliteration:"Ani zocher et shimcha", english:"I remember your name", category:"sentence" },
  { id:1031, hebrew:"הַחָבֵרָה שֶׁלִּי לוֹמֶדֶת בָּאוּנִיבֶרְסִיטָה", transliteration:"Hachavera sheli lomedet ba'universita", english:"My (female) friend studies at the university", category:"sentence" },
  { id:1032, hebrew:"לָמָּה אַתָּה עָצוּב הַיּוֹם?", transliteration:"Lama ata atzuv hayom?", english:"Why are you sad today?", category:"sentence" },
  { id:1033, hebrew:"אֲנִי רוֹצֶה לִקְנוֹת בַּיִת גָּדוֹל", transliteration:"Ani rotze liknot bayit gadol", english:"I want to buy a big house", category:"sentence" },
  { id:1034, hebrew:"הַגֶּשֶׁם קַר אֲבָל הָרוּחַ חַמָּה", transliteration:"Hageshem kar aval haruach chama", english:"The rain is cold but the wind is warm", category:"sentence" },
  { id:1035, hebrew:"אִם אַתָּה לֹא יוֹדֵעַ, שְׁאַל אֶת הָאִישׁ הַזֶּה", transliteration:"Im ata lo yode'a, sh'al et ha'ish haze", english:"If you don't know, ask this man", category:"sentence" },
  { id:1036, hebrew:"הַשִּׁיר הַזֶּה עוֹזֵר לִי לִזְכֹּר מִלִּים", transliteration:"Hashir haze ozer li lizkor milim", english:"This song helps me to remember words", category:"sentence" },
  { id:1037, hebrew:"יֵשׁ לִי אָח אֶחָד וּשְׁתֵּי אֲחָיוֹת", transliteration:"Yesh li ach echad ushtei achayot", english:"I have one brother and two sisters", category:"sentence" },
  { id:1038, hebrew:"אַהֲבָה גְּדוֹלָה חֲשׁוּבָה יוֹתֵר מִכֶּסֶף", transliteration:"Ahava gdola chshuva yoter mikesef", english:"Great love is more important than money", category:"sentence" },
  { id:1039, hebrew:"כָּל הַיְּלָדִים רוֹצִים לֶאֱכֹל גְּלִידָה", transliteration:"Kol hayladim rotzim le'echol glida", english:"All the children want to eat ice cream", category:"sentence" },
  { id:1040, hebrew:"הָאֱמֶת הִיא שֶׁאֲנִי לֹא אוֹהֵב לָרוּץ", transliteration:"Ha'emet hi she'ani lo ohev larutz", english:"The truth is that I don't like to run", category:"sentence" },
];

// ─── TAYLOR SWIFT SONGS ───────────────────────────────────────────────────────
const TS_SONGS = [
  "Shake It Off","Love Story","Blank Space","Bad Blood","Style",
  "Wildest Dreams","Out of the Woods","Clean","All Too Well","22",
  "Fearless","Mean","Sparks Fly","Anti-Hero","Midnight Rain",
  "Cruel Summer","Lover","You Need to Calm Down","Cornelia Street",
  "Daylight","Enchanted","Long Live","Change","The Best Day",
  "Red","State of Grace","Holy Ground","Begin Again","Treacherous"
];

// ─── CLAUDE API ───────────────────────────────────────────────────────────────
async function callClaude(messages, systemPrompt = "") {
  const body = { model: "claude-sonnet-4-20250514", max_tokens: 1000, messages };
  if (systemPrompt) body.system = systemPrompt;
  const res = await fetch("/api/anthropic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

async function checkAnswer(userAns, correctAns, hebrewPrompt) {
  const text = await callClaude([{ role: "user", content:
    `Hebrew prompt: "${hebrewPrompt}"\nCorrect English: "${correctAns}"\nStudent wrote: "${userAns}"\n\nDoes the student's answer capture the core meaning? Accept synonyms and paraphrases. Be reasonably lenient.\nReply with ONLY: CORRECT or INCORRECT` }],
    "You are a lenient Hebrew teacher checking student translations. Accept synonyms and near-paraphrases."
  );
  return text.trim().startsWith("CORRECT");
}

async function generateMnemonic(hebrew, english, translit, song, vocabSample) {
  const vocabHint = vocabSample.slice(0, 40).map(v => `${v.hebrew}=${v.english}`).join(", ");
  return callClaude([{ role: "user", content:
    `A student missed the Hebrew word: ${hebrew} (${translit}) = "${english}"

Write a SHORT, original mnemonic verse in Hebrew that:
1. Helps remember that ${hebrew} means "${english}"
2. Is inspired by the MELODY RHYTHM of Taylor Swift's "${song}" — NOT reproducing any real lyrics
3. Uses simple vocabulary (words like: ${vocabHint})
4. Is written entirely in Hebrew with nikud where helpful

Format your response EXACTLY like this:
SONG_FIT: [e.g., "fits the chorus rhythm"]

HEBREW_VERSE:
[2–4 lines of Hebrew]

TRANSLITERATION:
[matching transliteration lines]

MEMORY_TIP:
[one sentence explaining the connection to the word meaning]` }],
    "You are a creative Hebrew language teacher. Write original educational songs. Never quote copyrighted material."
  );
}

// ─── CATEGORY COLORS ─────────────────────────────────────────────────────────
const CAT_COLORS = {
  greetings:"#1a3a5c", basics:"#2d6a4f", questions:"#7b2d8b",
  pronouns:"#b84c2b", numbers:"#c8963e", verbs:"#1a5c3a",
  time:"#1a3a5c", family:"#8b2252", food:"#b84c2b",
  colors:"#6b2280", directions:"#1a5050", adjectives:"#5c3a1a",
  places:"#1a3a5c", body:"#8b4513", phrases:"#2d4a8b",
  nouns:"#4a1a5c", prepositions:"#1a4a2d", adverbs:"#5c4a1a",
  conjunctions:"#2d1a5c", sentence:"#1a3a5c"
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HebrewFlashcards() {
  const [screen, setScreen] = useState("welcome");
  const [cardMode, setCardMode] = useState("mixed");
  const [currentCard, setCurrentCard] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [mnemonic, setMnemonic] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0, bestStreak: 0 });
  const [seenIds, setSeenIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [cardNum, setCardNum] = useState(0);
  const inputRef = useRef(null);

  const getPool = useCallback(() =>
    cardMode === "words" ? VOCAB_CARDS
    : cardMode === "sentences" ? SENTENCE_CARDS
    : [...VOCAB_CARDS, ...SENTENCE_CARDS],
  [cardMode]);

  const pickCard = useCallback(() => {
    const pool = getPool();
    let unseen = pool.filter(c => !seenIds.has(c.id));
    if (unseen.length === 0) { setSeenIds(new Set()); unseen = pool; }
    return unseen[Math.floor(Math.random() * unseen.length)];
  }, [getPool, seenIds]);

  const nextCard = useCallback(() => {
    setCurrentCard(pickCard());
    setUserAnswer("");
    setIsCorrect(null);
    setMnemonic("");
    setScreen("card");
    setCardNum(n => n + 1);
    setTimeout(() => inputRef.current?.focus(), 150);
  }, [pickCard]);

  const handleSubmit = async () => {
    if (!userAnswer.trim() || loading) return;
    setLoading(true);
    setScreen("checking");
    try {
      const correct = await checkAnswer(userAnswer, currentCard.english, currentCard.hebrew);
      setIsCorrect(correct);
      setSeenIds(s => new Set([...s, currentCard.id]));
      setScore(s => {
        const newStreak = correct ? s.streak + 1 : 0;
        return {
          correct: s.correct + (correct ? 1 : 0),
          total: s.total + 1,
          streak: newStreak,
          bestStreak: Math.max(s.bestStreak, newStreak)
        };
      });
      if (!correct) {
        setCurrentSong(TS_SONGS[Math.floor(Math.random() * TS_SONGS.length)]);
      }
      setScreen("result");
    } catch {
      setScreen("card");
    } finally {
      setLoading(false);
    }
  };

  const handleGetMnemonic = async () => {
    setLoading(true);
    try {
      const verse = await generateMnemonic(
        currentCard.hebrew, currentCard.english,
        currentCard.transliteration, currentSong, VOCAB_CARDS
      );
      setMnemonic(verse);
      setScreen("mnemonic");
    } finally {
      setLoading(false);
    }
  };

  const catColor = currentCard ? (CAT_COLORS[currentCard.category] || "#1a3a5c") : "#1a3a5c";
  const accuracy = score.total ? Math.round((score.correct / score.total) * 100) : 0;
  const progressPct = Math.min((score.total / 20) * 100, 100);

  return (
    <>
      <FontStyle />
      <div className="app-wrap">
        {/* HEADER */}
        <header className="header">
          <div>
            <div className="logo">עִברִית</div>
            <span className="logo-sub">Modern Hebrew Studio</span>
          </div>
          {score.total > 0 && (
            <div className="score-bar">
              <div className="score-item">
                <div className="score-num correct">{score.correct}</div>
                <div className="score-label">Correct</div>
              </div>
              <div className="score-item">
                <div className="score-num wrong">{score.total - score.correct}</div>
                <div className="score-label">Wrong</div>
              </div>
              <div className="score-item">
                <div className="score-num" style={{color:"var(--gold)"}}>{accuracy}%</div>
                <div className="score-label">Accuracy</div>
              </div>
            </div>
          )}
        </header>

        {/* PROGRESS */}
        {score.total > 0 && (
          <div className="progress-strip">
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{width:`${progressPct}%`}} />
            </div>
          </div>
        )}

        <main className="main-content">

          {/* ── WELCOME ── */}
          {screen === "welcome" && (
            <div className="welcome-card">
              <div className="welcome-hebrew">לִלְמֹד עִברִית</div>
              <div className="welcome-title">Learn Modern Hebrew</div>
              <p className="welcome-desc">
                Master ~1,400 essential Modern Hebrew words and phrases through AI-powered
                flashcards, sentence practice, and Taylor Swift mnemonics for tricky words.
              </p>

              <p style={{fontFamily:"'Cinzel',serif",fontSize:"0.7rem",letterSpacing:"3px",color:"var(--muted)",marginBottom:"16px",textTransform:"uppercase"}}>
                Choose your mode
              </p>

              <div className="mode-grid">
                {[
                  { id:"words", icon:"📝", label:"Words & Phrases", sub:"Individual vocabulary" },
                  { id:"sentences", icon:"💬", label:"Full Sentences", sub:"Context practice" },
                  { id:"mixed", icon:"✨", label:"Mixed", sub:"Both types" },
                ].map(m => (
                  <button key={m.id} className={`mode-btn ${cardMode === m.id ? "active" : ""}`}
                    onClick={() => setCardMode(m.id)}>
                    <span className="mode-icon">{m.icon}</span>
                    <span className="mode-label">{m.label}</span>
                    <span className="mode-sub">{m.sub}</span>
                  </button>
                ))}
              </div>

              <button className="start-btn" onClick={nextCard}>Begin Study →</button>

              <div style={{marginTop:"28px",fontSize:"0.85rem",color:"var(--muted)",lineHeight:"1.6"}}>
                ✓ Smart answer checking &nbsp;·&nbsp; ✓ 300+ vocabulary items &nbsp;·&nbsp; ✓ Taylor Swift mnemonics
              </div>
            </div>
          )}

          {/* ── FLASHCARD ── */}
          {screen === "card" && currentCard && (
            <div className="card-wrap">
              <div className="flashcard">
                <div className="card-counter">Card #{cardNum}</div>
                <div className="card-type-badge">
                  {currentCard.type === "sentence" || currentCard.id >= 1000 ? "Sentence" : currentCard.category}
                </div>

                <div style={{textAlign:"center",marginTop:"12px"}}>
                  <span className="category-tag" style={{background:`${catColor}18`,borderColor:`${catColor}40`,color:catColor}}>
                    {currentCard.category}
                  </span>
                </div>

                <div className="hebrew-display">{currentCard.hebrew}</div>
                <div className="transliteration">{currentCard.transliteration}</div>
                <div className="divider" />

                <span className="answer-label">English Translation</span>
                <input
                  ref={inputRef}
                  className="answer-input"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="Type your answer here..."
                  autoComplete="off"
                />

                <div className="submit-row">
                  <button className="btn-secondary" onClick={nextCard}>Skip →</button>
                  <button className="btn-primary" onClick={handleSubmit} disabled={!userAnswer.trim()}>
                    Check Answer
                  </button>
                </div>

                {score.streak >= 3 && (
                  <div style={{textAlign:"center",marginTop:"16px",fontSize:"0.85rem",color:"var(--gold)"}}>
                    🔥 {score.streak} in a row!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CHECKING ── */}
          {screen === "checking" && (
            <div className="checking-screen">
              <div className="checking-spinner" />
              <div className="checking-text">Checking your answer...</div>
            </div>
          )}

          {/* ── RESULT ── */}
          {screen === "result" && currentCard && (
            <div className={`result-card ${isCorrect ? "correct-card" : "wrong-card"}`}>
              <span className="result-icon">{isCorrect ? "✓" : "✗"}</span>
              <div className={`result-heading ${isCorrect ? "correct-text" : "wrong-text"}`}>
                {isCorrect ? "Correct! יפה מאוד!" : "Not quite..."}
              </div>

              <div className="result-hebrew">{currentCard.hebrew}</div>
              <div style={{textAlign:"center",fontStyle:"italic",color:"var(--gold)",fontSize:"0.95rem",marginBottom:"4px"}}>
                {currentCard.transliteration}
              </div>
              <div className="result-english">{currentCard.english}</div>

              <div className="your-answer">
                <span>Your answer: </span>{userAnswer}
              </div>

              <div className="result-actions">
                {!isCorrect && (
                  <button className="btn-mnemonic" onClick={handleGetMnemonic} disabled={loading}>
                    {loading ? <><span style={{animation:"spin 0.8s linear infinite",display:"inline-block"}}>⟳</span> Composing...</>
                      : <>🎵 Help me remember with a Taylor Swift verse</>}
                  </button>
                )}
                <button className="btn-primary" onClick={nextCard}>
                  {isCorrect ? "Next Card →" : "Continue →"}
                </button>
                <button className="btn-secondary" onClick={() => setScreen("welcome")} style={{textAlign:"center"}}>
                  ← Back to menu
                </button>
              </div>
            </div>
          )}

          {/* ── MNEMONIC ── */}
          {screen === "mnemonic" && currentCard && (
            <div className="mnemonic-card">
              <div className="mnemonic-header">
                <span className="mnemonic-note">🎵</span>
                <div className="mnemonic-header-text">
                  <h3>Memory Verse — inspired by</h3>
                  <p>"{currentSong}" · Taylor Swift</p>
                </div>
              </div>

              <div className="mnemonic-word-display">
                <span className="mnemonic-hebrew">{currentCard.hebrew}</span>
                <span className="mnemonic-arrow">→</span>
                <span className="mnemonic-english">"{currentCard.english}"</span>
              </div>

              {loading ? (
                <div style={{padding:"48px",textAlign:"center"}}>
                  <div className="checking-spinner" />
                  <div className="checking-text" style={{marginTop:"16px"}}>Writing your verse...</div>
                </div>
              ) : (
                <div className="mnemonic-body">{mnemonic}</div>
              )}

              <div className="mnemonic-footer">
                <button className="btn-primary" style={{flex:1}} onClick={nextCard}>
                  Next Card →
                </button>
                <button className="btn-secondary" onClick={() => setScreen("result")}>
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* STATS FOOTER */}
          {score.total > 0 && (
            <div className="stats-row">
              <span>Cards studied: <strong>{score.total}</strong></span>
              <span>Accuracy: <strong>{accuracy}%</strong></span>
              {score.bestStreak > 0 && <span className="streak">Best streak: {score.bestStreak} 🔥</span>}
            </div>
          )}

        </main>
      </div>
    </>
  );
}
