import Head from "next/head";
import Link from "next/link";
import { listAllCards } from "../../actions/community";
import { useState } from "react";
import Card from "../../components/community/Card";
import CreateQuestion from "../../components/community/CreateQuestion";
import Layout from "../../components/Layout";
import clap from "../../public/images/clap.png";
import ans from "../../public/images/ans_icon.png";
import share from "../../public/images/001-share.png";
import { withRouter } from "next/router";

const Community = ({
  questions,
  questionSkip,
  totalQuestions,
  questionsLimit,
  router,
}) => {
  const [limit, setLimit] = useState(questionsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalQuestions);
  const [loadedQuestions, setLoadedQuestions] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listAllCards(toSkip, limit).then((res) => {
      if (res.error) {
        console.log(error);
      } else {
        setLoadedQuestions([...loadedQuestions, ...res.questions]);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          className="inline-block dark-blue
      text-white px-2 py-2 mt-3 mb-3 uppercase tracking-wider
      text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          onClick={loadMore}
        >
          load more
        </button>
      )
    );
  };

  const showLoadedQuestions = () => {
    return questions.map((questions, i) => {
      return (
        <div key={i}>
          <Card key={i} questions={questions} />
        </div>
      );
    });
  };

  const showAllQuestions = () => {
    return loadedQuestions.map((questions, i) => {
      return (
        <div key={i}>
          <Card key={i} questions={questions} />
        </div>
      );
    });
  };

  return (
    <>
      <Layout>
        <main>
          <div>
            <CreateQuestion />
            <div>{showAllQuestions()}</div>
            <div>{showLoadedQuestions()}</div>
            <div className="text-center">{loadMoreButton()}</div>
          </div>
        </main>
      </Layout>
    </>
  );
};

Community.getInitialProps = async () => {
  let skip = 0;
  let limit = 10;
  const res = await listAllCards(skip, limit);
  if (res.error) {
    console.log(res.error);
  } else {
    return {
      questions: res.questions,
      questionSkip: skip,
      questionsLimit: limit,
      totalQuestions: res.size,
    };
  }
};

export default withRouter(Community);
