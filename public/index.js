async function main(symbol) {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const apiKey = 'c1546ed75fdf49d0b3340f2bd265e885'
    symbol = symbol;

    let response = await fetch(`https://api.twelvedata.com/time_series?apikey=${apiKey}&interval=1day&symbol=${symbol}&outputsize=1`);

    let responseJSON = await response.json();

    console.log(responseJSON);

}

main('AAPL')