# Kişisel blog sitem
## Projem hakkında :
Blog sayfamı 
- HTML
- CSS 
- JavaScript kullanarak hazırladım.

# Nasıl Açılır ?
Sitemin kaynak dosyaları `index.html` üzerinden açılır ve VS Code Live Server ile yerel olarak görüntülenebilir. Proje HTML, CSS ve JavaScript dosyalarından oluşur; derleme adımı gerektirmez. Yayınlanan sürüm için tek canlı site adresi Vercel olacaktır. GitHub Pages adresini kullanmıyorum; böylece ziyaretçiler ve testler aynı üretim sürümünü kontrol eder.

# Neler Öğrendim ?
- HTML ile web sayfası oluşturmayı
- HTML dosyalarını birbirine bağlamayı
- VS code daha yetkili kullanmayı
- GitHub keşfetmeyi(Detaylı öğrenemedim henüz)
- CSS
- JavScript öğrenme aşamasındayım

20.10.2026

Görsel alt metinlerini, dosya adlarını, SEO meta etiketlerini ve ilgili kaynak bağlantılarını düzenledim. SEO etiketlerini, arama motorlarının sayfa içeriğini daha iyi anlamasına ve blog bağlantısı paylaşıldığında başlık ile açıklamanın doğru görüntülenmesine yardımcı olması için düzenledim. Uygun SEO çalışmaları, sitenin arama sonuçlarında daha üst sıralarda görünmesine katkı sağlayabilir.

# Canlı Site Bağlantım
- https://yeni-taslak.vercel.app

24.10.2026

# Lighthouse Test Sonuçları

| Sayfa | Ölçüm | Performans | Erişilebilirlik | En İyi Uygulamalar | SEO |
|---|---|---:|---:|---:|---:|
| Ana Sayfa | Önce | 97 | 95 | 100 | 100 |
| Ana Sayfa | Sonra | 100 | 100 | 100 | 100 |
| Yazılar | Sonuç | 100 | 95 | 100 | 100 |

- Sorun yalnızca erişilebilirlik bölümünde görüldü. Renk kontrastı ve okunabilirlik sorunlarını düzelttim.

30.10.2026

# 5. Gün

- `URLSearchParams` ile URL'deki `etiket` parametresini okuyup seçili etiketi sayfa açılırken uygulamayı öğrendim.
- Etiket filtrelerini URL ile eşleştirdim; "Tümü" seçeneği etiketi URL'den kaldırıyor. Etiket filtresi, başlık aramasıyla birlikte çalışıyor ve Türkçe karakterleri doğru ele alıyor.
- `yazilar.json` yüklenemediğinde sayfada erişilebilir bir hata mesajı göstermeyi ve hatayı konsola anlaşılır şekilde yazmayı öğrendim.
- Vercel önizleme ayarlarını inceleme ve değişiklikleri önizleme ortamında masaüstü ile mobil ekranlarda kontrol etme sürecini öğrendim. Bu çalışmada Vercel önizleme erişimi/yapılandırması bulunmadığı için Vercel dağıtımı doğrulanmadı.

# Gereksinimler

## 4. Hafta - 1. Gün

**Kullanıcı hikâyesi:**

Blog sahibi olarak yaptığım değişikliklerin yayınlanan web sitesinde doğru şekilde görünmesini istiyorum. Böylece ziyaretçiler blogumun güncel halini görebilir.

**Kabul kriterleri:**

1. GitHub’a gönderdiğim değişiklikler Vercel’de yayınlanmalıdır.
2. README.md dosyasındaki canlı site bağlantısı doğru Vercel adresine gitmelidir.
3. Yayınlanan site açıldığında yaptığım son değişiklikler görünmelidir.

## 4. Hafta - 2. Gün

**Kullanıcı hikâyesi:**
Blog sahibi olarak yazılarımı tek bir JSON dosyasından yönetmek istiyorum. Böylece yazı bilgileri tutarlı biçimde yüklenebilir.

