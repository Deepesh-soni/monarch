import React, { useEffect } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Display, Body1, H3, H1 } from "@common/UI/Headings";
import { PRIMARY_900, SECONDARY_500 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
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

const TermsAndConditions = () => {
  useEffect(() => {
    trackEvent("terms_and_conditions_page_load");
  }, []);

  return (
    <Wrapper>
      <FlexBox column>
        <Title bold>Terms And Conditions</Title>
        <Content>Last updated March 18, 2024</Content>
        <Content>AGREEMENT TO OUR LEGAL TERMS</Content>
      </FlexBox>
      <FlexBox column rowGap="0.5rem">
        <Content>We are Pamprazzi (“Company,” “we,” “us,” “our”)</Content>
        <Content>
          We operate the website{" "}
          <a href="https://pamprazzi.com/" target="_blank">
            https://pamprazzi.com/
          </a>{" "}
          (the “Site”), the mobile application Pamprazzi (the “App”), as well as
          any other related products and services that refer or link to these
          legal terms (the “Legal Terms”) (collectively, the “Services”).
        </Content>
        <Content>
          Welcome to Pamprazzi, your one-stop destination for seamless salon
          bookings and a comprehensive platform for salon businesses. We are
          dedicated to revolutionizing the way salons connect with their
          customers and providing an exceptional experience for both salon
          owners and clients. With our innovative features and user-friendly
          interface, we ensure that every salon appointment is a delightful and
          stress-free experience.
        </Content>
        <Content>
          ‘You can contact us by phone at +91 85019-87307, email at
          <a href="mailto:support@pamprazzi.com">support@pamprazzi.com</a>
        </Content>
        <Content>
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity (“you”), and
          Pamprazzi, concerning your access to and use of the Services. You
          agree that by accessing the Services, you have read, understood, and
          agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE
          WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM
          USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
        </Content>
        <Content>
          We will provide you with prior notice of any scheduled changes to the
          Services you are using. The modified Legal Terms will become effective
          upon posting or notifying you by pamprazzi@protonmail.com, as stated
          in the email message. By continuing to use the Services after the
          effective date of any changes, you agree to be bound by the modified
          terms.
        </Content>
        <Content>
          The Services are intended for users who are at least 13 years of age.
          All users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of, and be
          directly supervised by, their parent or guardian to use the Services.
          If you are a minor, you must have your parent or guardian read and
          agree to these Legal Terms prior to you using the Services.
        </Content>
        <Content>
          We recommend that you print a copy of these Legal Terms for your
          records.
        </Content>
      </FlexBox>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            1. OUR SERVICES
          </H3>
          <Content>
            The information provided when using the Services is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly, those
            persons who choose to access the Services from other locations do so
            on their own initiative and are solely responsible for compliance
            with local laws, if and to the extent local laws are applicable.
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            2. INTELLECTUAL PROPERTY RIGHTS
          </H3>
          <Content>
            <strong>Our intellectual property</strong>
            We are the owner or the licensee of all intellectual property rights
            in our Services, including all source code, databases,
            functionality, software, website designs, audio, video, text,
            photographs, and graphics in the Services (collectively, the
            “Content”), as well as the trademarks, service marks, and logos
            contained therein (the “Marks”). Our Content and Marks are protected
            by copyright and trademark laws (and various other intellectual
            property rights and unfair competition laws) and treaties in the
            United States and around the world.
            <Content>
              The Content and Marks are provided in or through the Services “AS
              IS” for your personal, non-commercial use or internal business
              purpose only.
            </Content>
            <H1>Your use of our Services</H1>
            <Content>
              Subject to your compliance with these Legal Terms, including the
              “PROHIBITED ACTIVITIES” section below, we grant you a
              non-exclusive, non-transferable, revocable license to:
            </Content>
            <UnorderedList>
              <li>access the Services; and</li>
              <li>
                download or print a copy of any portion of the Content to which
                you have properly gained access.
              </li>
            </UnorderedList>
            <Content>
              solely for your personal, non-commercial use or internal business
              purpose.
            </Content>
            <Content>
              Except as set out in this section or elsewhere in our Legal Terms,
              no part of the Services and no Content or Marks may be copied,
              reproduced aggregated, republished,
              <br /> uploaded, posted, publicly displayed, encoded, translated,
              transmitted, distributed, sold, licensed, or otherwise exploited
              for any commercial purpose whatsoever, without our express prior
              written permission.
            </Content>
            <Content>
              If you wish to make any use of the Services, Content, or Marks
              other than as set out in this section or elsewhere in our Legal
              Terms, please address your request to:{" "}
              <a href="mailto:support@pamprazzi.com">support@pamprazzi.com</a>{" "}
              If we ever grant you the permission to post, reproduce, or
              publicly display any part of our Services or Content, you must
              identify us as the owners or licensors of the Services, Content,
              or Marks and ensure that any copyright or proprietary notice
              appears or is visible on posting, reproducing, or displaying our
              Content. We reserve all rights not expressly granted to you in and
              to the Services, Content, and Marks. Any breach of these
              Intellectual Property Rights will constitute a material breach of
              our Legal Terms and your right to use our Services will terminate
              immediately. <strong>Your submissions and contributions</strong>
              Please review this section and the “PROHIBITED ACTIVITIES” section
              carefully prior to using our Services to understand the (a) rights
              you give us and (b) obligations you have when you post or upload
              any content through the Services.
              <strong>Submissions:</strong> By directly sending us any question,
              comment, idea, suggestion, feedback, or other information about
              the Services (“Submissions”), you agree to assign to us all
              intellectual property rights in such Submission. You agree that we
              shall own this Submission and be entitled to its unrestricted use
              and dissemination for any lawful purpose, commercial or otherwise,
              without acknowledgment or compensation to you.{" "}
              <strong>Contributions:</strong> The Services may invite you to
              chat, contribute to, or participate in blogs, message boards,
              online forums, and other functionality during which you may
              create, submit, post, display, transmit, publish, distribute, or
              broadcast content and materials to us or through the Services,
              including but not limited to text, writings, video, audio,
              photographs, music, graphics, comments, reviews, rating
              suggestions, personal information, or other material
              (“Contributions”). Any Submission that is publicly posted shall
              also be treated as a Contribution. <br />
              ‘You understand that Contributions may be viewable by other users
              of the Services and possibly through third-party websites. When
              you post Contributions, you grant us a license (including use of
              your name, trademarks, and logos): By posting any Contributions,
              you grant us an unrestricted, unlimited, irrevocable, perpetual,
              non-exclusive, transferable, royalty-free, fully-paid, worldwide
              right, and license to: use, copy, reproduce, distribute, sell,
              resell, publish, broadcast, retitle, store, publicly perform,
              publicly display, reformat, translate, excerpt (in whole or in
              part), and exploit your Contributions (including, without
              limitation, your image, name, and voice) for any purpose,
              commercial, advertising, or otherwise, to prepare derivative works
              of, or incorporate into other works, your Contributions, and to
              sublicense the licenses granted in this section. Our use and
              distribution may occur in any media formats and through any media
              channels. This license includes our use of your name, company
              name, and franchise name, as applicable, and any of the
              trademarks, service marks, trade names, logos, and personal and
              commercial images you provide. You are responsible for what you
              post or upload: By sending us Submissions and/or posting
              Contributions through any part of the Services or making
              Contributions accessible through the Services by linking your
              account through the Services to any of your social networking
              accounts, you:
              <UnorderedList>
                <li>
                  confirm that you have read and agree with our “PROHIBITED
                  ACTIVITIES” and will not post, send, publish, upload, or
                  transmit through the Services any Submission nor post any
                  Contribution that is illegal, harassing, hateful, harmful,
                  defamatory, obscene, bullying, abusive, discriminatory,
                  threatening to any person or group, sexually explicit, false,
                  inaccurate, deceitful, or misleading;
                </li>
                <li>
                  to the extent permissible by applicable law, waive any and all
                  moral rights to any such Submission and/or Contribution;
                </li>
                <li>
                  warrant that any such Submission and/or Contributions are
                  original to you or that you have the necessary rights and
                  licenses to submit such Submissions and/or Contributions and
                  that you have full authority to grant us the above-mentioned
                  rights in relation to your Submissions and/or Contributions;
                  and
                </li>
                <li>
                  warrant and represent that your Submissions and/or
                  Contributions do not constitute confidential information.
                </li>
              </UnorderedList>
              You are solely responsible for your Submissions and/or
              Contributions and you expressly agree to reimburse us for any and
              all losses that we may suffer because of your breach of (a) this
              section, (b) any third party’s intellectual property rights, or
              (c) applicable law. ‘We may remove or edit your Content: Although
              we have no obligation to monitor any Contributions, we shall have
              the right to remove or edit any Contributions at any time without
              notice if in our reasonable opinion we consider such Contributions
              harmful or in breach of these Legal Terms. If we remove or edit
              any such Contributions, we may also suspend or disable your
              account and report you to the authorities.
              <strong bold>Copyright infringement</strong>
              We respect the intellectual property rights of others. If you
              believe that any material available on or through the Services
              infringes upon any copyright you own or control, please
              immediately refer to the “COPYRIGHT INFRINGEMENTS” section below.
            </Content>
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            3. USER REPRESENTATIONS
          </H3>
          <Content>
            By using the Services, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary; (3)
            you have the legal capacity and you agree to comply with these Legal
            Terms; (4) you are not under the age of 13; (5) you are not a minor
            in the jurisdiction in which you reside, or if a minor, you have
            received parental permission to use the Services; (6) you will not
            access the Services through automated or non-human means, whether
            through a bot, script or otherwise; (7) you will not use the
            <br />
            Services for any illegal or unauthorized purpose; and (8) your use
            of the Services will not violate any applicable law or regulation.
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Services (or any portion thereof).
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            4. USER REGISTRATION
          </H3>
          <Content>
            ‘You may be required to register to use the Services. You agree to
            keep your password confidential and will be responsible for all use
            of your account and password. We reserve the right to remove,
            reclaim, or change a username you select if we determine, in our
            sole discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            5. PURCHASES AND PAYMENT
          </H3>
          <Content>
            We accept the following forms of payment:
            <UnorderedList>
              <li>Visa Mastercard PayPal UPI American Express</li>
            </UnorderedList>
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            6. POLICY
          </H3>
          <Content>
            All sales are final and refunds will be as per case basis.
            “Pamprazzi” reserves the right to issue the refund per case basis.
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            7. PROHIBITED ACTIVITIES
          </H3>
          <Content>
            ‘You may not access or use the Services for any purpose other than
            that for which we make the Services available. The Services may not
            be used in connection with any commercial endeavors except those
            that are specifically endorsed or approved by us.
            <Content>As a user of the Services, you agree not to:</Content>
            <UnorderedList>
              <li>
                Systematically retrieve data or other content from the Services
                to create or compile, directly or indirectly, a collection,
                compilation, database, or directory without <br />
                written permission from us.
              </li>
              <li>
                Trick, defraud, or mislead us and other users, especially in any
                attempt to learn sensitive account information such as user
                passwords.
              </li>
              <li>
                Circumvent, disable, or otherwise interfere with
                security-related features of the Services, including features
                that prevent or restrict the use or copying of any Contentor
                enforce limitations on the use of the Services and/or the
                Content contained therein.
              </li>
              <li>
                Disparage, tarnish, or otherwise harm, in our opinion, us and/or
                the Services.
              </li>
              <li>
                Use any information obtained from the Services in order to
                harass, abuse, or harm another person.
              </li>
              <li>
                Make improper use of our support services or submit false
                reports of abuse or misconduct.
              </li>
              <li>
                Use the Services in a manner inconsistent with any applicable
                laws or regulations.
              </li>
              <li>
                Engage in unauthorized framing of or linking to the Services.
              </li>
              <li>
                Upload or transmit (or attempt to upload or to transmit)
                viruses, Trojan horses, or other material, including excessive
                use of capital letters and spamming (continuous posting of
                repetitive text), that interferes with any party’s uninterrupted
                use and enjoyment of the Services or modifies, impairs,
                disrupts, alters, or interferes with the use, features,
                functions, operation, or maintenance of the Services.
              </li>
              <li>
                Engage in any automated use of the system, such as using scripts
                to send comments or messages, or using any data mining, robots,
                or similar data gathering and extraction tools.
              </li>
              <li>
                Delete the copyright or other proprietary rights notice from any
                Content.
              </li>
              <li>
                Attempt to impersonate another user or person or use the
                username of another user.
              </li>
              <li>
                Upload or transmit (or attempt to upload or to transmit) any
                material that acts as a passive or active information collection
                or transmission mechanism, including without limitation, clear
                graphics interchange formats (“gifs”), 1×1 pixels, web bugs,
                cookies, or other similar devices (sometimes referred to as
                “spyware” or “passive collection mechanisms” or “pcms”).
              </li>
              <li>
                Interfere with, disrupt, or create an undue burden on the
                Services or the networks or services connected to the Services.
              </li>
              <li>
                Harass, annoy, intimidate, or threaten any of our employees or
                agents engaged in providing any portion of the Services to you.
              </li>
              <li>
                Attempt to bypass any measures of the Services designed to
                prevent or restrict access to the Services, or any portion of
                the Services.
              </li>
              <li>
                Copy or adapt the Services’ software, including but not limited
                to Flash, PHP, HTML, JavaScript, or other code.
              </li>
              <li>
                Except as permitted by applicable law, decipher, decompile,
                disassemble, or reverse engineer any of the software comprising
                or in any way making up a part of the Services.
              </li>
              <li>
                Make any unauthorized use of the Services, including collecting
                usernames and/or email addresses of users by electronic or other
                means for the purpose of <br />
                sending unsolicited email, or creating user accounts by
                automated means or under false pretenses.
              </li>
              <li>
                Use the Services as part of any effort to compete with us or
                otherwise use the Services and/or the Content for any
                revenue-generating endeavor or commercial enterprise.
              </li>
            </UnorderedList>
          </Content>
        </FlexBox>
      </section>
      <section>
        <FlexBox column>
          <H3 bold color={PRIMARY_900} padding="10px">
            8. USER GENERATED CONTRIBUTIONS
          </H3>
          <Content>
            The Services may invite you to chat, contribute to, or participate
            in blogs, message boards, online forums, and other functionality,
            and may provide you with the opportunity to create, submit, post,
            display, transmit, perform, publish, distribute, or broadcast
            content and materials to us or on the Services, including but not
            limited to text, writings, video, audio, photographs, graphics,
            comments, suggestions, or personal information or other material
            (collectively, “Contributions”). Contributions may be viewable by
            other users of the Services and through third-party websites. As
            such, any Contributions you transmit may be treated as
            non-confidential and non-proprietary.
            <Content>
              When you create or make available any Contributions, you thereby
              represent and warrant that:
            </Content>
            <UnorderedList>
              <li>
                The creation, distribution, transmission, public display, or
                performance, and the accessing, downloading, or copying of your
                Contributions do not and will not infringe the proprietary
                rights, including but not limited to the copyright, patent,
                trademark, trade secret, or moral rights of any third party.
              </li>
              <li>
                You are the creator and owner of or have the necessary licenses,
                rights, consents, releases, and permissions to use and to
                authorize us, the Services, and other users of the Services to
                use your Contributions in any manner contemplated by the
                Services and these Legal Terms.
              </li>
              <li>
                You have the written consent, release, and/or permission of each
                and every identifiable individual person in your Contributions
                to use the name or likeness of each and every such identifiable
                individual person to enable inclusion and use of your
                Contributions in any manner contemplated by the Services and
                these Legal Terms.
              </li>
              <li>
                Your Contributions are not false, inaccurate, or misleading.
              </li>
              <li>
                Your Contributions are not unsolicited or unauthorized
                advertising, promotional materials, pyramid schemes, chain
                letters, spam, mass mailings, or other forms of solicitation.
              </li>
              <li>
                Your Contributions are not obscene, lewd, lascivious, filthy,
                violent, harassing, libelous, slanderous, or otherwise
                objectionable (as determined by us).
              </li>
              <li>
                Your Contributions do not ridicule, mock, disparage, intimidate,
                or abuse anyone.
              </li>
              <li>
                Your Contributions are not used to harass or threaten (in the
                legal sense of those terms) any other person and topromote
                violence against a specific person or class of people.
              </li>
            </UnorderedList>
          </Content>
        </FlexBox>
      </section>
      <Content>
        Any use of the Services in violation of the foregoing violates these
        Legal Terms and may result in, among other things, termination or
        suspension of your rights to use the Services.
      </Content>
    </Wrapper>
  );
};

export default TermsAndConditions;
