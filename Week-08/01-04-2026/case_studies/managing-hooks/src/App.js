/*
import React, {useState} from 'react';
import './App.css';

function App() {
   
  //Step1: Basic State
  const [count, setCount] = useState(0);
  
  //Step2: Functional Update
  const increment = () => {
    setCount(prev => prev +1);
  };
  
  const incrementByTwo = () => {
    setCount(prev => prev + 2);
  };

  const resetCount = () => {
    setCount(0);
  };

  return(
    <div style={styles.container}>
      <h1> Counter App</h1>
      <h2>{count}</h2>
      <button style = {styles.btn} onClick={() => setCount(count+1)}>Increment</button>
      <button style = {styles.btn} onClick={() => setCount(count-1)}>Decrement</button>
    </div>
  );

}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px"
  },
  btn:{
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px"
  }
}

export default App;
*/

/*
import React, {useState} from "react";

function App(){
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const incrementByTwo = () => {
    setCount(prev => prev + 2);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
      <div>
        <h1> Functional Update Demo </h1>
        <h2>{count}</h2>

        <div>
          <button onClick={increment}>Increment</button>
            <button onClick={incrementByTwo}>Increment By Two</button>
              <button onClick={resetCount}>Reset</button>
        </div>
      
      <p>
          Using prev state ensures correct updates even when multiple updates happen quickly.
      </p>
      </div>

  );
}



export default App;

*/

/*
import React, { useState } from "react";

function App() {

  // 🔹 Lazy Initialization (runs only once)
  const [data, setData] = useState(() => {
    console.log("Expensive computation running...");

    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }

    return result % 1000;
  });

  // 🔹 Update without re-running expensive logic
  const recalculateData = () => {
    setData((prev) => {
      console.log("Recalculating data...");
      return prev + 100;
    });
  };

 return (
  <div style={styles.container}>
    <h1>Lazy Initialization Demo</h1>

    <h2>Computed Value: {data}</h2>

    <button style={styles.btn} onClick={recalculateData}>
      Recalculate (+100)
    </button>

    <p style={styles.info}>
      Expensive calculation runs only once during initial render.
    </p>

    <p style={styles.note}>
      Open console to observe logs 👀
    </p>
  </div>
);
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px"
  },
  btn: {
    padding: "10px 20px",
    marginTop: "10px",
    cursor: "pointer"
  },
  info: {
    color: "green",
    marginTop: "15px"
  },
  note: {
    color: "blue"
  }
};

export default App;
*/

/*
import React, { useState } from "react";

function App() {

  // 🔹 Object State
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: ""
  });

  // 🔹 Update Name
  const updateUserName = (name) => {
    setUser(prev => ({
      ...prev,
      name: name
    }));
  };

  // 🔹 Update Age
  const updateUserAge = (age) => {
    setUser(prev => ({
      ...prev,
      age: age
    }));
  };

  // 🔹 Update Email
  const updateUserEmail = (email) => {
    setUser(prev => ({
      ...prev,
      email: email
    }));
  };

  const resetUser= () =>{
    setUser({
      name: "",
      age: "",
      email: ""
    });
  };

    // 🔹 Styles
  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px"
    },
    input: {
      display: "block",
      margin: "10px auto",
      padding: "8px",
      width: "200px"
    },
    btn: {
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h1>Object State Demo</h1>


      <input
        type="text"
        placeholder="Enter Name"
        value={user.name}
        onChange={(e) => updateUserName(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter Age"
        value={user.age}
        onChange={(e) => updateUserAge(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => updateUserEmail(e.target.value)}
        style={styles.input}
      />

    
      <button style={styles.btn} onClick={resetUser}>
        Reset
      </button>

    
      <h2>User Data</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );

}

export default App;

*/

