import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { clubCurrentToPast } from "../../actions/clubActions";

class CurrentBook extends Component {
  onFinishBook = e => {
    this.props.clubCurrentToPast(this.props.clubId, e.target.id);
  };

  render() {
    const { book, clubId } = this.props;
    let content;
    if (book) {
      content = (
        <div>
          <Link
            to={`/add_book/club/${clubId}/current`}
            className="btn btn-lg btn-info mt-3 mb-5"
          >
            Change book
          </Link>
          <Table hover>
            <thead>
              <tr>
                <th />
                <th className="text-center">Title</th>
                <th className="text-center">Author</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr key={book._id}>
                <th scope="row">
                  <img
                    className="w-25 d-block mx-auto"
                    src={book.imgUrl}
                    alt={book.title}
                  />
                </th>
                <td className="align-middle text-center">{book.title}</td>
                <td className="align-middle text-center">{book.author}</td>
                <td className="align-middle">
                  <Button
                    size="lg"
                    color="info"
                    id={book._id}
                    className="mx-auto"
                    onClick={this.onFinishBook}
                  >
                    Finished Book
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    } else {
      content = (
        <div>
          <p>
            You do not have a book saved as your current book. Click{" "}
            <span className="font-italic">"Add a book"</span> to choose one.
          </p>
          <Link
            to={`/add_book/club/${clubId}/current`}
            className="btn btn-lg btn-info"
          >
            Add a book
          </Link>
        </div>
      );
    }
    return (
      <div className="mb-5">
        <h4 className="text-muted">Current Book</h4>
        {content}
      </div>
    );
  }
}

CurrentBook.propTypes = {};

export default connect(
  null,
  { clubCurrentToPast }
)(CurrentBook);
