import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";

import AnswerComp from "../../../components/community/AnswerComp";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../../config";

const Answer = (props) => {
  console.log("props:", props);
  return (
    <React.Fragment>
      <AnswerComp questionId={props.router.query.answer} />
    </React.Fragment>
  );
};

Answer.getInitialProps = async ({ query }) => {
  // const res = await createAnswer(query.questionId);
  // if (res.error) {
  //   console.log(res.error);
  // } else {
  return { questionId: query.questionId };
  // }
};

export default withRouter(Answer);
