const getSearchedText = () =>{
    const getSearchField = document.getElementById('search');
    const searchText = getSearchField.value;
    getSearchField.value = ''
    console.log(searchText)
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayApi(data))
    .catch(error => displayError(error));
}

const displayError = error =>{
    console.log('jhamela hoise holo', error)
}

const displayApi = data => {
    console.log(data)
    console.log(data.numFound)
    console.log(data.docs[0].author_name[0])
    console.log(data.docs[0].text[1])
    const displaySection = document.getElementById('update');
    const div = document.createElement('div')
    const h5 = document.createElement('h5')
    h5.innerText = `Result found ${data.numFound}`
    div.classList.add('card')
    // div.innerText = `name of book ${data.docs[0].text[1]}`
    div.innerHTML = `
    <div>
      <h1>${data.docs[0].text[1]}</h1>
      <p>${data.docs[0].author_name[0]}</p>
    </div>
    `
    displaySection.appendChild(h5);
    displaySection.appendChild(div);
    

}