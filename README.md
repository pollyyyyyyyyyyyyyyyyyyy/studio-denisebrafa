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
   solo **venerdì 9:00–19:00**. Per aggiungere un giorno in futuro basta attivarlo qui.
4. **Tipi di evento → Nuovo** → *Colloquio al Campus*, con link `campus`:
   - Durata: **50 minuti**
   - Disponibilità: *Campus*
   - Avanzate → *Buffer dopo l'evento*: **10 minuti**. Così nasce uno slot ogni ora: 9, 10, …, 18, cioè **10 appuntamenti**.
   - Limiti → *Limita prenotazioni*: **10 al giorno**
   - Descrizione: «Tariffa agevolata 60 €, pagamento con bonifico o contanti.»
   - Luogo: indirizzo del Campus
5. Crea gli altri tipi di evento per lo studio, ad esempio *Primo colloquio – Milano*,
   *Primo colloquio – Online* e così via, ognuno con la sua disponibilità.
6. Apri `assets/main.js` e compila le due righe in alto:
   ```js
   const CAL_MAIN = "denisebrafa";          // elenco di tutti i colloqui
   const CAL_CAMPUS = "denisebrafa/campus"; // solo il Campus (QR della locandina)
   ```
   Finché sono vuote, il sito mostra un pulsante «Scrivimi per prenotare» via email.

## 2. Pubblicazione su Vercel

1. <https://vercel.com/new>: importa il repository `studio-denisebrafa`.
2. Nome del progetto **`studio-denisebrafa`**: l'indirizzo sarà
   `https://studio-denisebrafa.vercel.app`, lo stesso stampato sulla locandina.
   Framework: *Other*. Nessun comando di build.
3. Se in futuro si acquista un dominio (es. `denisebrafa.it`), si aggiunge da
   *Settings → Domains* e poi si rigenera la locandina (vedi sotto).

## 3. Locandina e QR code

- `locandina/locandina.pdf`: A4, pronta per la tipografia. Si può stampare anche in A3.
- Il QR porta a `studio-denisebrafa.vercel.app/campus`, che apre il calendario del Campus
  sul sito. Il redirect sta in `vercel.json`: se un giorno cambia sistema di prenotazione,
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
