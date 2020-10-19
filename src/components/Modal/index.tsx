import React from 'react';

import Close from '../../assets/images/close.png';
import './index.scss';

const Modal = (props: { open: boolean; className?: string; closed: any; children?: any }) => {
  const attachedClasses = props.open ? ['open', props.className] : ['close', props.className];

  const backdropClasses = props.open ? ['backdrop_open'] : ['backdrop_close'];

  return (
    <div className={`modal_container ${backdropClasses.join(' ')}`}>
      <div className={`modal ${attachedClasses.join(' ')}`}>
        <span className="close-modal" onClick={props.closed}>
          <img src={Close} alt="close" />
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
