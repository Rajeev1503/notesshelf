import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

export default function SignUp(props) {
  const [ifLoading, setIfLoading] = useState(false);
  const router = useRouter()
  async function onSubmitHandler() {
    setIfLoading(true)
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullnameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if(!response.ok) {
        throw new Error(
          "fetch failed message from frontend : " + responseDataJson.message
        )
      }
      router.push('/');
      setIfLoading(false)

    } catch (error) {
      console.log("error posting : " + error);
    }
  }

  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="py-8 flex flex-col gap-4 text-white text-sm font-semibold">
      {ifLoading?"Loading..." : ''}
      <div className="text-white text-center font-semibold">
        <h1 className="text-3xl tracking-wide">Welcome Back</h1>
      </div>
      <br />
      <div className=" flex flex-row justify-center items-center text-lighttext font-semibold rounded-lg">
        <div className="w-full flex flex-col gap-5">
          <form
            className="text-white flex flex-col gap-3 w-full"
            action="/api/user"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitHandler();
            }}
          >
            <input
              ref={fullnameRef}
              type="text"
              placeholder="Full Name"
              className="bg-transparent border border-white rounded-lg p-2"
            />
            <input
              ref={emailRef}
              id="password"
              element="input"
              type="password"
              placeholder="Email"
              className="bg-transparent border border-white rounded-lg p-2"
            />
            <input
              ref={passwordRef}
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
      <div className="flex justify-center items-center text-xs relative bottom-2">
        Already have an account?{" "}
        <span
          className="underline pl-2 cursor-pointer hover:text-blue-400"
          onClick={props.showLogin}
        >
          Sign In
        </span>
      </div>
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
}
