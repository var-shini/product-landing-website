document.addEventListener('DOMContentLoaded', () => {
  console.log('Document is ready');

  // Smooth scrolling to sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Voice recognition and synthesis
  const startRecognition = () => {
      if ('webkitSpeechRecognition' in window) {
          const recognition = new webkitSpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onstart = () => {
              console.log('Voice recognition started');
          };

          recognition.onresult = (event) => {
              const transcript = event.results[0][0].transcript;
              document.querySelector('#notes').value += transcript;
          };

          recognition.onerror = (event) => {
              console.error(event.error);
          };

          recognition.onend = () => {
              console.log('Voice recognition ended');
          };

          recognition.start();
      } else {
          alert('Your browser does not support speech recognition');
      }
  };

  document.querySelector('#start-voice-recognition').addEventListener('click', startRecognition);

  // Text-to-speech
  const readOutLoud = (text) => {
      if ('speechSynthesis' in window) {
          const speech = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(speech);
      } else {
          alert('Your browser does not support speech synthesis');
      }
  };

  document.querySelector('#read-notes').addEventListener('click', () => {
      const notes = document.querySelector('#notes').value;
      readOutLoud(notes);
  });
});
