const Content = ({ persons, allPersons, handleDelete }) => {
  if (persons.length === 0) {
    return (
      <>
        <h1>Numbers</h1>
        {allPersons.map((person) => {
          return (
            <div className="note" key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleDelete(person.id, person.name)}>
                delete
              </button>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h1>Numbers</h1>
        {persons.map((person) => {
          return (
            <div className="note" key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleDelete(person.id, person.name)}>
                delete
              </button>
            </div>
          );
        })}
      </>
    );
  }
};

export default Content;
