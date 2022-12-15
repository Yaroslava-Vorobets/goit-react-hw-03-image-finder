import PropTypes from 'prop-types';
import { Component } from "react"
import { toast } from 'react-toastify';
import {Section, SearchForm, SearchButton, Span, SearchFormInput} from './Searchbar.Styled';

export class Searchbar extends Component {
    state = {      
        query: '',
        
    }

   handleQueryChange = e => {
         this.setState({           
            query: e.currentTarget.value.toLowerCase(),           
        })
   }

    handleSubmit = e => {
        e.preventDefault()
        if  (this.state.query.trim()===''){
         return toast.error("please enter a request");
                 
       }
        this.props.onSubmit(this.state.query)
       
        this.setState({
             query: '',
        })
    };
    
   
   
    render() {    
    
        return (
            <>
            <Section>
                <SearchForm className="form" onSubmit={this.handleSubmit} >
                    <SearchButton type="submit">
                    <Span>Search</Span>
                    </SearchButton>

                    <SearchFormInput
                    className="input"
                    type="text"
                    name="query"
                    value={this.state.query} 
                    placeholder="Search images and photos"
                    onChange={this.handleQueryChange}
                    autoComplete="off"/>                  
                </SearchForm>
            </Section>
            </>
        )
    }
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
};
 
export default Searchbar;           