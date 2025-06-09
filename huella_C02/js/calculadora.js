document.getElementById('calcular').addEventListener('click', () => {
    // --- RECOLECCIÓN DE DATOS ---
    const electricidad = parseFloat(document.getElementById('electricidad').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const autoKm = parseFloat(document.getElementById('autoKm').value) || 0;
    const transportePublico = parseFloat(document.getElementById('transportePublico').value) || 0;
    const vuelosCortos = parseInt(document.getElementById('vuelosCortos').value) || 0;
    const vuelosLargos = parseInt(document.getElementById('vuelosLargos').value) || 0;
    const dieta = document.getElementById('dieta').value;
    const consumo = document.getElementById('consumo').value;

    // --- FACTORES DE EMISIÓN (kg CO₂ por unidad) ---
    // Fuentes: IEA, EPA, estudios medioambientales. Valores ajustados para promedios.
    const factorElectricidad = 0.176; // Promedio para Colombia (kg CO₂/kWh)
    const factorGas = 0.204; // Gas natural (kg CO₂/kWh)
    const factorAuto = 0.185; // Promedio para un auto de gasolina (kg CO₂/km)
    const factorTransporte = 0.041; // Promedio bus en ciudad (kg CO₂/km por pasajero)
    const factorVueloCorto = 150; // Vuelo doméstico o corto (kg CO₂ por vuelo)
    const factorVueloLargo = 900; // Vuelo internacional o largo (kg CO₂ por vuelo)

    // Emisiones anuales divididas por 12 para obtener el promedio mensual
    const dietaFactores = {
        omnivora: 2500 / 12,    // kg CO₂/mes
        vegetariana: 1700 / 12,
        vegana: 1300 / 12
    };
    
    const consumoFactores = {
        bajo: 1000 / 12,       // kg CO₂/mes
        medio: 2500 / 12,
        alto: 4500 / 12
    };

    // --- CÁLCULOS POR CATEGORÍA (kg CO₂ / mes) ---
    const huellaHogar = (electricidad * factorElectricidad) + (gas * factorGas);
    const huellaMovilidad = (autoKm * factorAuto) + (transportePublico * factorTransporte) + ((vuelosCortos * factorVueloCorto + vuelosLargos * factorVueloLargo) / 12);
    const huellaHabitos = dietaFactores[dieta] + consumoFactores[consumo];

    const totalMensual = huellaHogar + huellaMovilidad + huellaHabitos;
    const totalAnual = totalMensual * 12;

    // --- COMPARACIÓN (toneladas por año) ---
    const promedioColombia = 1.9; // Toneladas de CO₂ per cápita al año
    const promedioMundial = 4.7;  // Toneladas de CO₂ per cápita al año
    const objetivoSostenible = 2.0; // Objetivo para 2050 según Acuerdo de París

    // --- MOSTRAR RESULTADO ---
    const resultadoDiv = document.getElementById('resultado');
    const comparacionDiv = document.getElementById('comparacion');
    
    resultadoDiv.innerHTML = `
        <strong>Huella Mensual:</strong> ${totalMensual.toFixed(1)} kg CO₂<br>
        <strong>Huella Anual:</strong> ${(totalAnual / 1000).toFixed(2)} toneladas de CO₂<br>
        <hr>
        <strong>Desglose Mensual:</strong><br>
        Hogar: ${huellaHogar.toFixed(1)} kg CO₂<br>
        Movilidad: ${huellaMovilidad.toFixed(1)} kg CO₂<br>
        Hábitos: ${huellaHabitos.toFixed(1)} kg CO₂
    `;

    comparacionDiv.innerHTML = `
        <h3>¿Cómo te comparas?</h3>
        <p>Tu huella anual es de <strong>${(totalAnual / 1000).toFixed(2)} toneladas.</strong></p>
        <ul>
            <li>Promedio en Colombia: ${promedioColombia.toFixed(2)} toneladas/año.</li>
            <li>Promedio Mundial: ${promedioMundial.toFixed(2)} toneladas/año.</li>
            <li>Objetivo Sostenible 2050: ${objetivoSostenible.toFixed(2)} toneladas/año.</li>
        </ul>
    `;
    
    document.getElementById('resultado-container').classList.remove('hidden');
});