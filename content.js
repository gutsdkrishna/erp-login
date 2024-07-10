// Helper function to simulate the Python script's wait and debug print functionality
function waitForElement(selector, timeout) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const element = document.querySelector(selector);

      if (element) {
        console.log(`[DEBUG] ${selector} found after ${elapsed}ms`);
        clearInterval(interval);
        resolve(element);
      } else if (elapsed >= timeout) {
        clearInterval(interval);
        reject(`[DEBUG] Timeout waiting for ${selector}`);
      }
    }, 100);
  });
}

// Helper function to wait until the question text is not empty
function waitForQuestionText(selector) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element && element.innerText.trim() !== "") {
        console.log(`[DEBUG] Non-empty question text found`);
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  });
}

// Helper function to click at specific coordinates within an element
function clickElementAt(selector, offsetX, offsetY) {
  const element = document.querySelector(selector);
  if (element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + offsetX;
    const y = rect.top + offsetY;
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });
    element.dispatchEvent(clickEvent);
    console.log(`[DEBUG] Clicked at (${x}, ${y}) within ${selector}`);
  } else {
    console.log(`[DEBUG] Element ${selector} not found for clicking`);
  }
}

// Fetch stored credentials and answers from Chrome storage
chrome.storage.sync.get([
  'userId',
  'password',
  'question1',
  'answer1',
  'question2',
  'answer2',
  'question3',
  'answer3'
], async (items) => {
  if (items.userId && items.password && items.question1 && items.answer1 && items.question2 && items.answer2 && items.question3 && items.answer3) {
    const answers = {
      [items.question1]: items.answer1,
      [items.question2]: items.answer2,
      [items.question3]: items.answer3
    };

    try {
      // Open the login page
      console.log("[DEBUG] Opened the website");

      // Enter user ID
      const userIdElement = await waitForElement('#user_id', 10000);
      userIdElement.value = items.userId;
      console.log("[DEBUG] Entered User ID");

      // Enter password
      const passwordElement = await waitForElement('#password', 10000);
      passwordElement.value = items.password;
      console.log("[DEBUG] Entered password");

      // Click the "Show ID/Password" button
      const showPasswordButton = await waitForElement('#show_password', 10000);
      showPasswordButton.click();
      console.log("[DEBUG] Clicked 'Show ID/Password' button");

      // Wait for the question text to be visible and non-empty
      const questionElement = await waitForQuestionText('#question');
      const questionText = questionElement.innerText.trim();
      console.log(`[DEBUG] Question text fetched: ${questionText}`);

      // Find the correct answer
      const answer = answers[questionText] || "default_answer";
      console.log(`[DEBUG] Found answer for the question: ${answer}`);

      // Enter the answer
      const answerElement = await waitForElement('#answer', 10000);
      answerElement.value = answer;
      console.log("[DEBUG] Entered answer");

      // Click the OTP button
      const otpButton = await waitForElement('#getotp', 10000);
      otpButton.click();
      console.log("[DEBUG] Clicked OTP button");

      // Click the element with id "signin" at specific coordinates (589, 430)
      clickElementAt('#signin', 589, 430); // Coordinates as per the requirement
      console.log("[DEBUG] Clicked 'signin' element");

    } catch (error) {
      console.error(error);
    }
  }
});
