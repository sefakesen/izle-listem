# ğŸ¿ Ä°zle Listem â€” Film & Dizi Ä°zleme Listesi

Film ve dizileri tek yerden takip etmeye yarayan, **React + TypeScript + Tailwind CSS** ile geliÅŸtirilmiÅŸ bir CRUD uygulamasÄ±.
Veriler tarayÄ±cÄ±nÄ±n **LocalStorage** alanÄ±nda saklanÄ±r; sayfa yenilense de kaybolmaz.

> Web GeliÅŸtirme â€“ JavaScript Proje YÃ¶nergesi kapsamÄ±nda hazÄ±rlanmÄ±ÅŸtÄ±r.

ğŸ”— **CanlÄ± Demo:** https://SITE-ADINIZ.netlify.app _(yayÄ±na alÄ±ndÄ±ktan sonra gÃ¼ncelleyin)_

---

## ğŸ“¸ Ekran GÃ¶rÃ¼ntÃ¼leri

### Listeleme (Ana Sayfa)
![Ana sayfa](docs/ana-sayfa.png)

### Ekleme
![Ekleme sayfasÄ±](docs/ekle-sayfasi.png)

### GÃ¼ncelleme
![DÃ¼zenleme sayfasÄ±](docs/duzenle-sayfasi.png)

---

## âœ¨ Ã–zellikler

| Ä°ÅŸlem | AÃ§Ä±klama |
| --- | --- |
| â• **Ekle** | Film/dizi; tÃ¼r, yapÄ±m yÄ±lÄ±, durum, 5 yÄ±ldÄ±zlÄ± puan, afiÅŸ URL, sezon/bÃ¶lÃ¼m ve notlarla eklenir. Form doÄŸrulamasÄ± ve canlÄ± Ã¶nizleme vardÄ±r. |
| ğŸ“‹ **Listele** | Kart gÃ¶rÃ¼nÃ¼mÃ¼, istatistikler, arama, Film/Dizi sekmeleri, durum & tÃ¼r filtresi, favori filtresi ve 5 farklÄ± sÄ±ralama. |
| âœï¸ **GÃ¼ncelle** | DÃ¼zenleme sayfasÄ± (`/duzenle/:id`) + kart Ã¼zerinden hÄ±zlÄ± durum deÄŸiÅŸimi ve favoriye ekleme. |
| ğŸ—‘ï¸ **Sil** | Onay penceresi ile tekli silme, "HakkÄ±nda" sayfasÄ±ndan tÃ¼m listeyi temizleme. |

Ek olarak: duyarlÄ± (mobil uyumlu) tasarÄ±m, toast bildirimleri, 404 sayfasÄ±, eriÅŸilebilirlik (ARIA) etiketleri.

