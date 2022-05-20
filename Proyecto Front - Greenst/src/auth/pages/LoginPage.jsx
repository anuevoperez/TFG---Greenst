import React, { useContext, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();
  const navigate= useNavigate();
  const service = useMemo(() => new AuthService(), []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    const user = await service.login(data);
    if (user.message === "User not found") {
      alert(user.message);
      setErrorMessage("El usuario no existe");
      return;
    }
    if(user.message ==="Wrong password!")
    {
      setErrorMessage("Contraseña incorrecta");
      return;
    }
    if(user.message){
      setErrorMessage("Error de servidor, intente mas tarde");
      return;
    } 
    setErrorMessage(null);
    alert(JSON.stringify(user));
    setUser(user);
    navigate("/",{replace:true});
  };

  const emailRef = register("email", { required: true });
  const passRef = register("password", { required: true });

  return (
    <>
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            placeholder="email"
            type="email"
            {...emailRef}
            ref={null}
            innerRef={emailRef.ref}
          />
          {errors.email && <FormFeedback>Este campo es requerido</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            placeholder="password"
            type="password"
            {...passRef}
            ref={null}
            innerRef={passRef.ref}
          />
          {errors.password && (
            <FormFeedback>Este campo es requerido</FormFeedback>
          )}
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default LoginPage;
