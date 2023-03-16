
import { useForm } from "../src/hooks/form-hook";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/shared/FormElements/button";
import Input from "@/shared/FormElements/input";

const SignIn = () => {
//   const router = useRouter();

const [signInLoading, setSignInLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     setSignInLoading(true);
//     e.preventDefault();
//     const newUserHandler = {
//       usernameoremail: formState.inputs.usernameoremail.value,
//       password: formState.inputs.password.value,
//     };
//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         usernameoremail: newUserHandler.usernameoremail,
//         password: newUserHandler.password,
//       });
//       if (!result.error) {
//         router.replace("/app");
//         setSignInLoading(false);
//       }
//     } catch (error) {
//       setSignInLoading(false);
//       throw new Error(
//         "Login failed message from signin page nextauth : " + error
//       );
//     }
//   };

  const [formState, inputHandler] = useForm(
    {
      usernameoremail: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <div className="py-8">
      {signInLoading?<div className="text-white">Loading...</div>: ''}
      <div className="text-lighttext flex flex-col gap-2 items-center font-semibold" >
        {/* <div className="text-center">
          <FaList size={40} />
        </div> */}
        <h1 className="text-2xl">Welcome Back!</h1>
        <h1 className="text-sm text-gray-500">We are excited to see you again!</h1>
      </div>
      <div className=" flex flex-row justify-center items-center text-lighttext font-semibold rounded-lg">
        <div className="w-4/5 flex flex-col gap-5">
          <form
            className="flex flex-col w-full"
            action="/api/user"
            method="POST"
            // onSubmit={onSubmitHandler}
          >
            <br></br>
            <label htmlFor="usernameoremail" className="py-1">Username Or Email</label>
            <Input
              id="usernameoremail"
              element="input"
              type="text"
              lable="usernameoremail"
              errorText="Required"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            <label htmlFor="password" className="py-1 mt-2">Password</label>
            <Input
              id="password"
              element="input"
              type="password"
              lable="password"
              errorText="Password length should be minimum 8 characters"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            <a href="#" className="text-xs text-gray-500 py-1">forgot your password ?</a>
            <br/>
            <Button
              type="submit"
              className="submit"
              disabled={!formState.isValid}
            >
              SignIn
            </Button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default SignIn;