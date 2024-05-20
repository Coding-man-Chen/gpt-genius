import { fetchUserTokensById } from "@/utils/action";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";


const ProfilePage = async () => {
  const {userId} = auth()
  const currentTokens = await fetchUserTokensById(userId!)
  return (
    <>
    <div className="flex jusitfy-center items-start min-h-screen flex-col">
    <h2 className="mb-8 ml-8 text-xl font-semibold">Tokens Amount : {currentTokens}</h2>
      <UserProfile />
    </div>
    </>
  );
};

export default ProfilePage;
