import React, { useEffect } from "react";
import styled from "styled-components";

import { Display, Body1, H3 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { PRIMARY_900, SECONDARY_500 } from "@common/UI/colors";
import { trackEvent } from "@utils/helper";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  flex-direction: column;

  @media ${device.laptop} {
    margin: auto;
    max-width: 75rem;
    width: 86.67%;
  }
`;

const Title = styled(Display)`
  font-size: 1.75rem;
  color: ${PRIMARY_900};
  text-transform: uppercase;
  padding: 10px;

  @media ${device.laptop} {
    font-size: 3rem;
  }
`;

const Body = styled(Body1)`
  font-size: 1rem;
  color: ${SECONDARY_500};
  line-height: 1.85rem;
  padding: 10px;
  margin-bottom: 1rem;
`;

const Heading = styled(H3)`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 10px;
  color: ${SECONDARY_500};
`;

const Unordered = styled.ul`
  list-style-type: disc;

  li {
    font-size: 1rem;
    font-weight: normal;
    text-transform: none;
    color: ${SECONDARY_500};
  }
`;

const Content = ({ children }) => <Body>{children}</Body>;

const UnorderedList = ({ children }) => <Unordered>{children}</Unordered>;

const ListData = ({ heading, children }) => (
  <FlexBox column>
    <Heading>{heading}</Heading>
    <Content>{children}</Content>
  </FlexBox>
);

const PrivacyPolicy = () => {
  useEffect(() => {
    trackEvent("privacy_policy_page_load");
  }, []);

  return (
    <Wrapper>
      <FlexBox column>
        <Title bold>Privacy Policy</Title>
        <Content>Last updated March 18, 2024</Content>
      </FlexBox>
      <FlexBox column rowGap="2rem">
        <Content>
          This privacy notice for Pamprazzi (“Company,” “we,” “us,” or “our”),
          describes how and why we might collect, store, use, and/or share
          (“process”) your information when you use our services (“Services”),
          such as when you: Visit our website at{" "}
          <a href="https://pamprazzi.com/" target="_blank">
            https://pamprazzi.com/
          </a>
          , or any website of ours that links to this privacy notice. Download
          and use our mobile application (Pamprazzi), or any other application
          of ours that links to this privacy notice Engage with us in other
          related ways, including any sales, marketing, or events. Questions or
          concerns? Reading this privacy notice will help you understand your
          privacy rights and choices. If you do not agree with our policies and
          practices, please do not use our Services. If you still have any
          questions or concerns, please contact us at{" "}
          <a href="mailto:support@pamprazzi.com">support@pamprazzi.com</a>.
        </Content>
      </FlexBox>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            Summary
          </H3>
          <Content>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            (#toc) below to find the section you are looking for.
            <br /> <strong>
              What personal information do we process?
            </strong>{" "}
            When you visit, use, or navigate our Services, we may process
            personal information depending on how you interact with Pamprazzi
            and the Services, the choices you make, and the products and
            features you use.
          </Content>
          <Content>
            <strong>Do we process any sensitive personal information?</strong>{" "}
            We do not process sensitive personal information. <br />
            <strong>
              Do we receive any information from third parties?
            </strong>{" "}
            We do not receive any information from third parties.
            <br />
            <strong>How do we process your information?</strong> We process your
            information to provide, improve, and administer our Services,
            communicate with you, for security and fraud prevention, and to
            comply with law. We may also process your information for other
            purposes with your consent. We process your information only when we
            have a valid legal reason to do so. Learn more about how we process
            your information (#infouse) . <br />
            <strong>
              In what situations and with which parties do we share personal
              information?
            </strong>{" "}
            We may share information in specific situations and with specific
            third parties. Learn more about when and with whom we share your
            personal information (#whoshare) .<br />
            <strong>How do we keep your information safe?</strong> We have
            organizational and technical processes and procedures in place to
            protect your personal information. However, no electronic
            transmission over the internet or information storage technology can
            be guaranteed to be 100% secure, so we cannot promise or guarantee
            that hackers, cybercriminals, or other unauthorized third parties
            will not be able to defeat our security and improperly collect,
            access, steal, or modify your information. <br />
            <strong>What are your rights?</strong> Depending on where you are
            located geographically, the applicable privacy law may mean you have
            certain rights regarding your personal information. <br />
            <strong>How do you exercise your rights?</strong> The easiest way to
            exercise your rights is by submitting a data subject access request
            by contacting us. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            Contents
          </H3>
          <ListData heading="1. WHAT INFORMATION DO WE COLLECT?">
            Personal information you disclose to us
            <br /> <strong>In Short:</strong> We collect personal information
            that you provide to us.
            <br /> We collect personal information that you voluntarily provide
            to us when you register on the Services, express an interest in
            obtaining information about us or our products and Services, when
            you participate in activities on the Services, or otherwise when you
            contact us.
            <br /> Personal Information Provided by You. The personal
            information that we collect depends on the context of your
            interactions with us and the Services, the choices you make, and the
            products and features you use. The personal information we collect
            may include the following:
            <UnorderedList>
              <li>names</li>
              <li>phone numbers</li>
              <li>email addresses</li>
              <li>contact preferences</li>
              <li>contact or authentication data</li>
              <li>billing addresses</li>
              <li>usernames</li>
              <li>passwords</li>
            </UnorderedList>
            <strong>
              Sensitive Information. We do not process sensitive information.
            </strong>
            <UnorderedList>
              <li>
                <strong>Application Data.</strong> If you use our
                application(s), we also may collect the following information if
                you choose to provide us with access or permission.
              </li>
              <li>
                <strong>Geolocation Information.</strong> We may request access
                or permission to track location-based information from your
                mobile device, either continuously or while you are using our
                mobile application(s), to provide certain location-based
                services. If you wish to change our access or permissions, you
                may do so in your device’s settings.
              </li>
              <li>
                <strong>Mobile Device Access.</strong> We may request access or
                permission to certain features from your mobile device,
                including your mobile device’s bluetooth, camera, contacts,
                microphone, storage, and other features. If you wish to change
                our access or permissions, you may do so in your device’s
                settings.
              </li>
              <li>
                <strong>Push Notifications.</strong> We may request to send you
                push notifications regarding your account or certain features of
                the application(s). If you wish to opt out from receiving these
                types of communications, you may turn them off in your device’s
                settings.
              </li>
            </UnorderedList>
            This information is primarily needed to maintain the security and
            operation of our application(s), for troubleshooting, and for our
            internal analytics and reporting purposes.
            <br /> All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
            <br /> Information automatically collected <br />
            <strong>In Short:</strong> Some information — such as your Internet
            Protocol (IP) address and/or browser and device characteristics — is
            collected automatically when you visit our Services.
            <br /> We automatically collect certain information when you visit,
            use, or navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
            <br />
            Like many businesses, we also collect information through cookies
            and similar technologies.
            <br /> The information we collect includes:
            <br />
            <UnorderedList>
              <li>
                <strong>Log and Usage Data.</strong> Log and usage data is
                service-related, diagnostic, usage, and performance information
                our servers automatically collect when you access or use our
                Services and which we record in log files. Depending on how you
                interact with us, this log data may include your IP address,
                device information, browser type, and settings and information
                about your activity in the Services (such as the date/time
                stamps associated with your usage, pages and files viewed,
                searches, and other actions you take such as which features you
                use), device event information (such as system activity, error
                reports (sometimes called “crash dumps”), and hardware
                settings).
              </li>
              <li>
                <strong>Device Data.</strong> We collect device data such as
                information about your computer, phone, tablet, or other device
                you use to access the Services. Depending on the device used,
                this device data may include information such as your IP address
                (or proxy server), device and application identification
                numbers, location, browser type, hardware model, Internet
                service provider and/or mobile carrier, operating system, and
                system configuration information.
              </li>
              <li>
                <strong>Location Data.</strong> We collect location data such as
                information about your device’s location, which can be either
                precise or imprecise. How much information we collect depends on
                the type and settings of the device you use to access the
                Services. For example, we may use GPS and other technologies to
                collect geolocation data that tells us your current location
                (based on your IP address). You can opt out of allowing us to
                collect this information either by refusing access to the
                information or by disabling your Location setting on your
                device. However, if you choose to opt out, you may not be able
                to use certain aspects of the Services.
              </li>
            </UnorderedList>
          </ListData>
          <ListData heading="2. HOW DO WE PROCESS YOUR INFORMATION?">
            <strong>In Short:</strong> We process your information to provide,
            improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We may also
            process your information for other purposes with your consent.{" "}
            <br />
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
            <UnorderedList>
              <li>
                To facilitate account creation and authentication and otherwise
                manage user accounts. We may process your information so you can
                create and log in to your account, as well as keep your account
                in working order.
              </li>
              <li>
                To send administrative information to you. We may process your
                information to send you details about our products and services,
                changes to our terms and policies, and other similar
                information.
              </li>
              <li>
                To enable user-to-user communications. We may process your
                information if you choose to use any of our offerings that allow
                for communication with another user.
              </li>
              <li>
                To request feedback. We may process your information when
                necessary to request feedback and to contact you about your use
                of our Services.
              </li>
              <li>
                To send you marketing and promotional communications. We may
                process the personal information you send to us for our
                marketing purposes, if this is in accordance with your marketing
                preferences. You can opt out of our marketing emails at any
                time.
              </li>
              <li>
                To deliver targeted advertising to you. We may process your
                information to develop and display personalized content and
                advertising tailored to your interests, location, and more.
              </li>
              <li>
                To protect our Services. We may process your information as part
                of our efforts to keep our Services safe and secure, including
                fraud monitoring and prevention.
              </li>
              <li>
                To administer prize draws and competitions. We may process your
                information to administer prize draws and competitions.
              </li>
              <li>
                To evaluate and improve our Services, products, marketing, and
                your experience. We may process your information when we believe
                it is necessary to identify usage trends, determine the
                effectiveness of our promotional campaigns, and to evaluate and
                improve our Services, products, marketing, and your experience.
              </li>
              <li>
                To identify usage trends. We may process information about how
                you use our Services to better understand how they are being
                used so we can improve them.
              </li>
              <li>
                To comply with our legal obligations. We may process your
                information to comply with our legal obligations, respond to
                legal requests, and exercise, establish, or defend our legal
                rights.
              </li>
            </UnorderedList>
          </ListData>
          <ListData heading="3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?">
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following third
            parties.
            <br /> We may need to share your personal information in the
            following situations:
            <UnorderedList>
              <li>
                <strong>Business Transfers.</strong> We may share or transfer
                your information in connection with, or during negotiations of,
                any merger, sale of company assets, financing, or acquisition of
                all or a portion of our business to another company.
              </li>
              <li>
                <strong>When we use Google Maps Platform APIs.</strong> We may
                share your information with certain Google Maps Platform APIs
                (e.g., Google Maps API, Places API). We obtain and store on your
                device (“cache”) your location. You may revoke your consent
                anytime by contacting us at the contact details provided at the
                end of this document.
              </li>
              <li>
                <strong>Business Partners.</strong> We may share your
                information with our business partners to offer you certain
                products, services, or promotions.
              </li>
              <li>
                <strong>Offer Wall.</strong> Our application(s) may display a
                third-party hosted “offer wall.” Such an offer wall allows
                third-party advertisers to offer virtual currency, gifts, or
                other items to users in return for the acceptance and completion
                of an advertisement offer. Such an offer wall may appear in our
                application(s) and be displayed to you based on certain data,
                such as your geographic area or demographic information. When
                you click on an offer wall, you will be brought to an external
                website belonging to other persons and will leave our
                application(s). A unique identifier, such as your user ID, will
                be shared with the offer wall provider in order to prevent fraud
                and properly credit your account with the relevant reward.
              </li>
            </UnorderedList>
          </ListData>
          <ListData heading="4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?">
            <strong>In Short:</strong> We may use cookies and other tracking
            technologies to collect and store your information.
            <br /> We may use cookies and similar tracking technologies (like
            web beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice.
          </ListData>
          <ListData heading="5. HOW LONG DO WE KEEP YOUR INFORMATION?">
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfill the purposes outlined in this privacy notice
            unless otherwise required by law. We will only keep your personal
            information for as long as it is necessary for the purposes set out
            in this privacy notice, unless a longer retention period is required
            or permitted by law (such as tax, accounting, or other legal
            requirements). No purpose in this notice will require us keeping
            your personal information for longer than the period of time in
            which users have an account with us.
            <br /> When we have no ongoing legitimate business need to process
            your personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </ListData>
          <ListData heading="6. HOW DO WE KEEP YOUR INFORMATION SAFE?">
            <strong>In Short:</strong> We aim to protect your personal
            information through a system of organizational and technical
            security measures. We have implemented appropriate and reasonable
            technical and organizational security measures designed to protect
            the security of any personal information we process. However,
            despite our safeguards and efforts to secure your information, no
            electronic transmission over the Internet or information storage
            technology can be guaranteed to be 100% secure, so we cannot promise
            or guarantee that hackers, cybercriminals, or other unauthorized
            third parties will not be able to defeat our security and improperly
            collect, access, steal, or modify your information. Although we will
            do our best to protect your personal information, transmission of
            personal information to and from our Services is at your own risk.
            You should only access the Services within a secure environment.
          </ListData>
          <ListData heading="7. WHAT ARE YOUR PRIVACY RIGHTS?">
            <strong>In Short:</strong> You may review, change, or terminate your
            account at any time. <br /> <br />
            If you are located in the EEA or UK and you believe we are
            unlawfully processing your personal information, you also have the
            right to complain to your Member State data protection authority
            https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            or UK data protection authority
            https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/
            .<br /> If you are located in Switzerland, you may contact the
            Federal Data Protection and Information Commissioner
            <br /> Withdrawing your consent: If we are relying on your consent
            to process your personal information, which may be express and/or
            implied consent depending on the applicable law, you have the right
            to withdraw your consent at any time. You can withdraw your consent
            at any time by contacting us by using the contact details provided
            in the section.”
          </ListData>
          <ListData heading="8. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?">
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
            <br /> Opting out of marketing and promotional communications: You
            can unsubscribe from our marketing and promotional communications at
            any time by clicking on the unsubscribe link in the emails that we
            send, replying
            <strong> “STOP” or “UNSUBSCRIBE”</strong> to the SMS messages that
            we send, or by contacting us using the details provided in the
            section “HOW CAN YOU CONTACT US ABOUT THIS NOTICE? ” below. You will
            then be removed from the marketing lists. However, we may still
            communicate with you — for example, to send you service-related
            messages that are necessary for the administration and use of your
            account, to respond to service requests, or for other non-marketing
            purposes.
            <br />
            Account Information
            <br /> If you would at any time like to review or change the
            information in your account or terminate your account, you can:
            <UnorderedList>
              <li>Contact us using the contact information provided.</li>
              <li>
                Log in to your account settings and update your user account.
              </li>
            </UnorderedList>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal
            requirements.
            <br /> Cookies and similar technologies: Most Web browsers are set
            to accept cookies by default. If you prefer, you can usually choose
            to set your browser to remove cookies and to reject cookies. If you
            choose to remove cookies or reject cookies, this could affect
            certain features or services of our Services. You may also opt out
            of interest-based advertising by advertisers
            (http://www.aboutads.info/choices/) on our Services.
            <br /> If you have questions or comments about your privacy rights,
            you may email us at{" "}
            <a href="mailto:support@pamprazzi.com">support@pamprazzi.com</a>.
          </ListData>
          <ListData heading="9. CONTROLS FOR DO-NOT-TRACK FEATURES">
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (“DNT”) feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. At
            this stage no uniform technology standard for recognizing and
            implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this privacy notice.
          </ListData>
          <ListData heading="10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?">
            <strong>In Short:</strong> Yes, if you are a resident of California,
            you are granted specific rights regarding access to your personal
            information.
            <br />
            California Civil Code Section 1798.83, also known as the “Shine The
            Light” law, permits our users who are California residents to
            request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below.
            <br /> If you are under 18 years of age, reside in California, and
            have a registered account with Services, you have the right to
            request removal of unwanted data that you publicly post on the
            Services. To request removal of such data, please contact us using
            the contact information provided below and include the email address
            associated with your account and a statement that you reside in
            California. We will make sure the data is not publicly displayed on
            the Services, but please be aware that the data may not be
            completely or comprehensively removed from all our systems (e.g.,
            backups, etc.).
          </ListData>
          <ListData heading="11. DO WE MAKE UPDATES TO THIS NOTICE?">
            <strong>In Short:</strong> Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
            <br /> We may update this privacy notice from time to time. The
            updated version will be indicated by an updated “Revised” date and
            the updated version will be effective as soon as it is accessible.
            If we make material changes to this privacy notice, we may notify
            you either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </ListData>
        </FlexBox>
      </section>
    </Wrapper>
  );
};

export default PrivacyPolicy;
