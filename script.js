/* =========================================================
   STUDENTTOOLS - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   TOOL NAVIGATION
   ========================================================= */

function showTool(toolId) {

    const calculators =
        document.querySelectorAll(".calculator");

    calculators.forEach(function (calculator) {
        calculator.classList.add("hidden");
    });

    const selectedTool =
        document.getElementById(toolId);

    if (!selectedTool) {
        console.error("Calculator not found:", toolId);
        return;
    }

    selectedTool.classList.remove("hidden");

    selectedTool.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function openCGPACalculator() {
    showTool("cgpa");
}


function openSGPACalculator() {
    showTool("sgpa");
}


function openBunkCalculator() {
    showTool("bunk");
}


/* =========================================================
   1. CGPA CALCULATOR
   ========================================================= */

function addSubject() {

    const container =
        document.getElementById("subjectsContainer");

    if (!container) return;

    const row =
        document.createElement("div");

    row.className = "subject-row";

    row.innerHTML = `
        <input
            type="text"
            placeholder="Subject Name"
            class="subject-name"
        >

        <input
            type="number"
            placeholder="Grade"
            class="grade"
            min="0"
            max="10"
            step="0.01"
        >

        <input
            type="number"
            placeholder="Credits"
            class="credit"
            min="0"
            step="0.5"
        >

        <button
            type="button"
            class="remove-btn"
            onclick="removeSubject(this)"
        >
            ×
        </button>
    `;

    container.appendChild(row);
}


function removeSubject(button) {

    const container =
        document.getElementById("subjectsContainer");

    if (!container) return;

    const rows =
        container.querySelectorAll(".subject-row");

    if (rows.length <= 1) {
        alert("At least one subject is required.");
        return;
    }

    button.parentElement.remove();
}


function calculateCGPA() {

    const grades =
        document.querySelectorAll(".grade");

    const credits =
        document.querySelectorAll(".credit");

    const result =
        document.getElementById("cgpaResult");

    const message =
        document.getElementById("cgpaMessage");

    if (!grades.length || !credits.length) {
        return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {

        const grade =
            Number(grades[i].value);

        const credit =
            Number(credits[i].value);

        if (
            !Number.isFinite(grade) ||
            !Number.isFinite(credit) ||
            grade < 0 ||
            grade > 10 ||
            credit <= 0
        ) {
            result.textContent = "-";

            message.textContent =
                "Please enter valid grade points and credits for every subject.";

            return;
        }

        totalPoints += grade * credit;
        totalCredits += credit;
    }

    if (totalCredits <= 0) {

        result.textContent = "-";

        message.textContent =
            "Please enter valid credits.";

        return;
    }

    const cgpa =
        totalPoints / totalCredits;

    result.textContent =
        cgpa.toFixed(2);

    if (cgpa >= 9) {

        message.textContent =
            "Excellent CGPA! Keep it up. 🎉";

    } else if (cgpa >= 8) {

        message.textContent =
            "Great performance! Keep working hard. 💪";

    } else if (cgpa >= 7) {

        message.textContent =
            "Good performance. You can improve further. 👍";

    } else if (cgpa >= 6) {

        message.textContent =
            "Keep focusing on your studies. 📚";

    } else {

        message.textContent =
            "Keep working consistently to improve your CGPA. 💪";
    }
}


/* =========================================================
   2. SGPA CALCULATOR
   ========================================================= */

function addSGPASubject() {

    const container =
        document.getElementById("sgpaSubjects");

    if (!container) return;

    const row =
        document.createElement("div");

    row.className = "sgpa-row";

    row.innerHTML = `
        <input
            type="text"
            placeholder="Subject"
            class="sgpa-subject"
        >

        <input
            type="number"
            placeholder="Credits"
            class="sgpa-credit"
            min="1"
            step="0.5"
        >

        <input
            type="number"
            placeholder="Grade Point"
            class="sgpa-grade"
            min="0"
            max="10"
            step="0.01"
        >
    `;

    container.appendChild(row);
}


function calculateSGPA() {

    const credits =
        document.querySelectorAll(".sgpa-credit");

    const grades =
        document.querySelectorAll(".sgpa-grade");

    const result =
        document.getElementById("sgpaResult");

    const message =
        document.getElementById("sgpaMessage");

    let totalPoints = 0;
    let totalCredits = 0;

    if (!credits.length) {
        return;
    }

    for (let i = 0; i < credits.length; i++) {

        const credit =
            Number(credits[i].value);

        const grade =
            Number(grades[i].value);

        if (
            !Number.isFinite(credit) ||
            !Number.isFinite(grade) ||
            credit <= 0 ||
            grade < 0 ||
            grade > 10
        ) {

            result.textContent = "-";

            message.textContent =
                "Please enter valid credits and grade points for every subject.";

            return;
        }

        totalPoints += credit * grade;
        totalCredits += credit;
    }

    if (totalCredits <= 0) {

        result.textContent = "-";

        message.textContent =
            "Please enter valid subject details.";

        return;
    }

    const sgpa =
        totalPoints / totalCredits;

    result.textContent =
        sgpa.toFixed(2);

    message.textContent =
        "Your semester performance has been calculated successfully. 🎓";
}


/* =========================================================
   3. PERCENTAGE CALCULATOR
   ========================================================= */

function calculatePercentage() {

    const obtained =
        Number(
            document.getElementById("obtainedMarks").value
        );

    const total =
        Number(
            document.getElementById("totalMarks").value
        );

    const result =
        document.getElementById("percentageResult");

    const gradeResult =
        document.getElementById("gradeResult");

    const message =
        document.getElementById("percentageMessage");

    if (
        !Number.isFinite(obtained) ||
        !Number.isFinite(total) ||
        total <= 0 ||
        obtained < 0 ||
        obtained > total
    ) {

        result.textContent = "-";
        gradeResult.textContent = "";
        message.textContent =
            "Please enter valid marks.";

        return;
    }

    const percentage =
        (obtained / total) * 100;

    result.textContent =
        percentage.toFixed(2) + "%";


    let grade;

    if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 80) {
        grade = "A";
    }
    else if (percentage >= 70) {
        grade = "B+";
    }
    else if (percentage >= 60) {
        grade = "B";
    }
    else if (percentage >= 50) {
        grade = "C";
    }
    else if (percentage >= 40) {
        grade = "D";
    }
    else {
        grade = "F";
    }


    gradeResult.textContent =
        "Grade: " + grade;


    if (percentage >= 40) {

        message.textContent =
            "PASS ✅ Keep up the good work!";

    } else {

        message.textContent =
            "FAIL ❌ Keep working hard and improve your score.";
    }
}


/* =========================================================
   4. ATTENDANCE CALCULATOR
   ========================================================= */

function calculateAttendance() {

    const attended =
        Number(
            document.getElementById("attendedClasses").value
        );

    const total =
        Number(
            document.getElementById("totalClasses").value
        );

    const target =
        Number(
            document.getElementById("targetAttendance").value
        );

    const result =
        document.getElementById("attendanceResult");


    if (
        !Number.isFinite(attended) ||
        !Number.isFinite(total) ||
        !Number.isFinite(target) ||
        total <= 0 ||
        attended < 0 ||
        attended > total ||
        target <= 0 ||
        target > 100
    ) {

        result.innerHTML =
            "Please enter valid attendance details.";

        return;
    }


    const current =
        (attended / total) * 100;


    if (current >= target) {

        const maxBunks =
            Math.floor(
                (attended * 100 / target) - total
            );

        result.innerHTML = `
            <strong>Current Attendance:</strong>
            ${current.toFixed(2)}%
            <br><br>
            You have already reached your target of
            <strong>${target}%</strong>.
            <br>
            You can safely bunk approximately
            <strong>${Math.max(0, maxBunks)}</strong>
            more class(es).
        `;

        return;
    }


    const required =
        Math.ceil(
            (target * total - 100 * attended) /
            (100 - target)
        );


    result.innerHTML = `
        <strong>Current Attendance:</strong>
        ${current.toFixed(2)}%
        <br><br>
        You need to attend at least
        <strong>${required}</strong>
        more class(es) to reach
        <strong>${target}%</strong>.
    `;
}


/* =========================================================
   5. BUNK CALCULATOR
   ========================================================= */

function calculateBunk() {

    const attended =
        Number(
            document.getElementById("bunkAttended").value
        );

    const total =
        Number(
            document.getElementById("bunkTotal").value
        );

    const target =
        Number(
            document.getElementById("bunkTarget").value
        );

    const current =
        document.getElementById("bunkCurrent");

    const message =
        document.getElementById("bunkMessage");

    const extra =
        document.getElementById("bunkExtra");


    if (
        !Number.isFinite(attended) ||
        !Number.isFinite(total) ||
        !Number.isFinite(target) ||
        total <= 0 ||
        attended < 0 ||
        attended > total ||
        target <= 0 ||
        target > 100
    ) {

        current.textContent = "-";

        message.textContent =
            "Please enter valid attendance details.";

        extra.textContent = "";

        return;
    }


    const attendance =
        (attended / total) * 100;


    current.textContent =
        attendance.toFixed(2) + "%";


    if (attendance < target) {

        const required =
            Math.ceil(
                (target * total - 100 * attended) /
                (100 - target)
            );

        message.innerHTML =
            `You cannot safely bunk right now.<br>
             You need to attend at least
             <strong>${required}</strong>
             more class(es) to reach
             <strong>${target}%</strong>.`;

        extra.textContent = "";

        return;
    }


    const maxBunks =
        Math.floor(
            (100 * attended / target) - total
        );


    if (maxBunks > 0) {

        message.innerHTML =
            `You can safely bunk approximately
             <strong>${maxBunks}</strong>
             class(es) while maintaining
             <strong>${target}%</strong> attendance. 😴`;

        extra.textContent =
            "Bunk responsibly!";

    } else {

        message.innerHTML =
            `You should not bunk any more classes
             if you want to maintain
             <strong>${target}%</strong> attendance.`;

        extra.textContent = "";
    }
}


/* =========================================================
   6. AGE CALCULATOR
   ========================================================= */

function calculateAge() {

    const input =
        document.getElementById("birthDate");

    const result =
        document.getElementById("ageResult");

    const details =
        document.getElementById("ageDetails");

    const nextBirthday =
        document.getElementById("nextBirthday");


    if (!input || !input.value) {

        result.textContent = "-";

        details.textContent =
            "Please enter your date of birth.";

        nextBirthday.textContent = "";

        return;
    }


    const birthDate =
        new Date(input.value + "T00:00:00");


    const today =
        new Date();


    if (birthDate > today) {

        result.textContent = "-";

        details.textContent =
            "Date of birth cannot be in the future.";

        nextBirthday.textContent = "";

        return;
    }


    let years =
        today.getFullYear() -
        birthDate.getFullYear();

    let months =
        today.getMonth() -
        birthDate.getMonth();

    let days =
        today.getDate() -
        birthDate.getDate();


    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();
    }


    if (months < 0) {

        years--;
        months += 12;
    }


    result.textContent =
        `${years} Years`;


    details.textContent =
        `${years} years, ${months} months and ${days} days old.`;


    let nextBirthdayDate =
        new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    if (nextBirthdayDate < today) {

        nextBirthdayDate =
            new Date(
                today.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
            );
    }


    const difference =
        nextBirthdayDate - today;

    const daysUntil =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (daysUntil === 0) {

        nextBirthday.textContent =
            "🎉 Happy Birthday!";

    } else {

        nextBirthday.textContent =
            `🎂 Your next birthday is in approximately ${daysUntil} day(s).`;
    }
}


