# Auto Login Chrome Extension

This Chrome extension automatically logs you into a specified website using your stored credentials and security question answers.
   
# Auto Login Chrome Extension

This Chrome extension automatically logs you into a specified website using your stored credentials and security question answers.

## Features
- Automatically fills in user ID and password with just a 4 digit pin.
- Handles security questions by fetching stored answers.
- Clicks buttons to complete the login process.

## Installation

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/gutsdkrishna/erp-login
    cd <repository-directory>
    ```

2. **Load the Extension in Chrome:**
    - Open Chrome and navigate to `chrome://extensions/`
    - Enable "Developer mode" using the toggle switch at the top right corner.
    - Click on the "Load unpacked" button and select the directory containing the extension files.

3. **Set Up Your Credentials and Answers:**
    - Click on the extension icon in the Chrome toolbar.
    - Enter your user ID, password, and security questions/answers.
    - Click "Save" to store your information.

## Usage

1. **Navigate to the Login Page:**
    - Open the login page of the website you want to automate.

2. **Extension Execution:**
    - The extension will automatically start filling in the login details and answering the security question once the login page is loaded.

3. **Monitor the Process:**
    - You can open the console (`Ctrl + Shift + J`) to view debug messages and ensure everything is working correctly.

## How It Works

0. **PIN Verification:**
    - Before performing any actions, the extension prompts the user to enter a 4-digit PIN and verifies it against the stored PIN.

1. **Wait for Elements:**
    - The extension uses helper functions to wait for specific elements on the page to be available. This ensures that elements are interacted with only when they are ready.

2. **Fill User ID and Password:**
    - The extension retrieves stored user ID and password from Chrome's storage and fills them in the respective input fields.

3. **Click Buttons:**
    - The extension clicks necessary buttons, such as "Show ID/Password" and "Get OTP", to proceed with the login process.

4. **Handle Security Questions:**
    - The extension waits for the security question to appear, fetches the appropriate answer from storage, and fills it in the answer field.
      
