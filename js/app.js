const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent=``;
    //display 10phone only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);

        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    //display no phone found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    //display all phones
    phones.forEach(phone => {
        // console.log(phone);
        
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card h-100 p-4">
             <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneDiv);

    });
    //stop loader/spinner
    toggleSpinner(false);
}

//search function
const processSearch = (dataLimit)=>{
    //start spinner
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value='';
}
//handle search button click
document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);
    
})
//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

// spinner function
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('spinner')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

//not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}
//modal 
const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-detail')
    phoneDetails.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate :'no release date found'}</p>
    <p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage :'no rstorage info found'}</p>
    `
}

loadPhones('apple');