**Kabul kriterleri:**

1. Her yazı JSON’da başlık, özet, etiket ve bağlantı bilgisiyle bulunmalı ve dosya geçerli JSON olmalıdır.
2. JavaScript `fetch` ve `async/await` ile JSON’u okumalı, yüklenen veriyi konsolda göstermelidir.
3. JSON yüklenemediğinde sayfada hata durumu gösterilmelidir.

## 4. Hafta - 3. Gün

**Kullanıcı hikâyesi:**
Ziyaretçi olarak yazı listesini güncel ve tutarlı görmek istiyorum. Böylece yeni yazılar eklendiğinde sayfayı elle düzenlemeye gerek kalmaz.

**Kabul kriterleri:**

1. JSON’daki her yazı için kart JavaScript ile oluşturulmalı ve metinler `textContent` ile eklenmelidir.
2. JavaScript kapalıyken ziyaretçi mevcut yazı bağlantılarına ulaşabilmelidir.
3. Kartlar mevcut blog tasarımını korumalıdır.

## 4. Hafta - 4. Gün

**Kullanıcı hikâyesi:**
Ziyaretçi olarak yazıları etikete ve sıralama tercihime göre bulmak istiyorum.

**Kabul kriterleri:**

1. Etiket filtreleri JSON’dan tekrarsız üretilmeli; düğmeler klavyeyle kullanılmalı ve seçim `aria-pressed` ile belirtilmelidir.
2. Ziyaretçi yazıları en yeni, en eski veya başlığa göre sıralayabilmelidir.
3. Arama ve kategori filtreleri sıralama değiştiğinde de çalışmalıdır.

## 4. Hafta - 5. Gün

**Kullanıcı hikâyesi:**
Ziyaretçi olarak belirli bir etiketin bağlantısını paylaşabilmek ve yazı yükleme hatasını anlayabilmek istiyorum.

**Kabul kriterleri:**

1. `yazilar.html?etiket=css` açıldığında CSS filtresi seçili olmalı ve eşleşen yazılar gösterilmelidir.
2. Kart üzerindeki etiket bağlantısı ilgili filtreyi uygulamalı ve adres çubuğunu güncellemelidir.
3. JSON yüklenemezse görünür hata mesajında `yazilar.json` dosya adı yer almalıdır.

## 4. Hafta - 6. Gün

**Kullanıcı hikâyesi:**
Ziyaretçi olarak ana sayfada en güncel yazıları görmek istiyorum. Böylece blogdaki yeni içeriklere kolayca ulaşabilirim.

**Kabul kriterleri:**

1. Ana sayfadaki son üç yazı `yazilar.json` verisinden oluşturulmalı ve en yeni yazılar olmalıdır.
2. Yeni yazının tam metni JSON’da tutulmalı ve yazı listesinde açılabilmeli; yeni yazı eklemek için `yazilar.html` veya yeni bir HTML dosyası değiştirilmemelidir.
3. Ana sayfadaki her yazı kartı doğru başlık, özet ve mevcut yazı bağlantısını göstermelidir.

