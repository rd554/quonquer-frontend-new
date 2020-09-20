import Link from "next/link";
import { useState } from "react";
import { getCookie } from "../../actions/auth";
import { Dropdown } from "./Dropdown";
import { DropdownAnswer } from "./DropdownAnswer";
import { Claps } from "./Claps";
import moment from "moment";
import clap from "../../public/images/clap.png";
import ans from "../../public/images/ans_icon.png";
import share from "../../public/images/001-share.png";
import hide from "../../public/images/001-close.png";
import more from "../../public/svg/more.svg";
import user from "../../public/images/001-user.png";
import { PUBLIC, ANONYMOUS } from "../../helpers/constants";
import { useRouter } from "next/router";

const QuestionCard = ({ ques, notifyParentQuestionList, userEmail }) => {
  const {
    question,
    postedBy: { name, email },
    _id,
    answers,
    questionScope,
  } = ques;

  const token = getCookie("token");
  const router = useRouter();
  const createUpdateAnswerProps = `${_id}||`;

  const handleAnswerBtnClick = (createUpdateAnswerProps) => {
    router.push(
      token ? `/community/answer/${createUpdateAnswerProps}` : "/signin"
    );
  };

  return (
    <div className="cursor-pointer max-w-md rounded shadow-lg mx-3 bg-white align-top my-2 flex flex-col rounded-community mb-4">
      <div className="h-10 w-full flex justify-end px-4 items-center">
        <div className="">
          {userEmail === email ? (
            <Dropdown
              questionId={_id}
              notifyParentQuestionList={notifyParentQuestionList}
            />
          ) : null}
        </div>
      </div>
      <div className="flex justify-start items-center px-4">
        <img src={user} alt="user" className="h-6 w-6" />
        <p className="ml-1 font-medium">
          {questionScope === PUBLIC ? name : ANONYMOUS}
        </p>
        <div className="text-xs">
          <p>&nbsp;. asked &nbsp;{moment(ques.createdAt).fromNow()}</p>
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
            <p className="dark-blue-text text-xs ml-2">clap</p>
          </div>
        </div>
        <div className="w-1/3 text-black flex-1 text-center dark-blue rounded-full">
          <div
            onClick={() => handleAnswerBtnClick(createUpdateAnswerProps)}
            className="h-10 w-full flex justify-center px-8 items-center"
          >
            <img src={ans} alt="sadas" className="h-4 w-4 mt-1" />
            <p className="text-xs text-white ml-2">Answer</p>
          </div>
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
      <hr />
      {answers.length > 0
        ? answers.map((ans, index) => {
            const {
              userId: { name },
              answer,
            } = ans;

            const createUpdateAnswerProps = `${_id}||${ans._id}`;
            return (
              <div key={index} className="flex justify-between p-4">
                <div className="flex">
                  <div>
                    <img src={user} alt="user" className="w-6 h-6 mt-1" />
                  </div>
                  <div className="mb-2 ml-2 bg-gray-100 rounded-lg p-1">
                    <p className="font-medium">{name}</p>
                    <p className="text-sm">{answer}</p>
                  </div>
                </div>
                <DropdownAnswer
                  answerId={ans._id}
                  questionId={_id}
                  createUpdateAnswerProps={createUpdateAnswerProps}
                />
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

export default QuestionCard;
