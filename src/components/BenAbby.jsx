"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';




const VOCABULARY = [
 { id: 1, en: "Easily", he: "בְּקַלּוּת" },
 { id: 2, en: "To fly (airplane)", he: "לָטוּס, טָס" },
 { id: 3, en: "Tasty", he: "טָעִים" },
 { id: 4, en: "Again", he: "שׁוּב" },
 { id: 5, en: "IDF", he: "צָהָ\"ל" },
 { id: 6, en: "To quarrel, fight", he: "לָרִיב, רָב" },
 { id: 7, en: "To keep, guard", he: "לִשְׁמוֹר" },
 { id: 8, en: "To visit", he: "לְבַקֵּר" },
 { id: 9, en: "Close (family)", he: "קָרוֹב" },
 { id: 10, en: "Door", he: "דֶּלֶת" },
 { id: 11, en: "Hole", he: "חוֹר" },
 { id: 12, en: "To hope", he: "לְקַוּוֹת" },
 { id: 13, en: "Judaism", he: "יַהֲדוּת" },
 { id: 14, en: "Village", he: "כְּפָר" },
 { id: 15, en: "To find", he: "לִמְצוֹא" },
 { id: 16, en: "Camp", he: "מַחֲנֶה" },
 { id: 17, en: "To be sufficient", he: "לְהַסְפִּיק" },
 { id: 18, en: "Airplane", he: "מָטוֹס" },
 { id: 19, en: "Center", he: "מֶרְכָּז" },
 { id: 20, en: "Sign", he: "סִימָן" },
 { id: 21, en: "Neighborhood", he: "שְׁכוּנָה" },
 { id: 22, en: "Office", he: "מִשְׂרָד" },
 { id: 23, en: "Tourist", he: "תַּיָּר" },
 { id: 24, en: "Vacation", he: "נוֹפֶשׁ" },
 { id: 25, en: "Youth hostel", he: "אַכְסַנְיַית נוֹעַר" },
 { id: 26, en: "Desert", he: "מִדְבָּר" },
 { id: 27, en: "Scroll", he: "מְגִילָּה" },
 { id: 28, en: "Mud", he: "בּוֹץ" },
 { id: 29, en: "Coral", he: "אַלְמוֹג" },
 { id: 30, en: "Plan, program", he: "תּוֹכְנִית" },
 { id: 31, en: "Snow", he: "שֶׁלֶג" },
 { id: 32, en: "Chair", he: "כִּסֵּא" },
 { id: 33, en: "I don't care", he: "לֹא אִכְפַּת" },
 { id: 34, en: "Hard / Difficult", he: "קָשֶׁה" },
 { id: 35, en: "Easy / Light", he: "קַל" },
 { id: 36, en: "Important", he: "חָשׁוּב / חֲשׁוּבָה" },
 { id: 37, en: "What's up", he: "מָה הַמַּצָּב" },
 { id: 38, en: "Shoe", he: "נַעַל" },
 { id: 39, en: "Wet", he: "רָטוֹב" },
 { id: 40, en: "Dry", he: "יָבֵשׁ" },
 { id: 41, en: "Female", he: "נְקֵבָה" },
 { id: 42, en: "Male", he: "זָכָר" },
 { id: 43, en: "Year", he: "שָׁנָה" },
 { id: 44, en: "Month", he: "חוֹדֶשׁ" },
 { id: 45, en: "Small bag", he: "שַׂקִּית" },
 { id: 46, en: "Pillow", he: "כָּרִית" },
 { id: 47, en: "Sabbath", he: "שַׁבָּת" },
 { id: 48, en: "Maybe", he: "אוּלַי" },
 { id: 49, en: "High school", he: "תִּיכוֹן" },
 { id: 50, en: "To cook", he: "לְבַשֵּׁל" },
 { id: 51, en: "Price list", he: "מְחִירוֹן" },
 { id: 52, en: "Apple", he: "תַּפּוּחַ" },
 { id: 53, en: "Lemon", he: "לִימוֹן" },
 { id: 54, en: "Lettuce", he: "חַסָּה" },
 { id: 55, en: "Tomato", he: "עַגְבָנִיָּה" },
 { id: 56, en: "Onion", he: "בָּצָל" },
 { id: 57, en: "Cucumber", he: "מְלָפְפוֹן" },
 { id: 58, en: "Cabbage", he: "כְּרוּב" },
 { id: 59, en: "Cauliflower", he: "כְּרוּבִית" },
 { id: 60, en: "Carrot", he: "גֶּזֶר" },
 { id: 61, en: "Garlic", he: "שׁוּם" },
 { id: 62, en: "In order to / So that", he: "כְּדֵי" },
 { id: 63, en: "Worthwhile / Should", he: "כְּדַאי" },
 { id: 64, en: "To eat pizza", he: "לֶאֱכֹל פִיצָה" },
 { id: 65, en: "A lot / Very", he: "הַרְבֵּה / מְאֹד" },
 { id: 66, en: "Essay", he: "חִיבּוּר" },
 { id: 67, en: "Game", he: "מִשְׂחָק" },
 { id: 68, en: "Relaxing / Calming", he: "מַרְגִיעַ" },
 { id: 69, en: "Vegetable soup", he: "מָרָק יְרָקוֹת" },
 { id: 70, en: "Soul-searching", he: "חֶשְׁבּוֹן נֶפֶשׁ" },
 { id: 71, en: "Famous people", he: "מְפוּרְסָמִים" },
 { id: 72, en: "Danger", he: "סַכָּנָה" },
 { id: 73, en: "Buildings", he: "בִּנְיָנִים" },
 { id: 74, en: "Orchestra", he: "תִּזְמֹרֶת" },
 { id: 75, en: "Dance", he: "רִיקּוּד" },
 { id: 76, en: "Traffic light", he: "רַמְזוֹר" },
 { id: 77, en: "Guilt", he: "אַשְׁמָה" },
 { id: 78, en: "Inspiration", he: "הַשְׁרָאָה" },
 { id: 79, en: "Boat", he: "סִירָה" },
 { id: 80, en: "Rhinoceros", he: "קַרְנַף" },
 { id: 81, en: "Gym", he: "חֲדַר כֹּשֶׁר" },
 { id: 82, en: "Cable car", he: "רַכֶּבֶל" },
 { id: 83, en: "National", he: "לְאוּמִי" },
 { id: 84, en: "Mushrooms", he: "פִּטְרִיּוֹת" },
 { id: 85, en: "Vegetarian", he: "צִמְחוֹנִי" },
 { id: 86, en: "Choir", he: "מַקְהֵלָה" },
 { id: 87, en: "Journey", he: "מַסָּע" },
 { id: 88, en: "Snowflake", he: "פְּתִית שֶׁלֶג" },
 { id: 89, en: "Of course", he: "כַּמּוּבָן" },
 { id: 90, en: "Hail", he: "בָּרָד" },
 { id: 91, en: "Graph", he: "גְּרָף" },
 { id: 92, en: "Percent", he: "אָחוּז" },
 { id: 93, en: "Glue", he: "דֶּבֶק" },
 { id: 94, en: "Far", he: "רָחוֹק" },
 { id: 95, en: "Hope", he: "תִּקְוָה" },
 { id: 96, en: "Crossword", he: "תַּשְׁבֵּץ" },
 { id: 97, en: "To stand", he: "לַעֲמֹד" },
 { id: 98, en: "To succeed", he: "לְהַצְלִיחַ" },
 { id: 99, en: "To do / To make", he: "לַעֲשׂוֹת" },
 { id: 100, en: "To remember", he: "לִזְכּוֹר" },
 { id: 101, en: "To fall", he: "לִיפּוֹל" },
 { id: 102, en: "Package / Parcel", he: "חֲבִילָה" },
 { id: 103, en: "Help / Assistance", he: "עֶזְרָה" },
 { id: 104, en: "To swim", he: "לִשְׂחוֹת" },
 { id: 105, en: "To dive", he: "לִצְלוֹל" },
 { id: 106, en: "To wake up", he: "לְהִתְעוֹרֵר" },
 { id: 107, en: "The beach", he: "חוֹף הַיָּם" },
 { id: 108, en: "The Red Sea", he: "הַיָּם הָאָדוֹם" },
 { id: 109, en: "The Dead Sea", he: "יָם הַמֶּלַח" },
 { id: 110, en: "Souvenirs", he: "מַזְכָּרוֹת" },
 { id: 111, en: "Problem", he: "בְּעָיָה" }
];


