class User {
    constructor(name, email, city, phone, address, state, birthday, small, mid) {
        this.name = name;
        this.email = email;
        this.city = city;
        this.phone = phone;
        this.address = address;
        this.state = state.toUpperCase();
        this.birthday = birthday;
        this.imgsmall = small;
        this.imgmedium = mid;
    }


}