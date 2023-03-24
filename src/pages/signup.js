import Image from "next/image";
import { useState } from "react";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import logo from '/public/icons/icon-512x512.png'

const SignUp = (props) => {

const [ifLoading, setIfLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     setIfLoading(true);
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
//         setIfLoading(false);
//       }
//     } catch (error) {
//       setIfLoading(false);
//       throw new Error(
//         "Login failed message from signin page nextauth : " + error
//       );
//     }
//   };

  return (
    <div className="py-8 flex flex-col gap-4 text-white text-sm font-semibold">
      <div className="text-white flex flex-col gap-2 items-center font-semibold">
        <Image src={logo} height={40} width={40}/>
      </div>
      <div className="text-white text-center font-semibold">
        <h1 className="text-3xl tracking-wide">Welcome Back</h1>
      </div>
      <br/>
      <div className=" flex flex-row justify-center items-center text-lighttext font-semibold rounded-lg">
        <div className="w-full flex flex-col gap-5">
          <form
            className="text-white flex flex-col gap-3 w-full"
            action="/api/user"
            method="POST"
            // onSubmit={onSubmitHandler}
          >
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent border border-white rounded-lg p-2"
            />
            <input
              id="password"
              element="input"
              type="password"
              placeholder="Email"
              className="bg-transparent border border-white rounded-lg p-2"
            />
            <input
              id="password"
              element="input"
              type="password"
              placeholder="Username"
              className="bg-transparent border border-white rounded-lg p-2"
            />
            <input
              id="password"
              element="input"
              type="password"
              placeholder="Password"
              className="bg-transparent border border-white rounded-lg p-2"
            />
            <button
              type="submit"
              className="mt-4 bg-white text-black border border-white rounded-lg p-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center text-xs relative bottom-2">Already have an account? <span className="underline pl-2 cursor-pointer hover:text-blue-400" onClick={props.showLogin}>Sign In</span></div>
      <div className="flex flex-col gap-4 py-8 border-t border-gray-800">
        <div className="border border-white rounded-lg p-2">
          <div className="flex flex-row items-center gap-2">
            <FaGoogle />
            <span>Sigin with Google</span>
          </div>
        </div>
        <div className="border border-white rounded-lg p-2">
          <div className="flex flex-row items-center gap-2">
            <FaMicrosoft />
            <span>Sigin with Microsoft</span>
          </div>
        </div>
      </div>
    </div>
  );
};