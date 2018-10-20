import React from "react";
import { Row, Col, Badge } from "reactstrap";
import "./PostComment.css";

export default ({ comments }) => {
  const commentList = comments.map(comment => (
    <Col key={comment._id} md="12" className="my-3">
      <Row>
        <Col md="2" className="text-center pr-0">
          <i className="far fa-user-circle fa-2x " />
        </Col>
        <Col md="10" className="pl-0">
          <div className="comment">
            <span className="text-primary">{comment.name}</span> {comment.text}
          </div>
        </Col>
      </Row>
    </Col>
  ));

  return commentList;
};
