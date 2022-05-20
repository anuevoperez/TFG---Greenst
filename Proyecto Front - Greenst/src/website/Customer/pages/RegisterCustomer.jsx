import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import CustomerService from "../services/CustomerService";

const RegisterCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate= useNavigate();
  const service = useMemo(() => new CustomerService(), []);

  const emailRef = register("email", { required: true });
  const passRef = register("password", { required: true });
  const nameRef = register("name", { required: true });
  const lastNameRef = register("lastName", { required: true });
  const genderRef = register("gender", { required: true });
  const dateOfBirthRef = register("dateOfBirth", { required: true });
  const nationalityRef = register("nationality", { required: true });
  const dniRef = register("dni", { required: true });
  const phoneRef = register("phone", { required: true });
  
  const onSubmit = async (data, e) => {
    alert(JSON.stringify(data));
    const response = await service.insertCustomer(data);
    if(response.message==="OK"){
      navigate("/login");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
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
            </FormGroup>
          </Col>
          <Col md={6}>
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
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Tus nombres xd"
                type="text"
                {...nameRef}
                ref={null}
                innerRef={nameRef.ref}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Apellidos</Label>
              <Input
                id="lastName"
                placeholder="lastName"
                type="text"
                {...lastNameRef}
                ref={null}
                innerRef={lastNameRef.ref}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="gender">Genero</Label>
              <Input
                id="gender"
                type="select"
                {...genderRef}
                ref={null}
                innerRef={genderRef.ref}
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dateOfBirth">Fecha de nacimiento</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...dateOfBirthRef}
                ref={null}
                innerRef={dateOfBirthRef.ref}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="nationality">Nacionalidad</Label>
              <Input
                id="nationality"
                type="text"
                {...nationalityRef}
                ref={null}
                innerRef={nationalityRef.ref}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="dni">DNI</Label>
              <Input
                id="dni"
                type="text"
                {...dniRef}
                ref={null}
                innerRef={dniRef.ref}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="phone">Telefono</Label>
              <Input
                id="phone"
                type="text"
                {...phoneRef}
                ref={null}
                innerRef={phoneRef.ref}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button type="submit">Registrarse</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default RegisterCustomer;
