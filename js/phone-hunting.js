const loadPhone = async (searchText = '13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones, isShowAll);
}
const displayPhone = (phones, isShowAll) => {
  // console.log(phones);
  phoneContainer = document.getElementById('phone_container');
  // phoneContainer clear
  phoneContainer.textContent = ``;
  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }
  console.log('is show all', isShowAll);
  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach(phone => {
    console.log(phone);
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `<figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body text-center items-center">
                      <h2 class="card-title ">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails ('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
}

// handle phone button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchFiled = document.getElementById('search-filed');
  const searchText = searchFiled.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}
// search again button
// const handleSearch2 = () =>{
//   toggleLoadingSpinner (true);
//   const searchFiled = document.getElementById('search-filed2');
//   const searchText = searchFiled.value;
//   // console.log(searchText);
//   loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}
// handle show all
const handleShowAll = () => {
  handleSearch(true);
}
// handle show details
const handleShowDetails = async (id) => {
  console.log('show details', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" class
  ="w-100% text-center">
   <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
   <p><span>Display:</span>${phone?.mainFeatures?.displaySize }</p>
   <p><span>chipSet:</span>${phone?.mainFeatures?.chipSet}</p>
   <p><span>memory:</span>${phone?.mainFeatures?.memory}</p>
   <p><span>slug:</span>${phone?.slug}</p>
   <p><span>releaseDate:</span>${phone?.releaseDate}</p>
   <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
  `
  // show the modal 
  show_details_modal.showModal();
}

loadPhone();
