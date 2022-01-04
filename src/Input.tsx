import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const StyledInput = styled.input`
  width: 50vw;
  border: 2px solid black;
  height: 30px;
  padding: 1px;
  box-sizing: border-box;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  height: 25px;
  width: 50vw;
  label {
    flex: 1;
  }
  input {
    margin: 0 5px 0 0;
    margin-right: 5px;
  }
  .line-through {
    text-decoration-line: line-through;
  }
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  align-content: flex-end;
  text-align: right;
  padding: 0;
  cursor: pointer;
`;

const Input = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && task !== "") {
      setTaskList([
        ...taskList,
        { item: task, id: moment().milliseconds(), done: false }
      ]);
      setTask("");
    }
  };
  const handleClick = (id: any) => {
    const newTaskList = taskList.map((v) => {
      if (v.id === id) {
        v.done = !v.done;
      }
      return v;
    });
    setTaskList(newTaskList);
  };
  const handleDelete = (id: any) => {
    const taskDelete = taskList.filter((v) => {
      return v.id !== id;
    });
    setTaskList(taskDelete);
  };
  return (
    <StyledWrapper>
      <StyledInput
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={task}
        type="text"
      />
      <List>
        {taskList.map((v: any) => {
          return (
            <Item key={v.id}>
              <label>
                <input
                  defaultChecked={v.done}
                  checked={v.done}
                  type="checkbox"
                  onClick={() => handleClick(v.id)}
                />
                <span className={v.done && "line-through"}>{v.item}</span>
              </label>
              <DeleteButton onClick={() => handleDelete(v.id)}>
                <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
              </DeleteButton>
            </Item>
          );
        })}
      </List>
    </StyledWrapper>
  );
};

export default Input;
