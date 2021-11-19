import React from "react";
import styles from "./modalDelete.module.scss";

export const ModalDelete = ({
  handleClose,
  show,
  description,
  title,
  onConfirm,
}) => {
  const showHideClassName = show ? "modal display_block" : "modal display_none";

  return (
    <div className={showHideClassName}>
      <section className={styles.modal_main}>
        <h1 className={styles.modal_main_title}>{title}</h1>
        <p className={styles.modal_main_description}>{description}</p>
        <button
          className={styles.modal_main_btn}
          type="button"
          onClick={handleClose}
        >
          X
        </button>
        <div className={styles.container_button}>
          <button type="button" onClick={() => onConfirm()}>
            Confirm
          </button>
        </div>
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
