import { createContext, useContext, useState } from "react";
import {ShoppingCart} from '../components/ShoppingCart.jsx'
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
const ShoppingCartContext= createContext({
    openCart:()=>{},
    closeCart:()=>{},
    getItemQuantity:(id)=>0,
    increaseQuantity:(id)=>{}, 
    decreaseQuantity:(id)=>{},
    removeFromCart:(id)=>{},
    cartQuantity:0,
    cartItems:[],
});

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const[isOpen,setIsOpen]=useState(false)
    const [cartItems,setCartItems]=useLocalStorage('shopping-cart',[]);

    const cartQuantity=cartItems.reduce(
        (quantity,item)=>item.quantity+quantity,
        0
    )
    const openCart=()=>setIsOpen(true);
    const closeCart=()=>setIsOpen(false);

    function getItemQuantity(id){
        const item=cartItems.find(item=>item.id===id)
        return item?item.quantity:0;
    }
    function increaseQuantity(id){
        setCartItems((currItems)=>{
            if(currItems.find(item=> item.id===id)==null){
                return[...currItems,{id,quantity:1}]
            }
            else{
                return currItems.map((item)=>{
                    if(item.id===id){
                        return {...item,quantity:item.quantity+1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
    }
    function decreaseQuantity(id){
        setCartItems((currItems)=>{
            if(currItems.find(item=> item.id===id)?.quantity===1){
                return currItems.filter(item=> item.id!==id)
            }
            else{
                return currItems.map((item)=>{
                    if(item.id===id){
                        return {...item,quantity:item.quantity-1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id){
        setCartItems(currItems=>{
            return currItems.filter(item=>item.id!==id)
        })
    }
    return(
        <ShoppingCartContext.Provider 
        value={{
            getItemQuantity,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}