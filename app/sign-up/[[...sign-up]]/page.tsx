import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignUp path="/sign-up"/>
    </div>
  );
};

export default SignUpPage;
