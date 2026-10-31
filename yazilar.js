async function yazilariGetir() {
    const liste = document.querySelector(".yazi-listesi");
    const yukleniyor = document.querySelector("#yazilar-yukleniyor");
    const siralama = document.querySelector("#yazi-siralama");

    try {
        const cevap = await fetch("yazilar.json");
        if (!cevap.ok) {
            throw new Error(`Yazılar yüklenemedi (${cevap.status}).`);
        }

        const yazilar = await cevap.json();
        console.info("yazilar.json yüklendi:", yazilar);
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
            const parcalar = tarih.split("-").map(Number);
            const [yil, ay, gun] = parcalar[0] > 999
                ? parcalar
                : [parcalar[2], parcalar[1], parcalar[0]];
            return Date.UTC(yil, ay - 1, gun);
        }

        const kartlar = new Map();

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
            yazi.etiketler.forEach(function (kategori, sira) {
                const etiketBaglantisi = document.createElement("a");
                const adres = new URL("yazilar.html", window.location.href);
                adres.searchParams.set("etiket", kategori);
                etiketBaglantisi.href = adres.href;
                etiketBaglantisi.textContent = kategori;
                etiket.append(etiketBaglantisi);

                if (sira < yazi.etiketler.length - 1) {
                    etiket.append(document.createTextNode(" • "));
                }
            });

            const baslik = document.createElement("h2");
            baslik.textContent = yazi.baslik;

            const ozet = document.createElement("p");
            ozet.textContent = yazi.ozet;

            if (yazi.icerik) {
                const tamMetin = document.createElement("details");
                const aciklama = document.createElement("summary");
                aciklama.textContent = "Yazının tamamını oku";
                tamMetin.append(aciklama);

                yazi.icerik.forEach(function (bolum) {
                    const bolumBasligi = document.createElement("h3");
                    bolumBasligi.textContent = bolum.baslik;

                    const bolumMetni = document.createElement("p");
                    bolumMetni.textContent = bolum.metin;
                    tamMetin.append(bolumBasligi, bolumMetni);
                });

                kart.append(tamMetin);
            }

            const baglanti = document.createElement("a");
            baglanti.href = yazi.link;
            baglanti.textContent = "Yazıyı oku →";

            kart.append(etiket, baslik, ozet, baglanti);
            kartlar.set(yazi, kart);
        });

        function yazilariSirala() {
            const siralamaOlcutu = siralama.value;
            const siraliYazilar = [...yazilar].sort((birinci, ikinci) => {
                if (siralamaOlcutu === "baslik") {
                    return birinci.baslik.localeCompare(ikinci.baslik, "tr");
                }

                const tarihFarki = tarihZamaniniAl(ikinci.tarih)
                    - tarihZamaniniAl(birinci.tarih);
                return siralamaOlcutu === "eski" ? -tarihFarki : tarihFarki;
            });
            const siraliKartlar = document.createDocumentFragment();

            siraliYazilar.forEach(function (yazi) {
                siraliKartlar.append(kartlar.get(yazi));
            });

            liste.append(siraliKartlar);
        }

        siralama.addEventListener("change", yazilariSirala);
        yazilariSirala();
        yukleniyor.remove();
        document.dispatchEvent(new Event("yazilar:yuklendi"));
    } catch (hata) {
        console.error("Yazılar yüklenemedi:", hata);
        if (yukleniyor) {
            yukleniyor.textContent = "Yazılar yüklenemedi: yazilar.json";
            yukleniyor.setAttribute("role", "alert");
            yukleniyor.setAttribute("aria-live", "assertive");
        }
    }
}

yazilariGetir();
