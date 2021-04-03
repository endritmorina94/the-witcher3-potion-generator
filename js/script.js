var userTry = [];
var arrayPozioniScoperte = [];
var btnCrea = document.getElementById("my-btn");
var cancelBtn = document.getElementById("cancel-btn");
var overlay = document.getElementById("overlay");
var modal = document.getElementById("modal-window-border-1");


var ingredients = document.querySelectorAll(".ingredient");

    for (var i = 0; i < ingredients.length; i++) {

        ingredients[i].addEventListener("click", function(){

            this.classList.toggle("active");

        });

    }




cancelBtn.addEventListener("click", function () {
    overlay.classList.add("hide");
    modal.classList.add("hide");
    location.reload();
    //da rivedere, soluzione temporanea
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
    function(){

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
        if (confronto) {
            console.log("complimenti, hai creato " + element.nome);
            arrayPozioniScoperte.push(element);
            //variabili interne del MODALE
            var modPotion = document.getElementById("modale-potion");
            var modText = document.getElementById("modale-text");

            document.getElementById("modale-img").src = element.aspetto;
            modPotion.innerHTML = element.nome;
            modText.innerHTML = element.nome;


            overlay.classList.remove("hide");
            modal.classList.remove("hide");
            break; // perchè se la pozione l'hai creata non c'è bisogno di continuare ad iterare alla ricerca della pozione giusta
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
        function(){
            //che cambia lo status di questo
            var idbtn = document.getElementById(element.getAttribute("for"));
            idbtn.checked = true;
        }
    );
}


// può essere max 5 tra tutti gli ingredienti
var sommaIngredienti = 0;
/*
- clicclando sul bottone - decrementa il numero di ingredienti
- non si può scendere sotto lo zero
- viene anche decrementata la somma comune a tutti gli ingredienti
*/
var decBtns = document.getElementsByClassName("dec");
for (let k = 0; k < decBtns.length; k++) {
    const element = decBtns[k];
    var n = document.getElementById("number-" + element.getAttribute("value"));
    element.addEventListener("click",
        function(){

            var n = document.getElementById("number-" + element.getAttribute("value"));
            var toDecrease = n.value;
            if (toDecrease > 0) {
                toDecrease--;
                sommaIngredienti--;
                console.log(sommaIngredienti)
            }
            n.value = toDecrease;
        }
    );
}


/*
- cliccando sul bottone + incrementa il numero di ingredienti
- non si può andare oltre 3 ingredienti per tipo
- la somma di due o piu ingredienti non può essere superiore a 5
 */
var incrBtns = document.getElementsByClassName("inc");
for (let y = 0; y < incrBtns.length; y++) {
    const element = incrBtns[y];
    var m = document.getElementById("number-" + element.getAttribute("value"));



    element.addEventListener("click",
        function () {
            var m = document.getElementById("number-" + element.getAttribute("value"));
            var toIncrease = m.value;
            //tiene traccia anche della somma tra le varie carte in modo da non eccedere oltre 5 totali
            if (sommaIngredienti < 5 && toIncrease < 3) {
                sommaIngredienti++;
                console.log("somma ingredienti", sommaIngredienti);
                if (toIncrease < 3) {
                    toIncrease++;
                }
            }
            m.value = toIncrease;
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
