import { useState } from "react";

export default function Sign() {
  const [message, setMessage] = useState("");

  return (
    <div className="w-52">
      <form className="flex flex-col gap-4">
        <input type="text" onChange={(evt) => setMessage(evt.target.value)} />
        <button className="btn">Sign</button>
      </form>
    </div>
  );
}
