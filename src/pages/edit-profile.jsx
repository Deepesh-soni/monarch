import React from "react";

import EditProfile from "@components/EditProfile";
import ProfileLayout from "@layout/ProfileLayout";

const Profile = () => {
  return (
    <ProfileLayout showBackIcon={true}>
      <EditProfile />
    </ProfileLayout>
  );
};

export default Profile;
