import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/integration/firebase";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sendPasswordReset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (response.ok) {
        await sendPasswordResetEmail(auth, email);
        setMessage(data.message);                                          
        setError('');
      } else {
        setMessage('');
        setError(data.message || 'Something went wrong');  
      }
    } catch (err) {
      setMessage('');
      setError('Something went wrong'); 
    }
  };

  return (
    <div className=" lg:space-y-16 lg:gap-x-20 md:m-28 flex flex-col items-center justify-center">
      <div className="p-8 bg-slate-100 rounded-md w-1/2">
        <div className="text-xl font-semibold mb-1 text-right">Forgot Your Password ?</div>
        <p className="text-justify">
          If you have forgotten your password, please enter your account's email address below and click the "Reset My
          Password" button. You will receive an email that contains a link to set a new password.
        </p>
        <div className="mt-3 p-4 bg-white rounded-sm">
          <div className="flex space-x-5 items-center">
            {" "}
            <Label className="text-md">Email:</Label>
            <Input placeholder="Enter your Email..." onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="text-end">
            {" "}
            <Button className="bg-teal-600 mt-4" onClick={handleSubmit}>
              Send Email
            </Button>
          </div>
        </div>
        <div
          className="cursor-pointer mt-3 text-sm font-semibold hover:underline text-teal-600 text-end"
          onClick={() => navigate("/login")}
        >
          Return to Login Page
        </div>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
