const bookContainer = document.getElementById('book-container')
const bookDetails = document.getElementById('book-details')

document.getElementById('search-btn').addEventListener('click', () => {
    bookContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center  align-items-center ">
    <div class="spinner-border text-success" role="status">
        <span class ="visually-hidden">Loading...</span>
    </div>
    </div>
            `

    
           const searchText = document.getElementById('search-text')
            const api = `http://openlibrary.org/search.json?q=${searchText.value}`
    
            fetch(api)
            .then(res => res.json())
            .then(data => showData(data.docs))

})

const showData =(books) => {
    var bookArr = books.filter(book => book.cover_i !== undefined && book.author_name !== undefined && book.publisher !== undefined && book.title !== undefined && book.first_publish_year !== undefined)

    if(bookArr.length === 0){
        bookContainer.innerHTML = 'No Result Found'
    }
    else{
        var bookDetails = document.getElementById('book-details')
        var newP = document.createElement('p')
        newP.innerHTML = `You got ${bookArr.length} books`
        bookDetails.innerHTML = ""
        bookDetails.appendChild(newP)
    }

    bookArr.forEach(book => {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
            <div class="card my-3" style="width: 18rem; height:420px">
                <img class="card-img-top img-fluid"  style="width:300px; height:200px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" >
            <div class="card-body overflow-hidden">
                <h5 class="card-title text-primary">Book Title: ${book.title}</h5>
                <p class="card-subtitle text-danger mb-2">Book Author Name: ${book.author_name[0]}</p>
                <p class="card-text">Book Publisher: ${book.publisher[0]}</p>
                <p class="card-text"> First Publish Year: ${book.first_publish_year} </p>
            </div>
            </div>
            `

            bookContainer.appendChild(newDiv)
    })

    


    
}

