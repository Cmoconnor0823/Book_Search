import React, { useState } from "react";
import axios from "axios";
import AddBookBtn from "../../components/AddBookBtn";
//import { Row, Col } from "../../components/Grid";
//import { BookList, BookListItem } from "../../components/BookList";
//import EmptyList from "../../components/EmptyList";



const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState({ items: [] });
    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    const fetchBooks = async () => {
        // Ajax call to API using Axios
        const result = await axios.get(`${API_URL}?q=${searchTerm}`);
        // Books result
        console.log(result.data);
        setBooks(result.data);
    }

    const onSubmitHandler = (e) => {
        // Prevent browser refreshing after form submission
        e.preventDefault();
        // Call fetch books async function
        fetchBooks();
    }

    const bookAuthors = (authors) => {
        if (authors.length <= 2) {
            authors = authors.join(' and ')
        }
        else if (authors.length > 2) {
            let lastAuthor = ' and ' + authors.slice(-1);
            authors.pop();
            authors = authors.join(', ');
            authors += lastAuthor;
        };
        return authors;
    }
    return (
        <section>
            <form onSubmit={onSubmitHandler}>
                <label>
                    <span>Search for books</span>
                    <input
                        type="search"
                        placeholder="microservice, restful design, etc.,"
                        value={searchTerm}
                        onChange={onInputChange}
                    />
                    <button type="submit">Search</button>
                </label>
            </form>
            <ul>
                {
                    books.items.map((book, index) => {
                        return (
                            <li key={book.id}>
                                <div>
                                    <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                                    <div>
                                        <h3>{book.volumeInfo.title}</h3>
                                        <p>{bookAuthors(book.volumeInfo.authors)}</p>
                                        <p>{(book.volumeInfo.description ?
                                            book.volumeInfo.description : "No Description Available")}</p>
                                        <p>{book.volumeInfo.publishedDate}</p>
                                    </div>
                                </div>
                                <hr />
                                <AddBookBtn
                                    authors={book.volumeInfo.authors ? book.volumeInfo.authors : ["No Author Available"]}
                                    title={book.volumeInfo.title}
                                    synopsis={book.volumeInfo.description ?
                                        book.volumeInfo.description : "No Description Available"}
                                    link={book.volumeInfo.infoLink}
                                    thumbnail={book.volumeInfo.imageLinks.thumbnail ?
                                        book.volumeInfo.imageLinks.thumbnail : "#"}

                                />
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );

}

export default Search;