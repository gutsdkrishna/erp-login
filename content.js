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
function waitForQuestionText(selector, timeout) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const element = document.querySelector(selector);
      if (element && element.innerText.trim() !== "") {
        console.log(`[DEBUG] Non-empty question text found`);
        clearInterval(interval);
        resolve(element);
      } else if (elapsed >= timeout) {
        clearInterval(interval);
        reject(`[DEBUG] Timeout waiting for non-empty question text`);
      }
    }, 100);
  });
}

// Function to request PIN from user
function requestPin() {
  return new Promise((resolve) => {
    const pin = prompt("Please enter your 4-digit PIN:");
    resolve(pin);
  });
}

// Function to open Gmail in a new tab
function openGmail() {
  window.open('https://mail.google.com', '_blank');
}

// Session storage key for PIN verification flag
const PIN_VERIFIED_KEY = 'pinVerified';

// Fetch stored credentials and answers from browser storage
browser.storage.sync.get([
  'userId',
  'password',
  'question1',
  'answer1',
  'question2',
  'answer2',
  'question3',
  'answer3',
  'pin' // Fetch stored PIN
]).then(async (items) => {
  // Check if items are undefined or empty
  if (!items || !items.userId || !items.password || !items.question1 || !items.answer1 || !items.question2 || !items.answer2 || !items.question3 || !items.answer3 || !items.pin) {
    console.error('[DEBUG] Some or all stored items are missing.');
    return;
  }

  const answers = {
    [items.question1]: items.answer1,
    [items.question2]: items.answer2,
    [items.question3]: items.answer3
  };

  try {
    // Check if the PIN has already been verified during this session
    if (sessionStorage.getItem(PIN_VERIFIED_KEY) !== 'true') {
      // Request the PIN from the user
      const enteredPin = await requestPin();

      // Check if the entered PIN matches the stored PIN
      if (enteredPin !== items.pin) {
        alert("Incorrect PIN. Access denied.");
        return;
      }

      // Set the session flag indicating the PIN has been verified
      sessionStorage.setItem(PIN_VERIFIED_KEY, 'true');
    }

    // Open the login page
    console.log("[DEBUG] Opened the website");

    // Enter user ID
    const userIdElement = await waitForElement('#user_id', 10000);
    userIdElement.value = items.userId;
    console.log("[DEBUG] Entered User ID");

    // Random delay before entering password
    await new Promise(r => setTimeout(r, Math.random() * 1000 + 500));

    // Enter password
    const passwordElement = await waitForElement('#password', 10000);
    passwordElement.value = items.password;
    console.log("[DEBUG] Entered password");

    // Click the "Show ID/Password" button
    const showPasswordButton = await waitForElement('#show_password', 10000);
    showPasswordButton.click();
    console.log("[DEBUG] Clicked 'Show ID/Password' button");

    // Wait for the question text to be visible and non-empty
    const questionElement = await waitForQuestionText('#question', 10000);
    const questionText = questionElement.innerText.trim();
    console.log(`[DEBUG] Question text fetched: ${questionText}`);

    // Random delay before entering the answer
    await new Promise(r => setTimeout(r, Math.random() * 1000 + 500));

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

    // Wait for OTP to be sent (assuming some asynchronous process)
    await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust timeout as needed

    // Open Gmail in a new tab after OTP is sent
    openGmail();
    console.log("[DEBUG] Opened Gmail in a new tab");

  } catch (error) {
    console.error(error);
  }
}).catch((error) => {
  console.error('[DEBUG] Error fetching items from storage:', error);
});


// // Helper function to simulate the Python script's wait and debug print functionality
// function waitForElement(selector, timeout) {
//   return new Promise((resolve, reject) => {
//     const start = Date.now();
//     const interval = setInterval(() => {
//       const elapsed = Date.now() - start;
//       const element = document.querySelector(selector);

//       if (element) {
//         console.log(`[DEBUG] ${selector} found after ${elapsed}ms`);
//         clearInterval(interval);
//         resolve(element);
//       } else if (elapsed >= timeout) {
//         clearInterval(interval);
//         reject(`[DEBUG] Timeout waiting for ${selector}`);
//       }
//     }, 100);
//   });
// }

