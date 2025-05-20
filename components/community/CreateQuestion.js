import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from "../../actions/auth";
import { useRouter } from "next/router";

const CreateQuestion = ({ currentUserName, currentUserPhoto }) => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    setToken(getCookie("token"));
  }, []);

  const handleCreateQuestionClick = () => {
    router.push(token ? "/community/question" : "/signin");
  };
  return (
    <React.Fragment>
      <div className="mx-4 my-6 mt-16 rounded-lg shadow-lg">
        <div className="flex text-bold items-center px-3 w-full pr-4 pl-4 my-4">
          <Image src={currentUserPhoto?.length === 0 ? "/images/001-user.png" : currentUserPhoto} alt="user" width={24} height={24} className="rounded-full" />
          <p className="ml-1 font-medium">
            {currentUserName.length === 0 ? "Hello User" : currentUserName}
          </p>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => closeModal(false)}
          ></button>
        </div>

        <div className="w-full rounded">
          <div
            onClick={handleCreateQuestionClick}
            className="bg-white focus:outline-none focus:shadow-outline mt-3 py-3 px-4 
  block appearance-none leading-normal rounded-lg text-lg overlay-box reveal w-full"
          >
            <span className="text-gray-500">What is your question?</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateQuestion;
