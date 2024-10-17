const translations = {
  en: {
    noNumber: '🚫 No Number!',
    correctNumber: '✔ Correct Number!',
    tooHigh: '📈 Too high!',
    tooLow: '📉 Too low!',
    lostGame: '💥 You lost the game!',
    closeGuess: '🔥 You are so close!',
    startGuessing: 'Start guessing...',
    again: 'Play again!',
    check: 'Check!',
    title: 'Guess My Number!',
    between: '(Between 1 and 20)',
    scoreLabel: 'Score:',
    highscoreLabel: 'Highscore:',
  },
  tr: {
    noNumber: '🚫 Sayı girilmedi!',
    correctNumber: '✔ Doğru Sayı!',
    tooHigh: '📈 Çok yüksek!',
    tooLow: '📉 Çok düşük!',
    lostGame: '💥 Oyunu kaybettin!',
    closeGuess: '🔥 Çok yaklaştın!',
    startGuessing: 'Tahmin etmeye başla...',
    again: 'Tekrar oyna!',
    check: 'Kontrol Et!',
    title: 'Sayıyı Tahmin Et!',
    between: '(1 ile 20 arasında)',
    scoreLabel: 'Skor:',
    highscoreLabel: 'En Yüksek Skor:',
  },
};
let currentLang = 'en';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent =
    translations[currentLang][message];
};
const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

// Kullanıcının local'inde kendi seçimine göre kayıtlı kalması için
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'en';
  changeLanguage(savedLang);
});
// language update fonksiyonu
function changeLanguage(lang) {
  currentLang = lang;
  updateTexts();
  localStorage.setItem('language', lang);
  document.querySelectorAll('.fade').forEach(el => {
    el.classList.remove('show');
  });

  setTimeout(() => {
    updateTexts();
    document.querySelectorAll('.fade').forEach(el => {
      el.classList.add('show');
    });
  }, 300);
}
// Set En-TR
function updateTexts() {
  document.querySelector('.score-label').textContent =
    translations[currentLang].scoreLabel;
  document.querySelector('.highscore-label').textContent =
    translations[currentLang].highscoreLabel;
  translations[currentLang].startGuessing;
  displayMessage('startGuessing');
  document.querySelector('.again').textContent =
    translations[currentLang].again;
  document.querySelector('.check').textContent =
    translations[currentLang].check;
  document.querySelector('h1').textContent = translations[currentLang].title;
  document.querySelector('.between').textContent =
    translations[currentLang].between;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // if the input value is invalid ( 0 or etc.)
  if (!guess) {
    displayMessage('noNumber');
    //document.querySelector('.message').textContent =
    //translations[currentLang].noNumber;
    // if guess is equal to secret number
  } else if (guess === secretNumber) {
    displayMessage('correctNumber');
    displayNumber(secretNumber);

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // if guess is near to result
  } else if (guess === secretNumber + 1 || guess === secretNumber - 1) {
    displayMessage('closeGuess');

    // if guess is higher then secretNumber
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'tooHigh' : 'tooLow');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('lostGame');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// alternative secret number function

/*
 else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        translations[currentLang].tooHigh;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent =
        translations[currentLang].lostGame;
      document.querySelector('.score').textContent = 0;
    }

    // if guess is lower then secretNumber
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        translations[currentLang].tooLow;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent =
        translations[currentLang].lostGame;
      document.querySelector('.score').textContent = 0;
    }
  }
});
*/

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('startGuessing');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#83010b';
});

document.querySelector('.btn-lang-en').addEventListener('click', function () {
  changeLanguage('en');
});

document.querySelector('.btn-lang-tr').addEventListener('click', function () {
  changeLanguage('tr');
});
