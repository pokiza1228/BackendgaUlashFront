import { useEffect, useRef, useState } from "react";


function App() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        fetch('http://localhost:9000/books')
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.log(err))
    }, [])

    const name = useRef();
    const aftor = useRef();
    const submitAdd = (evt) => {
        evt.preventDefault();
        const nameValue = name.current.value;
        const aftorValue = aftor.current.value;
        fetch('http://localhost:9000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify({
                name: nameValue,
                aftor: aftorValue
            })
        }).then(res => console.log(res))
    }

    const deleteBooks = (evt) => {
        const clicedIndex = books && books.findIndex(e => e.id == evt.target.dataset.id)
        books.splice(clicedIndex, 1)

        fetch('http://localhost:9000/deleteBooks' + `/${evt.target.dataset.id}`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, 
                mode: 'no-cors'
            }).then(res => console.log(res))
            .catch(err => console.log(err))
        console.log(books)
    } 

    
    const submitEdd=(evt)=>{
        evt.preventDefault();
        const {name,aftor}=evt.target
        const cliced = books && books.find(e => e.id == evt.target.dataset.id)
        const clicedIndex = books && books.findIndex(e => e.id == evt.target.dataset.id)
        cliced.name=name.value? name.value: cliced.name
        cliced.aftor=aftor.value ? aftor.value : cliced.aftor
        books.splice(clicedIndex, 1, cliced)
        
        fetch('http://localhost:9000/edit'+`/${evt.target.dataset.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify({
                name: name.value,
                aftor: aftor.value
            })
        }).then(res => console.log(res))

    }
    
    return ( 
    <div>
        <form onSubmit = { submitAdd } >
            <input ref={ name } placeholder={"name"}></input>
             <input ref={ aftor } placeholder={"aftor"}></input> 
             <button type={"submit"}>Add books</button>
        </form> 
            <ul style = {{ "display": "flex", justifyContent: "space-between" }}> 
            {books && books.map(e =>
                <li key={ e.id }>
                    <h3> { e.name } </h3> 
                    <p> { e.aftor } </p> 
                    <button data-id={ e.id } type={"click"} onClick={ deleteBooks }>Delete books</button> 
                    <form data-id={ e.id } onSubmit={submitEdd}>
                        <input name='name' placeholder="name"></input>
                        <input name='aftor' placeholder="aftor"></input>
                        <button type="submit">Edd book</button>
                    </form>
                </li>)} 
            </ul> 
        </div>
    )
}

export default App;