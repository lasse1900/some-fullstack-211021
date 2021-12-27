import React from "react";
import "../style.css";
import { votesToAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter.query) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter.query)
      );
    }
    return state.anecdotes;
  });

  const vote = (anecdote) => {
    // console.log("vote", anecdote);
    dispatch(votesToAnecdote(anecdote.id));
    dispatch(setNotification(`You voted: ${anecdote.content}`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <div className="layout">
      <div className="anecdote-list">
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div className="vote-count">
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AnecdoteList;