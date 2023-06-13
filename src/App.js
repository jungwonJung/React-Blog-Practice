import "./App.css";
import { useState } from "react";

function App() {
  const MainTitle = "Jay s React Practice blog";
  let [blogTitle, setBlogTitle] = useState([
    "What is React",
    "What is State",
    "What is Props",
  ]);
  let [blogDescrition] = useState("random words");
  let [LikedNumber, setLikedNumber] = useState(
    blogTitle.map(() => {
      return 0;
    })
  );
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputBlog, setInputBlog] = useState("");

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
              {a} &nbsp;&nbsp;&nbsp;&nbsp;
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
            <div>{blogDescrition}</div>

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
          value={inputBlog}
          onChange={(e) => {
            setInputBlog(e.target.value);
          }}
        />
        <button
          onClick={() => {
            let copy = [...blogTitle];
            copy.unshift(inputBlog);
            setBlogTitle(copy);
            setInputBlog("");
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
      <p>2023.06.06</p>
      <p>{blogDescrition}</p>
    </div>
  );
}

export default App;
