import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import AnswerComp from "../../../components/community/AnswerComp";
import { getSingleAnswer } from "../../../actions/community";

const Answer = ({ answerObj, isForAnswerUpdate, answerId, questionId }) => {
  console.log("answerObj", answerObj);
  return (
    <React.Fragment>
      <AnswerComp
        isForAnswerUpdate={isForAnswerUpdate}
        answerObj={answerObj}
        answerId={answerId}
        questionId={questionId}
      //   currentUserName={currentUserName}
      // currentUserPhoto={currentUserPhoto}
      />
    </React.Fragment>
  );
};

Answer.getInitialProps = async ({ query }) => {
  console.log("query.answer", query.answer.split("||"));
  let dataArray = query.answer.split("||");
  let answerId = dataArray[1];
  let questionId = dataArray[0];
  if (query.answer && dataArray && answerId.length) {
    // Update drop down

    const res = await getSingleAnswer(answerId);
    if (res.error) {
      console.log(res.error);
      return { isForAnswerUpdate: false, answerId, questionId };
    }
    return { answerObj: res, isForAnswerUpdate: true, answerId, questionId };
  } else {
    return {
      isForAnswerUpdate: false,
      answerId,
      questionId,
    };
  }
};

export default withRouter(Answer);
