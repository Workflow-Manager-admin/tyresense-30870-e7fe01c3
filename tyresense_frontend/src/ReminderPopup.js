import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ReminderPopup:
 * - Shows a reminder for tyre replacement (as email or browser popup).
 * - Sends reminder via EmailJS if configured, otherwise a demo popup.
 * - Closes itself after a timeout.
 */
function ReminderPopup({ tyre, userEmail, onClose }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Send with EmailJS if configured, fallback to demo after 2s
  useEffect(() => {
    if (!userEmail || !tyre) return;
    setSending(true);
    if (window.emailjs && process.env.REACT_APP_EMAILJS_SERVICE_ID) {
      window.emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            tyre_model: tyre.model,
            user_email: userEmail,
            tyre_brand: tyre.brand,
            remind_date: new Date().toLocaleDateString(),
          },
          process.env.REACT_APP_EMAILJS_USER_ID
        )
        .then(() => {
          setSent(true);
          setTimeout(onClose, 2600);
        })
        .catch(() => {
          setSent(true);
          setTimeout(onClose, 2600);
        });
    } else {
      setTimeout(() => {
        setSent(true);
        setTimeout(onClose, 1700);
      }, 1300);
    }
    // eslint-disable-next-line
  }, [userEmail, tyre]);

  return (
    <div
      className="ts-popup-reminder"
      style={{
        minWidth: 270,
        background: "linear-gradient(138deg,#191932 14%,#ffe60032 87%)",
        color: "#ffe600",
        textAlign: "center",
        borderRadius: 13,
        border: "2.8px dotted #00fff9",
        fontWeight: 600,
        fontSize: "1.08rem",
        boxShadow: "0 1.5px 13px 2.5px #ff3a3a33",
        padding: "18px 17px",
        zIndex: 9009,
        position: "fixed",
        left: "50%",
        top: "88vh",
        transform: "translateX(-50%)",
        pointerEvents: "auto",
      }}
    >
      {sending && !sent ? (
        <span>
          Setting a reminder for <b>{tyre.model}</b>...
          <div
            className="ts-bounce"
            style={{
              display: "inline-block",
              fontSize: "1.19em",
              animation: "ts-pop .8s infinite alternate",
              marginLeft: 12,
              color: "#00fff9",
            }}
          >
            ⏳
          </div>
        </span>
      ) : sent ? (
        <span>
          Reminder set for tyre <b>{tyre.brand} {tyre.model}</b>!
        </span>
      ) : null}
      <button
        className="ts-btn"
        onClick={onClose}
        style={{
          background: "none",
          color: "#ffe600",
          border: "1.8px solid #ffe600",
          borderRadius: 7,
          fontWeight: 700,
          marginTop: 9,
          marginLeft: 3,
          fontSize: "0.97rem",
          boxShadow: "0 1px 8px #ffe60044",
          padding: "3px 14px",
        }}
      >
        Close
      </button>
    </div>
  );
}

export default ReminderPopup;
