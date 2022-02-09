import { useState } from "react";
import style from "../styles/login.module.css";

export default function LoginModal({ onCreateUser, value, setUsername }) {
  return (
    <div className="flex items-center justify-center  h-screen w-screen bg-gray-900 ">
      <div>
        <form className=" h-1/4 bg-gray-800  py-5 px-3">
          <input
            type="text"
            placeholder="Your fullName..."
            required
            className="p-2 px-6  my-3  text-gray-200 w-full bg-gray-700 rounded-lg border border-sky-800 focus:outline-none focus:border-sky-500 transition duration-300"
            value={value}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="mt-8 w-full py-2 px-4 rounded-md border bg-sky-500 border-sky-500  text-gray-50 text-xl capitalize  hover:bg-sky-600 transition duration-300"
            onClick={onCreateUser}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
