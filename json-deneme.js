// Ana sayfada JSON'daki en yeni üç yazıyı gösterir.
async function anaSayfaYazilariniGetir() {
    const kartListesi = document.querySelector(".son-yazilar .kartlar");
    const yukleniyor = document.querySelector("#son-yazilar-yukleniyor");

    if (!kartListesi || !yukleniyor) {
        return;
    }

    try {
        const cevap = await fetch("yazilar.json");
        if (!cevap.ok) {
            throw new Error(`yazilar.json yüklenemedi (${cevap.status}).`);
        }

        const yazilar = await cevap.json();
        console.info("Ana sayfa yazıları yazilar.json dosyasından yüklendi:", yazilar);
        const enYeniYazilar = yazilar
            .slice()
            .sort((birinci, ikinci) => (
                new Date(ikinci.tarih) - new Date(birinci.tarih)
            ))
            .slice(0, 3);
        const kartlar = document.createDocumentFragment();

        enYeniYazilar.forEach(function (yazi) {
            const kart = document.createElement("article");
            kart.className = "kart";

            const icerik = document.createElement("div");
            icerik.className = "kart-icerik";

            const etiket = document.createElement("p");
            etiket.className = "kart-etiket";
            etiket.textContent = yazi.etiketler.join(" • ");

            const baslik = document.createElement("h3");
            baslik.textContent = yazi.baslik;

            const ozet = document.createElement("p");
            ozet.textContent = yazi.ozet;

            const baglanti = document.createElement("a");
            baglanti.href = yazi.link;
            baglanti.textContent = "Oku →";

            icerik.append(etiket, baslik, ozet, baglanti);
            kart.append(icerik);
            kartlar.append(kart);
        });

        kartListesi.replaceChildren(kartlar);
        yukleniyor.remove();
    } catch (hata) {
        console.error("Ana sayfa yazıları yüklenemedi:", hata);
        yukleniyor.textContent = "Son yazılar yüklenemedi: yazilar.json";
        yukleniyor.setAttribute("role", "alert");
        yukleniyor.setAttribute("aria-live", "assertive");
    }
}

anaSayfaYazilariniGetir();
