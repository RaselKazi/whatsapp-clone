import React from "react";
import Image from "next/image";
import avatarIcon from "../public/7.png";
export default function ChatBody({ messages, username }) {
  return (
    <div className="bg-gray-900 w-full  h-5/6">
      <div className="overflow-y-auto max-h-full">
        {messages && messages.length > 0
          ? messages.map((msg, index) => (
              <>
                {username === msg.receiver ? (
                  <div className=" flex justify-start">
                    {msg.media && msg.media.image ? (
                      <div className=" ml-6 flex  items-center">
                        <Image
                          src={avatarIcon}
                          className=" bg-gray-700 p-4 rounded-full"
                          alt=""
                          layout="fixed"
                          width={35}
                          height={35}
                        />
                        <div className="mx-4 my-10 py-1 px-4">
                          <img src={msg.media.content} width="200" alt="" />
                        </div>
                      </div>
                    ) : null}
                    {msg.message !== "" ? (
                      <div className=" h-16 ml-6 flex  items-center">
                        <Image
                          src={avatarIcon}
                          className=" bg-gray-700 p-4 rounded-full"
                          alt=""
                          layout="fixed"
                          width={35}
                          height={35}
                        />
                        <p className="mx-4 my-10 py-1 px-4 rounded-lg  bg-gray-700 text-xl text-gray-300">
                          {msg.message}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className=" flex justify-end">
                    {msg.media && msg.media.image ? (
                      <div className="mr-6 flex items-center">
                        <div className="mx-4 my-10 py-1 px-4">
                          <img src={msg.media.content} width="200" alt="" />
                        </div>
                        <Image
                          src={avatarIcon}
                          className=" bg-gray-700 p-4 rounded-full"
                          alt=""
                          layout="fixed"
                          width={35}
                          height={35}
                        />
                      </div>
                    ) : null}
                    {msg.message !== "" ? (
                      <div className="mr-6 h-16 flex  items-center">
                        {" "}
                        <p className="mx-4 my-10 py-1 px-4 rounded-lg  bg-gray-700 text-xl text-gray-300">
                          {msg.message}
                        </p>
                        <Image
                          src={avatarIcon}
                          className=" bg-gray-700 p-4 rounded-full"
                          alt=""
                          layout="fixed"
                          width={35}
                          height={35}
                        />
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            ))
          : null}
      </div>
    </div>
  );
}
