import ImageElementItem from '../ImageGalleryItemFolder/ImageGalleryItem'
import {List} from '../ImageGalleryFolder/ImageGalleryStyled';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <List>
      
      {images.map(image =>(
           <ImageElementItem key={image.id} image={image} />             
            ))}
    </List>
  );
};
  



  
    
 
  

   
  
    
