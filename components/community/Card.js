import Link from "next/link";
import { useState } from "react";
import { getCookie } from "../../actions/auth";
import { Dropdown } from "./Dropdown";
import moment from "moment";
import clap from "../../public/images/clap.png";
import ans from "../../public/images/ans_icon.png";
import share from "../../public/images/001-share.png";
import hide from "../../public/images/001-close.png";
import more from "../../public/images/001-more.png";
import user from "../../public/images/001-user.png";

const Card = ({ ques, notifyParentQuestionList }) => {
  const {
    question,
    postedBy: { name },
    _id,
    answers,
  } = ques;

  return (
    <div className="cursor-pointer max-w-md rounded shadow-lg mx-3 bg-white align-top my-2 flex flex-col rounded-community mb-4">
      <div className="h-10 w-full flex justify-end px-4 items-center">
        <div className="">
          <Dropdown
            questionId={_id}
            notifyParentQuestionList={notifyParentQuestionList}
          />
        </div>
      </div>
      <div className="flex justtify-start items-center px-4">
        <img src={user} alt="user" className="h-6 w-6" />
        <p className="ml-1">{name}</p>
        <div className="text-xs">
          <p>&nbsp;. {moment(ques.updatedAt).fromNow()}</p>
        </div>
      </div>
      <div className="py-6 text-blue-900">
        <div className="text-xl mb-2 px-4">{question}</div>
        <div className="bg-gray-200 app-line-height w-full"></div>
      </div>
      <div className="flex max-w-5xl w-full self-center home-menu-login-text mb-6 justify-center">
        <div className="w-1/3 text-black flex-1 text-center ">
          <div className="h-10 w-full flex justify-center px-8 items-center">
            <img src={clap} alt="sadas" className="h-5 w-5 mt-1" />
            <p className="dark-blue-text text-xs ml-2">Clap</p>
          </div>
        </div>
        <div className="w-1/3 text-black flex-1 text-center dark-blue rounded-full">
          <Link href={`/community/answer/${_id}`}>
            <a>
              <div className="h-10 w-full flex justify-center px-8 items-center">
                <img src={ans} alt="sadas" className="h-4 w-4 mt-1" />
                <p className="text-xs text-white ml-2">Answer</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="w-1/3 text-black flex-1 text-center ">
          <Link href={`/community/question/${_id}`}>
            <a>
              <div className="h-10 w-full flex justify-center px-8 items-center">
                <img src={share} alt="sadas" className="h-5 w-5 mt-1" />
                <p className="dark-blue-text text-xs ml-2 mt-1">Share</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
      {answers.length > 0
        ? answers.map((ans, index) => {
            const {
              userId: { name },
              answer,
            } = ans;
            return (
              <div className="flex p-4">
                <div>
                  <img src={user} alt="user" className="w-12" />
                </div>
                <div className="mb-2 ml-2 bg-gray-100 rounded-lg p-1">
                  <p className="font-bold text-">{name}</p>
                  <p>{answer}</p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );

  // return (
  //   <React.Fragment>
  //     <div className="flex justify-center flex-col items-center pt-6 mb-24">
  //       {card}
  //     </div>
  //   </React.Fragment>
  // );
};

export default Card;
