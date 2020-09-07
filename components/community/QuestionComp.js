import Link from "next/link";
import Private from "../auth/Private";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { createQuestion } from "../../actions/community";
import { getCookie } from "../../actions/auth";
import back from "../../public/back.png";
import user from "../../public/images/001-user.png";

const QuestionComp = () => {
  const [values, setValues] = useState({
    question: "",
    error: false,
    success: false,
    posted: false,
    postButton: "Post question",
  });

  const { question, error, success, postButton } = values;
  const token = getCookie("token");

  // useEffect(() => {
  //   setValues({ ...values });
  // }, [router]);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, postButton: "posting..." });
    createQuestion(question, token).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setValues({
          ...values,
          posted: true,
          question: "",
          postButton: "posted",
          success: res.success,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      postButton: "Post question",
    });
  };

  const postQuestion = () => {
    return (
      <>
        <Private>
          <form onSubmit={clickSubmit}>
            <div className="flex w-full justify-between mt-4">
              <Link href="/community">
                <a>
                  <img src={back} alt="back" className="w-6 h-6 ml-2 mt-2" />
                </a>
              </Link>
              <div>
                <button
                  type="submit"
                  className="inline-block dark-blue
text-white px-5 py-2 mr-2 uppercase tracking-wider
text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-full shadow-md"
                >
                  Post
                </button>
              </div>
            </div>
            <br />
            <hr />

            <div>
              <div className="flex text-bold items-center px-3 w-full pr-4 pl-4 my-4">
                <img src={user} alt="user" className="h-8 w-8" />
                <p className="ml-3">Ravi</p>
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"></button>
              </div>
              <div className="mx-3 shadow-md">
                <textarea
                  rows="8"
                  className="bg-white focus:outline-none focus:shadow-outline mt-3 py-3 px-4 
block appearance-none leading-normal rounded text-lg overlay-box reveal w-full"
                  type="text"
                  onChange={handleChange("question")}
                  value={question}
                  required
                  placeholder="What is your question?"
                ></textarea>
              </div>
              <div className="mt-4 mx-3 shadow-md">
                <select
                  className="bg-white focus:outline-none focus:shadow-outline py-3 px-4 
block appearance-none leading-normal rounded text-lg overlay-box reveal"
                >
                  <option value="A">Public</option>
                  <option value="B">Anonymous</option>
                </select>
              </div>
              <div className="text-gray-700 p-4 very-small">
                * While posting double-check spelling and grammar.
              </div>
            </div>
          </form>
        </Private>
      </>
    );
  };

  return <>{postQuestion()}</>;
};

export default QuestionComp;
