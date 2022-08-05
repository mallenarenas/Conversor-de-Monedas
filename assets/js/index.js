// Funcion que pide los datos de los diferentes indicadores 
async function getValuesIndicators() {
    try{
    const endpoint = "https://mindicador.cl/api/";
    const res = await fetch(endpoint);
    if (res.status == 200) {
    const data = await res.json();
    return data;
    }
    else {
        throw "err";
      }
    } 
    catch (err) {
        console.log("catch", err);
        alert("Algo salió mal. Intenta más tarde")
      }
};
// Funcion que pide los datos del ultimo mes
async function getIndicator(indicator) {
    try{
    const endpoint = `https://mindicador.cl/api/${indicator}`;
    const res = await fetch(endpoint);
    if (res.status == 200) {
    const monedas = await res.json();
    return monedas; 
    }
    else {
        throw "err";
      }
    } 
    catch (err) {
        console.log("catch", err);
        alert("No se pudo obtener el gráfico")
      }
}
// Función para realizar el gráfico
async function renderPlot(indicator) {
    const monedas = await getIndicator(indicator);
    let yvalues = [0,0,0,0,0,0,0,0,0,0];
    let xvalues = [0,0,0,0,0,0,0,0,0,0];
    for (var i=0; i<10; i++){
        yvalues[i] = monedas.serie[9-i].valor;
        xvalues[i] = i+1;//monedas.serie[9-i].fecha;
    }
    const config = {
        type: "line",
        data: {
            labels: xvalues ,
            datasets: [{
            backgroundColor: "red",
            borderColor: "red",
            data: yvalues
            }]
        } ,
    };
    const chartDOM = document.getElementById("myChart");
    chartDOM.style.backgroundColor = "white";
    chartDOM.style.width = "100%"
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    window.grafica = new Chart(chartDOM, config);
}

button = document.querySelector("#button");
button.addEventListener("click", async (event) => {
    const clp = Number(document.querySelector("#clp").value);
    const coin = document.querySelector("#coin");
    const total = document.querySelector("#total");
    const data = await getValuesIndicators();
    if (isNaN(clp) === true) {
        alert("Debes ingresar un número en este campo");
    }
    else if ( coin.value == "uf"){
        const convert = clp/data.uf.valor;
        total.innerHTML = convert;
        renderPlot('uf');
    }
    else if ( coin.value == "ivp"){
        const convert = clp/data.ivp.valor;        
        total.innerHTML = convert;
        renderPlot('ivp');
    }
    else if ( coin.value == "dolar"){
        const convert = clp/data.dolar.valor;       
        total.innerHTML = convert;
        renderPlot('dolar');
    }
    else if ( coin.value == "dolar_intercambio"){
        const convert = clp/data.dolar_intercambio.valor;   
        total.innerHTML = convert;
        renderPlot('dolar_intercambio');
    }
    else if ( coin.value == "euro"){
        const convert = clp/data.euro.valor;       
        total.innerHTML = convert;
        renderPlot('euro');
    };
    });