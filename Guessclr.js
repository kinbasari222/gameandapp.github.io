const colors = ["Merah", "Hijau", "Biru", "Kuning", "Ungu", "Pink", "Cekelat", "Putih", "Hitam", "Jingga"];
    const colorCodes = {
      "Merah": "#f00",
      "Hijau": "#0f0",
      "Biru": "#00f",
      "Kuning": "#ff0",
      "Ungu": "#81b",
      "Pink" : "#f6f",
      "Cekelat" : "#620",
      "Putih" : "#fff",
      "Jingga" : "#f80",
      "Hitam" : "#000"
    };

    let currentText = "";
    let currentColor = "";
    let score = 0;
    let timeLeft = 3;
    let timer;
    let isGameOver = false;

    function getRandomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function setNewChallenge() {
      if (isGameOver) return;
      currentText = getRandomColor();
      currentColor = getRandomColor();
      const colorTextDiv = document.getElementById("colorText");
      colorTextDiv.textContent = currentText;
      colorTextDiv.style.color = colorCodes[currentColor];
      document.getElementById("gameOver").textContent = "";
      timeLeft = 3;
      updateTimer();
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
    }

    function countdown() {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame("Waktu habis ");
      }
    }

    function updateTimer() {
      document.getElementById("timer").textContent = `${timeLeft}`;
    }

    function checkAnswer(isCorrect) {
      if (isGameOver) return;
      clearInterval(timer);
      const correctSound = document.getElementById("correctSound");
      const wrongSound = document.getElementById("wrongSound");
      const isMatch = currentText === currentColor;

      if (isCorrect === isMatch) {
        score++;
        document.getElementById("score").textContent = score;
        correctSound.play();
        setNewChallenge();
      } else {
        wrongSound.play();
        endGame("Permainan berakhir ");
      }
    }

    function endGame(message) {
      isGameOver = true;
      document.getElementById("gameOver").textContent = `${message} dan skor kamu adalah ${score}`;
      document.getElementById("colorText").textContent = "";
      document.getElementById("timer").textContent = "";
      const gameOverSound = document.getElementById("gameOverSound");
      gameOverSound.play();
    }

    setNewChallenge();