const GAME_DURATION = 60; // 60 seconds per round


const shuffleArray = (array) => {
 const newArray = [...array];
 for (let i = newArray.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
 }
 return newArray;
};


export default function App() {
 const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'end'
 const [score, setScore] = useState(0);
 const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentWord, setCurrentWord] = useState(null);
 const [options, setOptions] = useState([]);
  // Visual feedback states
 const [wrongOptionId, setWrongOptionId] = useState(null);
 const [flashScreen, setFlashScreen] = useState(false);


 // --- NEW STATE FOR REPORT & PRIORITY ---
 const [roundPerfect, setRoundPerfect] = useState([]);
 const [roundStruggled, setRoundStruggled] = useState([]);
 const [currentMistakes, setCurrentMistakes] = useState(0);
 const priorityWordsRef = useRef(new Set()); // Persists across rounds
 // ---------------------------------------


 // Generate a new question
 const loadNewQuestion = useCallback(() => {
   let correctWord;
  
   // Convert priority set to array
   const priorityArr = Array.from(priorityWordsRef.current)
     .map(id => VOCABULARY.find(v => v.id === id))
     .filter(Boolean);


   // 60% chance to test a previously struggled word if there are any
   if (priorityArr.length > 0 && Math.random() < 0.6) {
     correctWord = priorityArr[Math.floor(Math.random() * priorityArr.length)];
   } else {
     // Fallback to purely random word
     correctWord = VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)];
   }
  
   // 2. Pick 3 random incorrect words
   let distractors = [];
   while (distractors.length < 3) {
     const randomIdx = Math.floor(Math.random() * VOCABULARY.length);
     const randomWord = VOCABULARY[randomIdx];
    
     // Ensure we don't pick the correct word or duplicates as distractors
     if (randomWord.id !== correctWord.id && !distractors.some(d => d.id === randomWord.id)) {
       distractors.push(randomWord);
     }
   }
  
   // 3. Combine and shuffle options
   const allOptions = shuffleArray([correctWord, ...distractors]);
  
   setCurrentWord(correctWord);
   setOptions(allOptions);
   setWrongOptionId(null);
   setCurrentMistakes(0); // Reset mistakes for the new word
 }, []);


 const startGame = () => {
   setScore(0);
   setTimeLeft(GAME_DURATION);
   setRoundPerfect([]);
   setRoundStruggled([]);
   setGameState('playing');
   loadNewQuestion();
 };


 // Timer logic
 useEffect(() => {
   if (gameState === 'playing' && timeLeft > 0) {
     const timer = setInterval(() => {
       setTimeLeft(prev => {
         if (prev <= 1) {
           clearInterval(timer);
           setGameState('end');
           return 0;
         }
         return prev - 1;
       });
     }, 1000);
     return () => clearInterval(timer);
   }
 }, [gameState, timeLeft]);


 const handleOptionClick = useCallback((option) => {
   if (gameState !== 'playing') return;


   if (option.id === currentWord.id) {
     // Correct answer!
    
     // Track stats for the report & priority queue
     if (currentMistakes === 0) {
       setRoundPerfect(prev => prev.some(w => w.id === currentWord.id) ? prev : [...prev, currentWord]);
       priorityWordsRef.current.delete(currentWord.id); // Mastered! Remove from priority
     } else {
       setRoundStruggled(prev => prev.some(w => w.id === currentWord.id) ? prev : [...prev, currentWord]);
       priorityWordsRef.current.add(currentWord.id); // Add to priority for next round
     }


     setScore(prev => prev + 1);
    
     // Brief green flash effect on screen
     setFlashScreen('correct');
     setTimeout(() => setFlashScreen(null), 150);
    
     // Instantly load next question for speed
     loadNewQuestion();
   } else {
     // Wrong answer!
     setCurrentMistakes(prev => prev + 1);
     setWrongOptionId(option.id);
    
     // Time penalty to discourage spam clicking
     setTimeLeft(prev => Math.max(0, prev - 2));


     // Brief red flash effect on screen
     setFlashScreen('wrong');
     setTimeout(() => {
       setFlashScreen(null);
       setWrongOptionId(null);
     }, 300);
   }
 }, [gameState, currentWord, currentMistakes, loadNewQuestion]);


 // Handle keyboard input (1-4 keys)
 useEffect(() => {
   const handleKeyDown = (e) => {
     if (gameState !== 'playing') return;
    
     if (['1', '2', '3', '4'].includes(e.key)) {
       const index = parseInt(e.key, 10) - 1;
       // Verify option exists and is not currently flashing red
       if (options[index] && wrongOptionId !== options[index].id) {
         handleOptionClick(options[index]);
       }
     }
   };


   window.addEventListener('keydown', handleKeyDown);
   return () => window.removeEventListener('keydown', handleKeyDown);
 }, [gameState, options, wrongOptionId, handleOptionClick]);


 return (
   <div className={`
     min-h-screen font-sans flex flex-col items-center justify-center p-4 transition-colors duration-150
     ${flashScreen === 'correct' ? 'bg-green-100' : flashScreen === 'wrong' ? 'bg-red-100' : 'bg-slate-50'}
   `}>
    
     <style dangerouslySetInnerHTML={{__html: `
       @keyframes shake {
         0%, 100% { transform: translateX(0); }
         20%, 60% { transform: translateX(-6px); }
         40%, 80% { transform: translateX(6px); }
       }
       .animate-shake {
         animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
       }
     `}} />


     <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      
       {/* START SCREEN */}
       {gameState === 'start' && (
         <div className="p-12 text-center">
           <div className="text-6xl mb-6">⚡</div>
           <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
             Hebrew Speed Run
           </h1>
           <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
             You have <span className="font-bold text-blue-600">60 seconds</span> to translate as many words as possible.
             <br/><br/>
             <span className="text-sm text-red-500 font-medium block mb-3">Careful: Wrong answers deduct 2 seconds!</span>
             <span className="text-sm bg-slate-100 px-4 py-2 rounded-full text-slate-600 font-semibold border border-slate-200 inline-block shadow-sm">
               ⌨️ Tip: Use keys 1-4 to select answers faster
             </span>
           </p>
           <button
             onClick={startGame}
             className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-blue-500/30 text-xl"
           >
             Start Game
           </button>
         </div>
       )}


       {/* PLAYING SCREEN */}
       {gameState === 'playing' && currentWord && (
         <div className="flex flex-col h-[500px]">
           {/* Header / HUD */}
           <div className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white">
             <div className="flex flex-col">
               <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Score</span>
               <span className="text-3xl font-black">{score}</span>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Time</span>
               <span className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                 0:{timeLeft.toString().padStart(2, '0')}
               </span>
             </div>
           </div>


           {/* Target Word */}
           <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
             <h2 className="text-6xl md:text-7xl font-serif font-bold text-slate-800 text-center" dir="rtl">
               {currentWord.he}
             </h2>
           </div>


           {/* Options Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 bg-white">
             {options.map((option, index) => {
               const isWrong = wrongOptionId === option.id;
               return (
                 <button
                   key={option.id}
                   onClick={() => handleOptionClick(option)}
                   disabled={isWrong}
                   className={`
                     group relative flex items-center p-6 text-lg md:text-xl font-medium rounded-2xl border-2 transition-all duration-100 ease-out active:scale-[0.98]
                     ${isWrong
                       ? 'bg-red-50 border-red-500 text-red-700 animate-shake'
                       : 'bg-white border-slate-200 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md'
                     }
                   `}
                 >
                   <span className={`absolute left-4 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border shadow-sm transition-colors ${
                     isWrong
                       ? 'bg-red-100 border-red-200 text-red-500'
                       : 'bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:border-blue-200'
                   }`}>
                     {index + 1}
                   </span>
                   <span className="w-full text-center pr-4 pl-8">{option.en}</span>
                 </button>
               )
             })}
           </div>
         </div>
       )}


       {/* END SCREEN */}
       {gameState === 'end' && (
         <div className="p-8 md:p-12 text-center max-h-screen overflow-y-auto">
           <div className="text-6xl mb-4">⏱️</div>
           <h2 className="text-3xl font-bold text-slate-800 mb-2">Time's Up!</h2>
          
           <div className="my-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
             <p className="text-slate-500 font-medium uppercase tracking-wider mb-2">Final Score</p>
             <p className="text-6xl font-black text-blue-600">{score}</p>
             <p className="text-slate-600 mt-4 font-medium">
               {score < 10 && "Good try! Keep practicing."}
               {score >= 10 && score < 25 && "Great job! You're getting fast."}
               {score >= 25 && score < 40 && "Amazing! Your Hebrew is super quick."}
               {score >= 40 && "Unstoppable! You are a master."}
             </p>
           </div>


           {/* Performance Report */}
           <div className="text-left bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
             <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Round Report</h3>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Struggled Column */}
               <div>
                 <h4 className="font-semibold text-red-600 flex items-center mb-3">
                   <span className="mr-2">📚</span> Needs Review ({roundStruggled.length})
                 </h4>
                 {roundStruggled.length > 0 ? (
                   <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                     {roundStruggled.map(w => (
                       <li key={w.id} className="text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100 flex flex-col md:flex-row md:items-center justify-between">
                         <span className="font-semibold text-base mb-1 md:mb-0" dir="rtl">{w.he}</span>
                         <span className="text-slate-700 md:text-right leading-tight">{w.en}</span>
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <p className="text-sm text-slate-400 italic">No mistakes! Perfect run. 🎉</p>
                 )}
                 {roundStruggled.length > 0 && (
                    <p className="text-xs text-slate-500 mt-3 italic">*These words will appear more often next round.</p>
                 )}
               </div>


               {/* Perfect Column */}
               <div>
                 <h4 className="font-semibold text-green-600 flex items-center mb-3">
                   <span className="mr-2">🎯</span> Nailed It ({roundPerfect.length})
                 </h4>
                 {roundPerfect.length > 0 ? (
                   <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                     {roundPerfect.map(w => (
                       <li key={w.id} className="text-sm bg-green-50 px-3 py-2 rounded-lg border border-green-100 flex flex-col md:flex-row md:items-center justify-between">
                         <span className="font-semibold text-base mb-1 md:mb-0" dir="rtl">{w.he}</span>
                         <span className="text-slate-700 md:text-right leading-tight">{w.en}</span>
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <p className="text-sm text-slate-400 italic">No correct words this round.</p>
                 )}
               </div>
             </div>
           </div>


           <button
             onClick={startGame}
             className="w-full md:w-auto px-10 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 active:scale-95 transition-all shadow-lg text-lg"
           >
             Play Again
           </button>
         </div>
       )}


     </div>
   </div>
 );
}
