const getSearchedText = () =>{
    const getSearchField = document.getElementById('search');
    const searchText = getSearchField.value;
    getSearchField.value = ''
    console.log(searchText)
    const url = `HTTPS://openlibrary.org/search.json?q=${searchText}`

    document.getElementById('spinner').classList.remove("d-none")
    document.getElementById('update').classList.add("d-none")

    fetch(url)
    .then(res => res.json())
    .then(data => getApi(data))
    .catch(error => displayError(error));
}

const displayError = error =>{
    console.log('jhamela hoise holo', error)
}

const getApi = data => {
    console.log(data)
    console.log(data.numFound)
    console.log(data.docs[0].author_name[0])
    console.log(data.docs[0].text[1])

    const bookArray = data.docs;

    // console.log(bookArray);
    // console.log(bookArray.filter( bookArray => bookArray.title !== 'Harry'))

    const resultNumber = document.getElementById('result')
    const h5 = document.createElement('h5')
    h5.innerText = `Result found ${data.numFound}`
    resultNumber.appendChild(h5);

    const displaySection = document.getElementById('update');
    displaySection.textContent='';
    bookArray?.forEach(element => {
        displayApi(element);        
    });
}
const displayApi = element =>{
    console.log(element)
    const displaySection = document.getElementById('update');
    const div = document.createElement('div')
    div.classList.add('col')
    div.classList.add('card')
    div.innerHTML = `
    <div>
    <img src="HTTPS://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg" alt="">
      <h1>${element.title}</h1>
      <p>${element.author_name[0] ? element.author_name[0] :''}</p>
      <p>${element.publisher[0] ? element.publisher[0] : ''} </p>
      <p>${element.publish_date[0] ? element.publish_date[0] : ''}</p>
    </div>
    `
    displaySection.appendChild(div);

    document.getElementById('update').classList.remove("d-none")
    document.getElementById('spinner').classList.add("d-none")
}