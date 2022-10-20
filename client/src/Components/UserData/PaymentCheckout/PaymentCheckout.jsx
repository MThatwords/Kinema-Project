import React from "react";
import { Box, Button, Image, FormControl, Text } from '@chakra-ui/react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import {Link as RouteLink, useNavigate } from "react-router-dom";
import axios from "axios"
import img from "../../../Assets/premiumiconkine.png"
import img2 from "../../../Assets/fondopayment2.jpg"
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51LrrgZJF8OdpthZQzjEA3gwPESBIW22v5gNBch6JZhhDgIhm0j25PoUQ0XzT0HQqUb1EwnzdO68oWfJK5pgrvVYl00TLD4bPSL")

const CheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe()
    const elements = useElements()
    const { username, email } = useSelector(state => state.user);
    
    function handleBack() {
        navigate(-1);
    }
      
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })
            if(!error){
                const {id} = paymentMethod
                const {data} = await axios.post("http://localhost:3001/payment/premium",{id, username, email })
                if(data.success){
                    alert(data.message);
                    navigate('/home'); 
                }
                else { alert(data.message) }
            }
        }
        catch (e){ alert("We were not able to proceed your payment. Please try again") }    
    }

    return (
        <form onSubmit={handleSubmit} className="form-background">
        <FormControl backgroundImage={img2} display='flex' height={"100vh"} width={"100vw"} > 
        <Box marginTop={"20px"}justifyContent={"center"} align={"center"} spacing={4}  objectFit='cover' height={"100"} width={"100vw"} display='flex' justify='center'  
            >           
          <Box spacing={4} background={"#1a1a24"}height={"600px"} w={[300, 400, 500]} borderColor={"#a56317"} alignContent={"center"}
            borderWidth='2px' >

            
                <Button onClick={handleBack} background={"#a56317"} size='md' marginTop={"10px"} >Back</Button>
           
            <Text fontSize='3xl' color={"#a56317"} align={"center"}>BE PREMIUM</Text>
            <Box align={"center"}>
            <Image align={"center"} src={img} objectFit='cover' borderRadius='full' boxSize='350px' alt='Kinema Premium' />
            </Box>
            <Text  align={"center"} fontSize='2xl' color={"#a56317"} background={"#1a1a24"} size='sm' >Price: $7.99 / Month</Text>
            <Box backgroundColor={"white"} 
            borderColor={"#a56317"} 
            borderWidth='2px' 
            marginLeft={"15%"} 
            marginRight={"15%"} 
            marginTop={"10px"}
            marginBottom={"10px"}
            >
                <CardElement
                />         
            </Box>
            <Box align={"center"} paddingTop={"10px"}>
            <RouteLink to={'/home'}>
                            <button className="btn-premium">CONFIRM</button>
            </RouteLink>
            
            </Box>
          </Box>
          </Box>
          </FormControl>
          </form>
    )
}

export default function PaymentCheckout() {
    return (
        <Elements stripe={stripePromise}>
            <div>
                <div>
                    <div>
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    )
}