## ğŸ› ï¸ KullanÄ±lan Teknolojiler

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) â€” geliÅŸtirme sunucusu ve derleme
- [Tailwind CSS v4](https://tailwindcss.com/) â€” stil
- [React Router](https://reactrouter.com/) â€” sayfa yÃ¶nlendirme
- LocalStorage â€” kalÄ±cÄ± veri
- [Netlify](https://www.netlify.com/) â€” yayÄ±nlama

## ğŸ“ Proje YapÄ±sÄ±

```
izle-listem/
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ _redirects          # Netlify SPA yÃ¶nlendirmesi
â”‚   â””â”€â”€ favicon.svg
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/         # Tekrar kullanÄ±labilir arayÃ¼z bileÅŸenleri
â”‚   â”‚   â”œâ”€â”€ ConfirmDialog.tsx
â”‚   â”‚   â”œâ”€â”€ EmptyState.tsx
â”‚   â”‚   â”œâ”€â”€ FilterBar.tsx
â”‚   â”‚   â”œâ”€â”€ Header.tsx
â”‚   â”‚   â”œâ”€â”€ Layout.tsx
â”‚   â”‚   â”œâ”€â”€ PageHeading.tsx
â”‚   â”‚   â”œâ”€â”€ Poster.tsx
â”‚   â”‚   â”œâ”€â”€ StarRating.tsx
â”‚   â”‚   â”œâ”€â”€ StatsBar.tsx
â”‚   â”‚   â”œâ”€â”€ StatusBadge.tsx
â”‚   â”‚   â”œâ”€â”€ ToastContainer.tsx
â”‚   â”‚   â”œâ”€â”€ WatchItemCard.tsx
â”‚   â”‚   â””â”€â”€ WatchItemForm.tsx
â”‚   â”œâ”€â”€ pages/              # Rotalara karÅŸÄ±lÄ±k gelen sayfalar
â”‚   â”‚   â”œâ”€â”€ HomePage.tsx        # Listele
â”‚   â”‚   â”œâ”€â”€ AddItemPage.tsx     # Ekle
â”‚   â”‚   â”œâ”€â”€ EditItemPage.tsx    # GÃ¼ncelle
â”‚   â”‚   â”œâ”€â”€ AboutPage.tsx
â”‚   â”‚   â””â”€â”€ NotFoundPage.tsx
â”‚   â”œâ”€â”€ interfaces/         # TypeScript veri modelleri
â”‚   â”‚   â””â”€â”€ WatchItem.ts
â”‚   â”œâ”€â”€ context/            # Global state (CRUD + bildirimler)
â”‚   â”‚   â”œâ”€â”€ WatchlistContext.tsx
â”‚   â”‚   â””â”€â”€ ToastContext.tsx
â”‚   â”œâ”€â”€ utils/              # Sabitler, LocalStorage yardÄ±mcÄ±larÄ±, Ã¶rnek veri
â”‚   â”œâ”€â”€ App.tsx             # Rotalar
â”‚   â”œâ”€â”€ main.tsx
â”‚   â””â”€â”€ index.css           # Tailwind + tema
â”œâ”€â”€ docs/                   # Ekran gÃ¶rÃ¼ntÃ¼leri
â”œâ”€â”€ netlify.toml
â””â”€â”€ package.json
```

## ğŸš€ Kurulum ve Ã‡alÄ±ÅŸtÄ±rma

Gereksinim: [Node.js](https://nodejs.org/) 20+

```bash
git clone https://github.com/sefakesen/izle-listem.git
cd izle-listem
npm install
npm run dev        # http://localhost:5173
```

DiÄŸer komutlar:

```bash
npm run build      # Ãœretim derlemesi (dist/)
npm run preview    # DerlenmiÅŸ sÃ¼rÃ¼mÃ¼ Ã¶nizle
npm run lint       # Kod kontrolÃ¼ (oxlint)
```

## ğŸŒ Netlify ile YayÄ±na Alma

1. Projeyi GitHub'a yÃ¼kleyin.
2. [app.netlify.com](https://app.netlify.com/) â†’ **Add new site â†’ Import an existing project** â†’ GitHub reposunu seÃ§in.
3. Ayarlar `netlify.toml` dosyasÄ±ndan otomatik okunur (Build: `npm run build`, Publish: `dist`).
4. **Deploy** butonuna basÄ±n. Sayfa yenilemelerinde 404 almamak iÃ§in `_redirects` dosyasÄ± hazÄ±rdÄ±r.

## ğŸ§  NasÄ±l Ã‡alÄ±ÅŸÄ±r?

- TÃ¼m CRUD iÅŸlemleri [`WatchlistContext`](src/context/WatchlistContext.tsx) iÃ§inde tanÄ±mlÄ±dÄ±r (`addItem`, `getItem`, `updateItem`, `deleteItem`).
- State her deÄŸiÅŸtiÄŸinde `useEffect` ile LocalStorage'a yazÄ±lÄ±r, uygulama aÃ§Ä±lÄ±rken oradan okunur.
- Ä°lk aÃ§Ä±lÄ±ÅŸta liste boÅŸ gÃ¶rÃ¼nmesin diye birkaÃ§ Ã¶rnek kayÄ±t yÃ¼klenir.
