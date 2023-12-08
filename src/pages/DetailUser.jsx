import { Details } from "../components/Details"
import { Outlet, useParams } from "react-router-dom"

function DetailUser() {
  const { id } = useParams()
  return (
    <>
      <Outlet />
      <Details id={id} />
    </>
  )
}

export default DetailUser
