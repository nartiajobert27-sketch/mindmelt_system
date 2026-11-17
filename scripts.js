// GLOBAL STATE VARIABLES
let currentUser = null;
let currentCategoryKey = "";
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswersHistory = [];
let timerInterval = null;
let timeLeft = 20;
let isAnswered = false;
let activeQuestionsArray = [];

// Dynamic Builder State
let builderQuestions = [];

// BUILT-IN 20 QUESTIONS PER CATEGORY
const quizData = {
    science: [
        { q: "What planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter", "Venus"], ans: 1, exp: "Mars looks red because of iron oxide (rust) on its surface." },
        { q: "What is the powerhouse of the cell?", choices: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], ans: 2, exp: "Mitochondria produce cellular energy (ATP)." },
        { q: "What chemical element has the symbol 'O'?", choices: ["Gold", "Oxygen", "Osmium", "Zinc"], ans: 1, exp: "O stands for Oxygen in the Periodic Table." },
        { q: "What force keeps us on the ground?", choices: ["Friction", "Magnetism", "Gravity", "Tension"], ans: 2, exp: "Gravity pulls objects toward the center of the Earth." },
        { q: "What is the boiling point of water at sea level?", choices: ["50°C", "90°C", "100°C", "120°C"], ans: 2, exp: "Water boils at 100 degrees Celsius under standard atmospheric pressure." },
        { q: "Which gas do plants absorb during photosynthesis?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], ans: 1, exp: "Plants consume CO2 and release Oxygen." },
        { q: "What is the hardest natural substance on Earth?", choices: ["Gold", "Iron", "Diamond", "Quartz"], ans: 2, exp: "Diamond is the hardest naturally occurring material." },
        { q: "How many planets are in our solar system?", choices: ["7", "8", "9", "10"], ans: 1, exp: "There are 8 official planets after Pluto was reclassified as a dwarf planet." },
        { q: "What part of the plant conducts photosynthesis?", choices: ["Roots", "Stem", "Leaf", "Flower"], ans: 2, exp: "Leaves contain chloroplasts which carry out photosynthesis." },
        { q: "What type of animal is a frog?", choices: ["Reptile", "Amphibian", "Mammal", "Bird"], ans: 1, exp: "Frogs live both in water and on land, making them amphibians." },
        { q: "What speed does light travel at roughly?", choices: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "3,000 km/s"], ans: 0, exp: "Light travels approximately 300,000 kilometers per second in a vacuum." },
        { q: "What human organ pumps blood?", choices: ["Lungs", "Brain", "Liver", "Heart"], ans: 3, exp: "The heart pumps oxygenated blood around the body." },
        { q: "Which element is essential for human bone health?", choices: ["Sodium", "Calcium", "Iron", "Potassium"], ans: 1, exp: "Calcium is the main component of bones and teeth." },
        { q: "What instrument measures atmospheric pressure?", choices: ["Thermometer", "Barometer", "Speedometer", "Hydrometer"], ans: 1, exp: "Barometers are used by meteorologists to measure air pressure." },
        { q: "What state of matter has a definite volume but no fixed shape?", choices: ["Solid", "Liquid", "Gas", "Plasma"], ans: 1, exp: "Liquids conform to the container shape but retain constant volume." },
        { q: "Which planet is closest to the Sun?", choices: ["Venus", "Mercury", "Earth", "Mars"], ans: 1, exp: "Mercury orbits closest to the Sun." },
        { q: "What acid is found in lemons?", choices: ["Sulfuric Acid", "Citric Acid", "Lactic Acid", "Hydrochloric Acid"], ans: 1, exp: "Citrus fruits contain high levels of citric acid." },
        { q: "What is the primary gas in Earth's atmosphere?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], ans: 2, exp: "Nitrogen makes up about 78% of Earth's atmosphere." },
        { q: "At what temperature are Celsius and Fahrenheit equal?", choices: ["0°", "-40°", "100°", "-20°"], ans: 1, exp: "-40 degrees C is equal to -40 degrees F." },
        { q: "What is the center of an atom called?", choices: ["Electron", "Proton", "Nucleus", "Neutron"], ans: 2, exp: "The central core of an atom is called the nucleus." }
    ],
    math: [
        { q: "What is 15 + 27?", choices: ["40", "41", "42", "43"], ans: 2, exp: "15 + 27 = 42." },
        { q: "What is the square root of 64?", choices: ["6", "7", "8", "9"], ans: 2, exp: "8 * 8 = 64." },
        { q: "Solve: 12 x 8", choices: ["84", "96", "88", "104"], ans: 1, exp: "12 times 8 equals 96." },
        { q: "What is the value of Pi rounded to 2 decimal places?", choices: ["3.12", "3.14", "3.16", "3.18"], ans: 1, exp: "Pi (π) is approximately equal to 3.14." },
        { q: "What is 100 divided by 4?", choices: ["20", "25", "30", "15"], ans: 1, exp: "100 / 4 = 25." },
        { q: "What is a 90-degree angle called?", choices: ["Acute", "Obtuse", "Right angle", "Reflex"], ans: 2, exp: "An angle measuring exactly 90 degrees is a Right angle." },
        { q: "Solve for x: 2x + 5 = 15", choices: ["5", "10", "4", "6"], ans: 0, exp: "2x = 10 -> x = 5." },
        { q: "How many sides does a hexagon have?", choices: ["5", "6", "7", "8"], ans: 1, exp: "A hexagon has 6 straight sides." },
        { q: "What is 7 squared (7^2)?", choices: ["14", "49", "35", "42"], ans: 1, exp: "7 * 7 = 49." },
        { q: "What is 50% of 250?", choices: ["100", "125", "150", "115"], ans: 1, exp: "Half of 250 is 125." },
        { q: "What is the perimeter of a square with side length 5cm?", choices: ["20cm", "25cm", "15cm", "10cm"], ans: 0, exp: "4 sides * 5cm = 20cm." },
        { q: "What is the prime number out of these choices?", choices: ["9", "15", "17", "21"], ans: 2, exp: "17 has no divisors other than 1 and itself." },
        { q: "What is 3 cubed (3^3)?", choices: ["9", "18", "27", "81"], ans: 2, exp: "3 * 3 * 3 = 27." },
        { q: "Solve: 100 - 45", choices: ["45", "55", "65", "50"], ans: 1, exp: "100 minus 45 is 55." },
        { q: "What is the area of a rectangle with length 6 and width 4?", choices: ["10", "20", "24", "12"], ans: 2, exp: "Area = Length * Width = 6 * 4 = 24." },
        { q: "How many degrees are in a full circle?", choices: ["180", "270", "360", "400"], ans: 2, exp: "A complete rotation is 360 degrees." },
        { q: "If a triangle has angles 60° and 40°, what is the 3rd angle?", choices: ["80°", "90°", "100°", "70°"], ans: 0, exp: "Sum of angles in a triangle is 180°. 180 - (60+40) = 80°." },
        { q: "What is 9 x 9?", choices: ["72", "81", "99", "90"], ans: 1, exp: "9 multiplied by 9 is 81." },
        { q: "What is 1/2 + 1/4?", choices: ["2/4", "3/4", "1/6", "2/6"], ans: 1, exp: "2/4 + 1/4 = 3/4." },
        { q: "What is the Roman numeral for 50?", choices: ["V", "X", "L", "C"], ans: 2, exp: "L represents 50 in Roman numerals." }
    ],
    english: [
        { q: "Who wrote the play 'Romeo and Juliet'?", choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], ans: 1, exp: "William Shakespeare wrote Romeo and Juliet in the late 16th century." },
        { q: "What is a noun?", choices: ["An action word", "A person, place, or thing", "A word describing a verb", "A conjunction"], ans: 1, exp: "Nouns represent people, places, things, or ideas." },
        { q: "Which of the following is a synonym for 'Happy'?", choices: ["Sad", "Joyful", "Angry", "Tired"], ans: 1, exp: "'Joyful' means happy." },
        { q: "What is the past tense of 'Run'?", choices: ["Running", "Ran", "Runned", "Runs"], ans: 1, exp: "The irregular past tense of run is ran." },
        { q: "Who is the author of 'Harry Potter'?", choices: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "C.S. Lewis"], ans: 1, exp: "J.K. Rowling authored the Harry Potter fantasy series." },
        { q: "What figure of speech compares using 'like' or 'as'?", choices: ["Metaphor", "Simile", "Personification", "Hyperbole"], ans: 1, exp: "A simile explicitly compares two things using 'like' or 'as'." },
        { q: "What is an antonym for 'Cold'?", choices: ["Freezing", "Hot", "Icy", "Cool"], ans: 1, exp: "An antonym is an opposite word, so 'Hot' is opposite to 'Cold'." },
        { q: "Find the adjective: 'The blue car drove fast.'", choices: ["blue", "drove", "car", "fast"], ans: 0, exp: "'Blue' describes the noun 'car'." },
        { q: "What is the main character in a story called?", choices: ["Antagonist", "Protagonist", "Narrator", "Extra"], ans: 1, exp: "The protagonist is the principal character in a narrative." },
        { q: "Which word is misspelled?", choices: ["Definitely", "Receive", "Accommodate", "Seperate"], ans: 3, exp: "The correct spelling is 'Separate' (with an 'a')." },
        { q: "What punctuation mark ends an interrogative sentence?", choices: ["Period", "Exclamation Mark", "Question Mark", "Comma"], ans: 2, exp: "Interrogative sentences ask questions, ending in '?'." },
        { q: "What type of poem has 14 lines?", choices: ["Haiku", "Sonnet", "Limerick", "Epic"], ans: 1, exp: "A sonnet is a 14-line poem with specific rhyme scheme." },
        { q: "Who wrote 'Pride and Prejudice'?", choices: ["Emily Bronte", "Jane Austen", "Virginia Woolf", "Mary Shelley"], ans: 1, exp: "Jane Austen published Pride and Prejudice in 1813." },
        { q: "What is the plural form of 'Child'?", choices: ["Childs", "Children", "Childrens", "Childes"], ans: 1, exp: "The plural form of child is children." },
        { q: "What is an exaggeration used for emphasis called?", choices: ["Hyperbole", "Idiom", "Oxymoron", "Onomatopoeia"], ans: 0, exp: "Hyperbole is an intentional exaggeration." },
        { q: "Which of these is a conjunction?", choices: ["Quickly", "And", "House", "Beautiful"], ans: 1, exp: "'And' connects words, phrases, or clauses." },
        { q: "What is the study of word origins called?", choices: ["Biology", "Etymology", "Socio-linguistics", "Syntax"], ans: 1, exp: "Etymology is the investigation of word histories." },
        { q: "In literature, what is a warning/indication of a future event?", choices: ["Flashback", "Foreshadowing", "Irony", "Climax"], ans: 1, exp: "Foreshadowing gives hints about what happens later." },
        { q: "Identify the verb: 'She sings loudly every morning.'", choices: ["She", "sings", "loudly", "morning"], ans: 1, exp: "'Sings' is the action word (verb)." },
        { q: "Who wrote the epic poem 'The Odyssey'?", choices: ["Homer", "Virgil", "Plato", "Socrates"], ans: 0, exp: "Homer is credited with composing the ancient Greek epic Odyssey." }
    ],
    history: [
        { q: "Who was the first President of the United States?", choices: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], ans: 1, exp: "George Washington served as 1st US president." },
        { q: "In which year did World War II end?", choices: ["1918", "1939", "1945", "1950"], ans: 2, exp: "WW2 ended in 1945 after the surrender of Axis forces." },
        { q: "Which ancient civilization built the Pyramids of Giza?", choices: ["Romans", "Greeks", "Egyptians", "Mayans"], ans: 2, exp: "Ancient Egyptians constructed the pyramids as tombs." },
        { q: "Who discovered America in 1492?", choices: ["Ferdinand Magellan", "Christopher Columbus", "Vasco da Gama", "Amerigo Vespucci"], ans: 1, exp: "Christopher Columbus landed in the Americas in 1492." },
        { q: "What was the ancient trade route connecting China to the Mediterranean?", choices: ["The Spice Route", "The Royal Road", "The Silk Road", "The Amber Road"], ans: 2, exp: "The Silk Road was a major network of Eurasian trade routes." },
        { q: "Who was the French military leader who became Emperor in 1804?", choices: ["Louis XIV", "Napoleon Bonaparte", "Robespierre", "Charlemagne"], ans: 1, exp: "Napoleon Bonaparte crowned himself Emperor of the French." },
        { q: "Which country gifted the Statue of Liberty to the USA?", choices: ["England", "France", "Germany", "Spain"], ans: 1, exp: "France gave the statue to symbolize friendship between nations." },
        { q: "Who was the National Hero of the Philippines?", choices: ["Andres Bonifacio", "Dr. Jose Rizal", "Emilio Aguinaldo", "Apolinario Mabini"], ans: 1, exp: "Dr. Jose Rizal is celebrated as the national hero." },
        { q: "What war was fought between Northern and Southern US states (1861-1865)?", choices: ["World War I", "American Civil War", "Revolutionary War", "Vietnam War"], ans: 1, exp: "The American Civil War was fought over state rights and slavery." },
        { q: "Which empire was ruled by Julius Caesar?", choices: ["Ottoman Empire", "Roman Empire", "British Empire", "Mongol Empire"], ans: 1, exp: "Julius Caesar played a critical role in the demise of the Roman Republic and rise of the Roman Empire." },
        { q: "In what year did the Titanic sink?", choices: ["1905", "1912", "1920", "1898"], ans: 1, exp: "The RMS Titanic sank on April 15, 1912." },
        { q: "Who was the founder of the Mongol Empire?", choices: ["Kublai Khan", "Genghis Khan", "Attila the Hun", "Alexander the Great"], ans: 1, exp: "Genghis Khan unified the nomadic tribes to start the Mongol Empire." },
        { q: "What period in Europe saw a rebirth of art, learning, and culture?", choices: ["Dark Ages", "Industrial Revolution", "Renaissance", "Middle Ages"], ans: 2, exp: "The Renaissance took place roughly between 14th to 17th century." },
        { q: "Where were the first ancient Olympic Games held?", choices: ["Italy", "Greece", "Egypt", "Persia"], ans: 1, exp: "The ancient Olympic Games began in Olympia, Greece." },
        { q: "Who was the British Prime Minister during most of WWII?", choices: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Margaret Thatcher"], ans: 1, exp: "Winston Churchill led the UK through World War II." },
        { q: "What wall divided East and West Berlin from 1961 to 1989?", choices: ["Great Wall", "Berlin Wall", "Hadrian's Wall", "Iron Wall"], ans: 1, exp: "The Berlin Wall separated West Berlin from East Berlin/East Germany." },
        { q: "Who was the famous female Pharaoh of Ancient Egypt?", choices: ["Nefertiti", "Cleopatra", "Hatshepsut", "Isis"], ans: 1, exp: "Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt." },
        { q: "Which revolution began in 1789 with the storming of the Bastille?", choices: ["American Revolution", "Russian Revolution", "French Revolution", "Industrial Revolution"], ans: 2, exp: "The French Revolution broke out in 1789." },
        { q: "Who invented the printing press around 1440?", choices: ["Johannes Gutenberg", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], ans: 0, exp: "Johannes Gutenberg introduced movable-type printing to Europe." },
        { q: "What treaty officially ended World War I in 1919?", choices: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Ghent", "Treaty of Utrecht"], ans: 1, exp: "The Treaty of Versailles signed in 1919 ended WWI." }
    ],
    it: [
        { q: "What does CPU stand for?", choices: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Control Program Unit"], ans: 0, exp: "CPU stands for Central Processing Unit." },
        { q: "Which language is known as the language of the web?", choices: ["Python", "Java", "JavaScript", "C++"], ans: 2, exp: "JavaScript runs natively in web browsers for interactive sites." },
        { q: "What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Mode Logic", "Home Tool Markup Language"], ans: 0, exp: "HTML is Hyper Text Markup Language." },
        { q: "Which of the following is volatile memory?", choices: ["Hard Drive", "ROM", "RAM", "SSD"], ans: 2, exp: "RAM loses its stored data when power is turned off." },
        { q: "What binary digit values can exist?", choices: ["0 and 1", "1 and 2", "0 and 10", "1 to 8"], ans: 0, exp: "Binary uses base-2 numeral system consisting of 0 and 1." },
        { q: "What company created the Windows Operating System?", choices: ["Apple", "IBM", "Microsoft", "Google"], ans: 2, exp: "Microsoft developed Windows." },
        { q: "What symbol is used for Single-Line Comments in JavaScript?", choices: ["<!-- -->", "//", "/* */", "#"], ans: 1, exp: "// is used for single line comments in JS." },
        { q: "What does HTTP stand for in web addresses?", choices: ["HyperText Transfer Protocol", "High Transfer Text Program", "Hyperlink Text Transmission Process", "Home Transfer Protocol"], ans: 0, exp: "HTTP stands for HyperText Transfer Protocol." },
        { q: "What is the standard port for HTTP?", choices: ["21", "80", "443", "8080"], ans: 1, exp: "Port 80 is the default port for HTTP traffic." },
        { q: "Which CSS property changes the text color of an element?", choices: ["text-color", "color", "font-color", "background-color"], ans: 1, exp: "The 'color' property sets text color in CSS." },
        { q: "What is an example of an open-source Operating System?", choices: ["Windows 11", "macOS", "Linux", "iOS"], ans: 2, exp: "Linux source code is free and open source." },
        { q: "In programming, what is a loop that never ends called?", choices: ["Infinite loop", "Recursive loop", "Null loop", "Break loop"], ans: 0, exp: "An infinite loop continues execution indefinitely." },
        { q: "What device connects multiple networks and routes network traffic?", choices: ["Switch", "Hub", "Router", "Modem"], ans: 2, exp: "A router directs data packets between networks." },
        { q: "What does SQL stand for?", choices: ["Structured Query Language", "Simple Quick Logic", "System Quality Language", "Sequential Query List"], ans: 0, exp: "SQL stands for Structured Query Language used for databases." },
        { q: "Which company developed the Python programming language?", choices: ["Guido van Rossum", "Sun Microsystems", "Dennis Ritchie", "James Gosling"], ans: 0, exp: "Guido van Rossum created Python in 1991." },
        { q: "What does IP stand for in 'IP Address'?", choices: ["Internal Protocol", "Internet Protocol", "Information Process", "Interface Port"], ans: 1, exp: "IP stands for Internet Protocol." },
        { q: "Which of these is NOT a programming language?", choices: ["Java", "C++", "HTML", "Python"], ans: 2, exp: "HTML is a markup language, not a programming language." },
        { q: "What shortcut key is commonly used to Copy text in Windows?", choices: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"], ans: 1, exp: "Ctrl + C copies highlighted content." },
        { q: "What does RAM stand for?", choices: ["Random Access Memory", "Read Access Memory", "Run Allied Module", "Rapid Action Memory"], ans: 0, exp: "RAM stands for Random Access Memory." },
        { q: "What is a 'Bug' in software?", choices: ["A hardware virus", "An error or flaw in code", "A fast processor", "A physical insect in the cable"], ans: 1, exp: "A bug is an error, flaw, or fault in a computer program." }
    ]
};

// INITIALIZE APP
window.onload = function() {
    console.log("Mind Melt Quiz App Initialized!");
    loadStudentProfile();
    renderCustomQuizzes();
};

// NAVIGATION TAB SWITCHER
function switchTab(tabName) {
    document.getElementById("navHomeBtn").classList.remove("active");
    document.getElementById("navAddQuizBtn").classList.remove("active");

    document.getElementById("mainMenuScreen").classList.add("hidden");
    document.getElementById("addQuizScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("resultsScreen").classList.add("hidden");
    document.getElementById("reviewScreen").classList.add("hidden");
    document.getElementById("adminScreen").classList.add("hidden");

    if (tabName === 'home') {
        document.getElementById("navHomeBtn").classList.add("active");
        document.getElementById("mainMenuScreen").classList.remove("hidden");
        renderCustomQuizzes();
    } else if (tabName === 'addQuiz') {
        document.getElementById("navAddQuizBtn").classList.add("active");
        document.getElementById("addQuizScreen").classList.remove("hidden");
        initQuizBuilderForm();
    }
}

// STUDENT PROFILE MANAGEMENT (Local Storage)
function loadStudentProfile() {
    let savedUser = localStorage.getItem("mindmelt_user");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById("displayStudentName").innerText = currentUser.name;
        document.getElementById("displayStudentId").innerText = currentUser.id;
        document.getElementById("displayStudentSection").innerText = currentUser.section;
    } else {
        openProfileModal();
    }
}

function openProfileModal() {
    if (currentUser) {
        document.getElementById("inputName").value = currentUser.name;
        document.getElementById("inputId").value = currentUser.id;
        document.getElementById("inputSection").value = currentUser.section;
    }
    document.getElementById("profileModal").style.display = "flex";
}

function saveStudentProfile() {
    let nameVal = document.getElementById("inputName").value.trim();
    let idVal = document.getElementById("inputId").value.trim();
    let secVal = document.getElementById("inputSection").value.trim();

    if (nameVal === "" || idVal === "" || secVal === "") {
        alert("Please fill in all student profile fields!");
        return;
    }

    currentUser = { name: nameVal, id: idVal, section: secVal };
    localStorage.setItem("mindmelt_user", JSON.stringify(currentUser));

    document.getElementById("displayStudentName").innerText = currentUser.name;
    document.getElementById("displayStudentId").innerText = currentUser.id;
    document.getElementById("displayStudentSection").innerText = currentUser.section;

    document.getElementById("profileModal").style.display = "none";
}

// ADD QUIZ / BUILDER FUNCTIONS
function initQuizBuilderForm() {
    document.getElementById("customQuizTitle").value = "";
    document.getElementById("customQuizTimer").value = 20;
    builderQuestions = [];
    
    addQuestionToBuilder();
    addQuestionToBuilder();
}

function addQuestionToBuilder() {
    let qIndex = builderQuestions.length;
    builderQuestions.push({
        id: qIndex,
        q: "",
        c0: "", c1: "", c2: "", c3: "",
        ans: 0,
        exp: ""
    });
    renderBuilderQuestions();
}

function renderBuilderQuestions() {
    let container = document.getElementById("builderQuestionsContainer");
    container.innerHTML = "";

    for (let i = 0; i < builderQuestions.length; i++) {
        let card = document.createElement("div");
        card.className = "builder-q-card";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>Question #${i + 1}</strong>
                ${builderQuestions.length > 1 ? `<button class="nav-btn btn-danger" style="padding: 2px 8px; font-size:12px;" onclick="removeBuilderQuestion(${i})">Delete</button>` : ''}
            </div>
            
            <label style="font-size:13px;">Question Text:</label>
            <input type="text" id="bq_text_${i}" value="${builderQuestions[i].q}" placeholder="Type question here..." oninput="updateBuilderData(${i})">

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <label style="font-size:12px;">Choice A:</label>
                    <input type="text" id="bq_c0_${i}" value="${builderQuestions[i].c0}" placeholder="Option A" oninput="updateBuilderData(${i})">
                </div>
                <div>
                    <label style="font-size:12px;">Choice B:</label>
                    <input type="text" id="bq_c1_${i}" value="${builderQuestions[i].c1}" placeholder="Option B" oninput="updateBuilderData(${i})">
                </div>
                <div>
                    <label style="font-size:12px;">Choice C:</label>
                    <input type="text" id="bq_c2_${i}" value="${builderQuestions[i].c2}" placeholder="Option C" oninput="updateBuilderData(${i})">
                </div>
                <div>
                    <label style="font-size:12px;">Choice D:</label>
                    <input type="text" id="bq_c3_${i}" value="${builderQuestions[i].c3}" placeholder="Option D" oninput="updateBuilderData(${i})">
                </div>
            </div>

            <div style="display:flex; gap:15px; margin-top:5px;">
                <div style="flex:1;">
                    <label style="font-size:12px;">Correct Answer:</label>
                    <select id="bq_ans_${i}" onchange="updateBuilderData(${i})">
                        <option value="0" ${builderQuestions[i].ans == 0 ? 'selected' : ''}>Choice A</option>
                        <option value="1" ${builderQuestions[i].ans == 1 ? 'selected' : ''}>Choice B</option>
                        <option value="2" ${builderQuestions[i].ans == 2 ? 'selected' : ''}>Choice C</option>
                        <option value="3" ${builderQuestions[i].ans == 3 ? 'selected' : ''}>Choice D</option>
                    </select>
                </div>
                <div style="flex:2;">
                    <label style="font-size:12px;">Explanation (Optional):</label>
                    <input type="text" id="bq_exp_${i}" value="${builderQuestions[i].exp}" placeholder="Why is this correct?" oninput="updateBuilderData(${i})">
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

function removeBuilderQuestion(index) {
    builderQuestions.splice(index, 1);
    renderBuilderQuestions();
}

function updateBuilderData(i) {
    builderQuestions[i].q = document.getElementById(`bq_text_${i}`).value;
    builderQuestions[i].c0 = document.getElementById(`bq_c0_${i}`).value;
    builderQuestions[i].c1 = document.getElementById(`bq_c1_${i}`).value;
    builderQuestions[i].c2 = document.getElementById(`bq_c2_${i}`).value;
    builderQuestions[i].c3 = document.getElementById(`bq_c3_${i}`).value;
    builderQuestions[i].ans = parseInt(document.getElementById(`bq_ans_${i}`).value);
    builderQuestions[i].exp = document.getElementById(`bq_exp_${i}`).value;
}

function saveCustomQuiz() {
    let title = document.getElementById("customQuizTitle").value.trim();
    let icon = document.getElementById("customQuizIcon").value;
    let timePerQ = parseInt(document.getElementById("customQuizTimer").value) || 20;

    if (title === "") {
        alert("Please enter a Quiz Title!");
        return;
    }

    let formattedQuestions = [];
    for (let i = 0; i < builderQuestions.length; i++) {
        let qData = builderQuestions[i];
        if (qData.q.trim() === "" || qData.c0.trim() === "" || qData.c1.trim() === "") {
            alert(`Question #${i + 1} is incomplete! Please provide question text and at least 2 choices.`);
            return;
        }
        formattedQuestions.push({
            q: qData.q.trim(),
            choices: [qData.c0.trim(), qData.c1.trim(), qData.c2.trim() || "N/A", qData.c3.trim() || "N/A"],
            ans: qData.ans,
            exp: qData.exp.trim() || "No explanation provided."
        });
    }

    let existingCustom = localStorage.getItem("mindmelt_custom_quizzes");
    let customList = existingCustom ? JSON.parse(existingCustom) : [];

    let quizId = "custom_" + Date.now();
    let newQuizObj = {
        id: quizId,
        title: title,
        icon: icon,
        timer: timePerQ,
        questions: formattedQuestions
    };

    customList.push(newQuizObj);
    localStorage.setItem("mindmelt_custom_quizzes", JSON.stringify(customList));

    alert("Quiz successfully created!");
    switchTab('home');
}

// RENDER CUSTOM QUIZZES ON HOME SCREEN
function renderCustomQuizzes() {
    let existingCustom = localStorage.getItem("mindmelt_custom_quizzes");
    let container = document.getElementById("customQuizzesContainer");
    let grid = document.getElementById("customQuizGrid");

    if (!existingCustom) {
        container.classList.add("hidden");
        return;
    }

    let customList = JSON.parse(existingCustom);
    if (customList.length === 0) {
        container.classList.add("hidden");
        return;
    }

    container.classList.remove("hidden");
    grid.innerHTML = "";

    for (let i = 0; i < customList.length; i++) {
        let qItem = customList[i];
        let card = document.createElement("div");
        card.className = "category-card custom-card";
        card.onclick = function() { selectCustomQuiz(qItem.id); };
        card.innerHTML = `
            <div class="category-icon">${qItem.icon}</div>
            <h3>${qItem.title}</h3>
            <p>${qItem.questions.length} Questions (${qItem.timer}s limit)</p>
        `;
        grid.appendChild(card);
    }
}

// QUIZ STARTING WITH 2-SECOND POPUP EFFECT
function selectCategory(catKey) {
    if (!currentUser) { openProfileModal(); return; }

    currentCategoryKey = catKey;
    activeQuestionsArray = quizData[catKey];
    timeLeft = 20;

    let titleStr = getCategoryDisplayName(catKey);
    let iconStr = getCategoryIcon(catKey);

    showPopUpAndStart(titleStr, iconStr);
}

function selectCustomQuiz(customId) {
    if (!currentUser) { openProfileModal(); return; }

    let customList = JSON.parse(localStorage.getItem("mindmelt_custom_quizzes"));
    let selected = customList.find(q => q.id === customId);

    if (selected) {
        currentCategoryKey = selected.title;
        activeQuestionsArray = selected.questions;
        timeLeft = selected.timer;

        showPopUpAndStart(selected.title, selected.icon);
    }
}

function showPopUpAndStart(titleStr, iconStr) {
    document.getElementById("popupCategoryName").innerText = titleStr;
    document.getElementById("popupIcons").innerText = iconStr;

    document.getElementById("loadingPopup").style.display = "flex";

    setTimeout(function() {
        document.getElementById("loadingPopup").style.display = "none";
        startQuiz();
    }, 2000);
}

function getCategoryDisplayName(key) {
    if (key === 'science') return "General Science";
    if (key === 'math') return "Mathematics";
    if (key === 'english') return "English Literature";
    if (key === 'history') return "World History";
    if (key === 'it') return "Computer & IT";
    return key;
}

function getCategoryIcon(key) {
    if (key === 'science') return "🪐🔬";
    if (key === 'math') return "📐🔢";
    if (key === 'english') return "📚✍️";
    if (key === 'history') return "🌍🏛️";
    if (key === 'it') return "💻⚡";
    return "📝";
}

// START QUIZ
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswersHistory = [];

    document.getElementById("mainMenuScreen").classList.add("hidden");
    document.getElementById("addQuizScreen").classList.add("hidden");
    document.getElementById("resultsScreen").classList.add("hidden");
    document.getElementById("reviewScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");

    document.getElementById("quizCategoryTitle").innerText = getCategoryDisplayName(currentCategoryKey);
    document.getElementById("totalQNum").innerText = activeQuestionsArray.length;

    loadQuestion();
}

function loadQuestion() {
    isAnswered = false;
    clearInterval(timerInterval);

    let questionTimerMax = timeLeft; 
    let currentTimer = questionTimerMax;

    document.getElementById("timerText").innerText = currentTimer;
    document.getElementById("explanationBox").style.display = "none";
    document.getElementById("nextBtn").disabled = true;

    let currentQ = activeQuestionsArray[currentQuestionIndex];

    document.getElementById("currentQNum").innerText = currentQuestionIndex + 1;
    document.getElementById("questionText").innerText = (currentQuestionIndex + 1) + ". " + currentQ.q;

    let optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    for (let i = 0; i < currentQ.choices.length; i++) {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = currentQ.choices[i];
        btn.onclick = function() { chooseAnswer(i); };
        optionsContainer.appendChild(btn);
    }

    timerInterval = setInterval(function() {
        currentTimer--;
        document.getElementById("timerText").innerText = currentTimer;

        if (currentTimer <= 0) {
            clearInterval(timerInterval);
            chooseAnswer(-1); // Time Out
        }
    }, 1000);
}

function chooseAnswer(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);

    let currentQ = activeQuestionsArray[currentQuestionIndex];
    let optionButtons = document.getElementById("optionsContainer").children;

    selectedAnswersHistory.push({
        question: currentQ.q,
        choices: currentQ.choices,
        userChoice: selectedIndex,
        correctChoice: currentQ.ans,
        explanation: currentQ.exp
    });

    if (selectedIndex === currentQ.ans) {
        score++;
    }

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
        if (i === currentQ.ans) {
            optionButtons[i].classList.add("correct");
        }
        if (i === selectedIndex && selectedIndex !== currentQ.ans) {
            optionButtons[i].classList.add("wrong");
        }
    }

    document.getElementById("explanationText").innerText = currentQ.exp;
    document.getElementById("explanationBox").style.display = "block";
    document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < activeQuestionsArray.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("resultsScreen").classList.remove("hidden");

    let total = activeQuestionsArray.length;
    let percentage = Math.round((score / total) * 100);

    document.getElementById("finalScoreText").innerText = score + " / " + total;
    document.getElementById("finalPercentText").innerText = percentage + "%";

    if (percentage >= 80) {
        document.getElementById("feedbackMessage").innerText = "Outstanding result! Keep it up! 🌟";
    } else if (percentage >= 50) {
        document.getElementById("feedbackMessage").innerText = "Good job! Try reviewing to improve! 👍";
    } else {
        document.getElementById("feedbackMessage").innerText = "Don't worry! Keep studying and try again! 📚";
    }

    saveScoreToAdminRecord(score, total, percentage);
}

