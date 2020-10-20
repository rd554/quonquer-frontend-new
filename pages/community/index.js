import Head from "next/head";
import Link from "next/link";
import { listAllCards } from "../../actions/community";
import { useState, useEffect } from "react";
import QuestionCard from "../../components/community/QuestionCard";
import CreateQuestion from "../../components/community/CreateQuestion";
import Layout from "../../components/Layout";
import clap from "../../public/images/clap.png";
import ans from "../../public/images/ans_icon.png";
import share from "../../public/images/001-share.png";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/auth";
import { getProfile } from "../../actions/user";
const token = getCookie("token");

const Community = ({
  questions,
  questionsLimit,
  router,
}) => {
  const [pageNo, setPageNo] = useState(2);
  // const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [displayQuestions, setDisplayQuestions] = useState(questions);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");
  const [isLoadMoreLoading, setLoadMoreLoading] = useState(false);

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
    }).catch((err) => {
      console.log('err.message', err.message)
    })
    ;
  };

  useEffect(() => {
    init();
  }, []);


  // useEffect(() => {
  //   if (user && JSON.parse(user).email) {
  //     console.log('JSON.parse(user)', JSON.parse(user))
  //     setCurrentUserEmail(JSON.parse(user).email);
  //     setCurrentUserName(JSON.parse(user).name);
  //     setCurrentUserPhoto(JSON.parse(user).photo);
  //   }

  //   console.log('currentUserPhoto', currentUserPhoto)
  // }, [currentUserEmail, currentUserName, currentUserPhoto]);

  const user = getCookie("user");

  const loadMore = async () => {
    setLoadMoreLoading(true)
    const token = getCookie("token");
    const res = await listAllCards(pageNo, token);
      if (res.error) {
        console.log(res.error);
      } else {
        if(res.questions.length === 0){
           return  
        }
        setLoadMoreLoading(false)
        let newDisplayQuestions  = [...displayQuestions, ...res.questions]
        setDisplayQuestions(newDisplayQuestions)
      }

      let updatedPageNumber = pageNo + 1
      setPageNo(updatedPageNumber)
    // listAllCards(toSkip, limit).then((res) => {
    //   if (res.error) {
    //     console.log(error);
    //   } else {
    //     setLoadedQuestions([...loadedQuestions, ...res.questions]);
    //     setSize(res.size);
    //     setSkip(toSkip);
    //   }
    // });
  };

  const loadMoreButton = () => {
    if(isLoadMoreLoading){
      return null
    }else {
      return <button
      className="inline-block dark-blue
      text-white px-2 py-2 mt-3 mb-3 uppercase tracking-wider
      text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          onClick={loadMore}
        >
      load more
    </button>
    }
  };

  const showLoadedQuestions = () => {
    return displayQuestions && displayQuestions.length
      ? displayQuestions.map((question, i) => {
          return (
            <div key={i}>
              <QuestionCard
                userEmail={currentUserEmail}
                key={i}
                ques={question}
                notifyParentQuestionList={notifyParentQuestionList}
              />
            </div>
          );
        })
      : null;
  };

  // const showAllQuestions = () => {
  //   return loadedQuestions && loadedQuestions.length
  //     ? loadedQuestions.map((question, i) => {
  //         return (
  //           <div key={i}>
  //             <QuestionCard
  //               userEmail={currentUserEmail}
  //               key={i}
  //               questions={question}
  //               notifyParentQuestionList={notifyParentQuestionList}
  //             />
  //           </div>
  //         );
  //       })
  //     : null;
  // };

  const notifyParentQuestionList = (questionId) => {
    console.log("notifyParentQuestionList");
    let newQuestions = displayQuestions.filter(
      (question) => question._id !== questionId
    );
    setDisplayQuestions(newQuestions);
  };

  return (
    <React.Fragment>
      <Layout>
        <main>
          <div>
            <CreateQuestion
              currentUserName={currentUserName}
              currentUserPhoto={currentUserPhoto}
            />
            <div>{showLoadedQuestions()}</div>
            <div className="text-center">{loadMoreButton()}</div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

// <div>{showAllQuestions()}</div>

export async function getServerSideProps() {
  const res = await listAllCards(1,token);
  console.log('res', res)
  if (res.error) {
    console.log(res.error);
  } else {
    return {
      props: {
        questions: res.questions,
        totalQuestions: res.size,
      }
      
    };
  }
};

export default withRouter(Community);
