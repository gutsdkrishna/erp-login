document.getElementById('save').addEventListener('click', () => {
  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;
  const question1 = document.getElementById('question1').value;
  const answer1 = document.getElementById('answer1').value;
  const question2 = document.getElementById('question2').value;
  const answer2 = document.getElementById('answer2').value;
  const question3 = document.getElementById('question3').value;
  const answer3 = document.getElementById('answer3').value;

  chrome.storage.sync.set({
    userId,
    password,
    question1,
    answer1,
    question2,
    answer2,
    question3,
    answer3
  }, () => {
    alert('Login information saved!');
  });
});
