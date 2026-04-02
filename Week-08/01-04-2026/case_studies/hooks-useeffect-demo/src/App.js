/*

import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //  Effect 1: Runs after every render
  useEffect(() => {
    console.log("Effect 1: After every render");
  });

  return (
    <div style={styles.container}>
      <h1>useEffect - Every Render</h1>

      // Counter 
      <h2>Count: {count}</h2>
      <button style={styles.btn} onClick={() => setCount(count + 1)}>
        Increment
      </button>

      //Input 
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
      </div>

      <p style={styles.info}>
        This effect runs after <b>every render</b> (state change).
      </p>

      <p style={styles.note}>
        Open console to observe logs 
      </p>
    </div>
  );
}

// Styles
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
  input: {
    padding: "10px",
    marginTop: "10px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  },
  note: {
    color: "blue"
  }
};

export default App;
*/


/*
import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  // Effect 1: Runs only once (Component Mount)
  useEffect(() => {
    console.log("🟢 Component mounted");

    // Load saved name
    const savedName = localStorage.getItem("name");
    if (savedName) setName(savedName);

    // Load saved count
    const savedCount = localStorage.getItem("count");
    if (savedCount) setCount(parseInt(savedCount));
  }, []);

  // Effect 2: Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("count", count);
  }, [name, count]);

  return (
    <div style={styles.container}>
      <h1>useEffect - Component Mount</h1>

      //Name Input 
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <h3>Hello, {name || "Guest"} 👋</h3>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)} style={styles.button}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)} style={styles.button}>
        Decrement
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  input: {
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
  },
  button: {
    margin: "5px",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;

*/

import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Fetch Data (Runs once)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      console.log("Fetching posts");

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://dummyjson.com/posts?limit=5"
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        if (isMounted) {
          setPosts(data.posts); // important for this API
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      console.log("Cleanup: cancelling fetch");
      isMounted = false;
    };
  }, []);

  // Debounced Search
  useEffect(() => {
    console.log("Debouncing search:", searchTerm);

    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Filter posts
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>API and Debounced Search</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      {/* Status */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Posts */}
      <div>
        {filteredPosts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      <p style={styles.info}>
        API fetch with cleanup and debounced search
      </p>

      <p style={styles.note}>
        Open console to see logs
      </p>
    </div>
  );
}

// Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial",
  },
  input: {
    padding: "10px",
    width: "250px",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px auto",
    width: "300px",
  },
  info: {
    marginTop: "20px",
    color: "green",
  },
  note: {
    color: "gray",
  },
};

export default App;