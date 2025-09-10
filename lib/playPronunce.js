const playPronunce = (word) => {
  if (!word) return;
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    window.speechSynthesis.cancel(); // stop any previous speech
    window.speechSynthesis.speak(utter);
  } else {
    // Fallback: fetch audio from a simple dictionary TTS endpoint
    const audio = new Audio(
      `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(
        word,
      )}`,
    );
    audio.play().catch(() => {});
  }
};

export default playPronunce;
