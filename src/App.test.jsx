import { render ,screen, getByTestId,GetByText, fireEvent} from "@testing-library/react"
import AddRecipeForm from "./Components/AddRecipeForm"
import React from "react"
import {BrowserRouter,Route,Routes} from 'react-router-dom'


test('intial Loading with empty', () => { 
    const setstaemoc = jest.fn()
    const useSetstaemoc =(useState)=>[useState,setstaemoc]
let button;
    jest.spyOn(React, 'useState').mockImplementation(useSetstaemoc);
    const {getByTestId} = render(
        <BrowserRouter>
    <Routes>
      
 
    <Route path="/addRecipe" element={<AddRecipeForm />}>
       

        </Route>
    </Routes>
    </BrowserRouter>
    
    );
    button =document.getElementById('saveIngid') 
    fireEvent.click(button)

    expect (setstaemoc).not.toBeNull()

   
 })