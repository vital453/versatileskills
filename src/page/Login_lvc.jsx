import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Otp.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const Login_lvc = () => {
  const [otp, setOtp] = useState("");
  const [number, setnumber] = useState("");
  const [verifOtp, setverifOtp] = useState(false);
  const [showOtp, setshowOtp] = useState(false);
  const [user, setuser] = useState(null);

  const captchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            envoiOtp();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  };

  const envoiOtp = () => {
    setverifOtp(true);
    captchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatNumber = "+" + number;
    signInWithPhoneNumber(auth, formatNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setverifOtp(false);
        setshowOtp(true);
        toast.success("Code de vérification envoyé avec succès!");
      })
      .catch((error) => {
        // Error; SMS not sent
        // console.log(error);
        // toast.error("Erreur lors de l'envoi du code!");
        setverifOtp(false);
      });
  };

  const optVerify = () => {
    setverifOtp(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        // User signed in successfully.
        console.log(result);
        // const user = result.user;
        setuser(result.user);
        setverifOtp(false);
        toast.success("Connexion réussie!");
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
        toast.error("Mauvais code!");
        setverifOtp(false);
      });
  };

  return (
    <>
      <div className="limiter">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="./img-01.png" alt="IMG" />
            </div>

            <div className="login100-form validate-form">
              <span className="login100-form-title">Connexion Membre</span>
              {/* 
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div> */}
              {showOtp ? (
                <>
                  <OtpInput
                    value={otp}
                    onChange={(e) => setOtp(e)}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="otp-container"
                  ></OtpInput>
                  <div className="container-login100-form-btn">
                    {verifOtp ? (
                      <div className="spinner mx-auto mt-3"></div>
                    ) : (
                      <button onClick={optVerify} className="login100-form-btn">
                        Vérifier
                      </button>
                    )}
                  </div>
                  {/* <div className="container-login100-form-btn">
                    <button onClick={optVerify} className="login100-form-btn">
                      {verifOtp && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      Vérifier
                    </button>
                  </div> */}
                </>
              ) : (
                <>
                  {/* <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                                    <BsTelephoneFill size={30} />
                                </div>
                                <label htmlFor=""
                                    className='font-bold text-xl text-white text-center'
                                >
                                    Vérifier votre numéro de téléphone
                                </label> */}
                  <PhoneInput
                    country={"bj"}
                    value={number}
                    onChange={(e) => setnumber(e)}
                  />
                  {/* <button onClick={envoiOtp} className='bg-emerald-600 w-full gap-1 flex justify-center py-2.5 text-white rounded'>
                                    {verifOtp &&
                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                    }
                                    <span>Envoyer le code via SMS</span>
                                </button> */}
                  <div className="container-login100-form-btn">
                    {verifOtp ? (
                      <div className="spinner mx-auto mt-3"></div>
                    ) : (
                      <button onClick={envoiOtp} className="login100-form-btn">
                        Login
                      </button>
                    )}
                    {/* <button onClick={envoiOtp} className="login100-form-btn">
                      {verifOtp && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      Login
                    </button> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login_lvc;
