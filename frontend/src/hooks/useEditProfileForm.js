import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useStorage } from "../context/useStorage";
import updateProfileAPI from "../API/updateProfileAPI";

export default function useEditProfileForm() {
  const {
    token,
    setCurrentUser,
    setAllUsers,
    isAdmin,
    isModerator,
    setIsSuccessfullySend,
    currentUser,
  } = useStorage();

  const [serverError, setServerError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);

  const defaultsValues = {
    name: (currentUser && currentUser.name) ? currentUser.name.split(" ")[0] : "",
    lastName: (currentUser && currentUser.name) ? currentUser.name.split(" ")[1] : "",
    roomNumber: (currentUser && currentUser.address) ? currentUser.address.split(",")[0].split(" ").splice(-1) : "",
    number: currentUser ? currentUser.number : "",
  };
  

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(data, e) {
    e.preventDefault();

    const name = data.userName?.toLowerCase(),
      lastName = data.userLastName?.toLowerCase();
    const info = {
      name,
      lastName,
      password: data.userPassword || null,
      newPassword: data.userNewPassword || null,
      number: data.userNumber,
      roomNumber: data.userRoomNumber,
    };
    await updateProfileAPI({
      setFormIsLoading,
      setCurrentUser,
      setIsSuccessfullySend,
      setServerError,
      info,
      isAdmin,
      isModerator,
      setAllUsers,
      token,
      history,
    });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,

    formIsLoading,
    defaultsValues,
    isChangingPassword,
    setIsChangingPassword,
  };
}
