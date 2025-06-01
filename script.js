// Büyük kalp için grid (1=kalp, 0=boş)
function getHeartPositions() {
    // 13 sütun x 11 satır, en altta sadece 1 kalp olacak şekilde (önceki haline geri alındı)
    const heartMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ];
    const positions = [];
    for (let row = 0; row < heartMap.length; row++) {
        for (let col = 0; col < heartMap[row].length; col++) {
            if (heartMap[row][col] === 1) {
                positions.push([col, row]);
            }
        }
    }
    // Kalpleri sağdan sola doğru sırala
    // positions.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

    // Kalpleri rastgele sırala
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    return positions;
}

window.onload = function () {
    const heartsDiv = document.getElementById('hearts');
    const heartPositions = getHeartPositions();
    const heartSize = 15; // Kalp boyutu küçültüldü
    let offsetX = 0, offsetY = 60;
    let i = 0;

    function showHeart() {
        if (i >= heartPositions.length) {
            // 3. Kalp tamamlanınca yukarı taşı
            setTimeout(() => {
                heartsDiv.style.top = "10px";
                // 4. Kalp yukarı çıkınca yazıyı göster
                setTimeout(() => {
                    document.getElementById('love-text').style.opacity = 1;
                }, 900);
            }, 400);
            return;
        }
        const [x, y] = heartPositions[i];
        // İlk kalbi ekleme, diğerlerini ekle
        if (i >= 0) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = (x * heartSize + offsetX) + 'px';
            heart.style.top = (y * heartSize + offsetY) + 'px';
            // Daha simetrik ve klasik SVG kalp şekli
            heart.innerHTML = `<svg viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 27
          C16 27, 2 17.5, 2 10.5
          A7 7 0 0 1 16 7
          A7 7 0 0 1 30 10.5
          C30 17.5, 16 27, 16 27Z"
          fill="#e74c3c" stroke="#b22222" stroke-width="1"/>
      </svg>`;
            heartsDiv.appendChild(heart);
            setTimeout(() => { heart.style.opacity = 1; }, 50);
        }
        i++;
        setTimeout(showHeart, 40);
    }

    // Başlangıçta yazı gizli ve kalp aşağıda
    document.getElementById('love-text').style.opacity = 0;
    heartsDiv.style.top = "80px";

    // GIF yüklendiğinde veya zaten yüklenmişse kalp animasyonu başlasın
    function tryShowHeart() {

        setTimeout(() => {
            showHeart();
        }, 7000);
    }

    tryShowHeart();
};
