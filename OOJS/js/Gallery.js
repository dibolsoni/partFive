class Gallery {
    constructor(url) {
        this.users = this.fetchUsers();
        this.url = url;
    }

    // Handle all fetch requests
    async getJSON() {
        try {
        const response = await fetch(this.url);
        console.log(await response.json());
        return await response.json();
        } catch (error) {
        //throw:
        //The throw statement throws a user-defined exception. Execution of the current function will stop (the statements after throw won't be executed), 
        //and control will be passed to the first catch block in the call stack. If no catch block exists among caller functions, the program will terminate.
        throw error;
        }
    }

    async fetchUsers() {
        const usersJSON = await this.getJSON();
        const users = usersJSON.results.map( (person) => {
            var options = { year: '2-digit', month: 'numeric', day: 'numeric' };
            const date = new Date(person.dob.date);
            var birth = new Intl.DateTimeFormat('en-US', options).format(date);
            let user = new User(
                `${person.name.first} ${person.name.last}`,
                person.email,
                person.location.city,
                person.phone,
                person.location.street, 
                person.location.state,
                birth,
                person.picture.thumbnail,
                person.picture.medium
            );
            return user;
        });
        // console.log('1 this users', this.users);
        // this.users = await Promise.all(users);
        // console.log('2 this users', this.users);
        this.users = await Promise.all(users);
        return this.users;
    }
    
    async Display() {
        this.fetchUsers()
            .then(data => this.users = data)
            .catch( err => {
                peopleList.innerHTML = '<h3> Something went wrong! </h3>';
                console.error(err);
              })
              .finally( );

        console.log('users', this.users)
        const gallery = document.querySelector('#gallery');
        // await this.users.forEach(user => {
        //     const card = document.createElement('div');
        //     card.className = 'card';
        //     gallery.appendChild(card);
        //     card.innerHTML = `
        //                     <div class="card-img-container">
        //                         <img class="card-img" src="${user.imgsmall}" alt="profile picture">
        //                     </div>
        //                     <div class="card-info-container">
        //                         <h3 id="name" class="card-name cap">${user.name}</h3>
        //                         <p class="card-text">${user.email}</p>
        //                         <p class="card-text cap">${user.address}, ${user.state}</p>
        //                     </div>
        //     `;
        // });
    }
}