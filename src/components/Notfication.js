const Notification = ({ message, errorMessage }) => {
  return (
    (message && <div className="message">{message}</div>) ||
    (errorMessage && <div className="errorMessage">{errorMessage}</div>)
  );
};

export default Notification;
