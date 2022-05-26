import React from "react";

export default function Search() {
  return (
    <div className="div__search">
      <h3 className="h3__search_text">Bird Watching in New England</h3>
      <input
        className="input__search"
        type="text"
        placeholder="Search by name..."
      ></input>
    </div>
  );
}
