import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginImage from "@/assets/login.jpg";
import TwitterImage from "@/assets/twitter.png";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import Google from "@/assets/google.png";
import { auth, googleProvider, twitterProvider, githubProvider } from "@/integration/firebase";
import { signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import React from "react";
import { Github } from "lucide-react";

const signInWithGoogle = async (navigate: Function) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await saveUserToDatabase(user);
    navigate("/");
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
};

const signInWithGithub = async (navigate: Function) => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const user = result.user;
    await saveUserToDatabase(user);
    navigate("/");
  } catch (error) {
    console.error("Error signing in with Github", error);
  }
};

const signInWithTwitter = async (navigate: Function) => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const user = result.user;
    await saveUserToDatabase(user);
    navigate("/");
  } catch (error) {
    console.error("Error signing in with Twitter:", error);
  }
};

const handleLogin = async (email: string, password: string, navigate: Function) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Error during login:", error);
    alert("Login failed: " + error.message);
  }
};
const saveUserToDatabase = async (user: User) => {
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseId: user.uid,
      email: user.email,
      firstName: user.displayName?.split(" ")[0] || "",
      lastName: user.displayName?.split(" ")[1] || "",
    }),
  });
  if (!response.ok) {
    console.error("Failed to save user data");
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:space-y-16 lg:gap-x-20 z-50 m-4 md:m-28">
      <div className="flex items-center">
        <img src={LoginImage} className="h-100 mt-16" />
      </div>
      <div className="p-8 bg-slate-100 rounded-md w-auto">
        <p className="text-2xl font-bold mb-4 text-center">Login</p>
        <div>
          <Label className="text-base">Email</Label>
          <Input placeholder="Enter your Email" className="my-2 bg-white" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label className="text-base">Password</Label>
          <Input
            type="password"
            placeholder="Enter your Password"
            className="mt-2 bg-white"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-2 grid grid-cols-2 justify-between gap-x-10 items-center">
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Remember Me
              </Label>
            </div>
          </div>
          <p
            className="cursor-pointer text-teal-600 font-semibold hover:underline text-sm"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password{" "}
          </p>
        </div>
        <div className="flex justify-end">
          <Button className="bg-teal-600 mt-6 w-full" onClick={() => handleLogin(email, password, navigate)}>
            Login
          </Button>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-sm">or login with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex items-center justify-center gap-x-4 mt-2">
          <Button
            className="w-8 h-8 flex items-center justify-center rounded-full border font-bold bg-black text-white"
            onClick={() => signInWithGithub(navigate)}
          >
            <Github className="fill-white" />
          </Button>
          <p
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border font-bold bg-white"
            onClick={() => signInWithGoogle(navigate)}
          >
            <img src={Google} className="w-5 h-5" />
          </p>

          <p
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border font-bold bg-black"
            onClick={() => signInWithTwitter(navigate)}
          >
            <img src={TwitterImage} className="w-5 h-5" />
          </p>
        </div>

        <p className="mt-4 text-center">
          Don't have an account ?
          <span className="cursor-pointer text-teal-600 font-medium hover:underline pl-1" onClick={handleSignup}>
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};
