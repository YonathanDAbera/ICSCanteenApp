import useLoginForm from "../../hooks/useLoginForm";
import { LoaderSpinner } from "./../LoaderSpinner";
import { ButtonPrimary } from "../Buttons";
import ICSLogo from "../../img/ICSLogo.png";

import {
  FormCard,
  Logo,
  Form,
  FormLink,
  UserEmailInput,
  UserPasswordInput,
  ErrorServerMessage,
} from "./SignupForm";

export default function SinginForm({ setIsModalOpened }) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,
    isFormLoading,
  } = useLoginForm();

  return (
    <FormCard>
      <Logo src={ICSLogo} alt="LogoBrand"></Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UserEmailInput errors={errors} register={register} name="userEmail" />
        <UserPasswordInput
          name="userPassword"
          placeholder="Please Enter Your Password"
          errors={errors}
          register={register}
        />

        <ErrorServerMessage>{serverError}</ErrorServerMessage>

        <FormLink to="/authentication/singUp">
          Don't have an account yet? <b>Sign Up</b>{" "}
        </FormLink>
        <FormLink as="a" onClick={() => setIsModalOpened(true)}>
          Forgot your password?
        </FormLink>
        <ButtonPrimary as="input" type="submit" value="Login" />
        {isFormLoading && <LoaderSpinner small />}
      </Form>
    </FormCard>
  );
}
