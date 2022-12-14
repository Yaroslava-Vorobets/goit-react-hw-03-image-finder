// import PropTypes from 'prop-types';
import { Component } from "react"
import { ImageItem, Image } from './ImageGalleryItem.Styled'
import ModalComponent from '../ModalFolder/Modal'

export class ImageElementItem extends Component {
  state ={
   showModal: false,
  }

toggleModal = () => {
        
  this.setState(({ showModal }) => ({ showModal: !showModal }))
    }




  render() {
    const { showModal} = this.state;   
      const {image: { webformatURL, tags }, } =this.props ;
      console.log(this.props.image)
         return( 
        <>  
         <ImageItem >
            <Image onClick={this.toggleModal} src= {webformatURL} alt={tags}/>
        </ImageItem>
          {showModal && <ModalComponent image= {this.props.image} onClose={this.toggleModal}/>  }
      </>
    )
    }
   
   
  
} 
   

// ImageElementItem.propTypes = {   
//     webformatUR:  PropTypes.string.isRequired,
    
// }

export default ImageElementItem; 