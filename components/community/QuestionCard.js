import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getCookie } from "../../actions/auth";
import { Dropdown } from "./Dropdown";
import { DropdownAnswer } from "./DropdownAnswer";
import { Claps } from "./Claps";
import moment from "moment";
import { PUBLIC, ANONYMOUS } from "../../helpers/constants";
import { useRouter } from "next/router";

const QuestionCard = ({ ques, notifyParentQuestionList, userEmail }) => {
  const {
    question,
    postedBy: { name, email },
    _id,
    answers,
    questionScope,
    claps
  } = ques;

  const token = getCookie("token");
  const router = useRouter();
  const createUpdateAnswerProps = `${_id}||`;

  const handleAnswerBtnClick = (createUpdateAnswerProps) => {
    router.push(
      token ? `/community/answer/${createUpdateAnswerProps}` : "/signin"
    );
  };

  const handleShareClick = async (question, url) => {
    if (typeof navigator.share === "undefined" || !navigator.share) {
      alert("Your browser does not support Android Native Share");
    } else {
      const QuestionConst = question;
      const URLConst = url;

      try {
        await navigator.share({ question: QuestionConst, url: URLConst });
      } catch (error) {
        console.log("Error sharing: " + error);
        return;
      }
    }
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
        <Image src="/images/001-user.png" alt="user" width={24} height={24} />
        <p className="ml-1 font-medium">
          {questionScope === PUBLIC ? name : ANONYMOUS}
        </p>
        <div className="text-xs">
          <p>&nbsp;. asked &nbsp;{moment(ques.createdAt).fromNow()}</p>
        </div>
      </div>
      <div className="py-6 text-blue-900">
        <div className="text-lg mb-2 px-4 text-gray-700">{question}</div>
        <div className="bg-gray-200 app-line-height w-full"></div>
      </div>
      <div className="flex max-w-5xl w-full self-center home-menu-login-text mb-6 justify-center">
        <div className="w-1/3 text-black flex-1 text-center ">
          <div className="h-10 w-full flex justify-center px-8 items-center">
            <Image src="/images/clap.png" alt="thumps up" width={20} height={20} className="mt-1" />
            <p className="dark-blue-text text-xs mr-20">
              <Claps 
              questionId={_id}
              clapsNumbers={claps}
              />
            </p>
          </div>
        </div>
        <div className="w-1/3 text-black flex-1 text-center dark-blue rounded-full">
          <div
            onClick={() => handleAnswerBtnClick(createUpdateAnswerProps)}
            className="h-10 w-full flex justify-center px-8 items-center"
          >
            <Image src="/images/ans_icon.png" alt="answer" width={16} height={16} className="mt-1" />
            <p className="text-xs text-white ml-2">Answer</p>
          </div>
        </div>
        <div className="w-1/3 text-black flex-1 text-center ">
          <a>
            <div
              onClick={handleShareClick}
              className="h-10 w-full flex justify-center px-8 items-center"
            >
              <Image src="/images/001-share.png" alt="share" width={20} height={20} className="mt-1" />
              <p className="dark-blue-text text-sm ml-2 mt-1">Share</p>
            </div>
          </a>
        </div>
      </div>
      <hr />
      {answers.length > 0
        ? answers.map((ans, index) => {
            const {
              userId: { name, email },
              answer,
              answerScope,
            } = ans;

            const createUpdateAnswerProps = `${_id}||${ans._id}`;
            return (
              <div key={index} className="flex justify-between p-4">
                <div className="flex">
                  <div>
                    <Image src="/images/001-user.png" alt="user" width={24} height={24} className="mt-1" />
                  </div>
                  <div className="mb-2 ml-2 bg-gray-100 rounded-lg p-1">
                    <p className="font-medium">
                      {answerScope === PUBLIC ? name : ANONYMOUS}
                    </p>
                    <p className="text-sm text-gray-700">{answer}</p>
                  </div>
                </div>
                {userEmail === email ? (
                  <DropdownAnswer
                    answerId={ans._id}
                    questionId={_id}
                    createUpdateAnswerProps={createUpdateAnswerProps}
                  />
                ) : null}
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
