import React, { Component } from "react";
import axios from "axios";
import {
  Link,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Form,
  Button
} from "reactstrap";
import Book from "./Book";

export default class AddBook extends Component {
  state = {
    books: [],
    query: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const query = this.state.query.split(" ").join("+");

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
      method: "GET",
      dataType: "json"
    })
      .then(res => res.json())
      .then(books => {
        const booksInfo = books.items
          .map(book => {
            if (
              book.volumeInfo.industryIdentifiers &&
              book.volumeInfo.imageLinks &&
              book.volumeInfo.description
            ) {
              return book.volumeInfo;
            }
          })
          .filter(book => book !== undefined);

        this.setState({ books: booksInfo, query: "" });
      })
      .catch(err => this.setState({ books: [], query: "" }));
  };

  render() {
    const books = this.state.books.map((book, index) => (
      <Book
        key={index}
        book={book}
        params={this.props.match.params}
        history={this.props.history}
      />
    ));
    return (
      <Container>
        <h1 className="display-4 text-center mb-5">Add a book</h1>
        <Row className="mb-5">
          <Col md="9" className="m-auto">
            <Form onSubmit={this.onSubmit}>
              <InputGroup>
                <Input
                  onChange={this.onChange}
                  value={this.state.query}
                  name="query"
                  type="search"
                  className="form-control"
                  placeholder="Search books..."
                />
                <InputGroupAddon addonType="append">
                  <Button color="dark">
                    <i className="fa fa-search" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>{books}</Row>
      </Container>
    );
  }
}
