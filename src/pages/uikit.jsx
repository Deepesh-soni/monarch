import React, { useState } from "react";

import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import Avatar from "@common/UI/Avatar";
import Chip from "@common/UI/Chips";
import ClientTypeChip from "@common/UI/ClientTypeChip";
import Radio from "@common/UI/Radio";
import TextArea from "@common/UI/TextArea";
import CustomToggle from "@common/UI/Toggle";
import CustomToast from "@common/UI/CustomToast";
import Rating from "../Components/common/UI/Ratings";
import { boxShadowDs1, boxShadowDs2 } from "../Components/common/UI/styles";
import Filter from "../Components/common/UI/Filter";
import {
  PRIMARY_0,
  PRIMARY_100,
  PRIMARY_200,
  PRIMARY_300,
  PRIMARY_400,
  PRIMARY_500,
  PRIMARY_600,
  PRIMARY_700,
  PRIMARY_800,
  PRIMARY_900,
  SECONDARY_0,
  SECONDARY_100,
  SECONDARY_200,
  SECONDARY_300,
  SECONDARY_400,
  SECONDARY_500,
  SECONDARY_600,
  SECONDARY_700,
  SECONDARY_800,
  SECONDARY_900,
  SECONDARY_901,
  ACCENT_0,
  ACCENT_100,
  ACCENT_200,
  ACCENT_300,
  ACCENT_400,
  ACCENT_500,
  ACCENT_600,
  ACCENT_700,
  ACCENT_800,
  ACCENT_900,
  SUCCESS,
  ERROR,
  WARNING,
  modalBackdrop,
  overlayBackdrop,
  listingChip,
  chipSelectedbg,
  RATE_BACKGROUND,
  STARCOLOR,
  TAB_COLOR,
  WHITE,
  GOLDEN,
  BLACK,
  BLACK_TRANSPARENT,
  DARK_GREY,
  DARK_BLACK_GREY,
  GREY,
  LIGHT_BLUE_GREY,
  LIGHT_GREY,
  LIGHTEST_GREY,
  LIGHT_BLACK_GREY,
  LIGHT_WHITE_GREY,
  LIGHT_PINK_GREY,
  PURPLE_GREY,
  ASH_GREY,
  LIGHT_PINK,
  PEACH,
  LIGHT_WHITE_PINK,
  DARK_PINK,
  PALE_SALMON,
  LIGHT_PURPLE,
  PURPLE_BLUE,
  BRIGHT_LIGHT_PURPLE,
  SEA_BLUE,
  DARK_BLUE,
  DARK_BLUE_20_OPACITY,
  LIGHT_PURPLE_BLUE,
  FADED_BLUE,
  LIGHTEST_BLUE,
  LIGHT_WHITE_BLUE,
  CORNFLOWER_BLUE,
  RED,
  LIGHT_RED,
  DARK_RED,
  BRIGHT_RED,
  LINEN,
  BOSTON_UNIVERSITY_RED,
  LIGHT_BROWN,
  VIOLET_BLUE,
  LIGHT_BLUE,
  LIGHTER_BLUE,
  YELLOW,
  LIGHT_YELLOW,
  MINT_GREEN,
  LIGHTEST_BLUE_GREY,
  LIGHTEST_WHITE_PINK,
  PURPLE,
  DARK_GREEN,
  TURQUOISE,
  SHADOW_GREY,
  DARK_TEAL,
  DARKEST_GREY,
  BORDER_GREY,
  HEADING_GREY,
  YELLOW_BROWN,
  SKY_BLUE,
  FACEBOOK_BG_COLOR,
  TWITTER_BG_COLOR,
  PINTEREST_BG_COLOR,
  LINKEDIN_BG_COLOR,
  DAVYS_GRAY_400,
  FERN_GREEN,
  BRICK_TERRACOTA,
  DARK_MOSS_GREEN,
  PLATINUM,
  CHINESE_WHITE,
  BRICK_TERRACOTA_300,
  BRICK_TERRACOTA_600,
  DARK_MOSS_GREEN_300,
  DARK_MOSS_GREEN_400,
  DARK_MOSS_GREEN_700,
  ERROR_RED_400,
  ERROR_RED_500,
  ERROR_RED_600,
  BRICK_TERRACOTA_200,
  BRICK_TERRACOTA_400,
  BRICK_TERRACOTA_500,
  BRICK_TERRACOTA_800,
  BRICK_TERRACOTA_900,
  BUTTERSCOTH_200,
  BUTTERSCOTCH_400,
  BUTTERSCOTCH_500,
  PICTON_BLUE_100,
  PICTON_BLUE_200,
  PICTON_BLUE_300,
  PICTON_BLUE_400,
  DUSTY_ORANGE_400,
  DUSTY_ORANGE_500,
  DUSTY_ORANGE_700,
} from "@common/UI/colors";

