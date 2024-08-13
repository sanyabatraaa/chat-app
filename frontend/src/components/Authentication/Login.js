import { VStack ,FormControl, FormLabel, Input, InputGroup, InputRightElement,Button} from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Login = () => {
    const toast = useToast();
    const [show,setShow]=useState(false);
    const handleClick=()=>setShow(!show);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [loading,setLoading]=useState();
    const history = useHistory();
    const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feild",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://chat-app-1t1p.onrender.com/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
    return (
    <VStack spacing='10px'>
        <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input value={email} type="email" placeholder='enter your email address' onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
            <Input value={password} type={show?"text":"password"} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}> {show?"Hide":"show"} </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button colorschema="blue" width="100%" style={{marginTop:15}}  isLoading={loading} onClick={submitHandler}> Login</Button>
        <Button variant="solid" colorScheme='red' width="100%" onClick={()=>{
            setEmail("guest@gmail.com");
            setPassword("123456");
        }}>Get Guest User Credentials</Button>
    </VStack>
  )
}

export default Login
