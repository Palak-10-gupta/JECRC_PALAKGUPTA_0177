/*
1.
import React from 'react';
import './App.css';

function App() {

  const userName = "Alice Johnson";
  const userRole = "Developer";
  const isLoggedIn = true;
  const unreadMessages = 5;

  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const notificationBadge =
    unreadMessages > 0 ? (
      <span className="badge">{unreadMessages}</span>
    ) : null;

  const tasks = ["Learn React", "Build a project", "Deploy to production"];

  return (
    <div>
      <h1>{getGreeting()}, {userName}!</h1>

      <p>Your role: {userRole}</p>

      {isLoggedIn ? (
        <div>
          <p>You have {unreadMessages} unread messages.</p>
          {notificationBadge}
        </div>
      ) : (
        <p>Please log in to see your messages.</p>
      )}

      {/* List rendering example *//*}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
*/


/*
2.
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [timestamp, setTimestamp] = useState(
    new Date().toLocaleTimeString()
  );

  const updateTimestamp = () => {
    setTimestamp(new Date().toLocaleTimeString());
  };

  return (
    <div>
      <h1>Virtual DOM Demo</h1>

      // This component re-renders but only the number changes 
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>
          Increment (Re-renders)
        </button>
      </div>

      //This updates independently 
      <div style={{ padding: "20px", marginTop: "20px", border: "1px solid #ccc" }}>
        <h2>Timestamp: {timestamp}</h2>
        <button onClick={updateTimestamp}>
          Update Time
        </button>
      </div>
    </div>
  );
}

export default App;
*/

/*
3.
import React from 'react';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  const projects = [
    { id: 1, title: 'React App', content: 'A modern web application', icon: '🌐', featured: true },
    { id: 2, title: 'API Service', content: 'RESTful API integration', icon: '🔗' },
    { id: 3, title: 'Mobile App', content: 'React Native project', icon: '📱' }
  ];

  return (
    <div>
      <Header 
        title="Component Composition Demo"
        subtitle="Building UIs from reusable pieces"
      />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px'
      }}>
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            content={project.content}
            icon={project.icon}
            isFeatured={project.featured}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
*/

/*
4.
import React from 'react';
import UserProfile from './components/UserProfile';

function App() {

  const users = [
    {
      id: 1,
      name: "Palak Gupta",
      age: 20,
      email: "palak@example.com",
      isActive: true,
      hobbies: ["Coding", "Reading", "Music"]
    },
    {
      id: 2,
      name: "Aman Sharma",
      age: 22,
      email: "aman@example.com",
      isActive: false,
      hobbies: ["Cricket", "Gaming"]
    },
    {
      id: 3,
      name: "Riya Singh",
      age: 21,
      email: "riya@example.com",
      isActive: true,
      hobbies: []
    }
  ];

  const handleEdit = (name) => {
    alert(`Edit profile of ${name}`);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '50px'
    }}>

      {users.map((user) => (
        <UserProfile
          key={user.id}
          name={user.name}
          age={user.age}
          email={user.email}
          isActive={user.isActive}
          hobbies={user.hobbies}
          onEdit={() => handleEdit(user.name)}
        />
      ))}

    </div>
  );
}

export default App;

*/

import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Props', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Component Communication', completed: false }
  ]);
  
  // Add new todo - receives data from child (TodoForm)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  
  // Toggle todo status - receives data from child (TodoItem)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo - receives data from child (TodoItem)
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>📝 Todo App - Communication Patterns</h1>
      <p style={{ color: '#666' }}>
        <strong>Patterns shown:</strong><br/>
        • Parent → Child: Props passed to TodoForm, TodoItem, TodoStats<br/>
        • Child → Parent: Callbacks (addTodo, toggleTodo, deleteTodo)<br/>
        • Sibling Communication: TodoForm updates state, TodoStats displays it
      </p>
      
      {/* Child to Parent: TodoForm sends data UP via onAddTodo */}
      <TodoForm onAddTodo={addTodo} />
      
      {/* Parent to Child: Stats receives todos via props */}
      <TodoStats todos={todos} />
      
      {/* Parent to Child: TodoItem receives data and callbacks */}
      <div>
        <h3>Your Tasks</h3>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;