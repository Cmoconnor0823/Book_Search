  
import React from "react";
import Button from "../Button";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';


class AddBookBtn extends React.Component{
 
    postToDB = (book) => {
        var dbBook = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          synopsis: book.volumeInfo.description,
          thumbnail: book.thumbnail,
          link: book.volumeInfo.infoLink
        }
    
        axios.post("/api/books", dbBook)
        .then( () => toast.success(`You added ${book.volumeInfo.title} to your bookshelf`))
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