**JSON ve Fetch notu:** `fetch("yazilar.json")` yanıtı `await response.json()` ile JavaScript verisine dönüştürür. `file://` adresinde tarayıcıların güvenlik kuralları yerel dosya isteklerini engelleyebilir; bu nedenle Live Server gibi bir HTTP sunucusu veya Vercel kullanılmalıdır. Kaynaklar: [MDN JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) ve [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

**Güvenli metin ekleme:** `innerHTML`, metni HTML olarak yorumlayıp istenmeyen işaretlemeyi çalıştırabilir; JSON’dan gelen metinleri `textContent` ile eklemek bunu önler.

**Önizleme ve canlı site:** Vercel önizlemesi bir branch/pull request değişikliklerini ayrı URL’de gösterirken canlı adres üretim branch’inin yayınlanan sürümünü gösterir.

**Vercel yapılandırması:** Bu proje derleme gerektirmeyen statik HTML sitesidir; Vercel’de Framework Preset `Other` ve Build Command boş olmalıdır. Bu ayarların mevcut Vercel hesabında doğrulanması gerekiyor.

## 4. Hafta Test Tablosu

| Test adı | Beklenen sonuç | Gerçekleşen sonuç |
|---|---|---|
| JSON biçimi ve alanları | JSON ayrıştırılır; her yazıda başlık, özet, etiket ve bağlantı vardır. | **Geçti:** 7 kayıt ayrıştırıldı; zorunlu alanlar ve bağlantı hedefleri doğrulandı. |
| JSON fetch | HTTP sunucusunda yazılar JSON’dan yüklenir ve konsolda görünür. | **Geçti:** Yerel HTTP yanıtı 200; liste ve ana sayfa veriyi yükleyip konsola yazdı. |
| Kartlar ve JavaScript kapalı durumu | JSON başına bir kart oluşur; JavaScript kapalıyken statik bağlantılar görünür. | **Kısmen geçti:** 7 JSON kaydı için 7 kart üretildi; `noscript` bağlantıları kaynakta mevcut. Tarayıcıda JavaScript kapalı oturum, araç kısıtı nedeniyle açılamadı. |
| Etiket düğmeleri ve klavye | Etiketler tekrarsızdır; düğmeler klavyeyle kullanılabilir ve seçili durumu bildirilir. | **Geçti:** Yeni etiket denemesinde 1 düğme/1 kart oluştu; Enter tuşu filtresini seçti ve `aria-pressed` güncellendi. |
| URL filtresi ve sıralama | CSS URL filtresi çalışır; sıralama seçimi kart sırasını değiştirir. | **Geçti:** `?etiket=css` 2 yazı gösterdi; kart etiketi URL’yi değiştirdi; eski ve alfabetik sıralama ile arama+filtre birlikte kontrol edildi. |
| JSON yükleme hatası | Hata mesajı `yazilar.json` adını içerir. | **Geçti:** Sahte HTTP 503 yanıtında görünür `alert` mesajı `yazilar.json` adını içerdi. |
| Ana sayfada son üç yazı | JSON tarihine göre en güncel üç yazı doğru bağlantılarla gösterilir. | **Geçti:** Ana sayfada JSON’dan 3 kart, beklenen başlıklar ve bağlantılar oluştu. |
| Vercel yayını ve canlı bağlantı | GitHub değişikliği Vercel’de yayınlanır; README bağlantısı çalışan üretim adresidir. | **Kısmen doğrulandı:** `2910890` commit’i `adres-filtreleme` branch’ine push edildi; README’deki adres Vercel adresiyle eşleşiyor. Canlı URL isteği bu ortamda zaman aşımına uğradı; GitHub’daki en son dağıtım kaydı 25 Ekim tarihli GitHub Pages dağıtımı. Vercel otomatik yayını doğrulanamadı. GitHub oturumu açık olmadığı ve `gh` bulunmadığı için PR/önizleme oluşturulamadı. |

## Lighthouse Mobil Ölçümü

| Sayfa | Önce (mobil) | Sonra (mobil) | Not |
|---|---:|---:|---|
| Ana sayfa | Ölçülemedi | Ölçülemedi | PageSpeed Insights isteği HTTP 429 verdi; yerel Lighthouse komutu kurulu değil. Puan uydurulmadı. |

**Kod inceleme notu:** `yazilar.js` içindeki `liste.append(siraliKartlar);` satırını, ilk yüklemede kaldırılan yükleniyor öğesine sonraki sıralama değişikliklerinde tekrar `insertBefore` yapılmaması için kullandım. Böylece kartlar mevcut listeye yeniden sıralı olarak ekleniyor.
