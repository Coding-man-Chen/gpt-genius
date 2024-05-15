import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const MemberProfile = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center px-4 gap-2">
      <UserButton />
      <p>{user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default MemberProfile;
