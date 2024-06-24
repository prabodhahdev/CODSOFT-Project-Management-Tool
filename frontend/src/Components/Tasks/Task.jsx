import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in local storage
        const response = await axios.get('http://localhost:5000/api/tasks/mytasks', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleUpdatePosition = async (taskId, newPosition) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { position: newPosition },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      if (response.status === 200) {
        // Update local tasks state to reflect the new position
        const updatedTasks = tasks.map(task => {
          if (task._id === taskId) {
            return { ...task, position: newPosition };
          }
          return task;
        });
        setTasks(updatedTasks);
        console.log('Task position updated successfully');
      } else {
        console.error('Error updating task position');
      }
    } catch (error) {
      console.error('Error updating task position:', error);
    }
  };

  return (
    <div>
      <h1>My Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Deadline</th>
            <th>Position</th>
           
            
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.createdBy ? task.createdBy.name : 'N/A'}</td>
              <td>{task.deadline ? formatDate(task.deadline) : 'Not specified'}</td>

              <td>
                <select
                  value={task.position}
                  onChange={(e) => handleUpdatePosition(task._id, e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                </select>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );



  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`; // Add leading zero if month is single digit
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`; // Add leading zero if day is single digit
    }
    return `${year}-${month}-${day}`;
  }
};

export default Task;
