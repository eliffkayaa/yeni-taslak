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
        const etiketler = yazilar.flatMap(yazi => yazi.etiketler);
        const benzersizEtiketler = [...new Set(
            etiketler.map(etiket => etiket.toLocaleLowerCase("tr"))
        )];
        const filtreler = document.querySelector(".yazi-filtreleri");

        const tumuDugmesi = document.createElement("button");
        tumuDugmesi.type = "button";
        tumuDugmesi.className = "yazi-filtre-dugmesi aktif";
        tumuDugmesi.dataset.filtre = "tumu";
        tumuDugmesi.setAttribute("aria-pressed", "true");
        tumuDugmesi.textContent = "Tümü";
        filtreler.append(tumuDugmesi);

        benzersizEtiketler.forEach(function (etiketAnahtari) {
            const dugme = document.createElement("button");
            const etiket = etiketler.find(
                deger => deger.toLocaleLowerCase("tr") === etiketAnahtari
            );

            dugme.type = "button";
            dugme.className = "yazi-filtre-dugmesi";
            dugme.dataset.filtre = etiketAnahtari;
            dugme.setAttribute("aria-pressed", "false");
            dugme.textContent = etiket;

            filtreler.append(dugme);
        });

        function tarihZamaniniAl(tarih) {
            const [gun, ay, yil] = tarih.split("-").map(Number);
            return Date.UTC(yil, ay - 1, gun);
        }

        yazilar.sort((birinci, ikinci) => (
            tarihZamaniniAl(ikinci.tarih) - tarihZamaniniAl(birinci.tarih)
        ));

        yazilar.forEach(function (yazi) {
            // JSON metinlerini textContent ile eklemek, içeriğin HTML olarak çalışmasını önler.
            // innerHTML güvenilmeyen metni HTML olarak yorumlayıp XSS/enjekte edilmiş içerik riski doğurabilir.
            const kart = document.createElement("article");
            kart.className = "yazi-karti";
            kart.dataset.etiket = JSON.stringify(
                yazi.etiketler.map(etiket => etiket.toLocaleLowerCase("tr"))
            );

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
