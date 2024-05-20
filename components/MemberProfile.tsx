import { fetchOrGenerateTokens } from "@/utils/action";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

const MemberProfile = async () => {
  const user = await currentUser();
  const {userId} = auth()
  await fetchOrGenerateTokens(userId)
  return (
    <div className="flex items-center px-4 gap-2">
      <UserButton />
      <p>{user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default MemberProfile;
