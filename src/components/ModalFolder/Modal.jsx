import { Component } from "react"
import { createPortal } from "react-dom"
import {Overlay, Modal} from './ModalStyled'


const modalRoot = document.querySelector('#modal-root')

export default class ModalComponent extends Component{

    componentDidMount() { 
        window.addEventListener('keydown', this.handlekeyDown)
    }    

    componentWillUnmount() { 
    window.removeEventListener('keydown', this.handlekeyDown)
    }
    
 
    handlekeyDown = e => {
        if (e.code === 'Escape') {
              this.props.onClose()  
            }
    }
    
    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
        this.props.onClose()
    }
}

    render() {
     const {
      image: { largeImageURL, tags },
    } = this.props;
    return createPortal(
        < Overlay onClick={this.handleOverlayClick}>
            <Modal>
                <img  src={largeImageURL} alt={tags}/>
            </Modal>     
        </ Overlay>,
        modalRoot,
    )
    }
}
    




