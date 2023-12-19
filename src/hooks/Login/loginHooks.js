import { useState } from "react";
import { useDispatch } from "react-redux";

export default loginHooks = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    
    dispatch({
        type:"LOGIN"
    })
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignIn
  };
};
