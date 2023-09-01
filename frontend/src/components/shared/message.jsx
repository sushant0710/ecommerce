import Alert from 'react-bootstrap/Alert';

function message({variant,children}) {
  return (
    <Alert  variant={variant}>
         {children}
        </Alert>
  );
}

export default message;