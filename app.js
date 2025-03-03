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

  const labelMap = {
    uang100rb: "100 Ribu",
    uang75rb: "75 Ribu",
    uang50rb: "50 Ribu",
    uang20rb: "20 Ribu",
    uang10rb: "10 Ribu",
    uang5rb: "5 Ribu",
    uang2rb: "2 Ribu",
    uang1rb: "1 Ribu",
    uang500: "500 Rupiah",
    uang200: "200 Rupiah",
    uang100: "100 Rupiah",
  };

  let total = 0;
  let breakdownHTML = "";
  let hasValues = false;

  for (const [id, nilai_satuan] of Object.entries(nilai)) {
    const jumlah = parseInt(document.getElementById(id).value) || 0;
    // total += jumlah * nilai_satuan;
    const subTotal = jumlah * nilai_satuan;
    total += subTotal;

    if (jumlah > 0) {
      hasValues = true;
      const formatSubTotal = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(subTotal);

      breakdownHTML += `
      <div class="breakdown-item">
        <span>${labelMap[id]} × ${jumlah}</span>
        <span>${formatSubTotal}</span>
      </div>
      `;
    }
  }

  // format total sebgai mata uang rupiah
  const formatRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(total);

  document.getElementById("total").textContent = formatRupiah;

  const breakdownContainer = document.getElementById("breakdown-container");

  if (hasValues) {
    breakdownContainer.innerHTML = breakdownHTML;
    breakdownContainer.style.display = "block";
  } else {
    breakdownContainer.innerHTML = `
    <div class="breakdown-item"><span>Belum ada data</span></div>
    `;
    breakdownContainer.style.display = "block";
  }
}

function resetForm() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.value = "";
  });
  hitungTotal();
}

function copyToClipboard() {
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

  const labelMap = {
    uang100rb: "100 Ribu",
    uang75rb: "75 Ribu",
    uang50rb: "50 Ribu",
    uang20rb: "20 Ribu",
    uang10rb: "10 Ribu",
    uang5rb: "5 Ribu",
    uang2rb: "2 Ribu",
    uang1rb: "1 Ribu",
    uang500: "500 Rupiah",
    uang200: "200 Rupiah",
    uang100: "100 Rupiah",
  };

  let total = 0;
  let textToCopy = "Rincian Perhitungan Uang\n";
  textToCopy += "=========================\n\n";
  let hasValues = false;

  for (const [id, nilai_satuan] of Object.entries(nilai)) {
    const jumlah = parseInt(document.getElementById(id).value) || 0;
    if (jumlah > 0) {
      hasValues = true;
      const subTotal = jumlah * nilai_satuan;
      total += subTotal;

      const formatSubTotal = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(subTotal);

      textToCopy += ``;

      if (
        ["100 Ribu", "500 Rupiah", "200 Rupiah", "100 Rupiah"].includes(
          labelMap[id]
        )
      ) {
        textToCopy += `${labelMap[id]}\t× ${jumlah}\t= ${formatSubTotal}\n`;
      } else {
        textToCopy += `${labelMap[id]}\t\t× ${jumlah}\t= ${formatSubTotal}\n`;
      }
    }
  }

  if (!hasValues) {
    textToCopy += "belum ada data\n";
  }

  textToCopy += "\n=========================\n";
  const formatTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(total);
  textToCopy += `TOTAL: ${formatTotal}`;

  // create a temporary textarea element to copy the text
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);

  // show temporary notification;
  alert("Data berhasil disalin");
}

// hitung total saat halaman dimuat
window.onload = hitungTotal;