/* =========================================================
   7. AI FACE AGE ESTIMATOR
   ========================================================= */

const AI_MODEL_URL =
    "https://cdn.jsdelivr.net/gh/vladmandic/face-api/model/";

let aiModelsLoaded = false;
let aiModelsLoading = false;


function previewImage() {

    const fileInput =
        document.getElementById("faceImage");

    const imagePreview =
        document.getElementById("imagePreview");

    const result =
        document.getElementById("aiAgeResult");

    const message =
        document.getElementById("aiAgeMessage");


    if (
        !fileInput ||
        !fileInput.files ||
        !fileInput.files[0]
    ) {
        return;
    }


    const file =
        fileInput.files[0];


    if (!file.type.startsWith("image/")) {

        message.textContent =
            "Please select a valid image file.";

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function (event) {

        imagePreview.src =
            event.target.result;

        imagePreview.style.display =
            "block";

        result.textContent = "-";

        message.textContent =
            "Photo ready. Click Estimate Face Age.";

    };


    reader.readAsDataURL(file);
}


async function loadAIModels() {

    if (aiModelsLoaded) {
        return true;
    }


    if (aiModelsLoading) {
        return false;
    }


    if (
        typeof faceapi === "undefined"
    ) {

        console.error(
            "Face API library was not loaded."
        );

        return false;
    }


    aiModelsLoading = true;


    const message =
        document.getElementById("aiAgeMessage");


    try {

        message.textContent =
            "Loading AI model... please wait.";


        await faceapi.nets.tinyFaceDetector.loadFromUri(
            AI_MODEL_URL
        );


        await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
            AI_MODEL_URL
        );


        await faceapi.nets.ageGenderNet.loadFromUri(
            AI_MODEL_URL
        );


        aiModelsLoaded = true;


        message.textContent =
            "AI model loaded successfully.";


        return true;

    }
    catch (error) {

        console.error(
            "AI model loading error:",
            error
        );


        message.textContent =
            "Unable to load the AI model. Check your internet connection.";


        return false;

    }
    finally {

        aiModelsLoading = false;
    }
}


