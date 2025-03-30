import React, { useEffect } from "react";

import ContactUs from "@components/ContactUs";
import HomePageLayout from "@layout/HomePageLayout";
import { trackEvent } from "@utils/helper";

const ContactUsPage = () => {
  useEffect(() => {
    trackEvent("contact_us_page_load");
  }, []);

  return (
    <HomePageLayout>
      <ContactUs />;
    </HomePageLayout>
  );
};

export default ContactUsPage;
