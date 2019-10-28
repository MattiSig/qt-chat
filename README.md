# Kodtest Chat
Detta repo innehåller ett projekt med webpack och babel konfigurerat och en Node.js server som du kan använda dig av. Din implementation utgår från `src/components/App.jsx`. Det är fritt fram att modifiera servern eller byta ut den helt. Samma gäller även konfigurationen för klienten.

## Installation
Klona repot och kör:
```
npm i
```

## För att köra servern
```
npm run server
```

## För att köra klienten
```
npm run client
```

## Instruktioner
Du ska skapa ett chat-program, där man kan skicka meddelanden mellan olika klienter. Som en del av den tekniska intervjun kommer du tillsammans med en utvecklare från Aweria att bygga på chat-programmet med ytterligare några funktioner. Detta kan vara bra att ha i åtanke när du gör hemuppgiften.

Det är inte meningen att du ska behöva lägga mer än två timmar på uppgiften, men du är givetvis fri att lägga den tid du vill.

Programmet skall bestå av en React klient som ansluter sig till den redan existerande servern.

### Krav
* Klienten skall först fråga användaren efter användarnamn
* Klienten skall hantera att den kan bli nekad av servern
* Kommunikationen mellan klient och server skall ske med websockets
* Klienten skall visa mottagna meddelanden
* Man skall kunna skicka meddelanden från klienten
* Du får använda internet för att hitta information, men de implementerade lösningarna ska vara dina egna

### Begränsningar av krav
* Du behöver inte göra ett snyggt GUI, vi kommer inte bedöma utseendet
* Du behöver inte överdriva felhanteringen. Du kan utgå från att vi använder programmet som det är tänkt

## Vår granskning
Vi är intresserade av att se hur du kan lösa olika problem som kan uppkomma vid programmering. Det viktiga för oss är hur du programmerar, strukturerar och vilka kunskaper om JavaScript/React du besitter. Vi kommer att granska koden noga, så slarva inte. :)

Du kommer få chansen att förklara din kod och dina beslut på den tekniska intervjun. Där kan du berätta om avstick du gjort och varför, samt saker du själv anser kunde ha gjorts bättre. Bra förklaringar tas med ett glatt leende.

## Färdig?
När du känner dig klar är det bara att skicka in din kod som en zip-fil till `hej @ aweria . com` (utan mellanslag).

