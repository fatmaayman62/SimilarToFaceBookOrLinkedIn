import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContextProvider'
import img from "../assets/user.png"
import { FaPen } from "react-icons/fa"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@heroui/react"

import { GetUserPosts } from '../Services/GetUserPage'
import Home from './Home'
import Models from '../Component/Models'

function Personal_Page() {
  const { profileData, imageURL } = useContext(UserContext)
  const [post_s, setPosts] = useState([])

  // Upload Photo Modal
  const { isOpen: isUploadOpen, onOpen: onOpenUpload, onOpenChange: onUploadChange } = useDisclosure()
  // Change Password Modal
  const { isOpen: isPasswordOpen, onOpen: onOpenPassword, onOpenChange: onPasswordChange } = useDisclosure()

  // Fetch user posts only once when profileData._id is ready
  const getUserPosts = async () => {
    if (!profileData?._id) return
    const res = await GetUserPosts(profileData._id)
    setPosts([...(res?.posts || [])].reverse())
  }

  useEffect(() => {
    getUserPosts()
  }, [profileData?._id])

  return (
    <>
      {/* Profile Card */}
      <div className="bg-slate-300/20 rounded-2xl p-5 dark:text-gray-400 dark:bg-slate-800/50">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="h-12 w-12 rounded-full p-1 border-3 border-sky-800 object-cover"
              src={imageURL || profileData?.photo || img}
              onError={(e) => (e.target.src = img)}
              alt="profile"
            />
            <div>
              <h2 className="capitalize font-medium text-xl">{profileData?.name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-500">{profileData?.email}</p>
            </div>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button className="text-white translate-x-2 -translate-y-2 h-fit bg-blue-600 dark:bg-blue-800 px-2 py-1 rounded-2xl text-[10px] sm:text-[12px] flex gap-1 items-center">
                <FaPen className="text-[10px]" /> Update Profile
              </Button>
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownItem onPress={onOpenUpload}>Upload Photo</DropdownItem>
              <DropdownItem className="text-danger" color="danger" onPress={onOpenPassword}>
                Change Password
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="my-3">
          <p className="text-sm my-1">
            <span className="font-bold">Profile Created At: </span>
            {profileData?.createdAt?.split("T")[0].replace(/-/g, " ")}
          </p>
          <p className="text-sm my-1">
            <span className="font-bold">Birth Of Date: </span>
            {profileData?.dateOfBirth?.split("T")[0].replace(/-/g, " ")}
          </p>
        </div>

        <p className="text-sm mt-4">
          <span className="text-blue-600 dark:text-blue-500">{post_s?.length}</span> Posts
        </p>
      </div>

      {post_s?.length !== 0 && (
        <Home posts_user={post_s} getUserPosts={getUserPosts} />
      )}

      <Models
        isUploadOpen={isUploadOpen}
        onOpenUpload={onOpenUpload}
        onUploadChange={onUploadChange}
        isPasswordOpen={isPasswordOpen}
        onOpenPassword={onOpenPassword}
        onPasswordChange={onPasswordChange}
      />
    </>
  )
}

export default Personal_Page
