import { useEffect } from "react";
import { useRouter } from "next/router";
import FlexBox from "@Components/common/UI/FlexBox";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@redux/slices/auth";
import Loader from "@common/Loader";
import styled from "styled-components";
import { BASE_URL } from "@constants/urls";

const Container = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const SwitchPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query.meta_data) {
      const { meta_data } = router.query;

      const fetchUserDetails = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/v2/getUserDetails/${meta_data}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data?.data));
            router.push("/");
          } else {
            console.log("SwitchPage component mounted");
            console.log("Router query:", router.query);
            console.log("Dispatch function:", dispatch);
            console.log("Fetching user details with meta data:", meta_data);
            console.log("Response received:", response);
            console.log("User data:", data);
            console.log("Redirecting to homepage");
            console.error(
              "Failed to fetch user details:",
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }
  }, [router.query.meta_data, dispatch]);

  return (
    <Container>
      <Loader fitContent />
    </Container>
  );
};

export default SwitchPage;
