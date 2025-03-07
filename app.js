document.addEventListener("DOMContentLoaded", function () {
  const moneyInputs = document.querySelectorAll(".money-input");
  const totalKertas = document.getElementById("total-kertas");
  const totalLogam = document.getElementById("total-logam");
  const totalSemua = document.getElementById("total-semua");
  const resetBtn = document.getElementById("reset-btn");
  const moneyIcons = document.querySelectorAll(".money-icon");

  // Berbagai animasi untuk emoji
  const animations = ["pulse", "wiggle", "swing", "float"];

  // Berikan animasi berbeda untuk setiap emoji
  moneyIcons.forEach((icon, index) => {
    const randomAnim = animations[index % animations.length];
    icon.style.animation = `${randomAnim} ${2 + Math.random()}s infinite`;
  });

  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID").format(angka);
  }

  function updateTotals() {
    let kertasTotal = 0;
    let logamTotal = 0;

    moneyInputs.forEach((input) => {
      const value = parseInt(input.dataset.value);
      const count = parseInt(input.value) || 0;
      const total = value * count;

      // Update individual value display
      const valueDisplay = input.nextElementSibling;
      valueDisplay.textContent = `Rp ${formatRupiah(total)}`;

      // Add to appropriate total
      if (input.closest(".kertas")) {
        kertasTotal += total;
      } else if (input.closest(".logam")) {
        logamTotal += total;
      }
    });

    totalKertas.textContent = `Rp ${formatRupiah(kertasTotal)}`;
    totalLogam.textContent = `Rp ${formatRupiah(logamTotal)}`;
    totalSemua.textContent = `Rp ${formatRupiah(kertasTotal + logamTotal)}`;

    // Animate emoji
    animateEmoji();
  }

  function animateEmoji() {
    const emojis = document.querySelectorAll(".money-icon, .total-label span");

    emojis.forEach((emoji, index) => {
      // Tambahkan efek "bump" saat emoji berubah
      emoji.style.transform = "scale(1.5)";

      // Tambahkan efek rotasi acak
      const rotation = Math.random() * 30 - 15;
      emoji.style.transform += ` rotate(${rotation}deg)`;

      // Kembali ke normal setelah animasi
      setTimeout(() => {
        emoji.style.transform = "";
      }, 300);
    });
  }

  function resetAll() {
    moneyInputs.forEach((input) => {
      input.value = "";
      input.nextElementSibling.textContent = "Rp 0";
    });

    totalKertas.textContent = "Rp 0";
    totalLogam.textContent = "Rp 0";
    totalSemua.textContent = "Rp 0";

    // Animasi khusus saat reset
    const allEmojis = document.querySelectorAll(
      ".money-icon, .total-label span, .header-emoji"
    );

    allEmojis.forEach((emoji, index) => {
      // Jadwalkan animasi dengan penundaan berbeda untuk setiap emoji
      setTimeout(() => {
        // Simpan animasi asli
        const originalAnimation = emoji.style.animation;

        // Animasi spin 360 derajat
        emoji.style.animation = "none";
        emoji.style.transform = "rotate(360deg) scale(0)";

        setTimeout(() => {
          emoji.style.transition = "transform 0.5s ease-out";
          emoji.style.transform = "rotate(0) scale(1)";

          // Kembalikan animasi asli setelah efek
          setTimeout(() => {
            emoji.style.transition = "";
            emoji.style.animation = originalAnimation;
          }, 500);
        }, 50);
      }, index * 50); // Berurutan dengan jarak 50ms
    });
  }

  // Event listeners
  moneyInputs.forEach((input) => {
    input.addEventListener("input", updateTotals);

    // Add interactive emoji effect on focus
    input.addEventListener("focus", function () {
      const icon = this.closest(".money-item").querySelector(".money-icon");

      // Buat animasi lebih menarik dengan pergerakan acak
      const randomX = Math.random() * 20 - 10;
      const randomRotate = Math.random() * 40 - 20;

      icon.style.transform = `translateX(${randomX}px) rotate(${randomRotate}deg) scale(1.5)`;

      // Reset after animation
      setTimeout(() => {
        icon.style.transform = "";
      }, 500);
    });
  });

  resetBtn.addEventListener("click", resetAll);

  // Easter egg: Click on title to celebrate
  document.querySelector("h1").addEventListener("click", function () {
    const emojis = ["🎉", "🎊", "✨", "💸", "💰", "💵", "🪙"];
    const container = document.querySelector(".container");

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const emoji = document.createElement("div");
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = "absolute";
        emoji.style.fontSize = `${Math.random() * 1.5 + 1.5}rem`;
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `-50px`;
        emoji.style.zIndex = "1000";

        // Animasi yang lebih menarik
        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 720 - 360;
        const horizontalMovement = Math.random() * 200 - 100;

        emoji.style.animation = `custom-fall-${i} ${duration}s ease-in-out forwards`;

        // Buat keyframe animasi unik untuk setiap emoji
        const style = document.createElement("style");
        style.textContent = `
                  @keyframes custom-fall-${i} {
                      0% { transform: translateY(0) translateX(0) rotate(0deg) scale(0); opacity: 0; }
                      10% { transform: translateY(20px) translateX(${
                        horizontalMovement * 0.1
                      }px) rotate(${rotation * 0.1}deg) scale(1); opacity: 1; }
                      90% { opacity: 1; }
                      100% { transform: translateY(calc(100vh)) translateX(${horizontalMovement}px) rotate(${rotation}deg) scale(0.5); opacity: 0; }
                  }
              `;
        document.head.appendChild(style);

        document.body.appendChild(emoji);

        setTimeout(() => {
          document.body.removeChild(emoji);
          document.head.removeChild(style);
        }, duration * 1000);
      }, i * 100); // Berjarak waktu untuk efek bertahap
    }
  });
});
