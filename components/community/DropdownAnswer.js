import React, { useState, useEffect, useRef } from "react";
import Private from "../auth/Private";
import { removeAnswer } from "../../actions/community";
import { getCookie } from "../../actions/auth";
import Link from "next/link";
import { Transition } from "@tailwindui/react";
import { useRouter } from "next/router";

export function DropdownAnswer({
  answerId,
  questionId,
  createUpdateAnswerProps,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [message, setMessage] = useState("");
  const container = useRef(null);
  const token = getCookie("token");

  // Allow for outside click
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!container.current.contains(event.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, container]);

  // Allow to use the `esc` key
  useEffect(() => {
    function handleEscape(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [isOpen]);

  const deleteAnswer = (answerId) => {
    removeAnswer(answerId, token, questionId).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setMessage(res.message);
      }
    });
  };

  const deleteConfirm = (answerId) => {
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      deleteAnswer(answerId);
    }
    return setIsOpen(false);
  };

  const showUpdateButton = (answerId) => {
    return (
      <Link href={`/community/answer/${createUpdateAnswerProps}`}>
        <a
          rel="noopener noreferrer"
          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
          role="menuitem"
        >
          Update
        </a>
      </Link>
    );
  };

  const onOptionsMenuClick = () => {
    if (token && token.length) {
      setIsOpen((v) => !v);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div ref={container} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => onOptionsMenuClick()}
        >
          {
            <svg className="w-4 h-5" viewBox="0 0 20 20" fill="100d52">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          }
        </button>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="absolute right-0 w-24 mt-2 origin-top-right rounded-md shadow-lg z-10"
      >
        <div className="bg-white rounded-md shadow-xs">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {showUpdateButton(answerId)}

            <div
              onClick={() => deleteConfirm(answerId)}
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
            >
              Delete
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
