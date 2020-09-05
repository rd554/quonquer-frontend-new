import React from "react";
import user from "../../public/images/001-user.png";

const QuestionModal = ({ closeModal }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-2 my-6 w-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex text-bold items-center px-3 w-full pr-4 pl-4 my-4">
              <img src={user} alt="user" className="h-6 w-6" />
              <p className="ml-1">Ravi Dubey</p>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => closeModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="w-full">
              <textarea
                rows="7"
                className="bg-white focus:outline-none focus:shadow-outline mt-3 py-3 px-4 
    block appearance-none leading-normal rounded text-lg overlay-box reveal w-full"
                type="text"
                placeholder="What is your question?"
              ></textarea>
            </div>

            <div className="flex justify-between p-6 border-t border-solid border-gray-300 rounded-b">
              <select
                value={"A"}
                className="bg-white focus:outline-none focus:shadow-outline py-3 px-4 
    block appearance-none leading-normal rounded text-lg overlay-box reveal flex-1 mr-5"
              >
                <option value="A">Apple</option>
                <option value="B">Banana</option>
                <option value="C">Cranberry</option>
              </select>
              <button
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => setShowModal(false)}
              >
                Post Question
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default QuestionModal;
