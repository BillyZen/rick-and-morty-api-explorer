import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicPopUp = dynamic(() => import("../components/PopUp"), {
  ssr: false,
});

const Error = () => {
  const searchParams = useSearchParams();
  const description = searchParams.get("error_description");

  return (
    <DynamicPopUp
      message={
        description ??
        "An error occured when attempting to log in with your account."
      }
      hasLogout={true}
      isError={true}
    />
  );
};

export default Error;
