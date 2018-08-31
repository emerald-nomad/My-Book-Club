import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  CardText,
  Button
} from "reactstrap";

export default class Book extends Component {
  onAddBookClick = () => {
    const { book, params, history } = this.props;
    let isbn;

    book.industryIdentifiers[0].type === "ISBN_13"
      ? (isbn = book.industryIdentifiers[0].identifier)
      : (isbn = book.industryIdentifiers[1].identifier);

    const bookData = {
      isbn: isbn,
      title: book.title,
      author: book.authors[0],
      publisher: book.publisher,
      imgUrl: book.imageLinks.smallThumbnail
    };

    axios
      .post(`/api/${params.type}/book_${params.time}`, bookData)
      .then(res => history.push("/bookshelf"))
      .catch(err => console.log(err));
  };

  render() {
    const { book } = this.props;
    let shortDesc;

    const orginalLength = book.description.length;
    const maxLength = 160;

    shortDesc = book.description.substr(0, maxLength);

    shortDesc = shortDesc.substr(
      0,
      Math.min(shortDesc.length, shortDesc.lastIndexOf(" "))
    );

    if (orginalLength > maxLength) {
      shortDesc += "...";
    }

    return (
      <Col md="6" className="mb-5 text-center">
        <Card>
          <CardBody>
            <Row className="mb-3">
              <Col md="3">
                <a target="_blank" href={book.previewLink}>
                  <img src={book.imageLinks.smallThumbnail} alt={book.title} />
                </a>
              </Col>
              <Col>
                <CardTitle>{book.title}</CardTitle>
                <CardText className="p-2">{shortDesc}</CardText>
              </Col>
            </Row>
            <Row className="p-2">
              <Col md="6">
                <Button color="info" className="col-md-8">
                  View Details
                </Button>
              </Col>
              <Col md="6">
                <Button
                  onClick={this.onAddBookClick}
                  color="info"
                  className="col-md-8"
                >
                  Add Book
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
