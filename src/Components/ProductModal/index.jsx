import React from "react";
import ReactDOM  from "react-dom";

function ProductModal({ children }) {
    return ReactDOM.createPortal(
        <div className='bg-[rgba(43,45,51,0.8)] flex justify-center items-center fixed top-[100px] bottom-0 inset-x-0'>
            {children}
        </div>,
        document.getElementById('modal')
    );
}

export default ProductModal;