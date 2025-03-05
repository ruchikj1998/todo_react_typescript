import { useSearchParams } from "react-router-dom";

export function useNavFilter() {

    const [searchParam] = useSearchParams();
    return searchParam.get("todos");

}