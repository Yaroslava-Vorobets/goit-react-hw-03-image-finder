import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyles';
import 'modern-normalize';
import Searchbar from '../SearchbarFolder/Searchbar';
import { ImageGallery } from '../ImageGalleryFolder/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FetchRequestApi from '../Servises/Api'
import { Section } from './App.Styled';
import {LoadMore } from '../ButtonFolder/Button'
import { Vortex } from 'react-loader-spinner'



export class App extends Component {
  state = {
    query:'',
    page: 1,    
    images: [],
    loading: false,
    error: null,  
    isBtnVisible: false,
  }

   handleFormSubmit = query => {
     this.setState({
       query,
       loading: true,      
       page: 1,
       images: [],
      isBtnVisible: false,
   })
   }  
  
  componentDidUpdate = (_, prevState) => {
    const{query,page}= this.state
      console.log('prevState.query:', prevState.query);
      console.log('this.state.query:', query);  
    if (prevState.page !== page || prevState.query !== query) {   
        FetchRequestApi.fetchRequest(query)
          .then(({ hits, totalHits }) => {
           if (hits.length === 0) {
             toast(`Sorry, there are no images matching your search query. Please try again.`);
             
            return;
                 } else {
             toast(`Hooray! We found ${totalHits} images.`)
            
      }   
     
          this.setState(state => ({
            images: [...this.state.images, ...hits],
            loading: false,
           
          }));
        })
        .catch(error => {
          this.setState({ error });
          return toast('Something went wrong! Please retry');
        })        
        .finally(() => this.setState({ loading: false }));       
    }  
  }

  loadMore = () => {    
    this.setState(prevState => ({       
      page: prevState.page + 1,
      loading: true,
    
    }))    
    const { page, totalHits } = this.state;
    const amountOfPages = totalHits / 12 - page;
    if (amountOfPages < 0) {
      this.setState({ isBtnVisible: false });
    }
  };  

  
  
  render() {
  const {images,loading, error} = this.state
  return(
    <Section>   
      <Searchbar onSubmit={this.handleFormSubmit} isSubmitting= {loading}/>
        {!images &&  toast('Enter a search query!')} 
        {images && <ImageGallery images={images}></ImageGallery> }
        {error &&  <h1>{error.message}</h1>  }
        {loading && <Vortex/>}
        {images.length > 11 &&  (
          <LoadMore onClick={this.loadMore} />)}       
        <GlobalStyle />
       <ToastContainer autoClose={2000} />
    </Section>
  );
} 
  
};
