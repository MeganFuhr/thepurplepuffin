import React from "react";

export default function Search() {
  return (
    <div className="div__search">
      <h1 className="h1__search_text">Bird Watching in New England</h1>
      <input
        className="input__search"
        type="text"
        placeholder="Search by name..."
      ></input>
    </div>
  );
}
