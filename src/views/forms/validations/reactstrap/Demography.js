import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Card, CardHeader, CardTitle, CardBody, Label, Button } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvCheckboxGroup,
  AvRadio,
  AvCheckbox
} from 'availity-reactstrap-validation-safe'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const Demography = () => {
  const [picker, setPicker] = useState('')

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Patient's Demography</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm>
        <div class="row">
        <div className="col-md-6">
          <AvGroup>            
            <Label for='name'>Name of Patient</Label>
            <AvInput name='name' id='name' required />
            <AvFeedback>Please enter a Patient's name!</AvFeedback>            
          </AvGroup>
          </div>
          <div className="col-md-6">
          <AvGroup>            
            <Label for='city'>City</Label>
            <AvInput name='city' id='city' required />
            <AvFeedback>Please enter a valid city name!</AvFeedback>            
          </AvGroup>
          </div>
          <div className="col-md-6">
          <AvGroup>            
            <Label for='country'>Country</Label>
            <AvInput name='country' id='country' required />
            <AvFeedback>Please enter a Country!</AvFeedback>
          </AvGroup>
          </div>
          <div className="col-md-6">
          <AvGroup>            
            <Label for='hospitalid'>Hospital ID</Label>
            <AvField name='hospitalid' id='hospitalid' required />
            <AvFeedback>Please enter the Hospital ID!</AvFeedback>
          </AvGroup>
          </div>
          <div className="col-md-6">
          <AvGroup>            
            <Label for='patientinitial'>Patient's Initial</Label>
            <AvField name='patientinitial' id='patientinitial' required />
            <AvFeedback>Please enter the Patient's Initial!</AvFeedback>
          </AvGroup>
          </div>
          <AvGroup>
            <Label for='dob'>DOB</Label>
            <AvField
              required
              id='dob'
              tag={Flatpickr}
              name='dob'
              className='form-control'
              value={picker}
              onChange={date => setPicker(date[0])}
            />
            <AvFeedback>Please enter your DOB!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for='country'>Country</Label>
            <AvField type='select' name='country' id='country' required>
              <option>Select</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>France</option>
              <option>Australia</option>
              <option>Germany</option>
            </AvField>
            <AvFeedback>Please select a country</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for='hobbies'>Hobbies</Label>
            <AvField type='select' name='hobbies' id='hobbies' required>
              <option>Select</option>
              <option>Sports</option>
              <option>Movies</option>
              <option>Books</option>
            </AvField>
            <AvFeedback>Please select at least one hobby</AvFeedback>
          </AvGroup>                    
          <AvGroup>
            <Label for='bio'>Bio</Label>
            <AvInput type='textarea' name='bio' id='bio' required />
            <AvFeedback>Please enter Bio!</AvFeedback>
          </AvGroup>
          <AvRadioGroup name='gender' required>
            <AvRadio className='mb-1' customInput label='Male' value='Male' />
            <AvRadio customInput label='Female' value='Female' />
          </AvRadioGroup>
          <AvRadioGroup name='terms' required>
            <AvRadio customInput label='Agree to our terms and conditions' value='terms' />
            <AvFeedback>You must agree to our Terms & Conditions</AvFeedback>
          </AvRadioGroup>
          <Button color='primary' type='submit'>
            Submit
          </Button>                  
        </div>
        </AvForm>
        
      </CardBody>
    </Card>
  )
}

export default Demography
