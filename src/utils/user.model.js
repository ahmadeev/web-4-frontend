export class UserDTO {
    constructor(name, password, isAdmin) {
        this.name = name;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}