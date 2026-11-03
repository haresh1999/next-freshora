import Model from "./Model";

class Category extends Model {

    static get table() {
        return "categories";
    }

}

export default Category;