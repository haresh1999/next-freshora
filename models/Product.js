import Model from "./Model";

class Product extends Model {

    static get table() {
        return "products";
    }

}

export default Product;