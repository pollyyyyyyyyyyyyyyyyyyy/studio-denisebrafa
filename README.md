# Sito della Dott.ssa Denise Brafa

Sito statico in HTML, CSS e JS, senza build: si pubblica così com'è su Vercel (gratis).

| File | Cosa contiene |
|---|---|
| `index.html` | Tutti i testi del sito |
| `assets/main.js` | **Configurazione dei calendari** (le prime righe) |
| `assets/style.css` | Colori e stile |
| `assets/img/` | Foto (profilo e studi, prese da MioDottore) |
| `privacy.html` | Informativa privacy |
| `locandina/locandina.pdf` | **Locandina A4 pronta da stampare**, con QR code |
| `vercel.json` | Link brevi: `/campus` e `/prenota` |

---

## 1. Calendario delle prenotazioni (Cal.com, gratuito)

Cal.com si collega a Google Calendar: ogni prenotazione finisce lì in automatico
e il paziente riceve conferma e promemoria via email.

1. Vai su <https://cal.com/signup> e registrati con «Continua con Google» usando **brafadenise@gmail.com**.
   Scegli come nome utente `denisebrafa`, così il link sarà `cal.com/denisebrafa`.
2. **Impostazioni → Calendari → Collega un calendario → Google Calendar**
   e accedi con l'account Gmail.
3. **Disponibilità** → crea una disponibilità chiamata *Campus*:
   solo **martedì e giovedì 9:00–20:00**. Per aggiungere un giorno in futuro basta attivarlo qui.
4. **Tipi di evento → Nuovo** → *Colloquio al Campus*, con link `campus`:
   - Durata: **50 minuti**
   - Disponibilità: *Campus*
   - Avanzate → *Buffer dopo l'evento*: **10 minuti**. Così nasce uno slot ogni ora: dalle 9 alle 19, cioè **11 appuntamenti** per giornata.
   - Limiti → *Limita prenotazioni*: **11 al giorno** (o meno, se vuole delle pause)
   - Descrizione: «Tariffa agevolata 60 €, pagamento con bonifico o contanti.»
   - Luogo: Free Mind Foundry, Via Sclafani 40, Acireale (CT)
5. Crea gli altri tipi di evento per lo studio, ad esempio *Primo colloquio – Milano*,
   *Primo colloquio – Online* e così via, ognuno con la sua disponibilità.
6. Apri `assets/main.js` e compila la riga in alto:
   ```js
   const CAL_MAIN = "denise-brafa-rbcmxz/calendario-studio-privato";   // già impostato
   ```
   Finché è vuota, il sito mostra un pulsante «Scrivimi per prenotare» via email.
   Nel tipo di evento *Colloquio al Campus* attiva «Nascondi dal profilo»: sul sito non
   devono comparire prezzi, il Campus si prenota solo dal QR della locandina.
7. In `vercel.json` cambia la destinazione di `/campus` in
   `https://cal.com/denisebrafa/campus`: così il QR apre direttamente il calendario del Campus.

## 2. Pubblicazione su Vercel

1. <https://vercel.com/new>: importa il repository `studio-denisebrafa`.
2. Nome del progetto **`studio-denisebrafa`**: l'indirizzo sarà
   `https://studio-denisebrafa.vercel.app`, lo stesso stampato sulla locandina.
   Framework: *Other*. Nessun comando di build.
3. Se in futuro si acquista un dominio (es. `denisebrafa.it`), si aggiunge da
   *Settings → Domains* e poi si rigenera la locandina (vedi sotto).

## 3. Locandina e QR code

- Due versioni A4 per il Campus Free Mind Foundry, stampabili anche in A3:
  `locandina/locandina.pdf` (classica) e `locandina/locandina-tech.pdf` (pensata per le aziende tech del Campus).
- Il QR porta a `studio-denisebrafa.vercel.app/campus`. Per ora rimanda alla sezione
  «Prenota» del sito; quando c'è il calendario del Campus su Cal.com, rimanda lì (punto 7 sopra). Il redirect sta in `vercel.json`: se un giorno cambia sistema di prenotazione,
  basta modificarlo lì e le locandine già affisse continuano a funzionare.
- Per rigenerare il PDF dopo aver cambiato testi o indirizzo:
  ```bash
  cd strumenti && npm install && npm i -D playwright && npx playwright install chromium
  node genera-locandina.mjs                       # indirizzo predefinito
  node genera-locandina.mjs https://denisebrafa.it/campus   # altro indirizzo
  ```

## 4. Recensioni

Le 25 recensioni in `index.html` (sezione «Recensioni») sono copiate dal profilo pubblico
MioDottore. Quando ne arrivano di nuove si aggiungono copiando un blocco
`<figure class="review">…</figure>`. Il pulsante «Lascia una recensione» porta a
`miodottore.it/aggiungi-una-recensione/denise-brafa`.
