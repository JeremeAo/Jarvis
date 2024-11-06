document.addEventListener("DOMContentLoaded", function() {
    const topRightNumber = document.getElementById('topRightNumber');
    const topLastText = document.querySelector('.top-last-text');
    const btn = document.getElementById('talkButton');
    const content = document.querySelector('.content');
    const welcomeAudio = document.getElementById('welcomeAudio');

    const typingTextTopRight = `
        measuring data...
        code: 865-213-4562
        binary: 101110011110
        encrypted data: er315w653##5d3d56dEd
    `;
    const typingTextTopLast = `
        analyzing operating system...
    `;

    const typingSpeed = 50; // Typing speed in milliseconds
    let typingIndexTopRight = 0;
    let typingIndexTopLast = 0;
    let typingIntervalTopRight;
    let typingIntervalTopLast;

    function typeTopRight() {
        if (typingIndexTopRight < typingTextTopRight.length) {
            topRightNumber.innerHTML += typingTextTopRight.charAt(typingIndexTopRight);
            typingIndexTopRight++;
        } else {
            // Reset for repeat effect
            typingIndexTopRight = 0;
            topRightNumber.innerHTML = ''; // Clear the content
        }
    }

    function typeTopLast() {
        if (typingIndexTopLast < typingTextTopLast.length) {
            topLastText.innerHTML += typingTextTopLast.charAt(typingIndexTopLast);
            typingIndexTopLast++;
        } else {
            // Reset for repeat effect
            typingIndexTopLast = 0;
            topLastText.innerHTML = ''; // Clear the content
        }
    }

    function startTyping() {
        typingIntervalTopRight = setInterval(typeTopRight, typingSpeed);
        typingIntervalTopLast = setInterval(typeTopLast, typingSpeed);
    }

    function stopTyping() {
        clearInterval(typingIntervalTopRight);
        clearInterval(typingIntervalTopLast);
    }

    function repeatTyping() {
        startTyping(); // Start typing
        // Restart typing effect after it's finished
        setTimeout(() => {
            stopTyping();
            repeatTyping();
        }, typingSpeed * Math.max(typingTextTopRight.length, typingTextTopLast.length));
    }

    repeatTyping(); // Start the repeated typing animation

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
    };

    btn.addEventListener('click', () => {
        content.textContent = "Listening...";
        recognition.start();
    });

    function speak(text) {
        const synth = window.speechSynthesis;
        const text_speak = new SpeechSynthesisUtterance(text);

        const voices = synth.getVoices();
        const jarvisVoice = voices.find(voice => voice.name.includes('Google UK English Male') || voice.name.includes('Microsoft David') || voice.name.includes('Daniel')) || voices[0];

        text_speak.voice = jarvisVoice;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;

        synth.speak(text_speak);
    }

    function wishMe() {
        const hour = new Date().getHours();
        if (hour < 12) {
            speak("Good Morning Boss...");
        } else if (hour < 17) {
            speak("Good Afternoon Master...");
        } else {
            speak("Good Evening Master Jeremy...");
        }
    }

    function takeCommand(message) {
        console.log("Received message:", message);

        message = message.trim();

        if (message.includes('wake up')) {
            welcomeAudio.play();
            speak("Welcome Home Master Jeremy Orcullo, congratulations on developing Jarvis, your personal virtual assistant. How may I help you today?");
            
            // Stop the music after 15 seconds
            setTimeout(() => {
                welcomeAudio.pause();
                welcomeAudio.currentTime = 0;
               
                // Restart speech recognition
                recognition.start();
            }, 15000); // 15000 milliseconds = 15 seconds

            // Simulate button click
            btn.click();
        } else if (message.includes('your developer')) {
            speak("The individual who developed me is my master Jeremy Orcullo, aspiring skilled programmer proficient in HTML, CSS, and JavaScript. He successfully created me during his fourth year of college at Cavite State University, where he pursued a Bachelor of Science in Computer Science. Master Jeremy was born on March 24, 2000, and recently graduated from the university.");
        } else if (message.includes("marketing updates")) {
            speak("In 2024, a notable 90% of marketers using short-form videos plan to either boost or sustain their investment in this content type. This decision aligns with current trends where half of all marketers prioritize video content, particularly the short-form variety, to capture their audience's attention effectively.");
        } else if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google Search...");
        } else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        } else if (message.includes('you still up')){
            speak('for you sir, always');
        } else if (message.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Accessing your Facebook account... Currently, there are no significant notifications. However, you do have an unread message. Would you like me to read it to you Sir?");
        } else if (message.includes("leave it there")) {
            speak("Okay Sir, Just tell me if you need anything else.");
        } else if (message.includes("open instagram")) {
            window.open("https://www.instagram.com/", "_blank");
            speak("Opening your Instagram...");
        } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            const searchQuery = message.replace(/ /g, "+");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            speak("This is what I found on the internet regarding " + message);
        } else if (message.includes('wikipedia')) {
            const searchQuery = message.replace("wikipedia", "").trim();
            window.open(`https://en.wikipedia.org/wiki/${searchQuery}`, "_blank");
            speak("This is what I found on Wikipedia regarding " + message);
        } else if (message.includes('time')) {
            const time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
            speak("The current time is " + time);
        } else if (message.includes('date today')) {
            const date = new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
            speak("Today's date is " + date);
        } else if (message.includes('calculator')) {
            window.open('Calculator:///', '_blank');
            speak("Opening Calculator");
        } else if (message.includes('spotify')) {
            window.open('Spotify:///', '_blank');
            speak("Opening Spotify");
        } else if (message.includes('system update')) {
            window.open('ms-settings:windowsupdate', '_blank');
            speak("Opening Windows Update settings, sir i found out that your laptop is a windows 11 ready,... do you want me to download and install it for you?");
        } else if (message.includes('stop the music')) {
            welcomeAudio.pause();
            welcomeAudio.currentTime = 0;
            speak("Stopping the music...");
        } else {
            const searchQuery = message.replace(/ /g, "+");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            speak("master Jeremy, I found some information for " + message + " on Google");
        }
    }

    // Uncomment to initialize and greet user on page load
    speak("Initializing JARVIS...");
    wishMe();
});
