document.addEventListener("DOMContentLoaded", function () {
    const viewGraphButton = document.getElementById('visualizzaBtn');

    // LOGICA PER miglioramenti.html: il link "CALCOLA" reindirizza a grafico_periodo.html con date nel query string
    if (viewGraphButton && window.location.pathname.includes("miglioramenti.html")) {
        viewGraphButton.addEventListener('click', function (event) {
            event.preventDefault();

            const dataInizio = document.getElementById('dataInizio').value.trim();
            const dataFine = document.getElementById('dataFine').value.trim();

            if (!dataInizio || !dataFine) {
                alert("Per favore, inserisci entrambe le date.");
                return;
            }

            // Passiamo le date via query string anche se non le usiamo, per futura estensibilità
            const params = new URLSearchParams({
                dataInizio: dataInizio,
                dataFine: dataFine
            });

            window.location.href = `grafico_periodo.html?${params.toString()}`;
        });
    }

    // LOGICA PER grafico_periodo.html: mostra grafico in base alle metriche selezionate
    if (viewGraphButton && window.location.pathname.includes("grafico_periodo.html")) {
        viewGraphButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Prendiamo metriche selezionate
            const selectedMetrics = [];
            const checkboxes = document.querySelectorAll('input[name="metric"]:checked');

            checkboxes.forEach(checkbox => selectedMetrics.push(checkbox.value));

            const params = new URLSearchParams({
                m1: selectedMetrics.includes("metric1") ? "true" : "false",
                m2: selectedMetrics.includes("metric2") ? "true" : "false",
                m3: selectedMetrics.includes("metric3") ? "true" : "false"
            });

            // Reindirizziamo a grafico_metriche.html con parametri metriche
            window.location.href = `grafico_metriche.html?${params.toString()}`;
        });
    }

    // LOGICA PER grafico_metriche.html: mostra immagine in base a metriche ricevute in URL
    if (window.location.pathname.includes("grafico_metriche.html")) {
        const params = new URLSearchParams(window.location.search);

        const m1 = params.get('m1') === 'true';
        const m2 = params.get('m2') === 'true';
        const m3 = params.get('m3') === 'true';

        const grafico = document.getElementById('grafico');

        function getGraficoSrc(m1, m2, m3) {
            if (!m1 && !m2 && !m3) {
                return 'grafico_metriche_default.png';
            }
            if (m1 && m2 && m3) {
                return 'graficoMetricheComplessivoIUM.png';
            }
            if (m1 && m2 && !m3) {
                return 'graficoPesoAcquaIUM.png';
            }
            if (m1 && !m2 && m3) {
                return 'graficoPesoEserciziIUM.png';
            }
            if (!m1 && m2 && m3) {
                return 'graficoAcquaEserciziIUM.png';
            }
            if (m1 && !m2 && !m3) {
                return 'graficoPesoIUM.png';
            }
            if (!m1 && m2 && !m3) {
                return 'graficoAcquaIUM.png';
            }
            if (!m1 && !m2 && m3) {
                return 'graficoEserciziIUM.png';
            }
            return 'grafico_metriche_default.png';
        }

        const srcGrafico = getGraficoSrc(m1, m2, m3);

        if (grafico) {
            grafico.innerHTML = `<img src="${srcGrafico}" alt="Grafico delle Metriche Selezionate" style="max-width: 110%; height: auto; display: block; margin: 0 auto;" />`;
        }
    }

    // LOGICA DINAMICA PER aggiornare grafico_periodo.html SENZA redirect (opzionale)
    const graphContainer = document.getElementById('graphContainer');
    const downloadLink = document.getElementById('downloadLink');

    if (graphContainer && viewGraphButton && window.location.pathname.includes("grafico_periodo.html")) {
        viewGraphButton.addEventListener('click', function (event) {
            event.preventDefault();

            const selectedMetrics = [];
            const checkboxes = document.querySelectorAll('input[name="metric"]:checked');

            checkboxes.forEach(function (checkbox) {
                selectedMetrics.push(checkbox.value);
            });

            let graphUrl = 'graficoGeneraleIUM.png';
            let graphTitle = 'Grafico generale';

            if (selectedMetrics.length === 1) {
                if (selectedMetrics.includes("metric1")) {
                    graphUrl = "graficoPesoIUM.png";
                    graphTitle = "Grafico per peso";
                } else if (selectedMetrics.includes("metric2")) {
                    graphUrl = "graficoAcquaIUM.png";
                    graphTitle = "Grafico per acqua";
                } else if (selectedMetrics.includes("metric3")) {
                    graphUrl = "graficoEserciziIUM.png";
                    graphTitle = "Grafico per esercizi";
                }
            } else if (selectedMetrics.length === 2) {
                if (selectedMetrics.includes("metric1") && selectedMetrics.includes("metric2")) {
                    graphUrl = "graficoPesoAcquaIUM.png";
                    graphTitle = "Grafico per peso e acqua";
                } else if (selectedMetrics.includes("metric1") && selectedMetrics.includes("metric3")) {
                    graphUrl = "graficoPesoEserciziIUM.png";
                    graphTitle = "Grafico per peso ed esercizi";
                } else if (selectedMetrics.includes("metric2") && selectedMetrics.includes("metric3")) {
                    graphUrl = "graficoAcquaEserciziIUM.png";
                    graphTitle = "Grafico per acqua ed esercizi";
                }
            } else if (selectedMetrics.length === 3) {
                graphUrl = "graficoMetricheComplessivoIUM.png";
                graphTitle = "Grafico per tutte le metriche";
            }

            graphContainer.innerHTML = `<h2>${graphTitle}</h2><img src="${graphUrl}" alt="${graphTitle}" style="max-width: 60%; height: auto;" />`;

            if (downloadLink) {
                downloadLink.style.display = 'inline-block';
                downloadLink.setAttribute('href', graphUrl);
                downloadLink.setAttribute('download', graphUrl);
            }
        });
    }
});
