import { UserCard } from "./Card"

import Row from "react-bootstrap/Row"

export const Cards = ({ users }) => {
  return (
    <Row className="m-4 grid">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </Row>
  )
}
