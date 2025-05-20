import React from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCookie } from '../../../actions/auth'
import { getProfile } from "../../../actions/user";
import AnswerComp from "../../../components/community/AnswerComp";
import { getSingleAnswer } from "../../../actions/community";

const Answer = ({ answerObj, isForAnswerUpdate, answerId, questionId }) => {
  console.log("answerObj", answerObj);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");

  const token = getCookie("token");

  const init = () => {
    getProfile(token).then((res) => {
      if (res.error) {
        console.log('res.error', res.error)
      } else {
        setCurrentUserName(res.name)
        setCurrentUserPhoto(res.photo)
        setCurrentUserEmail(res.email)
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Fragment>
      <AnswerComp
        isForAnswerUpdate={isForAnswerUpdate}
        answerObj={answerObj}
        answerId={answerId}
        questionId={questionId}
        currentUserName={currentUserName}
        currentUserPhoto={currentUserPhoto}
      />
    </React.Fragment>
  );
};

export async function getServerSideProps({ query }) {
  console.log("query.answer", query.answer.split("||"));
  let dataArray = query.answer.split("||");
  let answerId = dataArray[1];
  let questionId = dataArray[0];
  if (query.answer && dataArray && answerId.length) {
    // Update drop down

    const res = await getSingleAnswer(answerId);
    if (res.error) {
      console.log(res.error);
      return { 
        props: {
          isForAnswerUpdate: false, answerId, questionId
        }
         };
    }
    return { 
      props: {
        answerObj: res, isForAnswerUpdate: true, answerId, questionId
      }
       };
  } else {
    return {
      props: {
        isForAnswerUpdate: false,
      answerId,
      questionId,
      }
      
    };
  }
};

export default withRouter(Answer);
