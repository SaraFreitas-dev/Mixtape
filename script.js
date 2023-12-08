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
    "Music/Kiss From A Rose-Seal.mp3",
    "Music/Closer-The_Chainsmokers_ft._Halsey.mp3",
    "Music/Iris - Goo Goo Dolls.mp3"
    // https://www.youtube.com/watch?v=9AEoUa0Hlso
    // Rocío Dúrcal - Amor eterno
    // Manu Chao - Me Gustas Tu (Official Audio)
    // Caballo Viejo Simon Diaz (Letra) HD
    // Alma Llanera - Simón Diaz - SantiMusic.TV
    // Carmen DeLeon - Bésame Bonito Remix feat. Micro TDH (Video Oficial)
    


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
  playlist = shuffle(playlist);

  // Function to play the previous song
  tapPrev.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    lofi.src = playlist[currentSongIndex];
    lofi.play();
    song(lofi);
  });

  // Function to play the next song
  tapNext.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    lofi.src = playlist[currentSongIndex];
    lofi.play();
    song(lofi);
  });

  // Add a click event listener to the cassette element
  tapPlay.addEventListener("click", function () {
    if (lofi.paused) {
      lofi.src = playlist[currentSongIndex];
      lofi.play();
      song(lofi);
    } else {
      lofi.pause();
    }
  });

  // Event listener for the end of the current song
  lofi.addEventListener("ended", function () {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    lofi.src = playlist[currentSongIndex];
    lofi.play();
    song(lofi);
  });
});
