function hitungTotal() {
  const nilai = {
    uang100rb: 100000,
    uang75rb: 75000,
    uang50rb: 50000,
    uang20rb: 20000,
    uang10rb: 10000,
    uang5rb: 5000,
    uang2rb: 2000,
    uang1rb: 1000,
    uang500: 500,
    uang200: 200,
    uang100: 100,
  };

  let total = 0;

  for (const [id, nilai_satuan] of Object.entries(nilai)) {
    const jumlah = parseInt(document.getElementById(id).value) || 0;
    total += jumlah * nilai_satuan;
  }

  // format total sebgai mata uang rupiah
  const formatRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(total);

  document.getElementById("total").textContent = formatRupiah;
}

function resetForm() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.value = "";
  });
  hitungTotal();
}

// hitung total saat halaman dimuat
window.onload = hitungTotal;
