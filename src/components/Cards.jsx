import { UserCard } from "./Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Cards = ({ users }) => {
  return (
    <Row className="p-4">
      <h6 className="ps-0 display-6 text-primary mb-3">
        Find your professional
      </h6>
      <Col xs={12} className="p-3 grid border-top pt-5">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Col>
    </Row>
  );
};
