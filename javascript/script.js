document.addEventListener("DOMContentLoaded", function () {
    const viewGraphButton = document.getElementById('viewGraphButton');

    // === LOGICA PER miglioramenti.html ===
    if (viewGraphButton && window.location.pathname.includes("miglioramenti.html")) {
        viewGraphButton.addEventListener('click', function (event) {
            event.preventDefault();

            const dataInizio = document.getElementById('data-inizio').value.trim();
            const dataFine = document.getElementById('data-fine').value.trim();

            if (!dataInizio || !dataFine) {
                alert("Per favore, inserisci entrambe le date.");
                return;
            }

            const params = new URLSearchParams({
                dataInizio,
                dataFine
            });

            window.location.href = `grafico_periodo.html?${params.toString()}`;
        });
    }

    // === LOGICA PER grafico_periodo.html ===
    if (viewGraphButton && window.location.pathname.includes("grafico_periodo.html")) {
        viewGraphButton.addEventListener('click', function (event) {
            event.preventDefault();

            const selectedMetrics = [];
            const checkboxes = document.querySelectorAll('input[name="metric"]:checked');

            checkboxes.forEach(checkbox => selectedMetrics.push(checkbox.value));

            if (selectedMetrics.length === 0) {
                alert("Seleziona almeno una metrica.");
                return;
            }

            const params = new URLSearchParams({
                m1: selectedMetrics.includes("metric1") ? "true" : "false",
                m2: selectedMetrics.includes("metric2") ? "true" : "false",
                m3: selectedMetrics.includes("metric3") ? "true" : "false"
            });

            window.location.href = `grafico_metriche.html?${params.toString()}`;
        });
    }

    // === LOGICA PER grafico_metriche.html ===
    if (window.location.pathname.includes("grafico_metriche.html")) {
        const params = new URLSearchParams(window.location.search);

        const m1 = params.get('m1') === 'true';
        const m2 = params.get('m2') === 'true';
        const m3 = params.get('m3') === 'true';

        const grafico = document.getElementById('grafico');
        const downloadBtn = document.getElementById('downloadBtn');

        function getGraficoSrc(m1, m2, m3) {
            if (!m1 && !m2 && !m3) return 'graficoGeneraleIUM.png';
            if (m1 && m2 && m3) return 'graficoMetricheComplessivoIUM.png';
            if (m1 && m2) return 'graficoPesoAcquaIUM.png';
            if (m1 && m3) return 'graficoPesoEserciziIUM.png';
            if (m2 && m3) return 'graficoAcquaEserciziIUM.png';
            if (m1) return 'graficoPesoIUM.png';
            if (m2) return 'graficoAcquaIUM.png';
            if (m3) return 'graficoEserciziIUM.png';
            return 'graficoGeneraleIUM.png';
        }

        const srcGrafico = getGraficoSrc(m1, m2, m3);
        const imagePath = `../image/${srcGrafico}`;

        if (grafico) {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = "Grafico delle Metriche Selezionate";
            img.style.maxWidth = '110%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '0 auto';
            img.id = 'grafico-img';
            grafico.innerHTML = '';
            grafico.appendChild(img);

            if (downloadBtn) {
                downloadBtn.style.display = 'inline-block';
                downloadBtn.addEventListener('click', function () {
                    const link = document.createElement('a');
                    link.href = imagePath;
                    link.download = srcGrafico;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
        }
    }
});
