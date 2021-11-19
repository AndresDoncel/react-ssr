import React from "react";
import styles from "./Modal.module.scss";

export const Modal = ({ handleClose, show, children, title }) => {
  const showHideClassName = show ? "modal display_block" : "modal display_none";

  return (
    <div className={showHideClassName}>
      <section className={styles.modal_main_add_movie}>
        <h1 className={styles.modal_main_title}>{title}</h1>
        {children}
        <button
          className={styles.modal_main_btn}
          type="button"
          onClick={handleClose}
        >
          X
        </button>
      </section>

      <style jsx>{`
        .display_block {
          display: block;
        }
        .display_none {
          display: none;
        }
      `}</style>
    </div>
  );
};
