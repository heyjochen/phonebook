const PersonForm = ({ name, number, changeName, changeNumber, addEntry }) => {
  return (
    <>
      <h1>add a new</h1>
      <div>
        name: <input value={name} onChange={changeName}></input>
      </div>
      <div>
        number: <input value={number} onChange={changeNumber}></input>
      </div>
      <button onClick={addEntry}>add</button>
    </>
  );
};

export default PersonForm;
