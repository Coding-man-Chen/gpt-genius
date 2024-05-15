import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex jusitfy-center items-center min-h-screen">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
