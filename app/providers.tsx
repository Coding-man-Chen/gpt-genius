import { Toaster } from "react-hot-toast";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};

export default Providers;