function saveScoreToAdminRecord(score, total, percentage) {
    let scoresList = localStorage.getItem("quiz_scores");
    scoresList = scoresList ? JSON.parse(scoresList) : [];

    let today = new Date();
    let dateFormatted = today.toLocaleDateString() + " " + today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    let newRecord = {
        dateTime: dateFormatted,
        studentName: currentUser ? currentUser.name : "Anonymous",
        studentId: currentUser ? currentUser.id : "N/A",
        section: currentUser ? currentUser.section : "N/A",
        category: getCategoryDisplayName(currentCategoryKey),
        scoreText: score + " / " + total + " (" + percentage + "%)"
    };

    scoresList.push(newRecord);
    localStorage.setItem("quiz_scores", JSON.stringify(scoresList));
}

function showReviewScreen() {
    document.getElementById("resultsScreen").classList.add("hidden");
    document.getElementById("reviewScreen").classList.remove("hidden");

    let container = document.getElementById("reviewContainer");
    container.innerHTML = "";

    for (let i = 0; i < selectedAnswersHistory.length; i++) {
        let item = selectedAnswersHistory[i];
        let div = document.createElement("div");
        div.className = "review-card";

        let userAnsText = item.userChoice >= 0 ? item.choices[item.userChoice] : "Time Expired / Skipped";
        let correctAnsText = item.choices[item.correctChoice];
        let isUserCorrect = item.userChoice === item.correctChoice;

        div.innerHTML = `
            <strong>Q${i+1}: ${item.question}</strong><br>
            <span style="color: ${isUserCorrect ? 'green' : 'red'};">
                Your Answer: ${userAnsText} ${isUserCorrect ? '✓' : '✗'}
            </span><br>
            <span style="color: green;">Correct Answer: ${correctAnsText}</span><br>
            <small style="color: #555;"><em>Explanation: ${item.explanation}</em></small>
        `;
        container.appendChild(div);
    }
}

