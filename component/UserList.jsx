import React from "react";
import Image from "next/image";
import avatarIcon from "../public/7.png";
export default function UserList({ user, onUserSelect, checkUnseenMessages }) {
  return (
    <div>
      <li className=" z-10" key={user} onClick={() => onUserSelect(user)}>
        <div className="p-3 flex justify-between items-center hover:bg-gray-700">
          <div className="inline-flex items-center">
            <Image
              src={avatarIcon}
              className=" h-10 w-10 rounded-full mr-3"
              alt=""
              layout="fixed"
              width={50}
              height={50}
            />

            <div className="">
              <p className="font-semibold text-white">{user}</p>
              <p className="text-gray-200 text-sm">Follow me on Instagram</p>
              <p className="text-green-500 font-semibold text-sm">typing...</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500 text-xs">17:07</p>
            {checkUnseenMessages(user) !== 0 ? (
              <p className="mx-auto text-center text-white h-5 w-5 rounded-full bg-green-500 text-xs">
                <span className="align-middle">
                  {checkUnseenMessages(user)}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </li>
    </div>
  );
}
