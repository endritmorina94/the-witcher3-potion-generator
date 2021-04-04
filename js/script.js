// AVVERTENZE: QUESTO CODICE CONTIENE BUG!

//Dichiaro le variabili di tutti gl'elementi di base
var userTry = [];
var arrayPozioniScoperte = [];
var btnCrea = document.getElementById("my-btn");
var cancelBtn = document.getElementById("cancel-btn");
var overlay = document.getElementById("overlay");
var modal = document.getElementById("modal-window-border-1");
var ingredients = document.querySelectorAll(".ingredient");
var inputs = document.getElementsByClassName("numberOfIngredients");

//Faccio apparire all'avvio un messaggio di benvenuto
document.getElementById("bodyy").addEventListener("load", myFunction());

function myFunction() {
    overlay.classList.remove("hide");
    modal.classList.remove("hide");
}


//Creo un ciclo per togglare la classe active agli ingredienti..
for (var i = 0; i < ingredients.length; i++) {

    //Dichiaro una somma base di 0
    var sommaIngredienti = 0;

    ingredients[i].addEventListener("click",
        function() {

            //Finché la somma degli ingredienti è inferiore di 5..
            if (sommaIngredienti < 5) {

                this.classList.toggle("active");

                var act = this.classList.contains("active");

                //Se l'ingrediente è selezionato e quindi possiede la classe active..
                if (act) {

                    var incBtn = this.getElementsByClassName("inc");
                    var decBtn = this.getElementsByClassName("dec");
                    var input = this.getElementsByClassName("numberOfIngredients");

                    var numbInput = 1;
                    input[0].value = numbInput;

                    sommaIngredienti++;

                    console.log(sommaIngredienti);

                    incBtn[0].addEventListener("click",
                        function() {
                            //tiene traccia anche della somma tra le varie carte in modo da non eccedere oltre 5 totali
                            if (sommaIngredienti < 5 && numbInput < 3) {

                                sommaIngredienti++;

                                console.log("somma ingredienti", sommaIngredienti);

                                if (numbInput < 3) {

                                    numbInput++;

                                    input[0].value = numbInput;
                                }
                            }
                        });

                    decBtn[0].addEventListener("click",
                        function() {

                            if (numbInput > 0) {

                                numbInput--;

                                sommaIngredienti--;

                                console.log("somma ingre", sommaIngredienti);
                                input[0].value = numbInput;

                            }
                            console.log("val input: ", parseInt(input[0].value.slice(0, 1).toString()));
                        });
                    //Se riclicchiamo sull'ingrediente, viene resettata la sua quantità e viene sottrata alla somma totale degli ingredienti
                } else {

                    var input = this.getElementsByClassName("numberOfIngredients");

                    console.log("RESET-top", sommaIngredienti + " - " + parseInt(input[0].value.slice(0, 1).toString()));

                    sommaIngredienti--;
                    sommaIngredienti = sommaIngredienti - parseInt(input[0].value.slice(0, 1).toString());
                    numbInput = 0;

                    input[0].value = 0;

                    console.log("RESET", sommaIngredienti + " - " + parseInt(input[0].value.slice(0, 1).toString()));
                    console.log(numbInput);

                }

            }
            // else {
            //     this.classList.remove("active");
            //
            //     var input = this.getElementsByClassName("numberOfIngredients");
            //
            //     sommaIngredienti = sommaIngredienti - parseInt(input[0].value.slice(0, 1).toString());
            //     contatore = 0;
            //
            //     input[0].value = "0";
            //
            //     console.log("sommabottom: ", sommaIngredienti);
            // }



        });

}




//Premendo il bottone Continua tutto viene resettato
cancelBtn.addEventListener("click", function() {
    //Aggiungo la classe hide alla modale e all'overlay
    overlay.classList.add("hide");
    modal.classList.add("hide");

    //Tolgo la classe active agli ingredienti
    for (var i = 0; i < ingredients.length; i++) {
        ingredients[i].classList.remove("active");
    }

    //Imposto la quantità degli ingredienti a 0
    for (var g = 0; g < inputs.length; g++) {
        inputs[g].value = 0;
    }

    //Reimposto a 0 la somma degli ingredienti
    sommaIngredienti = 0;

});

// Impedisco al div counter di prorogare il click anche al div padre
function func1(event) {
    event.stopPropagation();
}

/*
- event listener sul bottone:
- aggiunge ad un array gli elementi selezionati dall utente in ordine per fare un confronto 1 ad 1 tra item at index[h]
- in base alla lunghezza dell'array fa il fetch su un json; (o se cambiamo su una variabile che contiene le info)

- se il numero di ingredienti inseriti è < 3 allora pop up che sollecita ad inserire il giusto minimo
*/
btnCrea.addEventListener("click",
    function() {

        var cardsToIterate = document.getElementsByClassName("numberOfIngredients");
        for (let h = 0; h < cardsToIterate.length; h++) {
            const element = cardsToIterate[h];
            var nIngr = element.value;
            console.log(nIngr)

            for (let u = 0; u < nIngr; u++) {
                var nome = element.id.slice(7);
                userTry.push(nome);
                userTry.sort();
            }
        }
        if (userTry.length >= 0 && userTry.length <= 2) {
            console.log("aggiungi almeno 3 ingredienti"); //pop up da fare
        }

        confronto(pozioniEsatte, userTry);

    }

);

// FUNZIONI CORE
/*
- fetch del file json che contiene i dati delle ricette delle pozioni
*/

