import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { ACCENT_400, PRIMARY_800 } from "@common/UI/colors";
import { Body2 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { trackEvent } from "@utils/helper";
import { device } from "@common/UI/Responsive";

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;

  ${Body2} {
    font-size: 0.75rem;
    @media ${device.laptop} {
      font-size: 0.875rem;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  height: 1.5rem;
  text-decoration: none;
`;

const Breadcrumb = ({ separator = " / " }) => {
  const pathname = usePathname();
  const storeId = useSelector(state => state.auth.storeId);

  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  return (
    <BreadcrumbContainer>
      <StyledLink
        passHref
        href="/dashboard/general"
        onClick={() => {
          trackEvent("db_breadcrumb_click", {
            current_page: pathSegments?.[0],
            source: null,
            store_id: storeId,
            selected_menu_item: "home",
          });
        }}
      >
        <AiOutlineHome color={PRIMARY_800} size="1.2rem" />
      </StyledLink>

      {pathSegments.map((segment, index) => (
        <FlexBox key={index} align="center">
          {index === 0 && (
            <Body2 textTransform="uppercase">
              {" / "}
              {pathSegments?.[0]}
            </Body2>
          )}
          {index > 0 && (
            <StyledLink
              href={`/${pathSegments.slice(0, index + 1).join("/")}`}
              onClick={() => {
                trackEvent("db_breadcrumb_click", {
                  current_page: pathSegments?.[0],
                  source: null,
                  store_id: storeId,
                  selected_menu_item: segment?.replace("-", " "),
                });
              }}
            >
              <Body2
                textTransform="uppercase"
                textDecoration="none"
                cursor="pointer"
                color={PRIMARY_800}
              >
                {segment?.replace("-", " ")}
              </Body2>
            </StyledLink>
          )}
          {index < pathSegments.length - 1 && (
            <Body2 margin="0 0.125rem" color={ACCENT_400}>
              {separator}
            </Body2>
          )}
        </FlexBox>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
