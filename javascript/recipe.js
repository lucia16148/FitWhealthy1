document.addEventListener('DOMContentLoaded', () => {
    const recipeTypeToPageMap = {
        'primo': 'RicettePrimi.html',
        'secondo': 'RicetteSecondi.html',
        'dolce': 'RicetteDolci.html',
        'contorno': 'RicetteContorni.html'
        // Aggiungi altri tipi se necessario
    };

    // Assicurati che questi ID siano presenti nel tuo HTML
    const likeButton = document.getElementById('details-like-button');
    const commentButton = document.getElementById('details-comment-button'); // Nuovo!
    const deleteButton = document.getElementById('delete-recipe-button');
    const backButton = document.querySelector('.back-home');

    let currentRecipeId = null; // Sarà impostato in loadRecipeDetails

    const commentsModal = document.getElementById('comments-modal');
    // Verifica che commentsModal esista prima di cercare il closeButton
    const closeButton = commentsModal ? commentsModal.querySelector('.close-button') : null;

    const staticRecipes = {
        'spaghetti-pomodoro': {
            title: 'Spaghetti al Pomodoro',
            imageUrl: '../image/pasta-al-pomodoro-dietetica-1200x799.jpg.webp',
            ingredients: `<h3>Ingredienti (per 4 porzioni):</h3><ul><li>320 g di spaghetti</li><li>600 g di pomodorini freschi</li><li>2 spicchi d'aglio</li><li>alcune foglie di basilico fresco</li><li>30 g di olio extravergine d'oliva</li><li>q.b. sale e pepe</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Lavate accuratamente i pomodorini sotto l'acqua corrente, dopodiché sbollentateli per 3-4 minuti, scolateli e pelateli. Tagliateli a pezzetti e rosolateli in padella insieme a due spicchi d'aglio interi e un filo d'olio extravergine d'oliva.</li><li>Insaporite il sugo con sale e pepe, coprite la padella con un coperchio e proseguite la cottura per una decina di minuti.</li><li>Nel frattempo portate a ebollizione abbondante acqua per la pasta, salatela e calate gli spaghetti.</li><li>Cuocete la pasta per il tempo indicato sulla confezione, scolatela al dente e unitela al sugo di pomodoro fresco.</li><li>Aggiungete il basilico fresco spezzettato, saltatela rapidamente e servitela.</li></ol>`,
            type: 'primo'
        },
        'eliche-peperoni-fave-ricotta': { // Ho creato un ID descrittivo
            title: 'Eliche con peperoni, fave e ricotta',
            imageUrl: '../image/eliche-con-peperoni-fave-e-ricotta.webp', // Esempio di immagine placeholder
            ingredients: `<h3>Ingredienti (per 4 persone):</h3><ul><li>350 g pasta corta tipo eliche</li><li>300 g ricotta vaccina</li><li>180 g fave sgranate</li><li>3 peperoni (rosso, giallo, verde)</li><li>sale q.b.</li></ul>`,
            instructions: `<h3>Procedimento:</h3><ol><li>Per preparare le eliche con peperoni, fave e ricotta, lavate i peperoni e infornateli a 200 °C per circa 40 minuti.</li><li>Tuffate le fave in acqua bollente salata; dopo 1 minuto scolatele e sbucciatele.</li><li>Sbriciolate la ricotta (tenetene da parte 1 cucchiaio) su una placca coperta con carta da forno; infornatela a 180 °C finché non sarà dorata.</li><li>Togliete i peperoni dal forno, lasciateli intiepidire, poi eliminate la pelle, i filamenti bianchi e i semi all’interno.</li><li>Frullate il peperone giallo con la cucchiaiata di ricotta tenuta da parte e una presa di sale, ottenendo una crema. Tagliate gli altri peperoni a striscioline.</li><li>Lessate la pasta, scolatela e conditela con la crema di peperone e completatela con i peperoni a strisce, le fave e la ricotta al forno.</li></ol>`,
            type: 'primo' // Ho assunto sia un "primo" piatto
        },
        'risotto-funghi': {
            title: 'Risotto ai Funghi',
            imageUrl: '../image/FullSizeRender-1-7-scaled.jpg',
            ingredients: `<h3>Per 2 persone:</h3><ul><li>160g Riso Carnaroli</li><li>200g Funghi misti</li><li>Brodo vegetale q.b.</li><li>1/2 Cipolla</li><li>Burro e Parmigiano q.b.</li></ul>`,
            instructions: `<li>Soffriggere la cipolla, aggiungere il riso e tostare.</li><li>Aggiungere i funghi e sfumare con vino (opzionale).</li><li>Cuocere il riso aggiungendo brodo poco alla volta.</li><li>Mantecare con burro e parmigiano.</li>`,
            type: 'primo'
        },
        'orecchiette-tonno-zucchine': { // Ho creato un ID descrittivo
            title: 'Orecchiette tiepide con verdure e tonno',
            imageUrl: '../image/orecchiette-tiepide-e-verdure-allolio-aromatico.webp', // Esempio di immagine placeholder
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>175 g orecchiette fresche</li><li>150 g zucchine baby</li><li>150 g tonno fresco</li><li>100 g pomodorini ciliegia</li><li>25 g pinoli</li><li>5 foglie di basilico</li><li>1-2 rametti di maggiorana</li><li>1 cucchiaio di capperi sotto sale</li><li>1/2 spicchio di aglio</li><li>olio extravergine di oliva q.b.</li><li>sale q.b.</li><li>pepe q.b.</li></ul>`,
            instructions: `<h3>Procedimento:</h3><ol><li>Per la ricetta delle orecchiette tiepide e verdure all’olio aromatico, scaldate circa 75 g di olio extravergine con l’aglio schiacciato, la maggiorana sfogliata e i pinoli.</li><li>Pulite i pomodorini e tagliateli in 4 spicchi; tagliate a rondelle le zucchine baby e raccogliete tutto in una ciotola ampia, con il basilico e i capperi dissalati. Versatevi sopra l’olio caldo, aggiustate di sale e pepe e lasciate riposare per 30 minuti.</li><li>Tagliate il tonno a dadini e saltateli velocemente in una padella rovente, unta con un filo di olio, per 2 minuti. Lasciateli intiepidire.</li><li>Lessate le orecchiette, scolatele e versatele nella ciotola con le verdure. Mescolate in modo che la pasta si condisca e completate con i dadini di tonno.</li></ol>`,
            type: 'primo' // Ho assunto sia un "primo" piatto
        },
        'strozzapreti-salmone-fiori-zucca-acciuga': { // Ho creato un ID descrittivo
            title: 'Strozzapreti salmone, fiori di zucca e acciuga',
            imageUrl: '../image/Strozzapreti salmone, fiori di zucca e acciuga.webp', // Esempio di immagine placeholder (Salmone rosato)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>250 g filetto di salmone senza pelle</li><li>160 g strozzapreti</li><li>75 g brodo vegetale</li><li>6 fiori di zucca</li><li>1 filetto di acciuga sott‘olio</li><li>pecorino grattugiato q.b.</li><li>alloro q.b.</li><li>sale q.b.</li><li>nocciole tostate q.b.</li><li>uova di salmone q.b.</li><li>olio extravergine di oliva q.b.</li></ul>`,
            instructions: `<h3>Procedimento:</h3><ol><li>Per la ricetta degli strozzapreti salmone, fiori di zucca e acciuga, verificate che nel filetto di salmone non vi siano lische, poi cuocetelo a vapore, per 6-7 minuti al massimo.</li><li>Sminuzzate mezza foglia di alloro (o poca), eliminate la costa centrale, poi frullatela insieme al filetto di acciuga, 1 cucchiaio di pecorino grattugiato, il brodo vegetale e un cucchiaio di olio, fino a ottenere un’emulsione.</li><li>Lessate gli strozzapreti in acqua bollente salata, scolateli al dente e saltateli in padella con il salmone a pezzetti, i fiori di zucca puliti e spezzettati al momento e l’emulsione.</li><li>Distribuite gli strozzapreti nei piatti e completate ciascuno con un cucchiaino di uova di salmone e 2-3 nocciole tritate grossolanamente.</li></ol>`,
            type: 'primo' // Ho assunto sia un "primo" piatto
        },
        'pasta-carciofi-pancetta': { // Ho creato un ID descrittivo
            title: 'Pasta con carciofi e pancetta',
            imageUrl: '../image/Pasta-carciofi-e-pancetta-26122024-buttalapasta.it_.jpg', // Esempio di immagine placeholder
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>200 g pasta corta</li><li>2 carciofi</li><li>125 g pancetta a cubetti</li><li>2 cucchiai olio di oliva extravergine</li><li>1/2 scalogno</li><li>1/2 limone</li><li>parmigiano grattugiato q.b.</li><li>sale q.b.</li><li>pepe q.b.</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Mondate i carciofi privandoli delle foglie esterne più dure. Tagliate in due, eliminate le spine interne, pelate i gambi tenendo il cuore, ponete in ammollo in acqua e limone tagliato a spicchi mano a mano che pulite gli ortaggi.</li><li>Tritate lo scalogno finemente e fatelo imbiondire in una padella antiaderente con un filo di olio di oliva extravergine.</li><li>Scolate le fettine di carciofi e versatele nella padella con lo scalogno. Aggiustate di sale e pepe, aggiungete acqua bollente o brodo q.b. e lasciate cuocere a fiamma dolce con coperchio per circa 15 minuti.</li><li>In un'altra padella antiaderente fate saltare la pancetta a cubetti senza aggiungere olio e fino a farla diventare croccante. Escludetela del tutto se volete cucinare un piatto vegetariano.</li><li>Mettete su una pentola di acqua salata e versate la pasta non appena arriva a ebollizione.</li><li>Nel frattempo frullate metà dei carciofi con un frullatore a immersione.</li><li>Scolate la pasta al dente e versatela direttamente nella padella con i carciofi.</li><li>Aggiungete anche la pancetta (se volete) e il parmigiano grattugiato.</li><li>Fate saltare un paio di minuti e servite in tavola la vostra pasta con carciofi e pancetta ben calda.</li></ol>`,
            type: 'primo' // Ho assunto sia un "primo" piatto
        },
        'gnocchi-pesto': {
            title: 'Gnocchi al pesto',
            imageUrl: '../image/th.jpg',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Gnocchi di patate</li><li>Pesto alla genovese</li><li>Parmigiano Reggiano</li></ul>`,
            instructions: `<li>Lessare gli gnocchi in acqua salata.</li><li>Scolare e condire con il pesto.</li><li>Servire con parmigiano.</li>`,
            type: 'primo'
        },
        'filetto-pesce': {
            title: 'Filetto di pesce al forno',
            imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg',
            ingredients: `<h3>Per il pesce:</h3><ul><li>filetto di pesce 1</li><li>brodo granulare di pesce 1 cucchiaino raso</li><li>limone 1</li><li>olio d'oliva extra vergine q.b.</li><li>paprica in polvere 1 cucchiaio</li><li>pepe q.b.</li></ul>`,
            instructions: `<li>Prendete il filetto di pesce surgelato e ponetelo in una padella unta con un poco di olio.</li><li>Stemperate il dado di pesce in polvere in un bicchiere di acqua e aggiungetela in padella.</li><li>Profumate con una spolverata di paprica e portate a ebollizione, lasciate cuocere per una decina di minuti ponendo un coperchio sulla padella.</li><li>Se volete cucinare i filetti di pesce fresco veloce potete evitare di mettere l'acqua, ponete il filetto nella padella unta di olio e cuocete dieci minuti, girando a metà cottura.</li><li>Servite in tavola con qualche goccia di olio a crudo e un pizzico di pepe macinato al momento.</li>`,
            type: 'secondo'
        },
        'platessa-zucchine-mandorle': { // Ho creato un ID descrittivo
            title: 'Filetti di platessa con zucchine e mandorle',
            imageUrl: '../image/filetti-di-platessa-mandorle-zucchine.jpg', // Esempio di immagine placeholder (azzurro chiaro)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>250 g filetti di platessa</li><li>1-2 zucchine medie</li><li>20 g mandorle pelate</li><li>1/4 bicchiere di vino bianco</li><li>1/2 spicchio d'aglio</li><li>olio evo q.b.</li><li>sale q.b.</li><li>pepe nero macinato q.b.</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Lavare bene le zucchine, spuntare e tagliare a tocchettini.</li><li>In una padella antiaderente scaldare l'olio con il 1/2 spicchio d'aglio, aggiungere le zucchine e cuocere a fiamma bassa per circa 10 minuti, salare e pepare.</li><li>Unire le mandorle pelate e far insaporire per un paio di minuti.</li><li>Trasferire il condimento in una terrina tenendo al caldo.</li><li>Nella stessa padella cuocere i filetti di platessa sfumando con il vino bianco, regolare di sale e pepe. Fare attenzione a cuocere il pesce, è delicato e potrebbe rompersi.</li><li>Cominciare a formare il piatto mettendo una base di zucchine, adagiare sopra la platessa tagliata a piccoli trancetti.</li></ol>`,
            type: 'secondo' // Ho assunto sia un "secondo" piatto
        },
        'orata-cartoccio': { // Ho creato un ID descrittivo
            title: 'Orata al Cartoccio al Forno',
            imageUrl: '../image/orata-pomodori-olive-16032024-buttalapasta.it_.jpg', // Esempio di immagine placeholder (verde acqua)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>2 orate</li><li>2 ciuffi prezzemolo fresco</li><li>1 rametto rosmarino</li><li>1 spicchio aglio</li><li>olio di oliva q.b.</li><li>sale fino q.b.</li><li>10 pomodorini</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Pulite le orate eliminando le squame con un coltello: fate questo passaggio in un lavello in modo che se schizzano non invadono la cucina. Toccate l’orata con il palmo della mano per verificare che siano tutte state eliminate. Togliete le interiora facendo un taglio netto lungo la pancia, e sciacquatele abbondantemente sotto l’acqua corrente.</li><li>Preparate un’emulsione con olio di oliva, sale, aglio tritato, prezzemolo tritato e, se preferite, un po’ di succo di limone.</li><li>Mettete l’emulsione all’interno della pancia delle orate e chiudetele. Massaggiate esternamente l’orata con un po’ d’emulsione.</li><li>Adagiate le orate ciascuna in un foglio di carta forno e poi in un foglio di carta alluminio. Aggiungete sopra un po’ di pomodorini lavati e tagliati a metà, aglio a fettine, prezzemolo, sale e rosmarino.</li><li>Avvolgete l’orata, lasciando un po’ la carta aperta. Adagiatele su una teglia da forno.</li><li>Cuocete in forno preriscaldato a 180° per circa 30 minuti, regolandovi con i tempi a seconda della dimensione o dello spessore delle orate.</li></ol>`,
            type: 'secondo' // Ho assunto sia un "secondo" piatto
        },
        'insalata-pollo': {
            title: 'Insalata di pollo',
            imageUrl: '../image/Insalata-di-pollo-allitaliana-27062023-buttalapasta.it_-1024x683.jpg',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Insalata mista</li><li>Pomodorini</li><li>Mais</li><li>Salsa yogurt</li></ul>`,
            instructions: `<li>Bollire o grigliare il petto di pollo e tagliarlo a cubetti.</li><li>Unire tutti gli ingredienti e condire.</li>`,
            type: 'secondo'
        },
        'carne-pizzaiola': { // Ho creato un ID descrittivo
            title: 'Carne alla Pizzaiola',
            imageUrl: '../image/Carne-alla-pizzaiola_450x300.jpg', // Esempio di immagine placeholder (rosso scuro)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>2 fettine (circa 200 g) di carne di manzo</li><li>200 g di pelati o di passata di pomodoro</li><li>1/2 spicchio di aglio</li><li>1/2 cucchiaino di origano</li><li>sale q.b.</li><li>pepe q.b.</li><li>1 cucchiaio di olio extravergine d'oliva</li><li>Facoltativo: qualche foglia di basilico</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Scaldare una padella ed aggiungere un cucchiaio di olio extravergine.</li><li>Tritare un 1/2 spicchio di aglio (oppure tagliarlo a fettine sottili) ed unirlo all'olio affinché si insaporisca.</li><li>Versare i pomodori pelati (oppure la passata di pomodoro) nella padella ed aggiungere un pizzico di sale, il pepe e l'origano. Cuocere a fiamma moderata per 15 minuti circa, rigirando spesso il sugo.</li><li>Dopo un quarto d'ora, unire le bistecche di manzo direttamente nel pomodoro, avendo cura di coprirle completamente con il sugo. Proseguire la cottura per altri 10-15 minuti, rigirando le bistecche di tanto in tanto.</li><li>Al termine della cottura, rimuovere il coperchio e, se necessario, alzare la fiamma per far asciugare il sugo. Spegnere il fuoco ed ultimare a piacere con del basilico fresco.</li></ol>`,
            type: 'secondo' // Ho assunto sia un "secondo" piatto
        },
        'calamari-limone': { // Ho creato un ID descrittivo
            title: 'Calamari al Limone',
            imageUrl: '../image/Calamari-al-limone.jpg',
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>300 g di calamari</li><li>un 1/2 spicchio di aglio</li><li>1/2 limone intero (succo e buccia)</li><li>prezzemolo q.b.</li><li>sale q.b.</li><li>olio extra vergine di oliva q.b.</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Per preparare i calamari al profumo di limone, la prima cosa da fare è quella di pulirli. Quindi, eliminate la parte interiore e sciacquateli molto bene. Se li acquistate già puliti, passate direttamente allo step successivo.</li><li>A questo punto tagliate i calamari a rondelle spesse circa mezzo centimetro. Dopodiché, munitevi di una padella abbastanza capiente e fate soffriggere un 1/2 spicchio d’aglio con dell’olio di oliva. Quando l’aglio sarà ben dorato, eliminatelo e unite i calamari tagliati a rondelle.</li><li>Dopo aver fatto soffriggere un po’ i calamari per farli insaporire, aggiungere anche il succo di limone. Fate asciugare un po’ il sugo e aggiungete anche la scorza di limone grattugiata.</li><li>A questo punto aggiustate di sale e aggiungete anche il prezzemolo tritato. Terminate la cottura e servite.</li></ol>`,
            type: 'secondo'
        },
        'tacchino-zucchine-birra': { // Ho creato un ID descrittivo
            title: 'Tacchino con Zucchine alla Birra',
            imageUrl: '../image/tacchino-con-zucchine.jpg', // Esempio di immagine placeholder (verde chiaro)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>300 g di polpa di tacchino</li><li>1 zucchina</li><li>1/4 bicchiere di birra</li><li>olio di oliva extravergine q.b.</li><li>farina q.b.</li><li>sale q.b.</li><li>pepe q.b.</li><li>1/2 spicchio di aglio</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Lavate e spuntate la zucchina, quindi tagliatela a dadini. Fate rosolare le zucchine in una padella con l’olio e un 1/2 spicchio d’aglio.</li><li>Tagliate la polpa di tacchino a tocchetti quindi passateli nella farina. In una padella a parte fate rosolare la polpa di tacchino.</li><li>Sfumate con la birra quindi proseguite la cottura per una decina di minuti. Unite quindi il tacchino alle zucchine, aggiustate di sale e di pepe e lasciate cuocere ancora qualche minuto.</li><li>Servite il tacchino con le zucchine nei piatti.</li></ol>`,
            type: 'secondo' // Ho assunto sia un "secondo" piatto
        },
        'insalata-finocchi-arance': { // Ho creato un ID descrittivo
            title: 'Insalata di Finocchi e Arance',
            imageUrl: '../image/Insalata_Finocchi_Arance.jpg', // Esempio di immagine placeholder (arancione)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>400 g di finocchi</li><li>1 arancia</li><li>q.b. pinoli</li><li>25 g di olio extravergine di oliva</li><li>sale q.b.</li><li>1.5 g (o un pizzico) di aceto di mele</li><li>q.b. semi di zucca</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Iniziamo a spremere metà arancia ottenendo una buona dose di succo. Quindi sbucciamo l’altra metà arancia (o l'arancia intera se la preferisci tutta a fette) e togliamo via le due estremità e la parte bianca nella buccia.</li><li>Tagliamo l’arancia a fettine molto sottili e mettiamole da parte.</li><li>A questo punto laviamo e asciughiamo il finocchio, lo mettiamo su un tagliere e tagliamo i gambi, i rametti verdi, la base e le foglie esterne che rimangono dure. Prendiamo una mezzaluna e cerchiamo di tagliare a julienne il cuore del finocchio.</li><li>Prendiamo il finocchio appena tagliato e lo mettiamo in una ciotola contenente acqua acidulata per conservare integro il colore della verdura.</li><li>Mettiamo i pinoli in una padella antiaderente e facciamoli tostare a puntino per alcuni minuti. Mettiamoli da parte.</li><li>Versiamo il succo spremuto in precedenza in un ampio recipiente con i bordi alti e aggiungiamo anche l'aceto.</li><li>Aggiungiamo l'olio e il sale e frulliamo tutti gli ingredienti con un frullatore ad immersione.</li><li>Quando l'emulsione diventa omogenea possiamo aggiungere i finocchi, le arance e i pinoli.</li><li>Uniamo anche i semi di zucca per dare una nota di gusto e una consistenza croccante all’insalata. Mescoliamo ben tutti gli ingredienti e, finalmente possiamo servire in tavola la nostra insalata di finocchi e arance.</li></ol>`,
            type: 'contorno' // Ho assunto sia un "contorno"
        },
        'patate-forno': { // Ho creato un ID descrittivo
            title: 'Patate al Forno',
            imageUrl: '../image/Patate.jpg', // Esempio di immagine placeholder (arancione caldo)
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>500 g di patate</li><li>salvia q.b.</li><li>rosmarino q.b.</li><li>pepe q.b.</li><li>sale q.b.</li><li>olio di oliva extravergine q.b.</li><li>1 spicchio d’aglio</li></ul>`,
            instructions: `<h3>Procedimento:</h3><ol><li>Preparare il forno è fondamentale per l’esatta esecuzione di questa ricetta, per questo per prima cosa accendetelo fino a portarlo alla temperatura di 200°C. Intanto prendete una teglia del forno che sia decisamente larga e rivestitela con la carta da forno.</li><li>Prendete poi le patate e lavatele accuratamente col bicarbonato per togliere tutte le impurità, poi successivamente sbucciatele e dopo tagliatele a spicchi, più o meno della stessa grandezza. Lavate ancora le patate per eliminare le tracce di amido ancora presenti, sarebbe però consigliabile metterle in ammollo per almeno un’ora.</li><li>Una volta terminata questa operazione utilizzate un canovaccio per asciugare per bene le patate e fate attenzione che le patate siano completamente asciutte. Disponete poi le patate sulla teglia che avete preparato prima e ripassatele con un filo d’olio (pochissimo, consigliato quello spray) poi aggiustate con sale, pepe e le spezie che amate di più. Miscelate il tutto facendo attenzione di mantenere la distanza tra i vari pezzi delle patate.</li><li>Per ultimo inserite l’aglio e infornate il tutto per 40 minuti, mantenendo la temperatura di 200°C. Ogni quarto d’ora muovete le patate per fare in modo che la doratura coinvolga tutti i pezzi messi a cuocere. Terminata la cottura estraete dal forno e portate in tavola. Se volete anche un effetto decorativo, disponete le patate in un vassoio di ceramica contornato da rametti di rosmarino. Buon appetito!</li></ol>`,
            type: 'contorno' // Ho assunto sia un "contorno"
        },
        'fiori-zucca-gratinati-forno': { // ID for the recipe
            title: 'Fiori di Zucca Gratinati al Forno',
            imageUrl: '../image/Fiori-di-zucca-al-forno-0D6A9016.webp', // Placeholder image
            ingredients: `<h3>Ingredienti (per 2 persone):</h3><ul><li>10 fiori di zucca freschi</li><li>2-3 cucchiai pangrattato</li><li>1 cucchiaio parmigiano grattugiato</li><li>1/2 mazzetto prezzemolo fresco</li><li>olio extravergine di oliva q.b.</li><li>sale q.b.</li><li>pepe q.b.</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Per preparare il fiori di zucca gratinati al forno, inizia dalla pulizia dei fiori: rimuovi il peduncolo e i filamenti alla base.</li><li>Stacca anche il peduncolo interno posizionato al centro di ogni fiore.</li><li>Sciacqua rapidamente i fiori sotto l'acqua corrente fresca e lasciali scolare.</li><li>Nel frattempo miscela il pangrattato con un pizzico di sale, una macinata di pepe, il prezzemolo tritato al coltello e il formaggio grattugiato.</li><li>Passa ogni fiore ancora umido all'interno della panatura avendo cura di coprire tutti i lati.</li><li>Trasferisci man mano i fiori, uno accanto all'altro, in una teglia, rivestita con carta forno.</li><li>Distribuisci la panatura rimasta sui fiori.</li><li>Termina con un giro di olio e cuoci in forno preriscaldato a 190 °C per circa 15 minuti.</li><li>Trascorso il tempo di cottura, sforna i fiori di zucca, trasferiscili in un piatto da portata e servili ancora caldi.</li></ol>`,
            type: 'contorno' // Assuming it's a side dish
        },
        'fagiolini-carote-sesamo': { // ID per la ricetta
            title: 'Fagiolini con carote al sesamo',
            imageUrl: '../image/1123_carote.webp', // Immagine placeholder (verde brillante)
            ingredients: `<h3>Ingredienti (per 1 persona):</h3><ul><li>200 g di fagiolini</li><li>1 carota (circa 120 g)</li><li>1/2 spicchio d’aglio</li><li>1 cm di zenzero o ginger (facoltativo)</li><li>1 cucchiaino di olio di sesamo</li><li>1 cucchiaino scarso di semi di sesamo (circa 3 g)</li><li>1 cucchiaio di salsa di soia</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>In una wok mettiamo a tostare i semi di sesamo e quando saranno pronti mettiamoli da parte (ma fate attenzione a non bruciarli), facciamo bollire i fagiolini e le carote tagliate a fette per una decina di minuti, devono rimanere molto croccanti e non molli, li scoliamo e li mettiamo da parte.</li><li>Mettiamo l’olio di sesamo nella wok e lo facciamo scaldare, quando sarà caldo uniamo l’aglio e lo zenzero tritati, facciamo rosolare un minuto e uniamo anche i fagiolini e le carote, facciamo saltare 1 altro minuto e insaporiamo con la salsa di soia, facciamo andare per un paio di minuti e spegniamo la fiamma, uniamo i semi di sesamo, mescoliamo e serviamo caldo.</li><li>P.S. se non riuscite a trovare l’olio al sesamo provate a tostare il giorno prima i semi di sesamo e di metterli in un cucchiaio d’olio di semi… prenderà il gusto e il profumo dei semi di sesamo! =)</li></ol>`,
            type: 'contorno' // Assumo sia un contorno
        },
        'pure-patate-light': { // ID per la ricetta
            title: 'Purè di patate LIGHT',
            imageUrl: '../image/purepatate.jpg', // Immagine placeholder (marrone chiaro/crema)
            ingredients: `<h3>Ingredienti (per 1 persona):</h3><ul><li>160 g di patate</li><li>60 g di latte scremato</li><li>sale q.b.</li><li>noce moscata q.b.</li><li>2 cucchiaini di parmigiano grattugiato (facoltativo)</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li><strong>CON IL BIMBY:</strong> Nel boccale del bimby posizionate la farfalla, versate le patate sbucciate e tagliate a fette di 1cm, unite il sale, la noce moscata e il latte. (30 Min./100° Vel./1.). Servite caldo ma è ottimo anche tiepido. Se volete renderlo più gustoso, soprattutto per farlo mangiare anche ai bambini, aggiungetegli un bel cucchiaino di formaggio grattugiato!</li><li><strong>SENZA BIMBY:</strong> Prima di tutto facciamo bollire le patate e non appena riusciremo a penetrarle una forchetta al suo interno togliamole dall’acqua e sbucciamole facendo attenzione di non ustionarci! Con un passa salsa o con uno schiaccia patate riduciamo le patate in crema, aggiungiamo il latte un pochino per volta e se dovesse essere troppo fermatevi, non fa nulla se non lo userete troppo ma se non dovesse bastare aggiungetene ancora un pochino.. mescoliamo molto bene, saliamo e grattiamo un pò di noce moscata e serviamo immediatamente! Se volete renderlo più gustoso, soprattutto per farlo mangiare anche ai bambini, aggiungetegli un bel cucchiaino di formaggio grattugiato! Spero vi piaccia e spero che lo proverete presto!</li></ol>`,
            type: 'contorno' // Assumo sia un contorno
        },
        'cheesecake-light': { // ID per la ricetta
            title: 'Cheesecake Light',
            imageUrl: '../image/SH_cheesecake_light.jpg.webp', // Immagine placeholder (rosa caldo)
            ingredients: `<h3>Ingredienti:</h3><h4>Per la base:</h4><ul><li>150 g biscotti secchi</li><li>60 g burro light</li></ul><h4>Per la crema:</h4><ul><li>250 g yogurt greco magro al naturale</li><li>200 g formaggio spalmabile light</li><li>250 g ricotta magra</li><li>90 g zucchero</li><li>10 g colla di pesce</li><li>2 cucchiai acqua</li><li>125 g ribes (o altra frutta a piacere)</li></ul>`,
            instructions: `<h3>Istruzioni:</h3><ol><li>Fai fondere il burro light. Rivesti con la carta forno uno stampo a cerniera con fondo amovibile da 20 cm di diametro.</li><li>Prepara la base: frulla i biscotti secchi in un frullatore fino a ridurli a polvere sottile. Unisci il burro light fuso, mescola con un cucchiaio fino a ottenere un composto dalla consistenza “lavorabile”.</li><li>Rivesti con i biscotti il fondo dello stampo, creando uno strato uniforme e compattando bene con un cucchiaio. Poni la base in frigorifero per almeno 30 minuti o 10 minuti in freezer.</li><li>Poni la colla di pesce in una ciotola con l’acqua per almeno 10 minuti per farla ammorbidire.</li><li>Nel frattempo prepara la crema: mescola lo yogurt con la ricotta, il formaggio spalmabile light e lo zucchero. Poi, strizza la colla di pesce e scioglila in due cucchiai di acqua calda, mescolando accuratamente.</li><li>Aggiungi ora la colla di pesce nella crema e mescola per incorporarla.</li><li>Versa la crema di formaggi e yogurt nello stampo.</li><li>Livella la superficie e lascia raffreddare in frigorifero per almeno 4-5 ore. Quando sarà ben fredda guarnisci con la frutta e servi.</li></ol>`,
            type: 'dolce' // Assumo sia un dolce
        },
        'muffin-leggeri': { // ID per la ricetta
            title: 'Muffin Leggeri',
            imageUrl: '../image/SH_muffin_light.jpg.webp', // Immagine placeholder (giallo ocra per dolci)
            ingredients: `<h3>Ingredienti:</h3><ul><li>125 g di yogurt bianco magro</li><li>70 g di zucchero integrale</li><li>130 g di farina 00</li><li>2 uova</li><li>2 cucchiai di olio di semi</li><li>1/2 bustina di lievito per dolci</li></ul>`,
            instructions: `<h3>Come fare i muffin leggeri:</h3><ol><li>Per prima cosa dedicatevi agli ingredienti secchi: mettete la farina, lo zucchero e il lievito per dolci in un ciotola. Mescolate con un cucchiaio e tenete da parte.</li><li>In un’altra, invece, sbattete le uova con l’olio di semi e lo yogurt.</li><li>Aggiungete gli ingredienti liquidi ai secchi e mescolate con l’aiuto di una frusta a mano per ottenere un impasto privo di grumi.</li><li>Prendete degli appositi stampi per muffin, foderateli con i pirottini di carta e riempiteli con l’impasto all’incirca per 3/4.</li><li>A questo punto infornate a 180°C e fate cuocere per 20-25 minuti. Prima di sfornare i vostri dolcetti verificate sempre che siano ben cotti facendo la prova con uno stecchino di legno.</li><li>Sfornate i muffin light e fateli raffreddare su una gratella prima di assaggiarli.</li><li>Per accontentare i gusti di tutti potete prepararli anche aggiungendo un po’ di cacao in polvere: sostituite 20 g di farina con altrettanto cacao e rimarrete sbalorditi!</li></ol>`,
            type: 'dolce' // Tipo: dolce
        },
        'torta-carote': { // ID per la ricetta
            title: 'Torta di Carote',
            imageUrl: '../image/torta-di-carote-still-life-2.webp', // Immagine placeholder (giallo oro)
            ingredients: `<h3>Ingredienti:</h3><ul><li>200 g carote (al netto degli scarti)</li><li>4 uova medie a temperatura ambiente</li><li>200 g zucchero semolato</li><li>100 ml olio di semi di girasole</li><li>100 ml succo di arancia</li><li>300 g farina 00</li><li>cannella in polvere q.b.</li><li>16 g lievito in polvere per dolci</li><li>noce moscata q.b.</li></ul><h4>Per decorare:</h4><ul><li>zucchero a velo q.b.</li></ul><h4>Ti servono inoltre:</h4><ul><li>burro q.b.</li><li>farina q.b.</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Elimina le estremità e pela le carote, poi grattugiale utilizzando una grattugia a fori larghi e tienile da parte in un colino, affinché perdano l'acqua di vegetazione in eccesso.</li><li>Sguscia le uova e montale con le fruste elettriche, quindi aggiungi lo zucchero e continua a lavorare il composto per qualche minuto fino a renderlo chiaro, gonfio e spumoso.</li><li>Mentre continui a frullare, inizia ad aggiungere l'olio a filo.</li><li>Unisci anche il succo di arancia.</li><li>Incorpora pian piano la farina e il lievito per dolci setacciati, proseguendo a lavorare il composto.</li><li>Infine, aggiungi le carote precedentemente grattugiate e strizzate.</li><li>Profuma con la cannella in polvere e la noce moscata grattugiata e amalgama il tutto con una spatola.</li><li>Dovrai ottenere un composto liscio, denso e uniforme.</li><li>Trasferisci l'impasto in uno stampo a cerniera da 22 cm di diametro precedentemente imburrato e infarinato e cuoci in forno statico preriscaldato a 180 °C per 45-50 minuti, oppure in forno ventilato a 170 °C per lo stesso tempo. Prima di sfornare, verifica l'interno con la prova stecchino.</li><li>Una volta pronta, lasciala nella teglia per una mezz'ora, poi trasferiscila su una gratella per dolci e lasciala raffreddare completamente prima di servirla. Una volta fredda, sistemala su un piatto da portata e spolverizzala di abbondante zucchero a velo.</li><li>La torta di carote è pronta per essere gustata.</li><li><strong>Come farcire e decorare:</strong> La torta di carote è ottima da gustare al naturale o spolverizzata di zucchero a velo, ma è perfetta anche da farcire e decorare, per trasformarla in poche mosse in una deliziosa torta di compleanno. Per una versione simile a quella inglese, puoi tagliarla a metà e spalmarla con un velo di crema al mascarpone, da utilizzare anche per la guarnizione, oppure glassarla con cioccolato fuso o con glassa al cioccolato. Per una variante scenografica ma leggera, prepara una ghiaccia mescolando zucchero a velo e succo d'arancia, cospargendo poi la superficie di scorza d'arancia grattugiata.</li></ol>`,
            type: 'dolce' // Tipo: dolce
        },
        'crema-caffe-acqua': { // ID per la ricetta
            title: 'Crema di caffè all’acqua',
            imageUrl: '../image/crema_caffe.webp', // Immagine placeholder (marrone caffè)
            ingredients: `<h3>Ingredienti:</h3><ul><li>35 g caffè solubile</li><li>170 g zucchero</li><li>200 ml acqua fredda</li></ul><h4>Per la decorazione:</h4><ul><li>cacao amaro in polvere q.b.</li><li>gocce di cioccolato bianco q.b.</li></ul>`,
            instructions: `<h3>Preparazione:</h3><ol><li>Setaccia il caffè solubile.</li><li>Raccogli il caffè nella ciotola di una planetaria e aggiungi lo zucchero.</li><li>Versa l’acqua, poco alla volta, e mescola per sciogliere leggermente.</li><li>Avvia la planetaria e monta la crema con le fruste elettriche, alla massima velocità, per almeno 5 minuti. Dovrai ottenere un composto molto spumoso.</li><li>Trasferisci la crema in un contenitore e metti in freezer fino al momento di servire.</li><li>A questo punto trasferisci la crema nelle tazzine individuali e guarnisci con un po' di cacao amaro e, a piacere, con delle gocce di cioccolato.</li><li>Porta in tavola e servi.</li></ol>`,
            type: 'dolce' // Tipo: dolce (o dessert/bevanda)
        },
    };

    // --- FUNZIONI DI UTILITY PER L'UTENTE E I DATI (Dovrebbero essere globali o importate) ---
    // Queste funzioni sono qui per chiarezza, idealmente dovrebbero essere in global-sync.js o auth-script.js
    function saveUserToLocalStorage(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            console.warn("Utente non trovato in localStorage per l'aggiornamento in dettagli-ricetta-script.js.");
        }
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    function toggleLikeStatus(recipeIdToToggle) {
        let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser || !loggedInUser.email) {
            alert('Devi effettuare il login per mettere Mi Piace o rimuoverlo.');
            return false;
        }

        loggedInUser.likedRecipeIds = loggedInUser.likedRecipeIds || [];
        const index = loggedInUser.likedRecipeIds.indexOf(recipeIdToToggle);
        let isLiked;

        if (index === -1) {
            loggedInUser.likedRecipeIds.push(recipeIdToToggle);
            isLiked = true;
            console.log(`Ricetta '${recipeIdToToggle}' aggiunta ai preferiti di '${loggedInUser.email}'.`);
        } else {
            loggedInUser.likedRecipeIds.splice(index, 1);
            isLiked = false;
            console.log(`Ricetta '${recipeIdToToggle}' rimossa dai preferiti di '${loggedInUser.email}'.`);
        }

        saveUserToLocalStorage(loggedInUser);

        // Notifica il sistema di sincronizzazione globale
        if (typeof window.refreshAllRecipeDisplays === 'function') {
            window.refreshAllRecipeDisplays();
        }

        return isLiked;
    }

    function isRecipeLiked(recipeIdToCheck) {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser || !loggedInUser.email) {
            return false;
        }
        const likedRecipeIds = loggedInUser.likedRecipeIds || [];
        return likedRecipeIds.includes(recipeIdToCheck);
    }

    function updateHeartIcon(button, isLiked) {
        if (button) { // Assicurati che il bottone esista
            if (isLiked) {
                button.classList.add('liked');
                button.innerHTML = '♥'; // Cuore pieno
            } else {
                button.classList.remove('liked');
                button.innerHTML = '♡'; // Cuore vuoto
            }
        }
    }
    // --- FINE FUNZIONI DI UTILITY ---

    // Funzione per ottenere l'ID della ricetta dall'URL
    function getRecipeIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function getRecipeDetailsById(recipeIdToFind) {
        let recipe = staticRecipes[recipeIdToFind];
        if (!recipe) {
            const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
            recipe = customRecipes.find(r => r.id === recipeIdToFind);
        }
        return recipe;
    }

    // Funzione per caricare i dettagli della ricetta e aggiornare lo stato del like
    function loadRecipeDetails() {
        currentRecipeId = getRecipeIdFromUrl(); // Imposta currentRecipeId qui
        let recipe = getRecipeDetailsById(currentRecipeId);

        if (recipe) {
            document.title = `FitWhealty - ${recipe.title}`;
            document.getElementById('recipe-title').textContent = recipe.title;
            document.getElementById('recipe-image').src = recipe.imageUrl;
            document.getElementById('recipe-image').alt = recipe.title;
            document.getElementById('ingredients-content').innerHTML = recipe.ingredients;
            document.getElementById('instructions-content').innerHTML = recipe.instructions;

            // Aggiorna lo stato iniziale del like button
            if (likeButton) {
                updateHeartIcon(likeButton, isRecipeLiked(currentRecipeId));
            }

            if (recipe.type && backButton && recipeTypeToPageMap[recipe.type]) {
                backButton.href = recipeTypeToPageMap[recipe.type];
                const typeDisplayName = recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1);
                backButton.innerHTML = `&lt; ${typeDisplayName}`;
            } else if (backButton) {
                backButton.href = 'mainpageloggato.html';
                backButton.innerHTML = `&lt; HomePage`;
            }



        } else {
            document.getElementById('recipe-title').textContent = 'Ricetta non trovata!';
            document.getElementById('ingredients-content').innerHTML = '<p>Spiacenti, questa ricetta non esiste o non è stata ancora pubblicata.</p>';
            document.getElementById('instructions-content').innerHTML = '';
            document.getElementById('recipe-image').src = '';
            document.getElementById('recipe-image').alt = '';
            if (likeButton) likeButton.style.display = 'none'; // Nasconde il like button se ricetta non trovata
            if (commentButton) commentButton.style.display = 'none'; // Nasconde il comment button
        }
    }

    // Carica i dettagli della ricetta all'avvio della pagina
    loadRecipeDetails();

    // Listener per il pulsante "Mi Piace"
    if (likeButton) {
        likeButton.addEventListener('click', () => {
            if (currentRecipeId) { // Assicurati che l'ID della ricetta sia disponibile
                const newLikedStatus = toggleLikeStatus(currentRecipeId);
                updateHeartIcon(likeButton, newLikedStatus);
            } else {
                console.warn("Nessun ID ricetta disponibile per il like button.");
            }
        });
    }

    // Funzione globale per aggiornare lo stato del like e altri elementi UI quando notificato da global-sync
    window.refreshDetailsPage = function() {
        console.log("Dettagli Ricetta: Ricevuto refresh da global-sync.");
        if (currentRecipeId) {
            if (likeButton) {
                updateHeartIcon(likeButton, isRecipeLiked(currentRecipeId));
            }
            // Aggiorna anche la visibilità del pulsante elimina
            const recipe = getRecipeDetailsById(currentRecipeId);
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            // if (deleteButton && loggedInUser && recipe && recipe.creatorId && loggedInUser.email === recipe.creatorId) { // Aggiunta check recipe existence
            //     deleteButton.style.display = 'block';
            // } else if (deleteButton) {
            //     deleteButton.style.display = 'none';
            //}
        }
    };


    // Listener per il bottone "Add" (se presente, solitamente non nella pagina dettagli)
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        // Disabilita/nascondi se non serve nella pagina dettagli, o dagli una funzione specifica
        addButton.style.display = 'none'; // Esempio: nascondilo
        // addButton.addEventListener('click', () => {
        //     window.location.href = 'AggiungiRicetta.html';
        // });
    }

    // Listener per il bottone "Comment" nella pagina dettagli
    if (commentButton) { // Utilizza l'ID specifico
        commentButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (commentsModal) {
                commentsModal.style.display = 'flex';
            }

            // Ottieni i dettagli completi della ricetta qui
            const recipe = getRecipeDetailsById(currentRecipeId);
            let recipeTitleForComments = "Ricetta Sconosciuta";
            if (recipe) {
                recipeTitleForComments = recipe.title;
            }

            // Chiamata alla funzione del comments-script.js (assumi sia globale)
            if (typeof window.loadCommentsForRecipeModal === 'function') {
                window.loadCommentsForRecipeModal(currentRecipeId, recipeTitleForComments);
            } else {
                console.error("Funzione 'loadCommentsForRecipeModal' non trovata. Assicurati che comments-script.js sia caricato e che la funzione sia esposta globalmente (es. window.loadCommentsForRecipeModal = ...).");
            }
        });
    }

    // Listener per il pulsante di chiusura del modal commenti
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (commentsModal) commentsModal.style.display = 'none';
        });
    }

    // Listener per chiudere il modal cliccando fuori dal contenuto
    if (commentsModal) {
        commentsModal.addEventListener('click', (event) => {
            if (event.target === commentsModal) {
                commentsModal.style.display = 'none';
            }
        });
    }
});

