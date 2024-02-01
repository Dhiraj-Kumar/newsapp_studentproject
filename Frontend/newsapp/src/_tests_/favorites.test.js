import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {render,  screen} from '@testing-library/react'
import Favorites from '../components/Favourites'

describe("Favourites Page testing",()=>{

    it("render Favourites Page",()=>{
       render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
     
    });
    
    it("heading to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
       const compval = getByText('Get Your Favorites❤️ here...')
         expect(compval).toBeInTheDocument(); 
    });


    it("facebook icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('FacebookIcon')).toBeTruthy();
        
    });
    it("instagram icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('InstagramIcon')).toBeTruthy();
        
    });

    it("twitter icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('TwitterIcon')).toBeTruthy()
        
    });

    it("Menu icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('MenuIcon')).toBeTruthy()
        
    });

    it("Search icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('SearchIcon')).toBeTruthy()
        
    });



    it("Latest news to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
       const compval = getByText('Latest News')
         expect(compval).toBeInTheDocument(); 
    });

    it("Search placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Search")).toBeTruthy(); 
    });


    it("Search should be of type text",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        const text = screen.getByPlaceholderText("Search");
    expect(text).toHaveAttribute("type", "text");
    });

    it("Email placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Enter Email")).toBeTruthy(); 
    });


    it("Email should be of type email",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        const email = screen.getByPlaceholderText("Enter Email");
    expect(email).toHaveAttribute("type", "email");
    });

    it("Subscribe button to be there",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
       
         expect(screen.getAllByDisplayValue("Subscribe")).toBeTruthy(); 
    });


    it("Subscribe should be of type submit",()=>{
        render(
        <BrowserRouter>
        <Favorites/>
        </BrowserRouter>)
        expect(screen.getAllByDisplayValue("Subscribe")).toBeTruthy();
    });

 
    
})
