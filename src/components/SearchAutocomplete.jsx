// 📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
// Crea un campo di input (<input type="text">) in cui l’utente può digitare.
// Effettua una chiamata API a: 
// /products?search=[query]
// La query deve essere sostituita con il testo digitato.
// Mostra i risultati API sotto l'input in una tendina di suggerimenti.
// Se l'utente cancella il testo, la tendina scompare.
// Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.

// import { useState, useEffect } from 'react';



// export default function SearchAutocomplete() {

//     const [search, setSearch] = useState('')
//     const [suggestions, setSuggestions] = useState([])

//     useEffect(() => {

//         if (!search) {
//             setSuggestions([]);
//             return;
//         }

//         fetch(`http://localhost:3333/products?search=${search}`)
//             .then(res => res.json())
//             .then(data => setSuggestions(data))
//             .catch(err => console.error(err))
//     }, [search])


//     return (
//         <>
//             <input type="text"
//                 placeholder='Cerca per suggerimenti'
//                 value={search}
//                 onChange={e => setSearch(e.target.value)} />


//             <ul>
//                 {suggestions.map(product => (
//                     <li key={product.id}>
//                         {product.name}
//                     </li>
//                 ))}

//             </ul>
//         </>
//     )
// }








// 📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
// Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
// Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
// Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.
// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.



// import { useState, useEffect, useCallback } from 'react';

// function debounce(callback, delay) {
//     let timer;

//     return (value) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             callback(value)
//         }, delay);
//     }
// }


// export default function SearchAutocomplete() {

//     const [search, setSearch] = useState('')
//     const [suggestions, setSuggestions] = useState([])


//     const debouncedFetch = useCallback(
//         debounce((search) => {
//             console.log(search);


//             fetch(`http://localhost:3333/products?search=${search}`)
//                 .then(res => res.json())
//                 .then(data => setSuggestions(data))
//                 .catch(err => console.error(err))
//         }, 1000),
//         []
//     )




//     useEffect(() => {

//         if (!search) {
//             setSuggestions([]);
//             return;
//         }

//         debouncedFetch(search);
//     }, [search, debouncedFetch])


//     return (
//         <>
//             <input type="text"
//                 placeholder='Cerca per suggerimenti'
//                 value={search}
//                 onChange={e => setSearch(e.target.value)} />


//             <ul>
//                 {suggestions.map(product => (
//                     <li key={product.id}>
//                         {product.name}
//                     </li>
//                 ))}

//             </ul>
//         </>
//     )
// }






// 🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato
// Quando l’utente clicca su un prodotto nella tendina, nascondi la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.
// Effettua una richiesta API per ottenere i dettagli completi:
// /products/{id}
// Mostra i dettagli del prodotto selezionato (es. image, name, description, price).
// Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.



import { useState, useEffect, useCallback } from 'react';

function debounce(callback, delay) {
    let timer;

    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value)
        }, delay);
    }
}




export default function SearchAutocomplete() {

    function handleSelect(id) {
        setSuggestions([]);
        setSearch('')


        fetch(`http://localhost:3333/products/${id}`)
            .then(res => res.json())
            .then(data => setSelectedProduct(data))
            .catch(err => console.error(err))
    }


    function handleClose() {
        setSelectedProduct(null);
        setSuggestions([])
    }



    const [search, setSearch] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)


    const debouncedFetch = useCallback(
        debounce((search) => {
            console.log(search);


            fetch(`http://localhost:3333/products?search=${search}`)
                .then(res => res.json())
                .then(data => setSuggestions(data))
                .catch(err => console.error(err))
        }, 1000),
        []
    )




    useEffect(() => {

        if (!search) {
            setSuggestions([]);
            return;
        }

        debouncedFetch(search);
    }, [search, debouncedFetch])


    return (
        <>
            <input type="text"
                placeholder='Cerca per suggerimenti'
                value={search}
                onChange={e => setSearch(e.target.value)} />


            <ul>
                {suggestions.map(product => (
                    <li key={product.id}
                        onClick={() => handleSelect(product.id)}>
                        {product.name}
                    </li>
                ))}

            </ul>

            {selectedProduct && (
                <div>
                    <h2>{selectedProduct.name}</h2>
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                    <p>{selectedProduct.description}</p>
                    <p>{selectedProduct.price}</p>
                    <button onClick={handleClose}
                        style={{ width: '100px' }}
                    >CLOSE</button>
                </div>
            )}
        </>
    )
}