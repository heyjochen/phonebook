import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import personsServices from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notfication";
import Content from "./components/Content";

function App() {
  const [allPersons, setAllPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsServices
      .getAll("http://localhost:3001/persons")
      .then((initialResponse) => {
        setAllPersons(initialResponse);
      });
  }, []);

  // console.log(persons);
  // console.log(allPersons.map((person) => person.name));

  const changeFilter = (event) => {
    setFilter(event.target.value);
    setPersons(
      allPersons.filter(
        (persons) =>
          persons.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          persons.number.includes(event.target.value)
      )
    );
  };
  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeNumber = (event) => {
    setNumber(event.target.value);
  };

  const addEntry = () => {
    const newEntry = { name: name, number: number };

    const person = allPersons.filter((person) => person.name === name);
    const personToAdd = person[0];
    const updatedPerson = { ...personToAdd, number: number };

    if (person.length !== 0) {
      if (window.confirm("Do you want to update the entry?")) {
        personsServices
          .update(updatedPerson.id, updatedPerson)
          .then((response) => {
            console.log(response);
            // updated person.id ! addedPerson.id, we keep, otherwise we use new one.
            setAllPersons(
              allPersons.map((personItem) =>
                personItem.id !== personToAdd.id ? personItem : response
              )
            );
            setName("");
            setNumber("");

            setMessage(`${personToAdd.name} was updated`);
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
      }
    } else {
      personsServices.addOne(newEntry).then((response) => {
        setPersons(allPersons.concat(response));
        setName("");
        setNumber("");
        setMessage(`${newEntry.name} was added`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm("Do you want to delete the entry?")) {
      personsServices
        .deleteOne(id)
        .then((response) => {
          console.log(response);

          setAllPersons(allPersons.filter((persons) => persons.id !== id));
        })
        .catch((error) => {
          setErrorMessage(`${name} was already deleted`);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    }
  };

  return (
    <>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter filter={filter} changeFilter={changeFilter} />
      <PersonForm
        name={name}
        number={number}
        changeName={changeName}
        changeNumber={changeNumber}
        addEntry={addEntry}
      />
      <Content
        allPersons={allPersons}
        persons={persons}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
