import { useRouteLoaderData } from "react-router-dom"
import { Details } from "../components/Details"

function ProfilePage() {
  const credentials = useRouteLoaderData("root")

  return <Details id={credentials?.uid} />
}
export default ProfilePage
