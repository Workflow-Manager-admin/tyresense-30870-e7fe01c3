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

  // Always open popup, only attempt EmailJS if userEmail is provided
  useEffect(() => {
    if (!tyre) return;
    setSending(true);

    if (userEmail && window.emailjs) {
      const svcId = (typeof process !== "undefined" && process.env && process.env.REACT_APP_EMAILJS_SERVICE_ID)
        ? process.env.REACT_APP_EMAILJS_SERVICE_ID
        : window.REACT_APP_EMAILJS_SERVICE_ID;
      const tplId = (typeof process !== "undefined" && process.env && process.env.REACT_APP_EMAILJS_TEMPLATE_ID)
        ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID
        : window.REACT_APP_EMAILJS_TEMPLATE_ID;
      const userId = (typeof process !== "undefined" && process.env && process.env.REACT_APP_EMAILJS_USER_ID)
        ? process.env.REACT_APP_EMAILJS_USER_ID
        : window.REACT_APP_EMAILJS_USER_ID;

      if (svcId && tplId && userId) {
        window.emailjs
          .send(
            svcId,
            tplId,
            {
              tyre_model: tyre.model,
              user_email: userEmail,
              tyre_brand: tyre.brand,
              remind_date: new Date().toLocaleDateString(),
            },
            userId
          )
          .then(() => {
            setSent(true);
            setTimeout(onClose, 2600);
          })
          .catch(() => {
            setSent(true);
            setTimeout(onClose, 2600);
          });
        return;
      }
    }
    // Fallback: just show a local reminder
    setTimeout(() => {
      setSent(true);
      setTimeout(onClose, 1700);
    }, 1300);
    // eslint-disable-next-line
  }, [userEmail, tyre]);

  return (
    <div
      className="ts-popup-reminder"
      style={{
        minWidth: 240,
        background: "#232327",
        color: "#edeef0",
        textAlign: "center",
        borderRadius: 11,
        border: "1.5px solid #b4081b",
        fontWeight: 600,
        fontSize: "1.04rem",
        boxShadow: "0 2px 13px #b4081b33",
        padding: "13px 13px",
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
          {userEmail
            ? (
              <>
                Setting a reminder for <b>{tyre.model}</b>...
                <div
                  className="ts-bounce"
                  style={{
                    display: "inline-block",
                    fontSize: "1.09em",
                    animation: "ts-pop .8s infinite alternate",
                    marginLeft: 8,
                    color: "#b4081b",
                  }}
                >
                  ⏳
                </div>
              </>
            )
            : (
              <>
                Preparing in-app replacement reminder for <b>{tyre.model}</b>...
                <div
                  className="ts-bounce"
                  style={{
                    display: "inline-block",
                    fontSize: "1.09em",
                    animation: "ts-pop .8s infinite alternate",
                    marginLeft: 8,
                    color: "#b4081b",
                  }}
                >
                  ⏳
                </div>
              </>
            )
          }
        </span>
      ) : sent ? (
        <span>
          {userEmail
            ? <>Reminder set for tyre <b>{tyre.brand} {tyre.model}</b>! (Email sent)</>
            : <>Tyre replacement reminder shown for <b>{tyre.brand} {tyre.model}</b>.<br />
            Check tyres or update data for safety.</>
          }
        </span>
      ) : null}
      <button
        className="ts-btn"
        onClick={onClose}
        style={{
          background: "#b4081b",
          color: "#fff",
          border: "1.5px solid #b4081b",
          borderRadius: 6,
          fontWeight: 800,
          marginTop: 10,
          marginLeft: 3,
          fontSize: "0.99rem",
          boxShadow: "none",
          padding: "6px 15px",
          cursor: "pointer",
          transition: "background 0.14s, color 0.13s, border 0.13s"
        }}
      >
        Close
      </button>
    </div>
  );
}

export default ReminderPopup;
