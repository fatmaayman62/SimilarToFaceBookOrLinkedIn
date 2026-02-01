import React from "react";
import { BiLike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { LuShare2 } from "react-icons/lu";
function PostFooter({ post, clickIconComments, ArrComments }) {
  return (
    <>
      {/* Top part with reactions */}
      <div className="w-full flex items-center px-3 py-2 space-x-2 sm:space-x-3">
        {/* Reaction icons */}
        <div className="flex -space-x-1">
          <div className="bg-blue-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center z-10">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </div>
          <div className="bg-red-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>

        {/* Counts */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between w-full ml-2 text-gray-500 text-sm sm:text-base">
          <p>{Math.round(Math.random() * 100)}</p>
          {ArrComments?.length !== 0 && (
            <p>{ArrComments?.length} comment{ArrComments?.length > 1 ? "s" : ""}</p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 w-full sm:px-5 py-2 sm:py-3 border-t border-gray-300">
        <button className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-3 text-gray-600 hover:text-blue-500 transition-colors">
          <BiLike className="text-xl sm:text-2xl" />
          <span className="font-semibold text-sm sm:text-lg">Like</span>
        </button>

        <button
          onClick={() => clickIconComments()}
          className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-3 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
        >
          <VscComment className="text-xl sm:text-2xl" />
          <span className="font-semibold text-sm sm:text-lg">Comment</span>
        </button>

        <button className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-3 text-gray-600 hover:text-blue-500 transition-colors">
          <LuShare2 className="text-xl sm:text-2xl" />
          <span className="font-semibold text-sm sm:text-lg">Share</span>
        </button>
      </div>
    </>
  );
}

export default PostFooter;
