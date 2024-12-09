$(document).ready(function () {
    $('#energy-slider').on('input', function () {
      let billValue = $(this).val();
      $('#bill-value').text(billValue);
  
      // Simulação de economia: 95% da conta mensal.
      
      let savings = (billValue * 0.95).toFixed(2);
      $('#savings').text(savings);
    });
  });

