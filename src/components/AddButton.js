import { useState } from "react";
import './AddButton.css'

export default function AddButton({
  handleSubmit
}) {
  return (
    <>
      <form id="addTaskForm" className="addForm" onSubmit={handleSubmit}>
        <button
          className="addTaskButton"
        >
          Add task
        </button>
        <section className="formCard">
          <label className="taskInputContainer">
            <input type="text" placeholder='Do something' name="taskText">
            </input>
          </label>
        </section >
      </form>
    </>
  );
}