import React, { Component } from "react";
import axios from "axios";
import AddBookBtn from "../../components/AddBookBtn";
import { Row, Col } from "../../components/Grid";
import { BookList, BookListItem } from "../../components/BookList";
import EmptyList from "../../components/EmptyList";

class Search extends Component {
  state = {
    searchRes: [],
    query: "",
    books: [],
  };

  displayRes = (data) => {
    this.setState({ books: data.items });
  };

  searchGBooks = () => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`;
    axios
      .get(url)
      .then((res) => {
       // console.log(res.data.items, "results");
        this.displayRes(res.data);
      })
      .catch((err) => console.log(err));
  };

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
    //console.log("Query", this.state.query);
  };

  render() {
    return (
      <Row>
        <Col size="md-12">
          <div>
            <input
              id="bookQ"
              className="form-control form-control-lg"
              autoComplete="off"
              type="text"
              name="query"
              onChange={this.handleInput}
            />
            <button type="submit" onClick={this.searchGBooks}>
              Search for Books
            </button>

            {this.state.books && this.state.books.length > 0 ? (
              <BookList>
                {this.state.books.map((books, i) => {
              // console.log(this.state.books[i].id, "is this the id???")
                  return (
                    <div>
                      <BookListItem
                        key={this.state.books[i].id}
                        authors={
                          books.volumeInfo.authors
                            ? books.volumeInfo.authors
                            : ["No Author Available"]
                        }
                        title={books.volumeInfo.title}
                        synopsis={
                          books.volumeInfo.description
                            ? books.volumeInfo.description
                            : ["No Description Available"]
                        }
                        link={books.volumeInfo.infoLink}
                        thumbnail={
                          books.volumeInfo.imageLinks.thumbnail
                            ? books.volumeInfo.imageLinks.thumbnail
                            : ["No Thumbnail Available"]
                        }
                      />

                      <AddBookBtn
                        authors={
                          books.volumeInfo.authors
                            ? books.volumeInfo.authors
                            : ["No Author Available"]
                        }
                        title={books.volumeInfo.title}
                        synopsis={
                          books.volumeInfo.description
                            ? books.volumeInfo.description
                            : "No Description Available"
                        }
                        link={books.volumeInfo.infoLink}
                        thumbnail={
                          books.volumeInfo.imageLinks.thumbnail
                            ? books.volumeInfo.imageLinks.thumbnail
                            : ["No Thumbnail Available"]
                        }
                      />
                    </div>
                  );
                })}
              </BookList>
            ) : (
              <EmptyList />
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Search;
