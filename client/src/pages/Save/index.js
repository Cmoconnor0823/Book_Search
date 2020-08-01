import React from "react";
import Button from "../Button";
import axios from "axios";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddBookBtn extends React.Component{
 
    postToDB = (book) => {
        var dbBook = {
          title: book.title,
          authors: book.authors,
          synopsis: book.description ? book.description : "No Description Available",
          thumbnail: book.imageLinks.thumbnail ?
          book.imageLinks.thumbnail : "No Thumbnail Available",
          link: book.columeInfo.infoLink
        }
    
        axios.post("/api/books", dbBook)
        .then( () => toast.success(`You added ${book.title} to your bookbag`))
        .catch(err => console.log(err))
      }

    render() {
        return (
          <div>
          <Button type="primary" onClick={() => 
            {this.postToDB(this.props)}
            }>
            Save Book
        </Button>
        </div>
        );
    }
  }

  export default AddBookBtn;