import Head from "next/head";
import Link from "next/link";
import { listAllCards } from "../../actions/community";
import Card from "../../components/community/Card";
import CreateQuestion from "../../components/community/CreateQuestion";
import Layout from "../../components/Layout";
import clap from "../../public/images/clap.png";
import ans from "../../public/images/ans_icon.png";
import share from "../../public/images/001-share.png";

const Community = ({
  question,
  questionSkip,
  totalQuestion,
  questionLimit,
  router,
}) => {
  return (
    <Layout>
      <main>
        <div>
          <CreateQuestion />
          <Card />
        </div>
      </main>
    </Layout>
  );
};

Community.getInitialProps = async () => {
  let skip = 0;
  let limit = 4;
  const res = await listAllCards(skip, limit);
  if (res.error) {
    console.log(res.error);
  } else {
    return {
      question: res.question,
      questionSkip: skip,
      questionLimit: limit,
      totalQuestion: res.size,
    };
  }
};

export default Community;
