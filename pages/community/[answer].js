import AnswerComp from "../../components/community/AnswerComp";

const Answer = (props) => {
  console.log("Answer", props);
  return (
    <div>
      <AnswerComp />
    </div>
  );
};

Answer.getInitialProps = async ({ query }) => {
  console.log("getInitialProps", query);
};

export default Answer;
