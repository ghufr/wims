import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
// import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    email: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.get("/sanctum/csrf-cookie");
    const res = await axios
      .post(route("api.auth.login"), data, { withCredentials: true })
      .then((res) => res.data)
      .catch(() => null);

    if (!res) {
      setError("email", "These credentials do not match our records.");
      return;
    }

    window.localStorage.setItem("uhuyy", res.token);

    post(route("login"));
  };

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center px-4 bg-gray-100">
      <div className="w-full rounded-lg max-w-sm mt-6 px-6 py-8 bg-white shadow-sm overflow-hidden">
        <Head title="Log in" />

        {/* <h1 className="text-2xl font-semibold mb-4">Login</h1> */}
        {status && (
          <div className="mb-4 font-medium text-sm text-green-600">
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <div>
            <Label forInput="email" value="Email" />

            <Input
              type="text"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              onChange={onHandleChange}
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <Label forInput="password" value="Password" />

            <Input
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={onHandleChange}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                value={data.remember}
                handleChange={onHandleChange}
              />

              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="underline text-sm text-gray-600 hover:text-gray-900"
              >
                Forgot your password?
              </Link>
            )}

            <Button type="submit" className="ml-4" disabled={processing}>
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
