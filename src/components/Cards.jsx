import React from "react";
import { UserCard } from "./Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

export const Cards = ({ data, handleOrder, orederedBy }) => {
  return (
    <Row className="p-4 mb-5">
      <h6 className="ps-0 display-6 text-primary mb-3">
        Find your professional
      </h6>
      <Col xs={12} className="border-top pt-3 p-0">
        <DropdownButton
          as={ButtonGroup}
          id={`order-by`}
          size="sm"
          variant="secondary"
          title={`Order by ${orederedBy === "likes" ? "best rated" : "newest"}`}
        >
          <Dropdown.Item eventKey="1" onClick={() => handleOrder("likes")}>
            Best rated
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => handleOrder("createdAt")}>
            Newest
          </Dropdown.Item>
        </DropdownButton>
      </Col>
      <Col xs={12} className="grid pt-2 p-0">
        {data.pages?.map((page) => (
          <React.Fragment key={page.id}>
            {page.data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </React.Fragment>
        ))}
      </Col>
    </Row>
  );
};
