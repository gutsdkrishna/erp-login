document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            try {
                const userId = document.getElementById('userId').value;
                const password = document.getElementById('password').value;
                const question1 = document.getElementById('question1').value;
                const answer1 = document.getElementById('answer1').value;
                const question2 = document.getElementById('question2').value;
                const answer2 = document.getElementById('answer2').value;
                const question3 = document.getElementById('question3').value;
                const answer3 = document.getElementById('answer3').value;
                const pin = document.getElementById('pin').value;

                // Save data to Chrome storage
                chrome.storage.sync.set({
                    userId,
                    password,
                    question1,
                    answer1,
                    question2,
                    answer2,
                    question3,
                    answer3,
                    pin
                }, () => {
                    console.log('Data saved successfully.');
                });
            } catch (error) {
                console.error('Error handling save button click:', error);
            }
        });
    } else {
        console.error('Save button not found in the DOM.');
    }

    const loadButton = document.getElementById('loadButton');
    if (loadButton) {
        loadButton.addEventListener('click', async () => {
            try {
                // Retrieve data from Chrome storage
                chrome.storage.sync.get([
                    'userId',
                    'password',
                    'question1',
                    'answer1',
                    'question2',
                    'answer2',
                    'question3',
                    'answer3',
                    'pin'
                ], (items) => {
                    document.getElementById('userId').value = items.userId || '';
                    document.getElementById('password').value = items.password || '';
                    document.getElementById('question1').value = items.question1 || '';
                    document.getElementById('answer1').value = items.answer1 || '';
                    document.getElementById('question2').value = items.question2 || '';
                    document.getElementById('answer2').value = items.answer2 || '';
                    document.getElementById('question3').value = items.question3 || '';
                    document.getElementById('answer3').value = items.answer3 || '';
                    document.getElementById('pin').value = items.pin || '';

                    console.log('Data loaded successfully.');
                });
            } catch (error) {
                console.error('Error handling load button click:', error);
            }
        });
    } else {
        console.error('Load button not found in the DOM.');
    }
});
