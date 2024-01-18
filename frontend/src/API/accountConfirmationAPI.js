import { POST } from "../utils/http";

const accountConfirmationAPI = async ({
  setIsSuccessfullySend,
  setIsRequestLoading,
  history,
}) => {
  setIsRequestLoading(true);

  try {
    const email = localStorage.getItem("toConfirmUser");
    const info = { email }; // Adjusted to provide email as a string

    const { response } = await POST("/api/auth/confirmation", info);

    setIsRequestLoading(false);

    if (response.status === 200) {
      setIsSuccessfullySend(true);
      localStorage.removeItem("toConfirmUser");
      setTimeout(() => {
        setIsSuccessfullySend(false);
        history.push("/menu");
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
};

export default accountConfirmationAPI;
