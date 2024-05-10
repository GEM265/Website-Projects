function calculateStats() {
    /*Get input values */
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);
    var num3 = parseFloat(document.getElementById('num3').value);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
      document.getElementById("result").innerHTML = "<p class='error'>Please enter a valid number.</p>";
      return;
    }

    // Calculate statistics
    var max = Math.max(num1, num2, num3);
    var min = Math.min(num1, num2, num3);
    var mean = (num1 + num2 + num3) / 3;
    var median = medianOfThree(num1, num2, num3);
    var range = max - min;

    // Display results
    document.getElementById('results').innerHTML = `
      <p>Max: ${max}</p>
      <p>Min: ${min}</p>
      <p>Mean: ${mean.toFixed(1)}</p>
      <p>Median: ${median}</p>
      <p>Range: ${range}</p>
    `;
  }

  function medianOfThree(a, b, c) {
    return [a, b, c].sort((x, y) => x - y)[1];
  }