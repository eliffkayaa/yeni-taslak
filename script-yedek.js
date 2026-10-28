// Sayfanın karanlık veya aydınlık temasını uygular.
const themeButton = document.querySelector("#theme-toggle");
const temaAnahtari = "blog-temasi";
const kayitliTema = localStorage.getItem(temaAnahtari);
const sistemKaranlik = window.matchMedia("(prefers-color-scheme: dark)").matches;
const karanlikMod = kayitliTema === "karanlik"
    || (kayitliTema !== "aydinlik" && sistemKaranlik);

function temayiUygula(karanlik) {
    document.body.classList.toggle("karanlik", karanlik);
    if (themeButton) {
        themeButton.textContent = karanlik ? "☀️ Açık Mod" : "🌙 Karanlık Mod";
        themeButton.setAttribute("aria-pressed", String(karanlik));
    }
}

temayiUygula(karanlikMod);

if (themeButton) {
    themeButton.addEventListener("click", function(){
        const karanlik = !document.body.classList.contains("karanlik");
        localStorage.setItem(temaAnahtari, karanlik ? "karanlik" : "aydinlik");
        temayiUygula(karanlik);
    });
}
// Yazıları filtreleme 

document.addEventListener("DOMContentLoaded", function(){
    const kartlar = document.querySelectorAll(".yazi-karti");

    const filtreDugmeleri = document.querySelectorAll(".yazi-filtre-dugmesi");
    const aramaKutusu = document.querySelector("#arama");
    const sonucMesaji = document.querySelector("#arama-sonucu");
    if (aramaKutusu && sonucMesaji) {
        let secilenKategori = "tumu";

        function kartlariFiltrele() {
            const arananMetin = aramaKutusu.value.toLocaleLowerCase("tr");
            let gorunenKartSayisi = 0;

            kartlar.forEach(function(kart){
                const kategoriler = kart.dataset.etiket.split(" ");
                const baslik = kart.querySelector("h2").textContent.toLocaleLowerCase("tr");
                const kategoriEslesiyor = secilenKategori === "tumu" || kategoriler.includes(secilenKategori);
                const aramaEslesiyor = baslik.includes(arananMetin);

                kart.hidden = !(kategoriEslesiyor && aramaEslesiyor);
                if (!kart.hidden) {
                    gorunenKartSayisi++;
                }
            });

            sonucMesaji.hidden = gorunenKartSayisi > 0;
        }

        filtreDugmeleri.forEach(function(dugme){
            dugme.addEventListener("click", function(){
                secilenKategori = dugme.dataset.filtre;
                kartlariFiltrele();

                filtreDugmeleri.forEach(function(filtreDugmesi){
                    const secili = filtreDugmesi === dugme;
                    filtreDugmesi.classList.toggle("aktif", secili);
                    filtreDugmesi.setAttribute("aria-pressed", secili);
                });
            });
        });

        aramaKutusu.addEventListener("input", kartlariFiltrele);
    }

});
