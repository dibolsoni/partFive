
    /**
    * Search Form 
    * creates and append the form into the search div
    * Just type anything to start using
    */
function Search_Form(parent) {
        const input_id = 'search_input';
        const input_class = 'search_input';
        const input_placeholder = 'Search...';
        let div = document.querySelector(parent);
        let input = document.createElement('input');
        input.id = input_id;
        input.className = input_class;
        input.placeholder = input_placeholder;
        input.type = 'search';
        div.appendChild(input);
        input.addEventListener('keyup', (e) => {
            let cards = document.querySelectorAll('.card');
            if (e.target.value != '') {
                cards.forEach(item => {
                    const h3 = item.children[1].children[0].textContent;
                    h3.includes(e.target.value) ? item.style.display = '' : item.style.display = 'none';
                });
            } else {
                cards.forEach(item => {
                    item.style.display = '';
                });
            };
        })
}



const usersURL = 'https://randomuser.me/api/?results=12&nat=us';
const peopleList = document.getElementById('gallery');
const btn = document.querySelector('button');

    /**
    * Get JSON from an API
    * @return {Promise} - response
    */
async function getJSON(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  
    /**
    * Get Items from a returned JSON from an API
    * @return {Promise} An array of users
    */
  async function getPeople(url) {
    const peopleJSON = await getJSON(url);
    return Promise.all(peopleJSON.results);
  }

    /**
    * Highlight a detail from an user
    * 
    */
  function showDetail(id) {
        let tar = document.getElementById(id);
        tar.style.display = '';
        tar.disabled = false;

        tar.children[0].children[0].addEventListener('click', (e) => {
            tar.style.display = 'none';
            tar.disabled = true;
        })

        const prev = tar.children[1].children[0];
        if (id > 0) {
            prev.addEventListener('click', (e) => {
                tar.style.display = 'none';
                tar.disabled = true;
                showDetail(id - 1);
            });

        } else {
            prev.disabled = true;
            prev.style.backgroundColor = 'lightgrey';
        } 

        const next = tar.children[1].children[1];
        if (id < 11) {
            next.addEventListener('click', (e) => {
                tar.style.display = 'none';
                tar.disabled = true;
                showDetail(id + 1);
            });
        } else {
            next.disabled = true;
            next.style.backgroundColor = 'lightgrey';   
        }


  }
  
    /**
    * Generates a HTML cards from an imported API
    * @param Promise of users that could be used in the cards div
    */
  function generateHTML(data) {
    data.forEach( (person, i) => {
        const div = document.createElement('div');
        div.className = 'card';
        peopleList.appendChild(div);
        div.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        `;
        const detail = document.createElement('div');
        detail.className = 'modal-container';
        const body = document.querySelector('body');
        body.appendChild(detail);
        var options = { year: '2-digit', month: 'numeric', day: 'numeric' };
        const date = new Date(person.dob.date);
        var birth = new Intl.DateTimeFormat('en-US', options).format(date);
        detail.innerHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${person.phone}</p>
                    <p class="modal-text">${person.location.street}, ${person.location.state}, ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birth}</p>
                </div>
            </div>`;
            detail.innerHTML += `
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
            `;
        
        detail.disabled = true;
        detail.style.display = 'none';
        detail.id = i;

        div.addEventListener('click', (e) => {
            showDetail(i);
        });

    });
  }
  
/**
* Inicialize the functions
* @param UsersURL an url from a random users API
* Get data from an API, Generates HTML and catch errors
*/  
getPeople(usersURL)
    .then(generateHTML)
    .catch( err => {
    peopleList.innerHTML = '<h3> Something went wrong! </h3>';
    console.error(err);
    });

Search_Form('.search-container');
