async function yazilariGetir() {
    const liste = document.querySelector(".yazi-listesi");
    const yukleniyor = document.querySelector("#yazilar-yukleniyor");

    try {
        const cevap = await fetch("yazilar.json");
        if (!cevap.ok) {
            throw new Error(`Yazılar yüklenemedi (${cevap.status}).`);
        }

        const yazilar = await cevap.json();
        const kartlar = document.createDocumentFragment();

        yazilar.forEach(function (yazi) {
            const kart = document.createElement("article");
            kart.className = "yazi-karti";
            kart.dataset.etiket = yazi.etiketler
                .map((etiket) => etiket.toLocaleLowerCase("tr"))
                .join(" ");

            const etiket = document.createElement("p");
            etiket.className = "etiket";
            etiket.textContent = yazi.etiketler.join(" • ");

            const baslik = document.createElement("h2");
            baslik.textContent = yazi.baslik;

            const ozet = document.createElement("p");
            ozet.textContent = yazi.ozet;

            const baglanti = document.createElement("a");
            baglanti.href = yazi.link;
            baglanti.textContent = "Yazıyı oku →";

            kart.append(etiket, baslik, ozet, baglanti);
            kartlar.append(kart);
        });

        liste.insertBefore(kartlar, yukleniyor);
        yukleniyor.remove();
        document.dispatchEvent(new Event("yazilar:yuklendi"));
    } catch (hata) {
        console.error("Yazılar yüklenirken hata oluştu:", hata);
        yukleniyor.textContent = "Yazılar yüklenemedi. Lütfen daha sonra tekrar deneyin.";
    }
}

yazilariGetir();
