import * as actionTypes from './actionTypes';

export const setPayementPage = (page)=> {
   
    return {
        type:actionTypes.GET_PAYEMENT_PAGE,
        link:page

    }
}

export const getPayementPage =() => dispatch=> {

    
    fetch('http://127.0.0.1:8000/api/plans/silver-plan/payment').then(response=>{
        response.text();
    }).then(html=>{
        console.log(html);

    })
        .catch(err => console.log(err));
}
export const setPaymentLink = (link,price)  =>{
    console.log("setPayement link is seted ")
    return {
        type:actionTypes.SET_PAYEMENT_LINK,
        paymentLink:link,
        price:price
    }
 
}
export const getPaymentLink = (link,token) => dispatch=> {
    const token2 = localStorage.getItem('token');
    console.log("token is " +token2)
    let PaymentLink='';
    let price=0;
    fetch(link, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token2
        }
        
        
    }).then(res =>res.json()).then(data=>(data)).then(response=>{
        console.log(response.methods[1].link);
        PaymentLink = response.methods[1].link;
        price = response.plan.price;
        console.log(price)
        console.log("SETPAY")
        dispatch(setPaymentLink(PaymentLink,price));
    })
    .catch(err=>console.log(err))
}
