import styled from "styled-components";
import { withError } from "./../withError";
import { Fragment } from "react";
import useEditProfileForm from "../../hooks/useEditProfileForm";
import { LoaderSpinner } from "./../LoaderSpinner";
import { ErrorMessage } from "../contact/ContactForm";
import {
  UserNameInput,
  UserLastNameInput,
  UserPasswordInput,
  UserNewPasswordInput,
  ErrorServerMessage,
} from "../auth/SignupForm";
import {
  OptionList,
  Option,
  CheckboxWrapper,
} from "../dashboard/CreateNewProductForm";
import { FormButtons } from "../dashboard/CreateNewProductForm";
import { TextInput } from "../contact/ContactForm";
import GoBackLink from "../GoBackLink";
import userEditIcon from "../../img/user-edit-solid.svg";

const EditProfilePage = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 60px 0px;
`;
const EditProfileForm = styled.form`
  max-width: 400px;
  width: 100%;
  padding: 10px 25px 40px;
  border-radius: 10px;
  background: #fff;
  margin: 50px auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  & > input {
    border: none;
    background: #f0f0f0;
  }
  & > label {
    margin: 0 auto 20px;
  }

  & > ${OptionList} {
    min-width: 100%;
  }

  & > input:focus {
    outline: 2px solid #ccc;
    outline-style: auto;
  }
`;

const InputWrapper = styled.div`
  margin-top: -15px;
  & > label {
    font-size: 16px;
  }
`;
const FormIcon = styled.img`
  width: 120px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: -20px;
`;
const GoToProfileLink = styled(GoBackLink)`
  margin-left: 15px;
  &:before {
    content: "<-- ";
    margin-right: 3px;
  }
`;

function NewPasswordCheckbox({ setIsChangingPassword, value }) {
  return (
    <CheckboxWrapper>
      <label htmlFor="newPasswordCheckbox">Change Password:</label>
      <input
        onChange={(e) => {
          setIsChangingPassword(!value);
        }}
        id="newPasswordCheckbox"
        type="checkbox"
        name="newPasswordCheckbox"
      />
    </CheckboxWrapper>
  );
}
function CellphoneInput({ register, errors, placeholder, defaultValue }) {
  return (
    <Fragment>
      {errors.userNumber && (
        <ErrorMessage role="alert">{errors.userNumber.message}</ErrorMessage>
      )}

      <TextInput
        placeholder={placeholder}
        name="userNumber"
        type="text"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*The field is required",
          minLength: {
            value: 9,
            message: "*Invalid telephone number",
          },
          maxLength: {
            value: 10,
            message: "*Invalid telephone number",
          },
          pattern: {
            value: /[0-9]/,
            message: "*Only numbers are accepted",
          },
        })}
        style={{ borderColor: errors.userNumber && "#bf0000" }}
      />
    </Fragment>
  );
}
function IDInput({ errors, placeholder, register, defaultValue }) {
  return (
    <Fragment>
      {errors.useridentification && (
        <ErrorMessage role="alert">
          {errors.useridentification.message}
        </ErrorMessage>
      )}

      <TextInput
        placeholder={placeholder}
        name="userID"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*The field is required",

          maxLength: {
            value: 4,
            message: "*Invalid Number",
          },
          pattern: {
            value: /[0-9]/,
            message: "*Only numbers accepted",
          },
        })}
        style={{ borderColor: errors.useridentification && "#bf0000" }}
      />
    </Fragment>
  );
}

function EditMyProfile() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,
    formIsLoading,
    isChangingPassword,
    setIsChangingPassword,
    defaultsValues,
  } = useEditProfileForm();

  return (
    <EditProfilePage>
      <GoToProfileLink to="/myAccount/myProfile">Go Back</GoToProfileLink>

      <EditProfileForm onSubmit={handleSubmit(onSubmit)} novalidate>
        <FormIcon src={userEditIcon} alt="edit-profile" />
        <UserNameInput
          errors={errors}
          register={register}
          defaultValue={defaultsValues.name}
        />
        <UserLastNameInput
          errors={errors}
          register={register}
          defaultValue={defaultsValues.lastName}
        />

        <CellphoneInput
          defaultValue={defaultsValues.number}
          errors={errors}
          register={register}
          placeholder="Your phone number..."
        />
        <IDInput
          errors={errors}
          register={register}
          placeholder="ID Number..."
          defaultValue={defaultsValues.ID}
        />
        <InputWrapper>
          <NewPasswordCheckbox
            setIsChangingPassword={setIsChangingPassword}
            value={isChangingPassword}
          />
        </InputWrapper>

        {isChangingPassword ? (
          <>
            <UserPasswordInput
              errors={errors}
              register={register}
              name="userPassword"
              placeholder="Your password..."
            />
            <UserNewPasswordInput
              errors={errors}
              register={register}
              name="newPassword"
              placeholder="New password..."
            />
          </>
        ) : null}

        {formIsLoading ? (
          <LoaderSpinner small />
        ) : (
          <ErrorServerMessage>{serverError}</ErrorServerMessage>
        )}
        <br />
        <FormButtons small />
      </EditProfileForm>
    </EditProfilePage>
  );
}

export default withError(EditMyProfile);
