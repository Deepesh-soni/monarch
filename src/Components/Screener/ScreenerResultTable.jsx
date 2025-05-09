import React from "react";
import { Skeleton } from "antd";
import StockTableView from "../WatchList/StockTable";

const ScreenerResultTable = ({ loadingData, data }) => {
    if (loadingData) {
        return (
            <Skeleton
                active
                paragraph={{ rows: 8 }}
                style={{ marginTop: "2rem" }}
            />
        );
    }
    return data?.length > 0 ? <StockTableView data={data} /> : null;
};

export default ScreenerResultTable; 