function confirmQuit() {
    if (confirm("Are you sure you want to quit the quiz? Your progress will be lost.")) {
        clearInterval(timerInterval);
        switchTab('home');
    }
}

// ADMIN PORTAL LOGIC
function openAdminModal() {
    document.getElementById("adminPassInput").value = "";
    document.getElementById("adminModal").style.display = "flex";
}

function closeAdminModal() {
    document.getElementById("adminModal").style.display = "none";
}

function loginAdmin() {
    let pass = document.getElementById("adminPassInput").value;
    if (pass === "admin123") {
        closeAdminModal();
        showAdminScreen();
    } else {
        alert("Incorrect Admin Passcode!");
    }
}

function showAdminScreen() {
    document.getElementById("mainMenuScreen").classList.add("hidden");
    document.getElementById("addQuizScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("resultsScreen").classList.add("hidden");
    document.getElementById("reviewScreen").classList.add("hidden");
    
    document.getElementById("adminScreen").classList.remove("hidden");
    renderAdminTable();
}

function renderAdminTable() {
    let tbody = document.getElementById("adminTableBody");
    tbody.innerHTML = "";

    let maskEnabled = document.getElementById("maskToggle").checked;
    let scoresData = localStorage.getItem("quiz_scores");

    if (!scoresData) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>No student records found.</td></tr>";
        return;
    }

    let scores = JSON.parse(scoresData);
    if (scores.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>No student records found.</td></tr>";
        return;
    }

    for (let i = 0; i < scores.length; i++) {
        let row = scores[i];
        let displayName = maskEnabled ? maskText(row.studentName) : row.studentName;
        let displayId = maskEnabled ? maskText(row.studentId) : row.studentId;

        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.dateTime}</td>
            <td>${displayName}</td>
            <td>${displayId}</td>
            <td>${row.section}</td>
            <td>${row.category}</td>
            <td><strong>${row.scoreText}</strong></td>
        `;
        tbody.appendChild(tr);
    }
}

function maskText(str) {
    if (!str) return "***";
    let masked = "";
    for (let i = 0; i < str.length; i++) {
        if (i === 0 || str[i] === " ") {
            masked += str[i];
        } else {
            masked += "*";
        }
    }
    return masked;
}

function resetAllScores() {
    if (confirm("Are you sure you want to reset all score records?")) {
        localStorage.removeItem("quiz_scores");
        renderAdminTable();
        alert("All score records have been reset!");
    }
}

function exportScoresCSV() {
    let scoresData = localStorage.getItem("quiz_scores");
    if (!scoresData) {
        alert("No score data to export!");
        return;
    }

    let scores = JSON.parse(scoresData);
    let csvContent = "data:text/csv;charset=utf-8,Date,Student Name,Student ID,Section,Category,Score\n";

    scores.forEach(row => {
        csvContent += `"${row.dateTime}","${row.studentName}","${row.studentId}","${row.section}","${row.category}","${row.scoreText}"\n`;
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "MindMelt_Student_Scores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
