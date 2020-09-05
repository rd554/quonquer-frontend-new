import Link from "next/link";

import QuestionModal from "./QuestionModal";
import user from "../../public/images/001-user.png";

const CreateQuestion = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="mx-4 my-6 mt-16 rounded-lg shadow-lg">
        <div className="flex text-bold items-center px-3 w-full pr-4 pl-4 my-4">
          <img src={user} alt="user" className="h-6 w-6" />
          <p className="ml-1">Ravi Dubey</p>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => closeModal(false)}
          ></button>
        </div>

        <div className="w-full rounded">
          <div
            onClick={() => setShowModal(true)}
            className="bg-white focus:outline-none focus:shadow-outline mt-3 py-3 px-4 
    block appearance-none leading-normal rounded-lg text-lg overlay-box reveal w-full"
          >
            <span className="text-gray-500">What is your question?</span>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <QuestionModal closeModal={() => setShowModal(false)} />
        </>
      ) : null}
    </>
  );
};

export default CreateQuestion;