import {
  Display,
  Body1,
  Body2,
  H1,
  H2,
  H3,
  H5,
  H6,
  ButtonText,
  Support,
  Caption,
} from "@common/UI/Headings";
import CheckBox from "@common/UI/CheckBox";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import Modal from "../Components/common/UI/Modal";

const Container = styled.div`
  width: 80px;
  height: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;

  padding: 2rem 0;
`;

const Wrapper = styled(FlexBox)`
  width: 50%;
  border-radius: 1rem;
  ${boxShadowDs1}
`;

const WrapperContainer = styled(FlexBox)`
  width: 50%;
  border-radius: 1rem;
  ${boxShadowDs2}
`;

const UiKit = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [showXsModal, setShowXsModal] = useState(false);
  const [showSModal, setShowSModal] = useState(false);

  const handleOptionSelect = option => {
    setSelectedOption(prevSelectedOption =>
      prevSelectedOption === option ? null : option
    );
  };

  return (
    <>
      <FlexBox padding="2rem" column rowGap="2rem">
        <Display>Buttons</Display>
        <FlexBox columnGap="2rem" rowGap="2rem" wrap="wrap">
          <Button primary>Primary</Button>
          <Button primary disabled>
            Primary
          </Button>
          <Button secondary>Secondary</Button>
          <Button secondary disabled>
            Secondary
          </Button>
          <Button danger>Danger</Button>
          <Button outline>Outline</Button>
          <Button outline disabled>
            Outline
          </Button>
          <Button outline secondary>
            Outline Secondary
          </Button>
          <Button outline tertiary>
            Primary
          </Button>
          <Button outline danger>
            Primary
          </Button>
          <Button textCta>Primary</Button>
          <Button textCta secondary>
            Primary
          </Button>
          <Button textCta danger>
            Primary
          </Button>
          <Button></Button>
        </FlexBox>
        <Display>Avatar</Display>
        <FlexBox columnGap="2rem" rowGap="2rem">
          <Avatar name="Sri Ram" />
          <Avatar firstname="Sri" lastname="Sri Ram" />
          <Body2>Typing : </Body2>
          <Avatar firstname="Sri" lastname="Sri Ram" typing />
          <Body2>Show Dot : </Body2>
          <Avatar firstname="Sri" lastname="Sri Ram" showDot isDisabled />
          <Body2>Is Disabled : </Body2>
          <Avatar firstname="Sri" lastname="Sri Ram" isDisabled />
        </FlexBox>
        <Display>Typography</Display>
        <FlexBox column columnGap="2rem" rowGap="2rem">
          <Display>Display</Display>
          <H1>H1 Heading</H1>
          <H2>H2 Heading</H2>
          <H3>H3 Heading</H3>
          <H5>H5 Heading</H5>
          <H6>H6 Heading</H6>
          <Body1>Body1</Body1>
          <Body2>Body2</Body2>
          <ButtonText>Button Text</ButtonText>
          <Support>Support</Support>
          <Caption>Caption</Caption>
        </FlexBox>
        <Display>CheckBox</Display>
        <FlexBox columnGap="2rem" rowGap="2rem">
          <CheckBox checked onClick={() => {}}>
            Checkbox
          </CheckBox>
          <CheckBox disabled onClick={() => {}}>
            Checkbox
          </CheckBox>
          <CheckBox checked disabled onClick={() => {}}>
            Checkbox
          </CheckBox>
        </FlexBox>
        <Display>Chips</Display>
        <FlexBox columnGap="2rem" rowGap="2rem">
          <Chip
            width="fit-content"
            selected={selectedOption === "male"}
            onClick={() => handleOptionSelect("male")}
          >
            <FlexBox columnGap="0.5rem" padding="1rem 1rem">
              <Body1 color={selectedOption === "male" ? ACCENT_0 : "black"}>
                Male Only
              </Body1>
            </FlexBox>
          </Chip>
          <Chip
            width="fit-content"
            selected2={selectedOption === "female"}
            onClick={() => handleOptionSelect("female")}
          >
            <FlexBox row columnGap="0.5rem" padding="1rem 1rem">
              <Body1 color={selectedOption === "male" ? ACCENT_0 : "black"}>
                Female Only
              </Body1>
            </FlexBox>
          </Chip>
        </FlexBox>
        <Display>Type Chips</Display>
        <FlexBox columnGap="2rem" rowGap="2rem">
          <ClientTypeChip isDisabled>Disable</ClientTypeChip>
          <ClientTypeChip>Hot</ClientTypeChip>
          <ClientTypeChip>Warm</ClientTypeChip>
          <ClientTypeChip>Cold</ClientTypeChip>
        </FlexBox>
        <Display>Radio</Display>
        <FlexBox columnGap="2rem" rowGap="2rem">
          <Radio active onClick={() => {}} />
          <Radio disabled onClick={() => {}} />
          <Radio disabled active onClick={() => {}} />
        </FlexBox>
        <Display>Custom Toggle</Display>
        <FlexBox columnGap="2rem" rowGap="2rem">
          <CustomToggle
            checked={toggleChecked}
            primaryColor="Green"
            onChange={() => {
              setToggleChecked(prev => !prev);
            }}
          />
          <Body1>small</Body1>
          <CustomToggle
            small
            checked={toggleChecked}
            onChange={() => {
              setToggleChecked(prev => !prev);
            }}
          />
          <Body1>with custom bg color</Body1>
          <CustomToggle
            checked={toggleChecked}
            primaryColor="Green"
            onChange={() => {
              setToggleChecked(prev => !prev);
            }}
          />
        </FlexBox>
        <Display>TextArea</Display>
        <FlexBox column rowGap="1rem">
          <TextArea />
          <TextArea label="My Text Area" placeholder="this is a placeholder" />
          <TextArea
            label="My Text Area with error"
            error="this is an error message"
            placeholder="this is a placeholder"
          />
          <TextArea showCross icon={FiX} onIconClick={() => {}} />
          <TextArea required label="My Text Area with required " />
        </FlexBox>

        <Display>Color Palete</Display>
        <FlexBox columnGap="2rem">
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={PRIMARY_0}>#E5E3E8</Container>
            <Container backgroundColor={PRIMARY_100}>#D5D0DB</Container>
            <Container backgroundColor={PRIMARY_200}>#C5BDCE</Container>
            <Container backgroundColor={PRIMARY_300}>#B4AAC0</Container>
            <Container backgroundColor={PRIMARY_400}>#A397B2</Container>
            <Container backgroundColor={PRIMARY_500}>#9485A6</Container>
            <Container backgroundColor={PRIMARY_600}>#847399</Container>
            <Container backgroundColor={PRIMARY_700}>#735F8B</Container>
            <Container backgroundColor={PRIMARY_800}>#644D7F</Container>
            <Container backgroundColor={PRIMARY_900}>#533A71</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={SECONDARY_0}>E0E0E0</Container>
            <Container backgroundColor={SECONDARY_100}>CBCBCB</Container>
            <Container backgroundColor={SECONDARY_200}>B6B6B6</Container>
            <Container backgroundColor={SECONDARY_300}>A0A0A0</Container>
            <Container backgroundColor={SECONDARY_400}>8A8A8A</Container>
            <Container backgroundColor={SECONDARY_500}>767676</Container>
            <Container backgroundColor={SECONDARY_600}>616161</Container>
            <Container backgroundColor={SECONDARY_700}>4B4B4B</Container>
            <Container backgroundColor={SECONDARY_800}>373737</Container>
            <Container backgroundColor={SECONDARY_900}>212121</Container>
            <Container backgroundColor={SECONDARY_901}>EAEAEA</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={ACCENT_0}>FFFFFF</Container>
            <Container backgroundColor={ACCENT_100}>F9F9F9</Container>
            <Container backgroundColor={ACCENT_200}>F4F4F4</Container>
            <Container backgroundColor={ACCENT_300}>D7D7D7</Container>
            <Container backgroundColor={ACCENT_400}>A5A5A5</Container>
            <Container backgroundColor={ACCENT_500}>919191</Container>
            <Container backgroundColor={ACCENT_600}>797979</Container>
            <Container backgroundColor={ACCENT_700}>4C4C4C</Container>
            <Container backgroundColor={ACCENT_800}>212121</Container>
            <Container backgroundColor={ACCENT_900}>171717</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={SUCCESS}>008C51</Container>
            <Container backgroundColor={ERROR}>E94444</Container>
            <Container backgroundColor={WARNING}>FFB200</Container>
            <Container backgroundColor={modalBackdrop}>533a711a</Container>
            <Container backgroundColor={overlayBackdrop}></Container>
            <Container backgroundColor={listingChip}>D7D7D7</Container>
            <Container backgroundColor={chipSelectedbg}></Container>
            <Container backgroundColor={RATE_BACKGROUND}>00000066</Container>
            <Container backgroundColor={STARCOLOR}>FFC107</Container>
            <Container backgroundColor={TAB_COLOR}>F2F2F2</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={WHITE}>FFFFFF</Container>
            <Container backgroundColor={GOLDEN}>FF9800</Container>
            <Container backgroundColor={BLACK}>000000</Container>
            <Container backgroundColor={BLACK_TRANSPARENT}>00000066</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={DARK_GREY}>7780A1</Container>
            <Container backgroundColor={DARK_BLACK_GREY}>465a62</Container>
            <Container backgroundColor={GREY}>f3f4f9</Container>
            <Container backgroundColor={LIGHT_BLUE_GREY}>d1d4e7</Container>
            <Container backgroundColor={LIGHT_GREY}>F9F9F9</Container>
            <Container backgroundColor={LIGHTEST_GREY}>FAFAFA</Container>
            <Container backgroundColor={LIGHT_BLACK_GREY}>465a64</Container>
            <Container backgroundColor={LIGHT_WHITE_GREY}>fafafa</Container>
            <Container backgroundColor={LIGHT_PINK_GREY}>EEF0F7</Container>
            <Container backgroundColor={PURPLE_GREY}>747fb8</Container>
            <Container backgroundColor={ASH_GREY}>495057</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={LIGHT_PINK}>FFF0F4</Container>
            <Container backgroundColor={PEACH}>F4D0D0</Container>
            <Container backgroundColor={LIGHT_WHITE_PINK}>FFE2E8</Container>
            <Container backgroundColor={DARK_PINK}>F2A9B9</Container>
            <Container backgroundColor={PALE_SALMON}>FFE4DB</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={LIGHT_PURPLE}>7FA2EA</Container>
            <Container backgroundColor={PURPLE_BLUE}>4a4781</Container>
            <Container backgroundColor={BRIGHT_LIGHT_PURPLE}>5D5FEF</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={SEA_BLUE}>00C2CE</Container>
            <Container backgroundColor={DARK_BLUE}>182A88</Container>
            <Container backgroundColor={DARK_BLUE_20_OPACITY}>
              182A8833
            </Container>
            <Container backgroundColor={LIGHT_PURPLE_BLUE}>4a90e2</Container>
            <Container backgroundColor={FADED_BLUE}>EEF0F7</Container>
            <Container backgroundColor={LIGHTEST_BLUE}>D3D8F0</Container>
            <Container backgroundColor={LIGHT_WHITE_BLUE}>f4f9ff</Container>
            <Container backgroundColor={CORNFLOWER_BLUE}>4B59A1</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={RED}>fd4848</Container>
            <Container backgroundColor={LIGHT_RED}>ee6863</Container>
            <Container backgroundColor={DARK_RED}>F85650</Container>
            <Container backgroundColor={BRIGHT_RED}>F87B6A</Container>
            <Container backgroundColor={LINEN}>FFEBEB</Container>
            <Container backgroundColor={BOSTON_UNIVERSITY_RED}>
              CC0000
            </Container>
            <Container backgroundColor={LIGHT_BROWN}>c7bebe</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={VIOLET_BLUE}>DCE8FF</Container>
            <Container backgroundColor={LIGHT_BLUE}>EAEFFC</Container>
            <Container backgroundColor={LIGHTER_BLUE}>
              rgb(74, 72, 130, 60%)
            </Container>
            <Container backgroundColor={YELLOW}>FFE0BA</Container>
            <Container backgroundColor={LIGHT_YELLOW}>FFF8E3</Container>
            <Container backgroundColor={MINT_GREEN}>ADD9D5</Container>
            <Container backgroundColor={LIGHTEST_BLUE_GREY}>B0B6D6</Container>
            <Container backgroundColor={LIGHTEST_WHITE_PINK}></Container>
            <Container backgroundColor={PURPLE}>4A4882</Container>
            <Container backgroundColor={DARK_GREEN}></Container>
            <Container backgroundColor={TURQUOISE}>00c2ce</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={SHADOW_GREY}>c8c8c8</Container>
            <Container backgroundColor={DARK_TEAL}>499ca1</Container>
            <Container backgroundColor={DARKEST_GREY}>293f5b</Container>
            <Container backgroundColor={BORDER_GREY}>e0e7ef</Container>
            <Container backgroundColor={HEADING_GREY}>35537c</Container>
            <Container backgroundColor={YELLOW_BROWN}>f2faff</Container>
            <Container backgroundColor={SKY_BLUE}>f6f5ed</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={FACEBOOK_BG_COLOR}>1778F2</Container>
            <Container backgroundColor={TWITTER_BG_COLOR}>1DA1F2</Container>
            <Container backgroundColor={PINTEREST_BG_COLOR}>E60023</Container>
            <Container backgroundColor={LINKEDIN_BG_COLOR}>0A66C2</Container>
          </FlexBox>
          <FlexBox column columnGap="1rem">
            <Container backgroundColor={DAVYS_GRAY_400}>E0E0E0</Container>
            <Container backgroundColor={FERN_GREEN}>607447</Container>
            <Container backgroundColor={BRICK_TERRACOTA}>FFF5F2</Container>
            <Container backgroundColor={DARK_MOSS_GREEN}>AFC199</Container>
            <Container backgroundColor={PLATINUM}>E8EEE2</Container>
            <Container backgroundColor={CHINESE_WHITE}>E8E3D8</Container>
            <Container backgroundColor={BRICK_TERRACOTA_300}>FBD3C6</Container>
            <Container backgroundColor={BRICK_TERRACOTA_600}>EF9175</Container>
            <Container backgroundColor={DARK_MOSS_GREEN_300}>C4D4B2</Container>
            <Container backgroundColor={DARK_MOSS_GREEN_400}>AFC199</Container>
            <Container backgroundColor={DARK_MOSS_GREEN_700}>728759</Container>
            <Container backgroundColor={ERROR_RED_400}>E85A5C</Container>
            <Container backgroundColor={ERROR_RED_500}>C73031</Container>
            <Container backgroundColor={ERROR_RED_600}>A60F0F</Container>
            <Container backgroundColor={BRICK_TERRACOTA_200}>FFE9E3</Container>
            <Container backgroundColor={BRICK_TERRACOTA_400}>F7BCAA</Container>
            <Container backgroundColor={BRICK_TERRACOTA_500}>F3A78F</Container>
            <Container backgroundColor={BRICK_TERRACOTA_800}>E76943</Container>
            <Container backgroundColor={BRICK_TERRACOTA_900}>D4532C</Container>
            <Container backgroundColor={BUTTERSCOTH_200}>F7E3AB</Container>
            <Container backgroundColor={BUTTERSCOTCH_400}>FFCB63</Container>
            <Container backgroundColor={BUTTERSCOTCH_500}>E5AF43</Container>
            <Container backgroundColor={PICTON_BLUE_100}>E3F2FF</Container>
            <Container backgroundColor={PICTON_BLUE_200}>B3D9F7</Container>
            <Container backgroundColor={PICTON_BLUE_300}>85C0F0</Container>
            <Container backgroundColor={PICTON_BLUE_400}>5AA9E8</Container>
            <Container backgroundColor={DUSTY_ORANGE_400}>FFAC63</Container>
            <Container backgroundColor={DUSTY_ORANGE_500}>E58F43</Container>
            <Container backgroundColor={DUSTY_ORANGE_700}>804f18</Container>
          </FlexBox>
        </FlexBox>
        <FlexBox position="relative">
          <Button
            onClick={() => {
              setShowXsModal(true);
            }}
          >
            Open Modal XS
          </Button>
          {showXsModal && (
            <Modal
              XS
              borderRadius="1rem"
              togglePopup={() => setShowXsModal(!showXsModal)} // toggle pop kaam nhi kar raha h
            >
              <Body2>Content for Modal XS</Body2>
              <Button
                onClick={() => {
                  setShowXsModal(false);
                }}
              >
                Close Modal
              </Button>
            </Modal>
          )}
        </FlexBox>
        <FlexBox position="relative">
          <Button
            onClick={() => {
              setShowSModal(true);
            }}
          >
            Open Modal S
          </Button>
          {showSModal && (
            <Modal
              S
              borderRadius="1rem"
              togglePopup={() => setShowSModal(!showSModal)} // toggle pop kaam nhi kar raha h
            >
              <Body2>Content for Modal S</Body2>
              <Button
                onClick={() => {
                  setShowSModal(false);
                }}
              >
                Close Modal
              </Button>
            </Modal>
          )}
        </FlexBox>
        <FlexBox position="relative">
          <Button
            onClick={() => {
              setShowXsModal(true);
            }}
          >
            Open Modal M1
          </Button>
          {showXsModal && (
            <Modal
              M1
              borderRadius="1rem"
              togglePopup={() => setShowXsModal(!showXsModal)} // toggle pop kaam nhi kar raha h
            >
              <Body2>Content for Modal M1</Body2>
              <Button
                onClick={() => {
                  setShowXsModal(false);
                }}
              >
                Close Modal
              </Button>
            </Modal>
          )}
        </FlexBox>
        <FlexBox position="relative">
          <Button
            onClick={() => {
              setShowXsModal(true);
            }}
          >
            Open Modal M2
          </Button>
          {showXsModal && (
            <Modal
              M2
              borderRadius="1rem"
              togglePopup={() => setShowXsModal(!showXsModal)} // toggle pop kaam nhi kar raha h
            >
              <Body2>Content for Modal M2</Body2>
              <Button
                onClick={() => {
                  setShowXsModal(false);
                }}
              >
                Close Modal
              </Button>
            </Modal>
          )}
        </FlexBox>
        <FlexBox position="relative">
          <Button
            onClick={() => {
              setShowXsModal(true);
            }}
          >
            Open Modal L
          </Button>
          {showXsModal && (
            <Modal
              L
              borderRadius="1rem"
              togglePopup={() => setShowXsModal(!showXsModal)} // toggle pop kaam nhi kar raha h
            >
              <Body2>Content for Modal L</Body2>
              <Button
                onClick={() => {
                  setShowXsModal(false);
                }}
              >
                Close Modal
              </Button>
            </Modal>
          )}
        </FlexBox>
        <FlexBox position="relative">
          <Button
            onClick={() => {
              setShowXsModal(true);
            }}
          >
            Open Modal with boxShadow
          </Button>
          {showXsModal && (
            <Modal
              boxShadow
              borderRadius="1rem"
              togglePopup={() => setShowXsModal(!showXsModal)} // toggle pop kaam nhi kar raha h
            >
              <Body2>Content for Modal with boxShadow</Body2>
              <Button
                onClick={() => {
                  setShowXsModal(false);
                }}
              >
                Close Modal
              </Button>
            </Modal>
          )}
        </FlexBox>

        <FlexBox column rowGap="1rem">
          <Display>CustomToast</Display>
          <CustomToast appearance></CustomToast>
        </FlexBox>
        <FlexBox column rowGap="1rem">
          <Display>Rating</Display>
          <Rating></Rating>
        </FlexBox>
        <FlexBox column rowGap="1rem">
          <Display>BoxShadow</Display>
          <Wrapper>This is boxShadowDs1</Wrapper>
        </FlexBox>
        <FlexBox column rowGap="1rem">
          <Display>BoxShadow</Display>
          <WrapperContainer>This is boxShadowDs2</WrapperContainer>
        </FlexBox>
        <FlexBox column rowGap="1rem">
          <Display>Filter</Display>
          <Filter active></Filter>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default UiKit;
