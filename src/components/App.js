import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

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

  return (
    <Container>
      <AddLogItem />
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem key={log._id} log={log} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
