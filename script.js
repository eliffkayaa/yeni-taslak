const themeButton = document.querySelector("#theme-toggle");
const temaAnahtari = "blog-temasi";
const kayitliTema = localStorage.getItem(temaAnahtari);
const sistemKaranlik = window.matchMedia("(prefers-color-scheme: dark)").matches;
const karanlikMod = kayitliTema === "karanlik"
    || (kayitliTema !== "aydinlik" && sistemKaranlik);

// Verilen tema durumunu sayfaya ve tema düğmesine uygular.
function temayiUygula(karanlik) {
    document.body.classList.toggle("karanlik", karanlik);
    if (themeButton) {
        themeButton.textContent = karanlik ? "☀️ Açık Mod" : "🌙 Karanlık Mod";
        themeButton.setAttribute("aria-pressed", String(karanlik));
    }
}

temayiUygula(karanlikMod);

if (themeButton) {
    // Tema düğmesine tıklandığında temayı değiştirip kaydeder.
    // Bu olay işleyicisi tema düğmesine yapılan tıklamaları yönetir.
    themeButton.addEventListener("click", function(){
        const karanlik = !document.body.classList.contains("karanlik");
        localStorage.setItem(temaAnahtari, karanlik ? "karanlik" : "aydinlik");
        temayiUygula(karanlik);
    });
}

// JSON'dan kartlar geldikten sonra filtre ve arama olaylarını kurar.
function yazilariFiltrelemeyiKur() {
    const kartlar = document.querySelectorAll(".yazi-karti");

    const filtreDugmeleri = document.querySelectorAll(".yazi-filtre-dugmesi");
    const aramaKutusu = document.querySelector("#arama");
    const sonucMesaji = document.querySelector("#arama-sonucu");
    if (aramaKutusu && sonucMesaji) {
        const parametreler = new URLSearchParams(window.location.search);
        const urlEtiketi = parametreler.get("etiket");
        let secilenEtiket = urlEtiketi
            ? urlEtiketi.toLocaleLowerCase("tr")
            : "tumu";

        // Yazıları seçili etikete ve arama metnine göre filtreler.
        function kartlariFiltrele() {
            const arananMetin = aramaKutusu.value.toLocaleLowerCase("tr");

            // Her kartın aranan başlık ve seçilen etiketle eşleşip eşleşmediğini denetler.
            const eslesenKartlar = Array.from(kartlar).filter(function(kart){
                const etiketler = JSON.parse(kart.dataset.etiket);
                const baslik = kart.querySelector("h2").textContent.toLocaleLowerCase("tr");
                const etiketEslesiyor = secilenEtiket === "tumu" || etiketler.includes(secilenEtiket);
                const aramaEslesiyor = baslik.includes(arananMetin);

                return etiketEslesiyor && aramaEslesiyor;
            });

            // Eşleşmeyen kartları gizler, eşleşme mesajını günceller.
            kartlar.forEach(function(kart){
                kart.hidden = !eslesenKartlar.includes(kart);
            });

            sonucMesaji.hidden = eslesenKartlar.length > 0;
        }

        // Seçilen etiketi etkinleştirir, gerekirse URL'yi günceller.
        function etiketiSec(dugme, urlGuncellensin) {
            secilenEtiket = dugme.dataset.filtre;

            // Filtre düğmelerinin görsel ve erişilebilir seçili durumunu günceller.
            filtreDugmeleri.forEach(function(filtreDugmesi){
                const secili = filtreDugmesi === dugme;
                filtreDugmesi.classList.toggle("aktif", secili);
                filtreDugmesi.setAttribute("aria-pressed", String(secili));
            });

            if (urlGuncellensin) {
                const adres = new URL(window.location.href);
                if (secilenEtiket === "tumu") {
                    adres.searchParams.delete("etiket");
                } else {
                    adres.searchParams.set("etiket", dugme.textContent);
                }
                window.history.replaceState(window.history.state, "", adres);
            }

            kartlariFiltrele();
        }

        // Her filtre düğmesine tıklama davranışını ekler.
        filtreDugmeleri.forEach(function(dugme){
            // Tıklanan filtre düğmesini seçer ve URL'yi günceller.
            dugme.addEventListener("click", function(){
                etiketiSec(dugme, true);
            });

            // Enter veya boşluk tuşunu düğme tıklamasıyla aynı şekilde işler.
            dugme.addEventListener("keydown", function(olay){
                if (olay.key === "Enter" || olay.key === " ") {
                    olay.preventDefault();
                    dugme.click();
                }
            });
        });

        // Yazı kartındaki etiket bağlantısını, sayfayı yenilemeden filtreye dönüştürür.
        document.querySelectorAll(".yazi-karti .etiket a").forEach(function(baglanti){
            // Etiket bağlantısına tıklandığında eşleşen filtre düğmesini seçer.
            baglanti.addEventListener("click", function(olay){
                const etiketDugmesi = Array.from(filtreDugmeleri).find(
                    dugme => dugme.dataset.filtre
                        === baglanti.textContent.toLocaleLowerCase("tr")
                );

                if (etiketDugmesi) {
                    olay.preventDefault();
                    etiketiSec(etiketDugmesi, true);
                }
            });
        });

        // URL'deki etikete karşılık gelen düğmeyi bulur.
        const urlEtiketDugmesi = Array.from(filtreDugmeleri).find(
            dugme => dugme.dataset.filtre === secilenEtiket
        );
        if (urlEtiketDugmesi) {
            etiketiSec(urlEtiketDugmesi, false);
        } else {
            secilenEtiket = "tumu";
            kartlariFiltrele();
        }

        aramaKutusu.addEventListener("input", kartlariFiltrele);
    }
}

document.addEventListener("yazilar:yuklendi", yazilariFiltrelemeyiKur);
