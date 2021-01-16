import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Coupon = (props) => {
  const [code, setCode] = useState(null);
  return (
    <Form inline style={{ marginLeft: '-1rem' }}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        {/* <Label className="mr-sm-2">Apply </Label> */}
        <Input
          type="text"
          name="code"
          placeholder="Enter Coupon Code Here"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
};

export default Coupon;