/*
import React, { useState } from "react";

function App() {

  // 🔹 Array State
  const [items, setItems] = useState([]);

  // 🔹 Add Single Item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "Item " + (items.length + 1),
      created: new Date().toLocaleTimeString()
    };

    setItems(prev => [...prev, newItem]);
  };

  // 🔹 Add Multiple Items
  const addMultipleItems = () => {
    const newItems = [
      { id: Date.now(), name: "Batch Item 1", created: new Date().toLocaleTimeString() },
      { id: Date.now() + 1, name: "Batch Item 2", created: new Date().toLocaleTimeString() },
      { id: Date.now() + 2, name: "Batch Item 3", created: new Date().toLocaleTimeString() }
    ];

    setItems(prev => [...prev, ...newItems]);
  };

  // 🔹 Update Item
  const updateItem = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              name: "Updated Item",
              updated: new Date().toLocaleTimeString()
            }
          : item
      )
    );
  };

  // 🔹 Delete Item
  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Delete All Item
  const deleteAllItems = () => {
  setItems([]);
};

  return (
    <div style={styles.container}>
      <h1>Array State Demo</h1>

      <button style={styles.btn} onClick={addItem}>
        Add Item
      </button>

      <button style={styles.btn} onClick={addMultipleItems}>
        Add Multiple Items
      </button>

      <ul>
        {items.map(item => (
          <li key={item.id} style={styles.item}>
            <strong>{item.name}</strong> <br />
            Created: {item.created} <br />
            {item.updated && <>Updated: {item.updated} <br /></>}

            <button style={styles.smallBtn} onClick={() => updateItem(item.id)}>
              Update
            </button>

            <button style={styles.smallBtn} onClick={() => deleteItem(item.id)}>
              Delete
            </button>

            <button style={styles.btn} onClick={deleteAllItems}>
             Delete All
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

// 🔹 Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "30px"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  smallBtn: {
    margin: "5px",
    padding: "5px 10px",
    cursor: "pointer"
  },
  item: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    listStyle: "none"
  }
};

export default App;

*/

import React, { useReducer, useState } from "react";

function App() {

  // 🔹 Initial State
  const initialCounterState = {
    count: 0,
    history: []
  };

  // 🔹 Reducer Function
  function counterReducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            { type: "increment", value: state.count + 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "decrement":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            { type: "decrement", value: state.count - 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "reset":
        return {
          count: 0,
          history: [
            ...state.history,
            { type: "reset", value: 0, time: new Date().toLocaleTimeString() }
          ]
        };

      case "set":
        return {
          count: action.payload,
          history: [
            ...state.history,
            { type: "set", value: action.payload, time: new Date().toLocaleTimeString() }
          ]
        };

      default:
        return state;
    }
  }

  // 🔹 useReducer Hook
  const [counterState, dispatch] = useReducer(counterReducer, initialCounterState);

  // 🔹 Input State for SET
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.container}>
      <h1>useReducer Counter (Advanced)</h1>

      <h2>Count: {counterState.count}</h2>

      {/* 🔹 Actions */}
      <div>
        <button style={styles.btn} onClick={() => dispatch({ type: "increment" })}>
          +1
        </button>

        <button style={styles.btn} onClick={() => dispatch({ type: "decrement" })}>
          -1
        </button>

        <button style={styles.resetBtn} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>

      {/* 🔹 Set Value */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onClick={() =>
            dispatch({ type: "set", payload: Number(inputValue) })
          }
        >
          Set Value
        </button>
      </div>

      {/* 🔹 History */}
      <h3 style={{ marginTop: "30px" }}>History</h3>

      <ul style={styles.list}>
        {counterState.history.map((item, index) => (
          <li key={index} style={styles.card}>
            <b>{item.type.toUpperCase()}</b> → {item.value}
            <br />
            <small>{item.time}</small>
          </li>
        ))}
      </ul>

      <p style={styles.info}>
        👉 useReducer is best for <b>complex state logic & history tracking</b>
      </p>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  resetBtn: {
    margin: "10px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    marginRight: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  }
};

export default App;