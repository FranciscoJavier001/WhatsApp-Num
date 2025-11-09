import { useState, useEffect } from "react";

const KEYS = [
  { label: "1", sub: "" },
  { label: "2", sub: "ABC" },
  { label: "3", sub: "DEF" },
  { label: "4", sub: "GHI" },
  { label: "5", sub: "JKL" },
  { label: "6", sub: "MNO" },
  { label: "7", sub: "PQRS" },
  { label: "8", sub: "TUV" },
  { label: "9", sub: "WXYZ" },
  { label: "*", sub: "" },
  { label: "0", sub: "+" },
  { label: "⌫", type: "delete" }
];

export default function App() {
  const [digits, setDigits] = useState("");

// 🔄 Limpiar el número al abrir o volver a la app
useEffect(() => {
  const clearDigits = () => setDigits("");

  // Limpia al montar (primera vez)
  clearDigits();

  // También limpia cada vez que la app vuelve al frente
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearDigits();
    }
  });

  // Limpieza del listener al desmontar
  return () => {
    document.removeEventListener("visibilitychange", clearDigits);
  };
}, []);

  const handlePress = (value) => {
    if (value === "⌫") {
      handleDelete();
      return;
    }

    if (!/^\d$/.test(value)) return;
    if (digits.length >= 10) return;

    setDigits((prev) => prev + value);
  };

  const handleDelete = () => {
    setDigits((prev) => prev.slice(0, -1));
  };

  const handleSendWhatsApp = () => {
    if (digits.length !== 10) {
      alert("Debes ingresar exactamente 10 dígitos (número mexicano).");
      return;
    }

    const base = `https://wa.me/+52${digits}`;
    const text = encodeURIComponent("Francisco: ");
    const url = `${base}?text=${text}`;

    window.location.href = url;
  };

  const canSend = digits.length === 10;

  const formatDigits = () => {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };

  return (
    <div className="app-root">
      <div className="dialer-container">
        <div className="display-area">
          <div className="country-prefix">WhatsApp Num</div>
          <div className="display-digits">{formatDigits() || "••• ••• ••••"}</div>
        </div>

        <div className="keypad-grid">
          {KEYS.map((key) => (
            <button
              key={key.label}
              className={`keypad-button ${
                key.type === "delete" ? "delete-key" : ""
              }`}
              onClick={() => handlePress(key.label)}
            >
              <span className="keypad-label">{key.label}</span>
              {key.sub && <span className="keypad-sub">{key.sub}</span>}
            </button>
          ))}
        </div>

        <div className="send-button-wrapper">
          <button
            className={`send-button ${
              canSend ? "send-button-active" : "send-button-disabled"
            }`}
            onClick={handleSendWhatsApp}
          >
            <span className="send-emoji">💭</span>
          </button>
        </div>

        <div className="hint-text">
        </div>
      </div>
    </div>
  );
}
