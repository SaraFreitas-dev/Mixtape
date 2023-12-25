document.addEventListener("DOMContentLoaded", function () {
  var tapPrev = document.querySelector(".tapPrev");
  var tapPlay = document.querySelector(".tapPlay");
  var tapNext = document.querySelector(".tapNext");
  var lofi = document.getElementById("player");
  var teethBox = document.querySelector(".teethBox");
  var teethBox2 = document.querySelector(".teethBox2");
  var tapeRibbon = document.querySelector(".tape-ribbon");
  var tapeRibbonTwo = document.querySelector(".tape-ribbon-two");

  // Function to handle playing the audio and triggering animations
  function song(audioElement) {
    // Add animation classes
    teethBox.classList.add("playing");
    teethBox2.classList.add("playing");
    tapeRibbon.classList.add("play");
    tapeRibbonTwo.classList.add("play-two");

    // Start playing the audio
    audioElement.play();

    // Remove animation classes when the audio is paused
    audioElement.addEventListener("pause", function () {
      teethBox.classList.remove("playing");
      teethBox2.classList.remove("playing");
      tapeRibbon.classList.remove("play");
      tapeRibbonTwo.classList.remove("play-two");
    });

    // Remove animation classes when the animation ends
    teethBox.addEventListener("animationend", removeAnimationClasses);
    teethBox2.addEventListener("animationend", removeAnimationClasses);
    tapeRibbon.addEventListener("animationend", removeAnimationClasses);
    tapeRibbonTwo.addEventListener("animationend", removeAnimationClasses);
  }

  // Function to remove animation classes
  function removeAnimationClasses(event) {
    // Target the specific element that triggered the animation end event
    var currentElement = event.target;

    // Remove event listener to prevent multiple bindings
    currentElement.removeEventListener("animationend", removeAnimationClasses);

    // Remove animation classes
    teethBox.classList.remove("playing");
    teethBox2.classList.remove("playing");
    tapeRibbon.classList.remove("play");
    tapeRibbonTwo.classList.remove("play-two");
  }

  // Array of songs
  var playlist = [
    "https://namratapdrjs.netlify.app/lofi-music.mp3",
    "Music/Concerto in D Minor for 2 Mandolins RV. 532 Andante Arr. For Cello and Voice.mp3",
    "Music/Bárbara Tinoco A Fugir De Ser Acústico.mp3",
    "Music/Bésame Mucho.mp3",
    "Music/Os Quatro e Meia O Tempo Vai Esperar.mp3",
    "Music/Tú sí sabes quererme - Natalia Lafourcade.mp3",
    "Music/D.A.M.A Casa.mp3",
    "Music/Porta - Vacío.mp3",
    "Music/iñigo quintero - Si No Estás.mp3",
    "Music/Volver - Estrella Morente.mp3",
    "Music/ZOE Soñé Unplugged.mp3",
    "Music/BISPO Planeta ft. Bárbara Tinoco.mp3",
    "Music/isaac_costa___dois_quatro_sobre_sete.mp3",
    "Music/KAPPA JOTTA feat MUN ROSAS.mp3",
    "Music/Querida Alma Gemela_cCmfIDhGokM.mp3",
    "Music/Carolina Deslandes Avião De Papel ft. Rui Veloso.mp3",
    "Music/Coisa Mais Bonita-Carolina_Deslandes.mp3",
    "Music/D.A.M.A Loucamente feat. Los Romeros.mp3",
    "Music/MARIZA Quem Me Dera.mp3",
    "Music/La Bien Querida - Esto Que Tengo Contigo.mp3",
    "Music/Tiago Bettencourt Canção do Engate.mp3",
    "Music/Murta Luna.mp3",
    "Music/ZOE Luna Unplugged.mp3",
    "Music/Os Quatro e Meia A Terra Gira.mp3",
    "Music/Janeiro sem título.mp3",
  ];

  
  var currentSongIndex = 0;

  // Shuffle function
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the playlist
  Shuffled_playlist = shuffle(playlist);

  // Function to play the previous song
  tapPrev.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex - 1 + Shuffled_playlist.length) % Shuffled_playlist.length;
    lofi.src = Shuffled_playlist[currentSongIndex];
    lofi.play();
    song(lofi);
  });

  // Function to play the next song
  tapNext.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % Shuffled_playlist.length;
    lofi.src = Shuffled_playlist[currentSongIndex];
    lofi.play();
    song(lofi);
  });

  // Add a click event listener to the cassette element
  tapPlay.addEventListener("click", function () {
    if (lofi.paused) {
      lofi.src = Shuffled_playlist[currentSongIndex];
      lofi.play();
      song(lofi);
    } else {
      lofi.pause();
    }
  });

// Event listener for the time update
lofi.addEventListener("timeupdate", function () {
  // Check if the song is near the end (e.g., last 5 seconds)
  if (lofi.currentTime > lofi.duration - 5) {
    // Increment the index based on the shuffled order
    currentSongIndex = (currentSongIndex + 1) % Shuffled_playlist.length;

    // Set the source of the audio element to the next shuffled song
    lofi.src = Shuffled_playlist[currentSongIndex];
    lofi.play();
    song(lofi);
  }
});


});

// start from the beggining of the page
window.onload = function() {
  window.setTimeout(
      function() { window.scrollTo(0,0); }
)};



// Function to start typewriter animation
function startTypewriterAnimation() {
  const textElement = document.querySelector('.text');
  textElement.style.animation = 'typewriter 7s steps(44) 500ms 1 normal both, blinkTextCursor 500ms steps(44) infinite normal';
}

// Intersection Observer to trigger animation when the element comes into view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Reset max-height to its initial value
      entry.target.style.maxHeight = null;

      // Start typewriter animation
      startTypewriterAnimation();

      // Listen for the animationiteration event
      entry.target.addEventListener('animationiteration', () => {
        // Reset animation when it completes an iteration
        entry.target.style.animation = 'none';
        setTimeout(() => {
          // Reapply animation after a short delay to restart it
          startTypewriterAnimation();
        }, 0);
      }, { once: true }); // Use once option to remove the event listener after one iteration
    }
  });
}, { threshold: 0.1 });

// Observe the .text element continuously
observer.observe(document.querySelector('.text'));