async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // const apiKey = 'c1546ed75fdf49d0b3340f2bd265e885'
    // symbol = symbol;

    // let response = await fetch(`https://api.twelvedata.com/time_series?apikey=${apiKey}&interval=1day&symbol=${symbol}&outputsize=1`);

    // let responseJSON = await response.json();

    // console.log(responseJSON);

    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BNTX = result.BNTX

    const { GME, MSFT, DIS, BNTX} = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach( stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    console.log(stocks[0].values)    
    
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data:stocks.map(stock =>(highestStock(stock.values)) ),
                backgroundColor: stocks.map( stock =>(getColor(stock.meta.symbol))) ,
                borderColor:  stocks.map( stock =>(getColor(stock.meta.symbol))),
            }]
        }
    });

    console.log(stocks[0].values) 
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

function highestStock(stock){
    let highestStockNum = 0;
    stock.forEach(value => {
        if (highestStockNum < parseFloat(value.high))
        {
            highestStockNum = value.high
        }
    })
    return highestStockNum
}

main()

