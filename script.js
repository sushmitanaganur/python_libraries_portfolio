// --- PDF Download ---
document.getElementById('download-btn').addEventListener('click', () => {
    const element = document.getElementById('content-to-pdf');
    const opt = {
        margin:       1,
        filename:     'Data_Science_Portfolio_Ultra.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// --- Chart.js Graph Initialization ---
function initCharts() {
    const textColor = '#E2E8F0';
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Outfit', sans-serif";

    // 1. NumPy Chart
    const numpyCanvas = document.getElementById('numpyChart');
    if (numpyCanvas) {
        const ctxNumpy = numpyCanvas.getContext('2d');
        const xValues = Array.from({length: 50}, (_, i) => i);
        const yValues = xValues.map(x => Math.sin(x * 0.2));
        new Chart(ctxNumpy, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: 'Mathematical Wave (sin)',
                    data: yValues,
                    borderColor: '#ffb703',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: { x: { display: false }, y: { grid: { color: 'rgba(255,255,255,0.1)' } } }
            }
        });
    }

    // 2. Pandas Chart
    const pandasCanvas = document.getElementById('pandasChart');
    if (pandasCanvas) {
        const ctxPandas = pandasCanvas.getContext('2d');
        new Chart(ctxPandas, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [120, 190, 150, 220],
                    backgroundColor: '#8338ec',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.1)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 3. Seaborn Chart
    const seabornCanvas = document.getElementById('seabornChart');
    if (seabornCanvas) {
        const ctxSeaborn = seabornCanvas.getContext('2d');
        const scatterData = Array.from({length: 40}, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100
        }));
        new Chart(ctxSeaborn, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Customer Demographics',
                    data: scatterData,
                    backgroundColor: '#3a86ff',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { grid: { color: 'rgba(255,255,255,0.1)' } }
                }
            }
        });
    }
}

// --- Quiz Logic ---
function checkAnswer(library, isCorrect, btnElement) {
    const container = document.getElementById(`quiz-${library}`);
    const feedback = container.querySelector('.feedback');
    const buttons = container.querySelectorAll('.quiz-btn');

    // Disable all buttons in this specific quiz
    buttons.forEach(b => {
        b.disabled = true;
        b.style.opacity = '0.5';
        b.style.cursor = 'not-allowed';
    });

    if (isCorrect) {
        // Find colors for each library
        let color = '';
        if(library === 'numpy') color = '#ffb703';
        if(library === 'pandas') color = '#8338ec';
        if(library === 'seaborn') color = '#3a86ff';

        btnElement.style.backgroundColor = color;
        btnElement.style.color = "#fff";
        btnElement.style.opacity = '1';
        
        feedback.innerText = "🎉 Correct! You're a natural!";
        feedback.style.color = color;

        // Trigger Confetti!
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: [color, '#ffffff']
        });
    } else {
        btnElement.style.backgroundColor = "rgba(255,0,0,0.5)";
        btnElement.style.opacity = '1';
        feedback.innerText = "❌ Oops, that's not quite right. Refresh to try again!";
        feedback.style.color = "#ff4444";
    }
}

// --- Toggle Explanation Logic ---
function toggleExplanation(library) {
    const codeDiv = document.getElementById(`${library}-code`);
    const expDiv = document.getElementById(`${library}-explanation`);
    
    if (expDiv.style.display === 'none') {
        expDiv.style.display = 'block';
        codeDiv.style.display = 'none';
    } else {
        expDiv.style.display = 'none';
        codeDiv.style.display = 'block';
    }
}

// --- Initialize Everything ---
window.onload = () => {
    initCharts();

    // Initialize Particles.js if available
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }
};
