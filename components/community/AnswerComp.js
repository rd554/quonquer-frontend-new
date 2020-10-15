import Link from "next/link";
import Private from "../auth/Private";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createAnswer, listAllCards } from "../../actions/community";
import { getCookie } from "../../actions/auth";
import back from "../../public/back.png";
import user from "../../public/images/001-user.png";
import { PUBLIC, ANONYMOUS } from "../../helpers/constants";

const AnswerComp = ({ isForAnswerUpdate, answerObj, answerId, questionId }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    answer: answerObj && answerObj.answer ? answerObj.answer : "",
    error: false,
    success: false,
    posted: false,
    postButton: "Post answer",
  });

  const [selectedScope, setSelectedScope] = useState(PUBLIC);
  const [scopeOptions] = useState([PUBLIC, ANONYMOUS]);

  const { answer, error, success, postButton } = values;
  const token = getCookie("token");

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, postButton: "posting..." });
    if (isForAnswerUpdate) {
    } else {
      createAnswer(answer, token, questionId, selectedScope).then((res) => {
        if (res.error) {
          setValues({ ...values, error: res.error });
        } else {
          setValues({
            ...values,
            posted: true,
            postButton: "posted",
            success: res.success,
          });
          router.push("/community");
        }
      });
    }
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

  const postAnswer = () => {
    return (
      <React.Fragment>
        {/*<Private> */}
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
                {isForAnswerUpdate ? "Update" : "Post"}
              </button>
            </div>
          </div>
          <br />
          <hr />

          <div>
            <div className="flex text-bold items-center px-3 w-full pr-4 pl-4 my-4">
              <img src={user} alt="user" className="h-8 w-8" />
              <p className="ml-3">User</p>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"></button>
            </div>
            <div className="mx-3 shadow-md">
              <textarea
                rows="8"
                className="bg-white focus:outline-none focus:shadow-outline mt-3 py-3 px-4 
block appearance-none leading-normal rounded text-lg overlay-box reveal w-full"
                type="text"
                onChange={handleChange("answer")}
                value={answer}
                required
                placeholder="Add your answer..."
              ></textarea>
            </div>
            <div className="mt-4 mx-3 shadow-md">
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.currentTarget.value)}
                className="bg-white focus:outline-none focus:shadow-outline py-3 px-4 
block appearance-none leading-normal rounded text-lg overlay-box reveal"
              >
                {scopeOptions.map((scope) => (
                  <option key={scope} value={scope}>
                    {scope}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-700 p-4 very-small">
              <p>* While posting double-check spelling and grammar.</p>
              <p>* Keep answers limited to respective question.</p>
              <p>* Choose Public to show name and Anonymous to hide.</p>
            </div>
          </div>
        </form>
        {/*</Private> */}
      </React.Fragment>
    );
  };

  return <React.Fragment>{postAnswer()}</React.Fragment>;
};

export default AnswerComp;
