document.addEventListener("DOMContentLoaded", function () {
  const moneyInputs = document.querySelectorAll(".money-input");
  const totalSemua = document.getElementById("total-semua");
  const resetBtn = document.getElementById("reset-btn");

  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID").format(angka);
  }

  function updateTotals() {
    let grandTotal = 0;

    moneyInputs.forEach((input) => {
      const value = parseInt(input.dataset.value);
      const count = parseInt(input.value) || 0;
      const total = value * count;

      // Update individual value display
      const valueDisplay = input.nextElementSibling;
      valueDisplay.textContent = `Rp ${formatRupiah(total)}`;

      grandTotal += total;
    });

    totalSemua.textContent = `Rp ${formatRupiah(grandTotal)}`;
  }

  function resetAll() {
    moneyInputs.forEach((input) => {
      input.value = "";
      input.nextElementSibling.textContent = "Rp 0";
    });

    totalSemua.textContent = "Rp 0";
  }

  // Event listeners
  moneyInputs.forEach((input) => {
    input.addEventListener("input", updateTotals);
  });

  resetBtn.addEventListener("click", resetAll);
});
