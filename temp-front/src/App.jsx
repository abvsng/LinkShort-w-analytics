import "./App.css";
import React from "react";
function App() {
  const [tinyUrl, setTinyUrl] = React.useState("");
  const inRef = React.useRef("");
  const shorten = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "xyz",
          url: inRef.current.value,
        }),
      });
      const data = await res.json();
      setTinyUrl(data.tinyUrl);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <input ref={inRef} type="text" placeholder="Enter long url here..." />
      <button
        onClick={() => {
          shorten();
        }}
      >
        Shorten
      </button>
      <div>{tinyUrl === "" ? "" : "http://localhost:3000/api/" + tinyUrl}</div>
    </>
  );
}

export default App;
