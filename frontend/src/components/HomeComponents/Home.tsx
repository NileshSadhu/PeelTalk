import { useUserStore } from "../../store/useUserStore";
import { Loading } from "../Common/Loading";

export const Home = () => {
    const loading = useUserStore((state) => state.loading);
    if (loading) return <Loading />;
    return (
        <h1>Home</h1>
    );
};