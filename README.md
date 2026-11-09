# Archery Lab – Score App (PWA)

Εφαρμογή βαθμολόγησης τοξοβολίας για ταμπλέτα. Δουλεύει offline μετά την πρώτη φόρτωση.

## Αρχεία
```
index.html            η εφαρμογή
manifest.webmanifest  ρυθμίσεις PWA (display: fullscreen)
sw.js                 service worker (offline)
icons/                εικονίδια
.nojekyll             απενεργοποιεί το Jekyll στο GitHub Pages
```

## Ανέβασμα στο GitHub Pages
1. Ανέβασε **όλα** τα αρχεία στη ρίζα του repository (branch `main`).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Άνοιξε `https://<username>.github.io/<repo>/` (χρειάζεται HTTPS, το Pages το δίνει).

## Εγκατάσταση σε ταμπλέτα
- **Android (Chrome):** μενού ⋮ → «Εγκατάσταση εφαρμογής» (ή από το μενού της εφαρμογής ☰ → 📲 Εγκατάσταση). Ανοίγει σε πλήρη οθόνη.
- **iPad (Safari):** Κοινοποίηση → «Προσθήκη στην αρχική οθόνη». Το iOS δεν υποστηρίζει `display: fullscreen`, αλλά η εφαρμογή ανοίγει χωρίς γραμμή Safari.
- Αν άλλαξες το `display` στο manifest, ξαναεγκατέστησε την εφαρμογή.

## Νέα έκδοση
Άλλαξε το `VERSION` στο `sw.js` (π.χ. `archery-lab-v2`) σε κάθε αλλαγή, αλλιώς οι συσκευές μπορεί να κρατήσουν την παλιά cache.