// // Helper function to wait until the question text is not empty
// function waitForQuestionText(selector, timeout) {
//   return new Promise((resolve, reject) => {
//     const start = Date.now();
//     const interval = setInterval(() => {
//       const elapsed = Date.now() - start;
//       const element = document.querySelector(selector);
//       if (element && element.innerText.trim() !== "") {
//         console.log(`[DEBUG] Non-empty question text found`);
//         clearInterval(interval);
//         resolve(element);
//       } else if (elapsed >= timeout) {
//         clearInterval(interval);
//         reject(`[DEBUG] Timeout waiting for non-empty question text`);
//       }
//     }, 100);
//   });
// }

// // Helper function to click at specific coordinates within an element
// function clickElementAt(selector, offsetX, offsetY) {
//   const element = document.querySelector(selector);
//   if (element) {
//     const rect = element.getBoundingClientRect();
//     const x = rect.left + offsetX;
//     const y = rect.top + offsetY;
//     const clickEvent = new MouseEvent('click', {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//       clientX: x,
//       clientY: y
//     });
//     element.dispatchEvent(clickEvent);
//     console.log(`[DEBUG] Clicked at (${x}, ${y}) within ${selector}`);
//   } else {
//     console.log(`[DEBUG] Element ${selector} not found for clicking`);
//   }
// }

// // Function to simulate focus and input events
// function simulateEvent(element, eventType) {
//   const event = new Event(eventType, { bubbles: true, cancelable: true });
//   element.dispatchEvent(event);
// }

// // Fetch stored credentials and answers from Chrome storage
// chrome.storage.sync.get([
//   'userId',
//   'password',
//   'question1',
//   'answer1',
//   'question2',
//   'answer2',
//   'question3',
//   'answer3'
// ], async (items) => {
//   if (items.userId && items.password && items.question1 && items.answer1 && items.question2 && items.answer2 && items.question3 && items.answer3) {
//     const answers = {
//       [items.question1]: items.answer1,
//       [items.question2]: items.answer2,
//       [items.question3]: items.answer3
//     };

//     try {
//       // Open the login page
//       console.log("[DEBUG] Opened the website");

//       // Enter user ID
//       setTimeout(async () => {
//         try {
//           const userIdElement = await waitForElement('#user_id', 10000);
//           userIdElement.value = items.userId;
//           simulateEvent(userIdElement, 'input');
//           console.log("[DEBUG] Entered User ID");
//         } catch (error) {
//           console.error(error);
//         }
//       }, 1000);
      

//       // Enter password
//       setTimeout(async () => {
//         try {
//           const passwordElement = await waitForElement('#password', 10000);
//           passwordElement.value = items.password;
//           simulateEvent(passwordElement, 'input');
//           console.log("[DEBUG] Entered password");
//         } catch (error) {
//           console.error(error);
//         }
//       }, 3000);
      

      

//       // Wait for the question text to be visible and non-empty
//       const questionElement = await waitForQuestionText('#question', 10000);
//       const questionText = questionElement.innerText.trim();
//       console.log(`[DEBUG] Question text fetched: ${questionText}`);

//       // Find the correct answer
//       const answer = answers[questionText] || "default_answer";
//       console.log(`[DEBUG] Found answer for the question: ${answer}`);

//       // Enter the answer
//       setTimeout(async () => {
//         try {
//           const answerElement = await waitForElement('#answer', 10000);
//           answerElement.value = answer;
//           simulateEvent(answerElement, 'input');
//           console.log("[DEBUG] Entered answer");
//         } catch (error) {
//           console.error(error);
//         }
//       }, 7000);

//       // Wait for 5 seconds before clicking the "Show ID/Password" button
//       setTimeout(async () => {
//         try {
//           const showPasswordButton = await waitForElement('#show_password', 10000);
//           showPasswordButton.click();
//           console.log("[DEBUG] Clicked 'Show ID/Password' button");
//         } catch (error) {
//           console.error(error);
//         }
//       }, 8000);
      
      

//       // Click the OTP button
//       // Wait for 5 seconds before clicking the "Show ID/Password" button
//       setTimeout(async () => {
//         try {
//           const otpButton = await waitForElement('#getotp', 10000);
//           otpButton.click();
//           console.log("[DEBUG] Clicked OTP button");
//         } catch (error) {
//           console.error(error);
//         }
//       }, 10000);
      

//     } catch (error) {
//       console.error(error);
//     }
//   }
// });
