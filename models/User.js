import Model from "./Model";

class User extends Model {

    static get table() {
        return "users";
    }
}

export default User;