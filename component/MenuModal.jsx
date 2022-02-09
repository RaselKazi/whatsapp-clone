import React from "react";

export default function MenuModal() {
  return (
    <ul className=" text-gray-200 p-4 space-y-4">
      <a className=" " href="#">
        <li className="mb-4 bg-gray-800 hover:bg-gray-700">New group</li>
      </a>
      <a href="#">
        <li className="mb-4">New broadcast</li>
      </a>
      <a href="#">
        <li className="mb-4">Linked devices</li>
      </a>
      <a href="#">
        <li className="mb-4">Starred messages</li>
      </a>
      <a href="#">
        <li className="mb-4">Settings</li>
      </a>
    </ul>
  );
}
