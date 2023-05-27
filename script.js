const sipForm = document.getElementById('sipForm');
const expectedAmountElement = document.getElementById('expectedAmount');
let chart;
sipForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
  const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
  const years = parseInt(document.getElementById('years').value);
 const monthlyRate=rateOfReturn/12/100
  const totalInvestment = monthlyInvestment * years * 12;
  const months =  years * 12;
  const expectedAmount = monthlyInvestment *( Math.pow((1 + monthlyRate),months) - 1)/monthlyRate *(1+monthlyRate);

  
  expectedAmountElement.innerText = expectedAmount.toFixed(2);
updateChart(monthlyInvestment, rateOfReturn, months, expectedAmount);
})


function updateChart(monthlyInvestment, rateOfReturn, months, expectedAmount) {
    const totalInvestment = monthlyInvestment * months;
    const returns = expectedAmount - totalInvestment;
  
    if (chart) {
      // Clear existing chart
      chart.destroy();
    }
  
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Investment', 'Returns'],
        datasets: [{
          data: [totalInvestment, returns],
          backgroundColor: ['#3366cc', '#dc3545']
        }]
      }
    });
  }

