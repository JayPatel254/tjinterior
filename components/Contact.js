"use client";
import { useState } from "react";
const WA = "919879914995";
export default function Contact() {
  const [f, setF] = useState({ name: "", phone: "", type: "Full home interior", msg: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const text = `Hello TJ Mistry Interior,\nName: ${f.name}\nPhone: ${f.phone}\nLooking for: ${f.type}\n${f.msg}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <form onSubmit={send} className="form">
      <label>Your name<input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
      <label>Phone number<input required type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" /></label>
      <label>What do you need?
        <select value={f.type} onChange={set("type")}>
          {["Full home interior", "Modular kitchen", "TV unit and wall panelling", "Pooja mandir", "False ceiling and lighting", "Something else"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label>Tell us about your space<textarea rows="4" value={f.msg} onChange={set("msg")} placeholder="Flat size, location, timeline" /></label>
      <button className="btn" type="submit">Send on WhatsApp</button>
    </form>
  );
}
