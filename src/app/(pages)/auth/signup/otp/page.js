"use client";
import React, { useState, useEffect, useRef } from "react";
import { Brain, ArrowLeft, RefreshCw, CheckCircle, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";
import toast from "react-hot-toast";
import Toast from "@/components/toast";

const SignUpOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();
  const { userId, isLoggedIn, verifyOTP, email, login } = useAuthStore();
  const username = useSearchParams()?.get("username") || "user";

  useEffect(() => {
    inputRefs.current[0]?.focus();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await login(email);
    setTimer(30);
    setIsResending(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      console.log("ALready logged in!");
      return;
    }

    setLoading(true);
    const otpString = otp.join("");
    console.log(otpString, userId);

    if (otpString.length === 6) {
      const otpSuccess = await verifyOTP(userId, otpString, username);
      if (otpSuccess.success) {
        router.push("/auth/signup/success");
      } else {
        console.log("Error verifying OTP");
        toast.custom(<Toast type="error" message={otpSuccess.message} />, {
          position: "bottom-right",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="my-16 md:my-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Verify Your Email</h2>
          <p className="mt-2 text-gray-400">
            Please enter the verification code sent to your email
          </p>
        </div>

        <div className="max-w-md w-full space-y-8 text-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-8 border border-white/40 shadow-xl">
          {isVerified ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-500/20 p-3">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Email Verified!
              </h3>
              <p className="text-gray-400 mb-6">
                Your email has been successfully verified. Redirecting to
                dashboard...
              </p>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-2xl font-bold bg-gray-900/50 border-2 border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                  />
                ))}
              </div>

              <button
                disabled={otp.join("").length !== 6}
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
              >
                {loading ? (
                  <Loader className="animate-spin mx-auto" />
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>
          )}

          {!isVerified && (
            <>
              <div className="mt-6 text-center">
                <p className="text-gray-400 mb-4">
                  Didn&apos;t receive the code?
                </p>
                {timer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend code in {timer} seconds
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        isResending ? "animate-spin" : ""
                      }`}
                    />
                    Resend Code
                  </button>
                )}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpOTP;
