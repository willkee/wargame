import React, {
	createContext,
	useContext,
	useRef,
	useState,
	useEffect,
} from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const ModalContext = createContext();

export const ModalProvider = (props) => {
	const [value, setValue] = useState("");
	const modalRef = useRef();

	useEffect(() => {
		setValue(modalRef.current);
	}, []);
	return (
		<>
			<ModalContext.Provider value={value}>
				{props.children}
			</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
};

export const Modal = ({ onClose, children }) => {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id="modal">
			<div id="modal-background" onClick={onClose}></div>
			<div id="modal-content">{children}</div>
		</div>,
		modalNode
	);
};
