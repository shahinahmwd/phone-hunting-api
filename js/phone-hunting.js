const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones);
}
const displayPhone = phones =>{
    // console.log(phones);
    phoneContainer = document.getElementById('phone_container');
    // phoneContainer clear
    phoneContainer.textContent = ``;
    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }
    // display only first 12 phone
    phones = phones.slice(0,12);
    phones.forEach(phone =>{
        console.log(phone);
       const phoneCard = document.createElement('div');
       phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
       phoneCard.innerHTML = `<figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>`;
            phoneContainer.appendChild(phoneCard);        
    })
}

// handle phone button
const handleSearch = () =>{
  const searchFiled = document.getElementById('search-filed');
  const searchText = searchFiled.value;
  console.log(searchText);
  loadPhone(searchText);
}
// search again button
const handleSearch2 = () =>{
  const searchFiled = document.getElementById('search-filed2');
  const searchText = searchFiled.value;
  // console.log(searchText);
  loadPhone(searchText);
}

const toggleLoadingSpinner = () =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.classList.remove('hidden')
}

// loadPhone();
