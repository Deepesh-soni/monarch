import React, { useEffect } from "react";

import DashboardLayout from "@layout/DashboardLayout";
import Transactions from "@components/Transactions";
import { trackEvent } from "@utils/helper";

const Transaction = () => {
  useEffect(() => {
    trackEvent("db_review_page_load", {
      currentPage: "review-general",
    });
  }, []);

  return (
    <DashboardLayout>
      <Transactions />
    </DashboardLayout>
  );
};

export default Transaction;
