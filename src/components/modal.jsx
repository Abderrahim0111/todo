import "./modal.css";

// eslint-disable-next-line react/prop-types
const Modal = ({ closeModal, children }) => {
  return (
    <div className="modalParent">
      <form className="modal">
        <div>
          <i
            onClick={() => {
              closeModal();
            }}
            className="fa-solid fa-xmark"
          />
        </div>
        {children}
      </form>
    </div>
  );
};

export default Modal;