async function estimateFaceAge() {

    const fileInput =
        document.getElementById("faceImage");

    const imagePreview =
        document.getElementById("imagePreview");

    const result =
        document.getElementById("aiAgeResult");

    const message =
        document.getElementById("aiAgeMessage");


    if (
        !fileInput ||
        !fileInput.files ||
        !fileInput.files[0]
    ) {

        result.textContent = "-";

        message.textContent =
            "Please upload a clear face photo first.";

        return;
    }


    if (
        !imagePreview.src ||
        imagePreview.src ===
        window.location.href
    ) {

        message.textContent =
            "Please wait for the image preview to load.";

        return;
    }


    try {

        result.textContent =
            "Analyzing...";

        message.textContent =
            "AI is detecting the face and estimating apparent age.";


        const modelsReady =
            await loadAIModels();


        if (!modelsReady) {

            result.textContent = "-";

            return;
        }


        const detection =
            await faceapi
                .detectSingleFace(
                    imagePreview,
                    new faceapi.TinyFaceDetectorOptions({
                        inputSize: 416,
                        scoreThreshold: 0.5
                    })
                )
                .withFaceLandmarks(true)
                .withAgeAndGender();


        if (!detection) {

            result.textContent = "-";

            message.textContent =
                "No clear face was detected. Please upload a front-facing photo.";

            return;
        }


        const estimatedAge =
            Math.round(detection.age);


        result.textContent =
            estimatedAge + " years";


        message.innerHTML =
            `AI estimated apparent age:
            <strong>${estimatedAge}</strong> years.<br>
            Face detected successfully.`;

    }
    catch (error) {

        console.error(
            "Face age estimation error:",
            error
        );


        result.textContent = "-";

        message.textContent =
            "Something went wrong while analyzing the photo. Please try another clear photo.";
    }
}


