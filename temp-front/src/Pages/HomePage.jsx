import React from "react";
import { Copy } from "lucide-react";
export default function HomePage() {
  const tinyRef = React.useRef(null);
  const longRef = React.useRef(null);
  const handleSend = async () => {
    const res = await fetch("http://localhost:3000/api/shorten-temp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: longRef.current.value,
      }),
    });
    const data = await res.json();
    if (data.success === false) {
      alert(data.message);
      return;
    }
    tinyRef.current.value = data.tinyUrl;
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-center fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
        <div>
          <input
            ref={longRef}
            type="text"
            placeholder="Enter your Long url here"
            className="min-w-[35vw]"
          />{" "}
          <button onClick={handleSend}>Send</button>
        </div>
        <div className="">
          <input
            ref={tinyRef}
            type="text"
            readOnly
            placeholder="ShortUrl"
            className=" caret-transparent"
          />
          <button
            className=" font-mono"
            onClick={() => {
              navigator.clipboard.writeText(tinyRef.current.value);
            }}
          >
            <Copy size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
