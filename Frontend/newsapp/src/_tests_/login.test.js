import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {render,  screen} from '@testing-library/react'
import Loginpage from '../components/Authentication/Loginpage'
import validator from 'validator'

describe("Login Page testing",()=>{

    it("render Login page",()=>{
       render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
     
    });
    
    it("heading to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
       const compval = getByText('Newsly')
         expect(compval).toBeInTheDocument(); 
    });

    
    it("paragraph to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
       const paragraph = getByText("Haven't created your account with us yet?")
         expect(paragraph).toBeInTheDocument(); 
    }); 

    
    it("Email placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
       const para = screen.getByPlaceholderText("Email")
         expect(para).toBeTruthy(); 
    });

    
    it("Password placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Password")).toBeTruthy(); 
    });

    
    it("button count",async()=>{
        render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
       const button= await screen.findAllByRole("button")
         expect(button).toHaveLength(4); 
    });

    
    
    it("should fail on email validation",()=>{
        render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
       const testemail= "akshaya.com" 
         expect(validator.isEmail(testemail)).not.toBe(true); 
    });

    
    
    it("email should be of type email",()=>{
        render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
        const email = screen.getByPlaceholderText("Email");
    expect(email).toHaveAttribute("type", "email");
    });

    
    it("password should be of type password",()=>{
        render(
        <BrowserRouter>
        <Loginpage/>
        </BrowserRouter>)
        const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
    });

   

    
})