/*
- prende in input degli oggetti json e la combinazione risultante dallo user input
- nel primo ciclo itera sugli oggetti del file json
- nel secondo ciclo sugli elementi di ogni array "ricetta" contenuto in ogni oggetto json
- se anche un solo ingrediente è diverso, allora interrompe il ciclo
- se tutti gli ingredienti corrispondono con l'array corrente, allora interrompe il ciclo
  (non ci sono due ricette con gli stessi ingredienti, se la prima ricetta è quella giusta non ha senso continuare ad iterare)
*/

//Determino un array con tutte le pozioni esatte
let pozioniEsatte = [
    {
        "nome": "Rampicante",
        "ingredienti": 3,
        "listaIngredienti": [
            "etere",
            "vermiglio",
            "zolfo"
        ],
        "aspetto": "img2/img-pot3/Potion_Bindweed.png"
    },
    {
        "nome": "Gatto",
        "ingredienti": 3,
        "listaIngredienti": [
            "rebis",
            "zolfo",
            "zolfo"
        ],
        "aspetto": "img2/img-pot3/Tw3_potion_cat.png"
    },
    {
        "nome": "Bacio",
        "ingredienti": 3,
        "listaIngredienti": [
            "vermiglio",
            "vetriolo",
            "vetriolo"
        ],
        "aspetto": "img2/img-pot3/Potion_Kiss.png"
    },
    {
        "nome": "Allocco",
        "ingredienti": 3,
        "listaIngredienti": [
            "etere",
            "etere",
            "vetriolo"
        ],
        "aspetto": "img2/img-pot3/Tw3_potion_tawny_owl.png"
    },
    {
        "nome": "Gabbiano bianco",
        "ingredienti": 3,
        "listaIngredienti": [
            "rebis",
            "vetriolo",
            "vetriolo"
        ],
        "aspetto": "img2/img-pot3/Tw3_white_gull.png"
    },
    {
        "nome": "Miele bianco",
        "ingredienti": 3,
        "listaIngredienti": [
            "etere",
            "rebis",
            "vetriolo"
        ],
        "aspetto": "img2/img-pot3/Tw3_potion_white_honey.png"
    },
    {
        "nome": "Salice",
        "ingredienti": 3,
        "listaIngredienti": [
            "etere",
            "zolfo",
            "zolfo"
        ],
        "aspetto": "img2/img-pot3/Potion_Willow.png"
    },
    {
        "nome": "Lacrime delle mogli",
        "ingredienti": 3,
        "listaIngredienti": [
            "etere",
            "rebis",
            "zolfo"
        ],
        "aspetto": "img2/img-pot3/Potion_Wives_Tears.png"
    }
];

//Imposto delle frasi standard
var text1 = "Hai creato: ";
var text2 = " stimola notevolmente la produzione di enzimi purificatori nei corpi mutati dei witcher. Così facendo, aiuta a rimuovere le tossine delle pozioni, annullando però al tempo stesso anche i loro effetti benefici.";
var text3 = "Ricetta sbagliata";
var text4 = "Hai erronamente creato uno stimolante per pantegane che ti attaccano sbranandoti senza pietà."

//Confronto gl'elementi selezionati dall'utente con quelli delle possibili soluzioni corrette
function confronto(pozioniEsatte, userTry) {
    var arr;
    var confronto = true;
    for (let i = 0; i < pozioniEsatte.length; i++) {
        const element = pozioniEsatte[i];
        arr = element.listaIngredienti;
        console.log(arr);
        confronto = true;
        for (let j = 0; j < userTry.length; j++) {
            var mioIngrediente = userTry[j];
            var validIngrediente = arr[j];
            if (mioIngrediente != validIngrediente) {
                console.log("ingrediente non valido");
                confronto = false;
                break; // è inutile continuare a farlo iterare
            }
        }

        //variabili interne del MODALE
        var modPotion = document.getElementById("modale-potion");
        var modText = document.getElementById("modale-text");
        //In caso di trovata corrispondenza...
        if (confronto) {
            console.log("complimenti, hai creato " + element.nome);
            arrayPozioniScoperte.push(element);


            document.getElementById("modale-img").src = element.aspetto;
            modPotion.innerHTML = text1 + element.nome;
            modText.innerHTML = element.nome + text2;


            overlay.classList.remove("hide");
            modal.classList.remove("hide");
            break; // perchè se la pozione l'hai creata non c'è bisogno di continuare ad iterare alla ricerca della pozione giusta

        //In caso di mancata corrispondenza..
        } else {

            document.getElementById("modale-img").src = "img/rat.png";
            document.getElementById("modale-img").style.width = "180px";
            modPotion.innerHTML = text3;
            modText.innerHTML = text4;

            overlay.classList.remove("hide");
            modal.classList.remove("hide");

        }
    }
}

/* permette di cliccare sul div per impostare il valore del radio button su true e tenere i radio nascosti */
/* IMPORTANTE: rivedere il div da selezionare per far avvenire il cambio */
var cardBox = document.getElementsByClassName("ingredient");
for (let j = 0; j < cardBox.length; j++) {
    //a questo va aggiunto l'event listener
    const element = cardBox[j];
    element.addEventListener("click",
        function() {
            //che cambia lo status di questo
            var idbtn = document.getElementById(element.getAttribute("for"));
            idbtn.checked = true;
        }
    );
}

/* disabilità la possibilita di cliccare nell'input numerico */
function disableNumField() {
    var arrInputN = document.getElementsByClassName("numberOfIngredients");
    for (let f = 0; f < arrInputN.length; f++) {
        const element = arrInputN[f];
        element.disabled = true;
    }
}
disableNumField();
