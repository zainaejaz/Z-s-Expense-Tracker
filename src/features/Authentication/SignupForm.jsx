import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

// import {} from "../../../public";

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );

    // console.log(fullName, email, password);
    console.log("hello");
    reset();
  }

  return (
    <div className="min-h-screen min-w-full flex flex-col md:flex-row items-center justify-around relative form-img bg-center bg-cover bg-no-repeat sectionAlignment">
      <form
        className="formLayout flex flex-col items-center justify-center gap-4 bg-cyan-700 p-[8rem]  text-[#FFFFFF]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label label="Full name" className="formLabel">
          Enter your full Name:
          <input
            className="text-black"
            type="text"
            id="fullName"
            {...register("fullName", { required: "This field is required" })}
          />
        </label>

        <span className="text-[#FFFFFF] h-6">{errors?.fullName?.message}</span>

        <label label="Email address" className="formLabel">
          Enter your Email Address:
          <input
            className="text-black"
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </label>

        <span className="text-[#FFFFFF] h-6">{errors?.email?.message}</span>

        <label label="Password (min 8 characters)" className="formLabel">
          Enter your password:
          <input
            className="text-black"
            type="password"
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </label>
        <span className="text-[#FFFFFF] h-6">{errors?.password?.message}</span>

        <label label="Repeat password" className="formLabel">
          Enter your confirm password:
          <input
            className="text-black"
            type="password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </label>
        <span className="text-[#FFFFFF] h-6">
          {errors?.passwordConfirm?.message}
        </span>

        <label>
          <Button
            className="me-5 rounded-lg p-3 bg-[#FFFFFF] text-cyan-700"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button className="rounded-lg p-3 bg-[#FFFFFF] text-cyan-700">
            Create new user
          </Button>
        </label>
      </form>
    </div>
  );
}
