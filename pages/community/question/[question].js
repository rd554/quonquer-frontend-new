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

Question.getInitialProps = async ({ query }) => {
  console.log("query.question", query.question);

  if (query.question) {
    const res = await getSingleQuestion(query.question);
    if (res.error) {
      console.log(res.error);
      return { isForUpdate: false };
    }
    return { questionObj: res, isForUpdate: true };
  } else {
    return { isForUpdate: false };
  }
};

export default withRouter(Question);
