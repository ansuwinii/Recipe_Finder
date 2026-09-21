// StatusMessage.jsx
function StatusMessage({ type, message }) {
  return <p className={`status status--${type}`}>{message}</p>;
}
export default StatusMessage;