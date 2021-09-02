/*********************  get API  ******************************/
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

/*********************  Api error  ******************************/
const displayError = error =>{
    console.log('jhamela hoise holo', error)
}

/*********************  Handle Array  ******************************/
const getApi = data => {
    console.log(data)
    console.log(data.numFound)
    console.log(data.docs[0].author_name[0])
    console.log(data.docs[0].text[1])

    const bookArray = data.docs;
    console.log(bookArray);
    const sliceArray = bookArray.slice(0, 9)
    console.log(sliceArray)

    const resultNumber = document.getElementById('result');
    resultNumber.textContent = ''
    const h5 = document.createElement('h5')
    h5.innerText = `Result found ${data.numFound}`
    resultNumber.appendChild(h5);

    const displaySection = document.getElementById('update');
    displaySection.textContent='';
    sliceArray?.forEach(element => {
        displayApi(element);        
    });
}

/*********************  Display Books  ******************************/
const displayApi = element =>{
    console.log(element)
    //////////// Main Div ////////////
    const displaySection = document.getElementById('update');
    const div = document.createElement('div')
    div.classList.add('col')
    div.classList.add('card-body')
    div.innerHTML = ``
    displaySection.appendChild(div);

    //////////// Cover ////////////
    const cover = element?.cover_i;
    if(cover === undefined){
        let coverImg = 'Image not found'
        console.log(coverImg)
        const imgNotFound = document.createElement('img')
        imgNotFound.src = "image/notFound2.jpg"
        div.appendChild(imgNotFound)
    }
    else{
        coverImg = cover;
        console.log(coverImg)
        const coverImage = document.createElement('img')
        coverImage.src = `HTTPS://covers.openlibrary.org/b/id/${coverImg}-L.jpg`;
        coverImage.style.width = "100%"
        div.appendChild(coverImage)
    }

    //////////// Book Name ////////////
    const bookTitle = element?.title
    const h1Title = document.createElement('h1')
    h1Title.innerText = `${bookTitle}`
    div.appendChild(h1Title);

    //////////// Author Name ////////////
    const author = element?.author_name?.length;
    if(author === undefined){
        let authorName = 'Author Unknown'
        console.log(authorName)
        const pUndefined = document.createElement('p')
        pUndefined.innerText = `${authorName}`
        div.appendChild(pUndefined)
    }
    else{
        authorName = element.author_name[0];
        console.log(authorName)
        const pDefined = document.createElement('p')
        pDefined.innerText = `${authorName}`
        div.appendChild(pDefined)
    }
    
    //////////// Publisher ////////////
    const publisher = element?.publisher?.length;
    console.log(publisher);
    if(publisher === undefined){
        let publisherName = 'Publisher Unknown'
        console.log(publisherName)
        const pUndefinedPublisher = document.createElement('p')
        pUndefinedPublisher.innerText = `${publisherName}`;
        div.appendChild(pUndefinedPublisher)
    }
    else{
        publisherName = element.publisher[0];
        console.log(publisherName)
        const pDefinedPublisher = document.createElement('p')
        pDefinedPublisher.innerText = `${publisherName}`;
        div.appendChild(pDefinedPublisher)
    }

    //////////// Publish Year ////////////
    const publishDate = element?.publish_year?.length;
    console.log(publishDate);
    if(publishDate === undefined){
        let publishYear = 'Publish year unknown'
        console.log(publishYear)
        const pUndefinedYear = document.createElement('p')
        pUndefinedYear.innerText = `${publishYear}`;
        div.appendChild(pUndefinedYear)
    }
    else{
        publishYear = element.publish_year[publishDate - 1];
        console.log(publishYear)
        const pDefinedYear = document.createElement('p')
        pDefinedYear.innerText = `${publishYear}`;
        div.appendChild(pDefinedYear)
    }

    document.getElementById('update').classList.remove("d-none")
    document.getElementById('spinner').classList.add("d-none")
}