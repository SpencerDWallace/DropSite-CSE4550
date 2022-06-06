import { useState } from "react";
//import { Data } from "./Data";
import "./FAQ.css";
import { Data } from "./faq-data";
function FAQ() {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-accordion">
        {Data.map((item, i) => (
          <div className="faq-item">
            <div className="faq-title" onClick={() => toggle(i)}>
              <h4>{item.question}</h4>
              <span>{selected === i ? "-" : "+"}</span>
            </div>

            <div className={selected === i ? "faq-content faq-show" : "faq-content"}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;