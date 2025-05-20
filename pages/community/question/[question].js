import React from "react";
import QuestionComp from "../../../components/community/QuestionComp";
import { withRouter } from "next/router";
import { getSingleQuestion } from "../../../actions/community";

const Question = ({ questionObj, isForUpdate }) => {
  return (
    <React.Fragment>
      <QuestionComp questionObj={questionObj} isForUpdate={isForUpdate} currentUserName={currentUserName}
      currentUserPhoto={currentUserPhoto} />
    </React.Fragment>
  );
};

export async function getServerSideProps({ query }) {
  console.log("query.question", query.question);

  if (query.question) {
    const res = await getSingleQuestion(query.question);
    if (res.error) {
      console.log(res.error);
      return { 
        props: {
          isForUpdate: false
        }
         };
    }
    return { 
      props: {
        questionObj: res, isForUpdate: true
      }
       };
  } else {
    return { 
      props: {
        isForUpdate: false
      }
       };
  }
};

export default withRouter(Question);
