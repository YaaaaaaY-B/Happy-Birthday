// Set the date for the countdown (adjust to match the desired birthday date)
const countdownDate = new Date("November 4, 2024 21:02:00").getTime();
let countdownOver = false;

// Countdown function
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display countdown
    document.getElementById("countdown").innerHTML = `${hours}:${minutes}:${seconds}`;

    // Trigger surprise when countdown reaches zero
    if (distance < 0 && !countdownOver) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "Happy Birthday baby gorl😏😘!";
        document.getElementById("surpriseButton").style.display = "block";
        countdownOver = true;

        // Start confetti when countdown is over
        startConfetti();
    }
}, 1000);

// Function to start confetti animation
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    const confetti = [];
    const colors = ['#FFC700', '#FF2D00', '#00D1FF', '#FF6B00'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: Math.random() * 2 + 1,
            angle: Math.random() * 360,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(part => {
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
            ctx.fillStyle = part.color;
            ctx.fill();

            // Update position
            part.x += Math.cos(part.angle) * part.velocity;
            part.y += Math.sin(part.angle) * part.velocity;

            // Reset position if out of bounds
            if (part.x > canvas.width || part.x < 0 || part.y > canvas.height) {
                part.x = Math.random() * canvas.width;
                part.y = 0;
            }
        });
        requestAnimationFrame(draw);
    }

    draw();
}

// Button click event to trigger gift unwrapping
document.getElementById("surpriseButton").addEventListener("click", () => {
    document.getElementById("surpriseButton").style.display = "none";
    document.getElementById("giftBox").style.display = "block";

    // Lid animation
    const lid = document.querySelector(".lid");
    lid.style.transform = "rotateX(-60deg)";

    // Delay to reveal letter and play music
    setTimeout(() => {
        document.getElementById("giftBox").style.display = "none";
        document.getElementById("letterContent").style.display = "block";
        document.getElementById("backgroundMusic").play();
    }, 1000);  // Adjust timing as desired
});
