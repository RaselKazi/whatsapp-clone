import { useState, useRef, useEffect } from "react";
import LoginModal from "../component/LoginModal";
import { io } from "socket.io-client";
import DefaultImage from "../component/DefaultImage";
import MobileNav from "../component/Layout/MobileNav";
import UserList from "../component/UserList";
import SidebarHeader from "../component/Layout/SidebarHeader";
import ChatHeader from "../component/ChatHeader";
import ChatFooter from "../component/ChatFooter";
import ChatBody from "../component/ChatBody";
const socket = io(`https://whatapp-s.herokuapp.com/`);

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [avatar, setAvatar] = useState("");
  const [media, setMedia] = useState(null);
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");
  const [groupMessage, setGroupMessage] = useState({});
  const receiverRef = useRef(null);
  const sortNames = (username1, username2) => {
    return [username1, username2].sort().join("-");
  };

  // Create a new user function
  const onCreateUser = (e) => {
    e.preventDefault();

    if (username) {
      socket.emit("new_user", username);
      setLoginModalOpen(false);
    }
  };
  //Select a user from user list function
  const onUserSelect = (username) => {
    setReceiver(username);
    receiverRef.current = username;
    setChatOpen(true);
  };

  //here we are sending
  const sendMessage = (e) => {
    e.preventDefault();

    const data = {
      sender: username,
      receiver,
      message,
      media,
      avatar,
      view: false,
    };

    //here we are sending to data  on server
    socket.emit("send_message", data);

    const key = sortNames(username, receiver);
    const tempGroupMessage = { ...groupMessage };
    if (key in tempGroupMessage) {
      tempGroupMessage[key] = [
        ...tempGroupMessage[key],
        { ...data, view: true },
      ];
    } else {
      tempGroupMessage[key] = [{ ...data, view: true }];
    }

    setGroupMessage({ ...tempGroupMessage });

    if (media !== null) {
      setMedia(null);
    }

    setMessage("");
  };

  useEffect(() => {
    socket.on("all_users", (users) => {
      setUsers(users);
    });

    socket.on("new_message", (data) => {
      setGroupMessage((prevGroupMessage) => {
        const messages = { ...prevGroupMessage };
        const key = sortNames(data.sender, data.receiver);

        if (receiverRef.current === data.sender) {
          data.view = true;
        }

        if (key in messages) {
          messages[key] = [...messages[key], data];
        } else {
          messages[key] = [data];
        }

        return { ...messages };
      });
    });
  }, []);

  useEffect(() => {
    //here we are going to update view count of selected user = receiver
    updateMessageView();
  }, [receiver]);

  const checkUnseenMessages = (receiver) => {
    const key = sortNames(username, receiver);
    let unseenMessages = [];
    if (key in groupMessage) {
      unseenMessages = groupMessage[key].filter((msg) => !msg.view);
    }
    return unseenMessages.length;
  };

  const updateMessageView = () => {
    const key = sortNames(username, receiver);
    if (key in groupMessage) {
      const messages = groupMessage[key].map((msg) =>
        !msg.view ? { ...msg, view: true } : msg
      );

      groupMessage[key] = [...messages];

      setGroupMessage({ ...groupMessage });
    }
  };
  const messages = groupMessage
    ? groupMessage[sortNames(username, receiver)]
    : [];

  if (loginModalOpen) {
    return (
      <div>
        <LoginModal
          setLoginModalOpen={setLoginModalOpen}
          onCreateUser={onCreateUser}
          value={username}
          setUsername={setUsername}
        ></LoginModal>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex w-full h-screen bg-gray-800">
          {/* <!-- tampilan mobile --> */}
          <div className=" w-full md:w-1/3 lg:w-1/3 bg-gray-900 border-r border-gray-500 relative">
            <SidebarHeader />
            <MobileNav />

            {/* User list */}
            <ul>
              {users &&
                Object.keys(users).map((user, index) => (
                  <div key={index}>
                    {user !== username ? (
                      <UserList
                        user={user}
                        onUserSelect={onUserSelect}
                        checkUnseenMessages={checkUnseenMessages}
                      />
                    ) : null}
                  </div>
                ))}
            </ul>
          </div>
          {chatOpen ? (
            <div
              className={` h-full md:block lg:block w-full md:w-2/3 lg:w-2/3 md:static ${
                chatOpen ? "md:block absolute" : ""
              }`}
            >
              <ChatHeader setChatOpen={setChatOpen} receiver={receiver} />

              <ChatBody messages={messages} username={username} />

              <ChatFooter
                setMessage={setMessage}
                setMedia={setMedia}
                message={message}
                sendMessage={sendMessage}
              />
            </div>
          ) : (
            <div className="h-full hidden md:block w-full md:w-2/3">
              <DefaultImage />
            </div>
          )}
        </div>
      </div>
    );
  }
}
