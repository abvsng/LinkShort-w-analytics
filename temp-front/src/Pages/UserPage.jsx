/* eslint-disable no-unused-vars */
import React from "react";
import { Copy, Trash } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "motion/react";
export default function UserPage() {
  return (
    <div className=" flex flex-col gap-10">
      <section className=" min-h-[90vh]">
        <InputSection />
      </section>

      <section className=" min-h-[90vh]">
        <MyLinks />
      </section>
    </div>
  );
}
function InputSection() {
  const { user } = useAuth0();
  const tinyRef = React.useRef(null);
  const longRef = React.useRef(null);
  const handleSend = async () => {
    const res = await fetch("http://localhost:3000/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: longRef.current.value,
        userId: user.sub.split("|")[1],
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
      <div className=" flex flex-col items-center justify-center absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          className=" bg-green-800 px-2 py-1 rounded-lg text-slate-200 mt-10 text-xs shadow-[0_0_30px] shadow-green-800  text-justify "
        >
          URLs generated here are permanent.
        </motion.div>
      </div>
    </>
  );
}
function MyLinks() {
  const { user } = useAuth0();
  const [links, setLinks] = React.useState([]);
  React.useEffect(() => {
    async function getLinks() {
      const res = await fetch("http://localhost:3000/api/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.sub.split("|")[1],
        }),
      });
      const data = await res.json();
      setLinks(data);
    }
    getLinks();
  }, [user.sub]);
  return (
    <>
      {links.map((link) => (
        <LinkBox key={link.id} link={link} />
      ))}
    </>
  );
}
function LinkBox({ link }) {
  return (
    <>
      <div className=" bg-slate-500 w-3/5 mx-auto rounded-lg px-4 my-2 relative">
        <button className=" absolute right-1 top-1">
          {" "}
          <Trash size={20} strokeWidth={2} />
        </button>
        <div className="py-1">longUrl:{link.longUrl}</div>
        <div className="py-1">shortUrl:{link.tinyUrl}</div>
      </div>
    </>
  );
}
