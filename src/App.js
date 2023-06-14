import "./App.css";
import { useState } from "react";

function App() {
  const MainTitle = "Jay s React Practice blog";
  let [blogTitle, setBlogTitle] = useState([
    "1. What is React",
    "2. What is State",
    "3. What is Props",
  ]);
  let [blogDescrition, setBlogDescription] = useState([
    "React is a JavaScript library for building user interfaces. It helps you create reusable UI components and efficiently update the interface when data changes. It's popular for its performance and easy-to-understand code.",
    "React state is a built-in feature in React that allows components to store and manage their own data. It represents the current state of a component and can be used to dynamically update and render the user interface based on changes in data or user interactions. State is mutable and can be modified using the setState method provided by React. It enables components to be interactive and respond to user input, making it an essential concept in React development.",
    "In React, props (short for properties) are used to pass data from a parent component to its child components. Props are like function arguments in JavaScript and provide a way to customize and configure child components. They allow parent components to pass values, objects, or functions to their children, enabling communication and data sharing between components. Props are read-only and cannot be modified within the child component. They are useful for creating reusable and modular components that can be easily configured and composed together to build complex user interfaces.",
  ]);
  let [LikedNumber, setLikedNumber] = useState(
    blogTitle.map(() => {
      return 0;
    })
  );
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputBlogTitle, setInputBlogTitle] = useState("");
  let [inputBlogDescription, setInputBlogDescription] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{MainTitle}</h4>
      </div>

      <button
        className="sort-title"
        onClick={() => {
          let sortedTitie = [...blogTitle].sort();
          setBlogTitle(sortedTitie);
        }}
      >
        Sort Title
      </button>

      {blogTitle.map((a, i) => {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                modal === true ? setModal(false) : setModal(true);
                setTitle(i);
              }}
            >
              {a} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                onClick={(e) => {
                  e.stopPropagation(); // blocked event bubbling
                  setLikedNumber((prevLikedNumber) => {
                    const newLikedNumber = [...prevLikedNumber];
                    newLikedNumber[i] += 1;
                    return newLikedNumber;
                  });
                }}
              >
                👍
              </span>{" "}
              &nbsp;&nbsp;{LikedNumber[i]}{" "}
            </h4>
            <div className="list-description">{blogDescrition[i]}</div>

            <button
              className="delete"
              onClick={() => {
                let copy = [...blogTitle];
                copy.splice(i, 1);
                setBlogTitle(copy);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}

      <div className="input-container">
        <input
          placeholder="Title"
          value={inputBlogTitle}
          onChange={(e) => {
            setInputBlogTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Blog Description"
          value={inputBlogDescription}
          onChange={(e) => {
            setInputBlogDescription(e.target.value);
          }}
        />
        <button
          onClick={() => {
            let copyBlogTitle = [...blogTitle];
            copyBlogTitle.unshift(inputBlogTitle);
            setBlogTitle(copyBlogTitle);
            let copyBlogDescription = [...blogDescrition];
            copyBlogDescription.unshift(inputBlogDescription);
            setBlogDescription(copyBlogDescription);
            setInputBlogTitle("");
            setInputBlogDescription("");
          }}
        >
          Submit new blog
        </button>
      </div>

      {modal === true ? (
        <AppModal
          blogTitle={blogTitle}
          blogDescrition={blogDescrition}
          title={title}
        />
      ) : null}
    </div>
  );
}

// changed state code is async codes

function AppModal({ blogTitle, blogDescrition, title }) {
  return (
    <div className="modal">
      <h4>{blogTitle[title]}</h4>
      <p className="modal-description">{blogDescrition[title]}</p>
      <p>2023.06.06</p>
    </div>
  );
}

export default App;