/* =========================================================
   8. MARKS REQUIRED CALCULATOR
   ========================================================= */

function calculateMarksRequired() {

    const obtained =
        Number(
            document.getElementById("marksObtained").value
        );

    const total =
        Number(
            document.getElementById("marksTotal").value
        );

    const target =
        Number(
            document.getElementById("targetPercentage").value
        );

    const result =
        document.getElementById("requiredMarksResult");

    const message =
        document.getElementById("requiredMarksMessage");


    if (
        !Number.isFinite(obtained) ||
        !Number.isFinite(total) ||
        !Number.isFinite(target) ||
        total <= 0 ||
        obtained < 0 ||
        obtained > total ||
        target < 0 ||
        target > 100
    ) {

        result.textContent = "-";

        message.textContent =
            "Please enter valid marks and target percentage.";

        return;
    }


    const currentPercentage =
        (obtained / total) * 100;


    if (currentPercentage >= target) {

        result.textContent =
            "0 marks";

        message.innerHTML =
            `You have already reached your target of
            <strong>${target}%</strong>.<br>
            Your current percentage is
            <strong>${currentPercentage.toFixed(2)}%</strong>.`;

        return;
    }


    const targetMarks =
        (target / 100) * total;


    const requiredMarks =
        Math.ceil(
            targetMarks - obtained
        );


    result.textContent =
        requiredMarks + " marks";


    message.innerHTML =
        `You currently have
        <strong>${currentPercentage.toFixed(2)}%</strong>.<br>
        You need at least
        <strong>${requiredMarks}</strong>
        more marks to reach
        <strong>${target}%</strong>.`;
}


/* =========================================================
   9. CGPA PREDICTOR
   ========================================================= */

function calculateCGPAPredictor() {

    const currentCGPA =
        Number(
            document.getElementById("currentCGPA").value
        );

    const completedCredits =
        Number(
            document.getElementById("completedCredits").value
        );

    const nextSGPA =
        Number(
            document.getElementById("nextSGPA").value
        );

    const nextCredits =
        Number(
            document.getElementById("nextSemesterCredits").value
        );


    const result =
        document.getElementById("predictedCGPA");

    const message =
        document.getElementById(
            "cgpaPredictorMessage"
        );


    if (
        !Number.isFinite(currentCGPA) ||
        !Number.isFinite(completedCredits) ||
        !Number.isFinite(nextSGPA) ||
        !Number.isFinite(nextCredits) ||
        currentCGPA < 0 ||
        currentCGPA > 10 ||
        completedCredits <= 0 ||
        nextSGPA < 0 ||
        nextSGPA > 10 ||
        nextCredits <= 0
    ) {

        result.textContent = "-";

        message.textContent =
            "Please enter valid values.";

        return;
    }


    const currentPoints =
        currentCGPA * completedCredits;


    const nextSemesterPoints =
        nextSGPA * nextCredits;


    const totalCredits =
        completedCredits + nextCredits;


    const predictedCGPA =
        (
            currentPoints +
            nextSemesterPoints
        ) /
        totalCredits;


    result.textContent =
        predictedCGPA.toFixed(2);


    if (predictedCGPA > currentCGPA) {

        message.innerHTML =
            `Your CGPA could increase from
            <strong>${currentCGPA.toFixed(2)}</strong>
            to
            <strong>${predictedCGPA.toFixed(2)}</strong>. 📈`;

    }
    else if (predictedCGPA < currentCGPA) {

        message.innerHTML =
            `Your CGPA could decrease to
            <strong>${predictedCGPA.toFixed(2)}</strong>.
            Keep working hard! 💪`;

    }
    else {

        message.innerHTML =
            `Your CGPA is expected to remain around
            <strong>${predictedCGPA.toFixed(2)}</strong>.`;
    }
}


