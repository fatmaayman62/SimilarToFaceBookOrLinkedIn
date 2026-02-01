import React, { useContext, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react"
import { FaUpload } from "react-icons/fa"
import { ChangePasswordUser, UploadPhotoUser } from '../Services/ServiceProfile'
import ConFirmMessage from './ConFirmMessage'
import { UserContext } from '../Context/UserContextProvider'

function Models({
  isUploadOpen,
  onUploadChange,
  isPasswordOpen,
  onPasswordChange,
}) {
  const { darkMode } = useContext(UserContext)

  /* ================= Password ================= */
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setMessageError] = useState(null)
  const patternPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  /* ================= Image ================= */
  const [image, setImage] = useState(null)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const { imageURL, setImageURL, profileData } = useContext(UserContext)

  /* ================= Confirm ================= */
  const [confirm, setConfirm] = useState(false)

  /* ================= Image Handlers ================= */
  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setImageURL(URL.createObjectURL(file))
    e.target.value = ""
  }

  async function uploadPhoto(e) {
    e.preventDefault()
    if (!image) return
    setIsLoadingImage(true)
    const formData = new FormData()
    formData.append("photo", image)
    const res = await UploadPhotoUser(formData)
    if (res?.message === "success") {
      setConfirm(true)
      onUploadChange(false)
      setImage(null)
    }
    setIsLoadingImage(false)
  }

  /* ================= Password Handlers ================= */
  async function handleChangePassword(e) {
    e.preventDefault()
    if (!patternPassword.test(newPassword) || !oldPassword) {
      setMessageError("Invalid password format")
      return
    }
    setIsLoading(true)
    const res = await ChangePasswordUser({ password: oldPassword, newPassword })
    if (res?.message === "success") {
      localStorage.setItem("userTokenizer", res.token)
      setConfirm(true)
      onPasswordChange(false)
      setOldPassword("")
      setNewPassword("")
      setMessageError(null)
    } else {
      setMessageError("Old password is wrong")
    }
    setIsLoading(false)
  }

  const inputClass = `transition-colors duration-300 rounded-md px-3 py-2 ${
    darkMode
      ? "bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-600"
      : "bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300"
  }`

  const cancelBtnClass = `transition-all duration-200 px-4 py-2 rounded-md ${
    darkMode
      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
  }`

  return (
    <>
      {/* ================= Upload Photo Modal ================= */}
      <Modal isOpen={isUploadOpen} onOpenChange={onUploadChange}>
        <ModalContent className={`transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>
          {(onClose) => (
            <>
              <ModalHeader>Upload Photo</ModalHeader>
              <form onSubmit={uploadPhoto}>
                <ModalBody className="flex flex-col items-center gap-4">
                  {imageURL && (
                    <img
                      src={imageURL}
                      className="w-24 h-24 rounded-full object-cover"
                      alt="profile"
                    />
                  )}
                  <label className="cursor-pointer text-blue-600">
                    <FaUpload className="text-2xl mx-auto" />
                    <input type="file" hidden onChange={handleImage} />
                  </label>
                </ModalBody>
                <ModalFooter className="flex gap-3 justify-end">
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoadingImage}
                    className="transition-all duration-200 px-4 py-2 rounded-md hover:scale-105"
                  >
                    Upload
                  </Button>
                  <Button
                    variant="light"
                    onPress={() => {
                      setImageURL(profileData?.user?.photo)
                      onClose()
                    }}
                    className={cancelBtnClass}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ================= Change Password Modal ================= */}
      <Modal isOpen={isPasswordOpen} onOpenChange={onPasswordChange}>
        <ModalContent className={`transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>
          {(onClose) => (
            <>
              <ModalHeader>Change Password</ModalHeader>
              <form onSubmit={handleChangePassword}>
                <ModalBody className="flex flex-col gap-3">
                  <Input
                    label="Old password"
                    type="password"
                       variant="bordered"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value)
                      setMessageError(null)
                    }}
                    isInvalid={Boolean(messageError)}
                  />
                  <Input
                    label="New password"
                    type="password"
                    value={newPassword}
            variant="bordered"

                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      setMessageError(null)
                    }}
                    isInvalid={Boolean(messageError)}
                  />
                  {!patternPassword.test(newPassword) && newPassword && (
                    <p className="text-red-600 text-xs">
                      Must include capital, small, number, special character & min 8 chars
                    </p>
                  )}
                  {messageError && (
                    <p className="text-red-600 text-xs">{messageError}</p>
                  )}
                </ModalBody>
                <ModalFooter className="flex gap-3 justify-end">
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    className="transition-all duration-200 px-4 py-2 rounded-md hover:scale-105"
                  >
                    Change
                  </Button>
                  <Button
                    variant="light"
                    onPress={() => {
                      setOldPassword("")
                      setNewPassword("")
                      setMessageError(null)
                      onClose()
                    }}
                    className={cancelBtnClass}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>

      {confirm && <ConFirmMessage />}
    </>
  )
}

export default Models
