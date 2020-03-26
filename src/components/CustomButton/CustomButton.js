import React from "react";
//import "./custom-button-styles.css";
import { Col, Button, FormGroup } from "reactstrap";

//  Refactored button component such that it could be used by other developers

const CustomButton = ({
                          children,
                          smCol,
                          type,
                          color,
                          size,
                          ...otherprops
                      }) => (
    <FormGroup row>
        <Col sm={smCol}>
            <Button type={type} color={color} size={size} {...otherprops}>
                {children}
            </Button>
        </Col>
    </FormGroup>
);
export default CustomButton;
