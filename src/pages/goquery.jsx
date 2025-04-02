import { useRouter } from "next/router";
import { encode } from "js-base64";
import { useEffect } from "react";

export default function GoToPresetQuery() {
    const router = useRouter();

    useEffect(() => {
        const query = {
            combinator: "and",
            rules: [
                {
                    field: "sectorName",
                    operator: "=",
                    value: "Mining & Mineral products",
                },
            ],
        };

        const encoded = encode(JSON.stringify(query));
        router.push(`/query?preset=${encoded}`);
    }, []);

    return null; // or a loader/spinner
}
