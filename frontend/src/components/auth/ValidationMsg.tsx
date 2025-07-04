const ValidationMsg = ({ message }: { message: string }) => {
  return <p className="error">{message}</p>;
};

export default ValidationMsg;
