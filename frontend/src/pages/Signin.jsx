import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Input,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";

const Signin = () => {
  // password toggle
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    // parent component
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      {/* card component */}
      <Card className="h-max my-8 max-w-[400px]">
        {/* card Header */}
        <CardHeader className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center flex-col">
            <p className="font-bold text-4xl py-4">Sign In</p>
            <p className="text-slate-500 text-md pt-1 px-4 pb-4">
              Enter your credentials to access your account
            </p>
          </div>
        </CardHeader>
        <Divider />
        {/* card body */}
        <CardBody className="my-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="mb-4"
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="johndoe@example.com"
              isRequired
              isInvalid={errors.email}
              errorMessage={errors.email ? "Invalid email format" : undefined}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <Input
              className="py-6"
              label="Password"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Enter your password"
              isRequired
              isInvalid={errors.password}
              errorMessage={errors.password && "Password is required"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            <Button
              type="submit"
              className="my-2 w-full py-4"
              color="primary"
              variant="shadow"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <Divider />
        {/* card footer */}
        <CardFooter className="flex justify-center ">
          <div>
            Dont have an account?
            <Link className="mx-1" showAnchorIcon href="/signup">
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
