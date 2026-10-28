import { useRouter } from "next/router"

export default function CategoryDetails() {

    const router = useRouter();
    const { slug } = router.query;

    return <>
    </>
}