/* =========================================================
   10. PLACEMENT ELIGIBILITY CHECKER
   ========================================================= */

function checkPlacementEligibility() {

    const cgpa =
        Number(
            document.getElementById(
                "placementCGPA"
            ).value
        );

    const requiredCGPA =
        Number(
            document.getElementById(
                "requiredCGPA"
            ).value
        );

    const backlogs =
        Number(
            document.getElementById(
                "placementBacklogs"
            ).value
        );

    const allowedBacklogs =
        Number(
            document.getElementById(
                "allowedBacklogs"
            ).value
        );

    const tenth =
        Number(
            document.getElementById(
                "tenthPercentage"
            ).value
        );

    const requiredTenth =
        Number(
            document.getElementById(
                "requiredTenth"
            ).value
        );

    const twelfth =
        Number(
            document.getElementById(
                "twelfthPercentage"
            ).value
        );

    const requiredTwelfth =
        Number(
            document.getElementById(
                "requiredTwelfth"
            ).value
        );


    const result =
        document.getElementById(
            "placementResult"
        );

    const message =
        document.getElementById(
            "placementMessage"
        );


    if (
        !Number.isFinite(cgpa) ||
        !Number.isFinite(requiredCGPA) ||
        !Number.isFinite(backlogs) ||
        !Number.isFinite(allowedBacklogs) ||
        !Number.isFinite(tenth) ||
        !Number.isFinite(requiredTenth) ||
        !Number.isFinite(twelfth) ||
        !Number.isFinite(requiredTwelfth) ||

        cgpa < 0 ||
        cgpa > 10 ||

        requiredCGPA < 0 ||
        requiredCGPA > 10 ||

        backlogs < 0 ||
        allowedBacklogs < 0 ||

        tenth < 0 ||
        tenth > 100 ||

        requiredTenth < 0 ||
        requiredTenth > 100 ||

        twelfth < 0 ||
        twelfth > 100 ||

        requiredTwelfth < 0 ||
        requiredTwelfth > 100
    ) {

        result.textContent = "-";

        message.textContent =
            "Please enter valid values in all fields.";

        return;
    }


    const cgpaPass =
        cgpa >= requiredCGPA;


    const backlogPass =
        backlogs <= allowedBacklogs;


    const tenthPass =
        tenth >= requiredTenth;


    const twelfthPass =
        twelfth >= requiredTwelfth;


    const eligible =
        cgpaPass &&
        backlogPass &&
        tenthPass &&
        twelfthPass;


    if (eligible) {

        result.textContent =
            "ELIGIBLE ✅";


        message.innerHTML =
            `You meet all the requirements entered above. 🎉
            <br><br>
            CGPA: <strong>✓</strong><br>
            Backlogs: <strong>✓</strong><br>
            10th Percentage: <strong>✓</strong><br>
            12th Percentage: <strong>✓</strong>`;

    }
    else {

        result.textContent =
            "NOT ELIGIBLE ❌";


        const reasons = [];


        if (!cgpaPass) {

            reasons.push(
                `CGPA must be at least ${requiredCGPA}`
            );
        }


        if (!backlogPass) {

            reasons.push(
                `Maximum allowed backlogs: ${allowedBacklogs}`
            );
        }


        if (!tenthPass) {

            reasons.push(
                `10th percentage must be at least ${requiredTenth}%`
            );
        }


        if (!twelfthPass) {

            reasons.push(
                `12th percentage must be at least ${requiredTwelfth}%`
            );
        }


        message.innerHTML =
            `<strong>You do not meet:</strong>
            <br><br>
            ${reasons.join("<br>")}`;
    }
}


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "StudentTools loaded successfully."
        );

    }
);