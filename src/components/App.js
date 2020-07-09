import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';
import { ipcRenderer } from 'electron';

const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    ipcRenderer.send('logs:load');

    ipcRenderer.on('logs:get', (e, logs) => {
      setLogs(JSON.parse(logs));
    });
  }, []);

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

    // item._id = Math.floor(Math.random() * 90000) + 10000;
    // item.created = new Date().toString();
    // setLogs([...logs, item]);

    ipcRenderer.send('logs:add', item);

    showAlert('Log Added');
  };

  const removeItem = (_id) => {
    // setLogs(logs.filter((log) => log._id !== _id));
    ipcRenderer.send('logs:delete', _id);
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
