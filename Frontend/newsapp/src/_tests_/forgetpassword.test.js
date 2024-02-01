import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {render,screen, } from '@testing-library/react'
import Registerpage from '../components/Authentication/Registerpage'
import validator from 'validator'



describe("Register Page testing",()=>{

    it("render Register page",()=>{
       render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
     
    });

    
    it("heading to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       const compval = getByText('Create Account')
         expect(compval).toBeInTheDocument(); 
    });

    
    it("paragraph to be there in component",()=>{
        const {getByText}=render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       const paragraph = getByText("Welcome Back!")
         expect(paragraph).toBeInTheDocument(); 
    }); 

    
    it("Email placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       const para = screen.getByPlaceholderText("Email")
         expect(para).toBeTruthy(); 
    });

    
    it("Password placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Password")).toBeTruthy(); 
    });

    
    
    it("Answer placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Answer")).toBeTruthy(); 
    });

    
    it("Confirm Password placeholder to be there",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       
         expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy(); 
    });


 
    it("button count",async()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       const button= await screen.findAllByRole("button")
         expect(button).toHaveLength(2); 
    });

     
 
    it("should fail on email validation",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
       const testemail= "akshaya.com" 
         expect(validator.isEmail(testemail)).not.toBe(true); 
    });

    
    
    it("email should be of type email",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
        const email = screen.getByPlaceholderText("Email");
    expect(email).toHaveAttribute("type", "email");
    });

    it("password should be of type password",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
        const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
    });
 
    it("Confirm Password should be of type password",()=>{
        render(
        <BrowserRouter>
        <Registerpage/>
        </BrowserRouter>)
        const answer = screen.getByPlaceholderText("Confirm Password");
    expect(answer).toHaveAttribute("type", "password");
    });
   

    
})
