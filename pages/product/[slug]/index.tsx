import { useRouter } from "next/router";

export default function ProductDetails() {
    const router = useRouter()
    const { slug } = router.query;

    return (<>
        <h1>Product Details: {slug}</h1>
    </>);
}