import React, { useState } from "react";
import { useField } from "./hooks/index";
import { Route, Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>{anecdote.author}</p>
    <p>has {anecdote.votes} votes</p>
    for more info see: <a href={`${anecdote.info}`}> {anecdote.info}</a>
    <p>
      <br></br>
    </p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

const CreateNew = (props) => {
  const author = useField("text");
  const content = useField("text");
  const info = useField("text");
  const [added, setAdded] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.attributes.value,
      author: author.attributes.value,
      info: info.attributes.value,
      votes: 0,
    });
    props.notify(`a new anecdote '${content.value}' created!`);
    setAdded(true);
  };

  const resetInputs = (e) => {
    e.preventDefault();
    content.clearValue();
    author.clearValue();
    info.clearValue();
  };

  if (added) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.attributes} />
        </div>
        <div>
          author
          <input {...author.attributes} />
        </div>
        <div>
          url for more info
          <input {...info.attributes} />
        </div>
        <button type="submit">create</button>
        <button onClick={(e) => resetInputs(e)}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="container">
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && (
          <div>
            <em>{notification}</em>
          </div>
        )}
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route
          path="/anecdotes/:id"
          render={({ match }) => (
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          )}
        />
        <Route path="/create">
          <CreateNew addNew={addNew} notify={notify} />
        </Route>
        <Route path="/about">
          <About about={About} />
        </Route>
        <Footer />
      </div>
    </div>
  );
};

export default App;
