
import {createSlice} from '@reduxjs/toolkit'

const cartSlice=createSlice({
    name:'Cart',
    initialState:{
        items:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):[],
        loading:true
    },
    reducers:{
        cartItemRequest(state,action){
            console.log("req")
            return{
                ...state,
                loading:true
            }
        },
        cartItemSuccess(state,action){
            console.log("req success")
            console.log(action.payload.id,"Action.payload")
            const item=action.payload

            const itemExists=state.items.find(i=>i.id==item.id)
            let stater;
            if(itemExists){
                console.log('if')
                const datas=[...state.items]
                console.log(datas)
                 stater={
                    ...state,
                    loading:false
                }
            }
            else{
                console.log('else')
                 stater={
                    ...state,
                    items:[...state.items,item],
                    loading:false
                }
                localStorage.setItem('cartItems',JSON.stringify(stater.items))
            }
            return stater
            
        },

        cartItemFail(state,action){
            return{
                loading:false,
                error:action.payload
            }

        },
        increaseCartItem(state,action){
            const id=action.payload
            state.items.map(item=>{
                if(item.id==id){
                    if(item.quantity>item.stock){
                        return
                    }
                    item.quantity=item.quantity+1
                }
                return item
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        decreaseCartItem(state,action){
            const id=action.payload
            state.items.map(item=>{
                if(item.id==id){
                    if(item.quantity<=1){
                        return
                    }
                    item.quantity=item.quantity-1
                }
                return item
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        deleteCartItem(state,action){
            const id=action.payload
            const deleteval=state.items.filter(item=>item.id!==id)
            localStorage.setItem('cartItems',JSON.stringify(deleteval))
            return{
                ...state,
                items:deleteval
            }
        },
        saveShippingInfo(state,action){
            localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
            return{
                ...state,
                shippingInfo:action.payload
            }
        }

    }
})

const {actions,reducer} =cartSlice
export const {
    cartItemRequest,cartItemSuccess,cartItemFail,
    increaseCartItem,decreaseCartItem,deleteCartItem,
    saveShippingInfo
}=actions
export default reducer