import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { redirectToAuth } from 'supertokens-auth-react'
import { canHandleRoute, getRoutingComponent } from 'supertokens-auth-react/ui'
import styled from 'styled-components';
import FlexBox from '@Components/common/UI/FlexBox';
import { device } from '@Components/common/UI/Responsive';
import NavBar from '@Components/common/Navbar';


const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png");
  background-position: center;
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
    padding-bottom: 150px;
  }
`;



const SuperTokensComponentNoSSR = dynamic<{}>(
    new Promise((res) => res(() => getRoutingComponent([EmailPasswordPreBuiltUI]))),
    { ssr: false }
)

export default function Auth() {

    // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
    useEffect(() => {
        if (canHandleRoute([EmailPasswordPreBuiltUI]) === false) {
            redirectToAuth()
        }
    }, [])

    return (
        <Wrapper>
            <NavBar />
            <Container>
                <div style={{ marginTop: '40px', width: '100%', maxWidth: '480px' }}>
                    <SuperTokensComponentNoSSR />
                </div>
            </Container>
        </Wrapper>
    )
}