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

            const eslesenKartlar = Array.from(kartlar).filter(function(kart){
                const etiketler = JSON.parse(kart.dataset.etiket);
                const baslik = kart.querySelector("h2").textContent.toLocaleLowerCase("tr");
                const etiketEslesiyor = secilenEtiket === "tumu" || etiketler.includes(secilenEtiket);
                const aramaEslesiyor = baslik.includes(arananMetin);

                return etiketEslesiyor && aramaEslesiyor;
            });

            kartlar.forEach(function(kart){
                kart.hidden = !eslesenKartlar.includes(kart);
            });

            sonucMesaji.hidden = eslesenKartlar.length > 0;
        }

        function etiketiSec(dugme, urlGuncellensin) {
            secilenEtiket = dugme.dataset.filtre;

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

        filtreDugmeleri.forEach(function(dugme){
            dugme.addEventListener("click", function(){
                etiketiSec(dugme, true);
            });
        });

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
