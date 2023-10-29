import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

const STORAGE_ADDRESS = 'TodosData';

function App() {
  let localstorageTodos = [];
  if (localStorage.getItem(STORAGE_ADDRESS)) {
    JSON.parse(localStorage.getItem(STORAGE_ADDRESS)).forEach((todo) => {
      localstorageTodos.push(todo);
    });
  }
  const [state, setState] = useState({
    userInput: '',
    todos: localstorageTodos,
    dragTodo: null,
  });

  function setToStorage(todos) {
    localStorage.setItem(STORAGE_ADDRESS, JSON.stringify(todos));
  }

  function updateInput(value) {
    setState({
      userInput: value,
      todos: state.todos,
      dragTodo: state.dragTodo,
    });
  }

  function addItem() {
    if (state.userInput !== '') {
      const userInput = {
        id: Math.random(),
        value: state.userInput,
      };

      const todos = [...state.todos];
      todos.push(userInput);

      setState({
        dragTodo: state.dragTodo,
        todos,
        userInput: '',
      });
      setToStorage(todos);
    }
  }

  function deleteItem(key) {
    const todos = [...state.todos];

    const updatetodos = todos.filter((item) => item.id !== key);

    setState({
      dragTodo: state.dragTodo,
      todos: updatetodos,
      userInput: state.userInput,
    });
    setToStorage(updatetodos);
  }

  function swapTodos(id1, id2) {
    let resTodos = [...state.todos];

    let i1 = resTodos.findIndex((x) => x.id == id1);
    let i2 = resTodos.findIndex((x) => x.id == id2);
    console.log(resTodos);
    console.log(id1);
    console.log(id2);
    const value = resTodos[i1].value;
    resTodos[i1].value = resTodos[i2].value;
    resTodos[i2].value = value;

    setState({
      todos: resTodos,
      dragTodo: state.dragTodo,
      userInput: state.userInput,
    });
    setToStorage(resTodos);
  }

  function editItem(index) {
    console.log(123);
    const editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      let updatedTodos = [...state.todos];
      const todoIndex = updatedTodos.findIndex(todo => todo.id == index)
      updatedTodos[todoIndex].value = editedTodo;

      setState({
        dragTodo: state.dragTodo,
        todos: updatedTodos,
        userInput: state.userInput,
      });
      setToStorage(updatedTodos);
    }
  }

  function handleDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, id) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    console.log(draggedId);
    if (draggedId !== id) {
      swapTodos(draggedId, id);
    }
  }

  return (
    <Container>
      <div style={{ height: 20 }}></div>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add todo ... "
              size="lg"
              value={state.userInput}
              onChange={(item) => updateInput(item.target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button variant="dark" className="mt-2" onClick={() => addItem()}>
                ADD
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <ListGroup>
            {state.todos.map((item) => (
              <div
                data-id={item.id}
                key={item.id}
                className="draggable"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.id)}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {item.value}
                <span>
                  <Button
                    style={{ marginRight: '10px' }}
                    variant="light"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="light" onClick={() => editItem(item.id)}>
                    Edit
                  </Button>
                </span>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;