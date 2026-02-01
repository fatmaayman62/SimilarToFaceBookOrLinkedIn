import { Button } from "@heroui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaImages, FaArrowUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { UserContext } from "../Context/UserContextProvider";
import { GetSinglePost } from "../Services/GetSingleDataOfPost";

function DesignOfCreatePost({ callback }) {
  const { edit, setEdit } = useContext(UserContext);

  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* ================= Scroll button ================= */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= Load post for edit ================= */
  useEffect(() => {
    if (edit && edit.name !== "comment") {
      loadPostForEdit();
    }
  }, [edit]);

  async function loadPostForEdit() {
    const res = await GetSinglePost(edit.id);
    setInputText(res?.post?.body || "");
    setUrlImage(res?.post?.image || null);
  }

  /* ================= Image ================= */
  function imageHandle(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setUrlImage(URL.createObjectURL(file));
    e.target.value = "";
  }

  function removeImage() {
    setImage(null);
    setUrlImage(null);
  }

  /* ================= Submit ================= */
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputText && !image) return;

    const formData = new FormData();
    if (inputText) formData.append("body", inputText);
    if (image) formData.append("image", image);

    edit && edit.name !== "comment"
      ? updatePost(edit.id, formData)
      : createPost(formData);
  }

  /* ================= Create ================= */
  async function createPost(values) {
    setIsLoading(true);
    try {
      await axios.post(
        "https://linked-posts.routemisr.com/posts",
        values,
        { headers: { token: localStorage.getItem("userTokenizer") } }
      );
      resetForm();
      callback();
      scrollToTop();
    } finally {
      setIsLoading(false);
    }
  }

  /* ================= Update ================= */
  async function updatePost(id, values) {
    setIsLoading(true);
    try {
      await axios.put(
        `https://linked-posts.routemisr.com/posts/${id}`,
        values,
        { headers: { token: localStorage.getItem("userTokenizer") } }
      );
      resetForm();
      setEdit(null);
      callback();
      scrollToTop();
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setInputText("");
    setImage(null);
    setUrlImage(null);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300/20 dark:bg-slate-800/50 dark:text-gray-400 rounded-2xl p-5 relative mt-2"
      >
        <textarea
          placeholder="Write post..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="outline-0 bg-slate-50 dark:bg-slate-700/40 rounded-2xl w-full h-20 resize-none px-3 text-sm py-2"
        />

        {urlImage && (
          <div className="relative">
            <img
              src={urlImage}
              className="mt-2 h-52 sm:h-96 rounded-2xl w-full object-cover"
              alt="post"
            />
            <IoClose
              onClick={removeImage}
              className="absolute top-2 right-2 text-2xl cursor-pointer"
            />
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <label className="flex items-center gap-1 cursor-pointer">
            <FaImages className="text-xl text-green-600" />
            Photo
            <input type="file" hidden onChange={imageHandle} />
          </label>

          <div className="flex gap-2">
            <Button isLoading={isLoading} type="submit" color="primary">
              {edit && edit.name !== "comment" ? "Update" : "Post"}
            </Button>

            {edit && edit.name !== "comment" && (
              <Button
                variant="bordered"
                onClick={() => {
                  resetForm();
                  setEdit(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black/10 rounded-2xl" />
        )}
      </form>

      {/* Scroll To Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default DesignOfCreatePost;
