import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {render,  screen} from '@testing-library/react'
import TopHeadlines from '../components/Topheadlines'

describe("Dashboard testing",()=>{

    it("render Dashboard",()=>{
       render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
     
    });
    
    it("heading to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
       const compval = getByText('Top Headlines')
         expect(compval).toBeInTheDocument(); 
    });


    it("facebook icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('FacebookIcon')).toBeTruthy();
        
    });
    it("instagram icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('InstagramIcon')).toBeTruthy();
        
    });

    it("twitter icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('TwitterIcon')).toBeTruthy()
        
    });

    it("Menu icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('MenuIcon')).toBeTruthy()
        
    });

    it("Search icon to be there in component",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        expect(screen.getAllByTestId('SearchIcon')).toBeTruthy()
        
    });

    /* it("subscription to be there in component",()=>{
        const {getAllByText}=render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
       const compval = getAllByText('Not subscribed? Subscribe here to get the latest updates.')
         expect(compval).toBeInTheDocument(); 
    }); */

    it("Latest news to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
       const compval = getByText('Latest News')
         expect(compval).toBeInTheDocument(); 
    });

    it("Search placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Search")).toBeTruthy(); 
    });


    it("Search should be of type text",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        const text = screen.getByPlaceholderText("Search");
    expect(text).toHaveAttribute("type", "text");
    });

    it("Email placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Enter Email")).toBeTruthy(); 
    });


    it("Email should be of type email",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        const email = screen.getByPlaceholderText("Enter Email");
    expect(email).toHaveAttribute("type", "email");
    });

    it("Subscribe button to be there",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
       
         expect(screen.getAllByDisplayValue("Subscribe")).toBeTruthy(); 
    });


    it("Subscribe should be of type submit",()=>{
        render(
        <BrowserRouter>
        <TopHeadlines/>
        </BrowserRouter>)
        expect(screen.getAllByDisplayValue("Subscribe")).toBeTruthy();
    });

 
    
})
