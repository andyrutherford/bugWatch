import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const App = () => {
  const [logs, setLogs] = useState([
    {
      _id: 1,
      text: 'Log one',
      priority: 'low',
      user: 'Frank',
      created: new Date().toString(),
    },
    {
      _id: 2,
      text: 'Log two',
      priority: 'moderate',
      user: 'Trey',
      created: new Date().toString(),
    },
    {
      _id: 3,
      text: 'Log three',
      priority: 'high',
      user: 'John',
      created: new Date().toString(),
    },
  ]);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  const addItem = (item) => {
    if (item.text === '' || item.user === '' || item.priority === '') {
      showAlert('All input fields are required', 'danger');
      return;
    }

    item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString();
    setLogs([...logs, item]);

    showAlert('Log Added');
  };

  const removeItem = (_id) => {
    setLogs(logs.filter((log) => log._id !== _id));
    showAlert('Log Removed', 'danger');
  };

  const showAlert = (message, variant = 'success', seconds = 3000) => {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        variant: 'success',
      });
    }, seconds);
  };

  return (
    <Container>
      <AddLogItem addItem={addItem} />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th>
              <Badge variant='danger' onClick={() => setLogs([])}>
                Remove All
              </Badge>
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem key={log._id} log={log} removeItem={removeItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
