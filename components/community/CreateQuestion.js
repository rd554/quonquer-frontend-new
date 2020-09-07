import Link from "next/link";
import user from "../../public/images/001-user.png";

const CreateQuestion = () => {
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
          <Link href="/community/question">
            <a>
              <div
                className="bg-white focus:outline-none focus:shadow-outline mt-3 py-3 px-4 
  block appearance-none leading-normal rounded-lg text-lg overlay-box reveal w-full"
              >
                <span className="text-gray-500">What is your question?</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateQuestion;
