// function UserForm({inputData,onSubmit, children}) {
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../http"
import { createUser } from "../http"
import { useNavigate } from "react-router-dom"
function UserForm() {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ keyQuery: ["users"] })
      navigate("../")
    },
  })
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const inputData = Object.fromEntries(formData)
    console.log(inputData)
    mutate(inputData)
  }

  return (
    <>
      {isPending && <div>Loading...</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            // value={inputData?.firstName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            // value={inputData.lastName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            // value={inputData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            // value={inputData.company}
          />
        </div>
        <div className="form-group">
          <label htmlFor="catchPhraseNoun">Catch Phrase Noun</label>
          <input
            type="catchPhraseNoun"
            className="form-control"
            id="catchPhraseNoun"
            name="catchPhraseNoun"
            // value={inputData.catchPhraseNoun}
          />
        </div>
        <div className="form-group">
          <label htmlFor="catchPhrase">Catch Phrase</label>
          <textarea
            type="text"
            className="form-control"
            id="catchPhrase"
            name="catchPhrase"
            // value={inputData.catchPhrase}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            className="form-control"
            id="avatar"
            name="avatar"
            // value={inputData.avatar}
          />
        </div>
        <div className="form-group">
          <label htmlFor="urlLoremFlickr">Image</label>
          <input
            type="text"
            className="form-control"
            id="urlLoremFlickr"
            name="urlLoremFlickr"
            // value={inputData.urlLoremFlickr}
          />
        </div>

        <button className="btn">
          {/* {children} */}
          create user
        </button>
      </form>
    </>
  )
}

export default UserForm
