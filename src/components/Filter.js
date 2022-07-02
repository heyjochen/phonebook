const Filter = ({ filter, changeFilter }) => {
  return (
    <>
      <h1>Phonebook</h1>
      input shown with <input value={filter} onChange={changeFilter}></input>
    </>
  );
};

export default Filter;
