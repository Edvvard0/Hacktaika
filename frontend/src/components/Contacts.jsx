import { forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import ClientForm from "./ClientForm";
import "./css/contacts.css";

export const Contacts = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [isOrderClientFormOpen, setIsOrderClientFormOpen] = useState(false);
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);

  return (
    <div ref={ref} className="contacts-container">
      <span className="contacts-title">{t("contacts-title")}</span>
      <img
        src="/vectors/15.png"
        className="vectors"
        alt="вектор3"
        style={{ position: "absolute", left: "17%", bottom: 300, zIndex: -999 }}
      />
      <div className="contacts">
        <div
          onClick={() => setIsOrderClientFormOpen(true)}
          className="contacts-item order"
        >
          <div className="contact-text">
            {t("order-project")}
          </div>
          <div className="contact-tooltip">
            {t("order-project-tooltip")}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div
          onClick={() => setIsClientFormOpen(true)}
          className="contacts-item brief"
        >
          <div className="contact-text">
            {t("fill-brief")}
          </div>
          <div className="contact-tooltip">
            {t("fill-brief-tooltip")}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <a
          href="mailto:info@hacktaika.com"
          rel="noreferrer"
          target="_blank"
          className="contacts-item"
        >
          <div className="contact-text">
            {t("mail")}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <a
          href="https://t.me/dislov_freelance"
          target="_blank"
          rel="noreferrer"
          className="contacts-item"
        >
          <div className="contact-text">
            {t("telegram")}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {isOrderClientFormOpen &&
        ReactDOM.createPortal(
          <ClientForm onClose={() => setIsOrderClientFormOpen(false)} />,
          document.body
        )}

      {isClientFormOpen &&
        ReactDOM.createPortal(
          <ClientForm onClose={() => setIsClientFormOpen(false)} />,
          document.body
        )}
    </div>
  );
});
