import React, { Fragment } from 'react';

import SideBar from '../../sidebar/SideBar';
import "react-datepicker/dist/react-datepicker.css";
import {withRouter} from 'react-router-dom'

import '../../../assets/css/mainstyle.css';
import '../../../assets/css/animate.css';
import '../../../assets/css/vertical-menu.css';
import '../../../assets/css/perfect-scrollbar.css';

import { Card, CardHeader, CardBody, Label, Button, Row, Col } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation-safe'
import axios from 'axios';

class Pathology extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {            
      showType: false,              
      showHER2: false,
      code: code,  
      pathologytype: "",
      pathology_type: "",
      other_type: "",
      grade: "",    
      pT: "",
      pN: "",
      ypT: "",
      ypN: "",
      pathologicalsizeofcancer: "",
      ER: "",PR: "",
      HER2: "",
      showher: "",
      loading: false,
    };
    this.showType = this.showType.bind(this);
    this.hideType = this.hideType.bind(this);
    this.showHER2 = this.showHER2.bind(this);
    this.hideHER2 = this.hideHER2.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);      */  
    //console.log(code)
  }

  handleValidSubmit = (event, values) => {
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
    this.setState({loading: true})
   axios.post(`http://localhost:4000/patientpathologydetails`, { pathologytype: this.state.pathologytype, other_type: this.state.other_type, grade: this.state.grade, code: this.state.code, pT: this.state.pT, pN: this.state.pN, ypT: this.state.ypT, ypN: this.state.ypN, pathologicalsizeofcancer: this.state.pathologicalsizeofcancer, ER: this.state.ER, PR: this.state.PR, HER2: this.state.HER2, showher: this.state.showher })
    .then(function (response) {
    if(response.data.success === 'Pathology Sucessfully Submitted!'){            
      history.push(`/treatment/${response.data.value}`)
    }else{
      
    }
  })
  };
  
  showHER2(name) {
    //console.log(document.getElementById("HER2").value)
    if(document.getElementById("HER2").value === "2" || document.getElementById("HER2").value === "3+"){
        this.setState({ showHER2: true, HER2: name });   
        //this.state.HER2 = name 
    }else{
        this.setState({ showHER2: false, HER2: name }); 
        //this.state.HER2 = name        
    }
  }        
  hideHER2(name) {
    switch (name) {
      case "hideHER2":
        this.setState({ showHER2: false });        
        break;
default:            
    }
  }

  /*showType(name) {
    var type = document.getElementById("pathologytype").value
    //alert(type)
    document.getElementById("pathology_type").value = type
    if(document.getElementById("pathologytype").value == "Other"){
        this.setState({ showType: true });
        var type = document.getElementById("pathologytype").value
        alert(type)          
    }else{
        this.setState({ showType: false });
        var type = document.getElementById("pathologytype").value
        alert(type)
    }
  }*/

  showType(name) {
    if(document.getElementById("pathologytype").value === "Other"){
      this.setState({ showType: true, pathologytype: name });   
      //this.state.pathologytype = name 
    }else{
        this.setState({ showType: false, pathologytype: name }); 
        //this.state.pathologytype = name        
    }
  }

  hideType(name) {
    switch (name) {
      case "hideType":
        this.setState({ showType: false });              
        break;
default:            
    }
  }

  render(){          
    const { showType, /*pathologytype, pathology_type, other_type, grade,*/ code, /*pT, pN, ypT, ypN, pathologicalsizeofcancer, ER, PR, HER2,*/ showHER2, /*showher,*/ loading } = this.state; 
    
return (
  <div>
        <SideBar   />
        <div className="content-wrapper animate__animated animate__fadeIn">
        <div className="app-content content overflow-hidden">
        
          <Fragment>
          {code}
          <Row>
          <Col sm='12'>
          <Card>
            <CardHeader>
              <h1 className="animate__animated animate__fadeIn">Pathology</h1>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={this.handleValidSubmit}>
              <div className="row">
                
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='pathologytype'>Type</Label>
                    <AvInput type='select' name='pathologytype' id='pathologytype' required value={this.state.pathologytype} onChange={(e) => this.showType(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Ductal">Ductal</option>
                        <option value="Lobular">Lobular</option> 
                        <option value="Not Classified">Not Classified</option> 
                        <option value="Other">Other</option>                        
                      </AvInput>
                      
                    <AvFeedback>Please select Type!</AvFeedback>
                  </AvGroup>
                </div>
                {showType && (
                  <div className="col-md-4">
                  <AvGroup>
                    <Label for='other_type'>If Other Type Please mention</Label>
                    <AvField name='other_type' id='other_type' value={this.state.other_type} onChange={(e) => this.setState({ other_type: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Type!</AvFeedback>
                  </AvGroup>
                  </div>
                )}  
                <div className="col-md-4">
                <Label for='grade'>Grade</Label>
                <AvRadioGroup name='grade' required value={this.state.grade} onChange={(e) => this.setState({ grade: e.target.value})} >
                  <div className="row">
                    <div className="col-md-2"><AvRadio customInput label='Yes' value='Yes' /></div>
                    <div className="col-md-2"><AvRadio customInput label='No' value='No' /></div>
                    <div className="col-md-3"><AvRadio customInput label='Not Known' value='Not Known' /></div>
                  </div>
                  <AvFeedback>Please select the Grade!</AvFeedback>
                </AvRadioGroup>                
                </div>  
                <div className="col-md-12">Pathological stage of cancer<hr /></div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='pT'>pT</Label>
                    <AvInput type='select' name='pT' id='pT' required value={this.state.pT} onChange={(e) => this.setState({ pT: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>
                        <option value="4">4</option>                        
                      </AvInput>
                    <AvFeedback>Please select pT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='pN'>pN</Label>
                    <AvInput type='select' name='pN' id='pN' required value={this.state.pN} onChange={(e) => this.setState({ pN: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                      </AvInput>
                    <AvFeedback>Please select pN!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='ypT'>ypT</Label>
                    <AvInput type='select' name='ypT' id='ypT' required value={this.state.ypT} onChange={(e) => this.setState({ ypT: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                      </AvInput>
                    <AvFeedback>Please select ypT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='ypN'>ypN</Label>
                    <AvInput type='select' name='ypN' id='ypN' required value={this.state.ypN} onChange={(e) => this.setState({ ypN: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                      </AvInput>
                    <AvFeedback>Please select ypN!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>
                    <Label for='pathologicalsizeofcancer'>Pathological size of cancer</Label>
                    <AvField type="number" placeholder="in CMS" name='pathologicalsizeofcancer' id='pathologicalsizeofcancer' value={this.state.pathologicalsizeofcancer} onChange={(e) => this.setState({ pathologicalsizeofcancer: e.target.value})} required />
                    <AvFeedback>Please enter the Pathological size of cancer!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='ER'>ER</Label>
                    <AvInput type='select' name='ER' id='ER' required value={this.state.ER} onChange={(e) => this.setState({ ER: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                        <option value="4">4</option>
                      </AvInput>
                    <AvFeedback>Please select ER!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='PR'>PR</Label>
                    <AvInput type='select' name='PR' id='PR' required value={this.state.PR} onChange={(e) => this.setState({ PR: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                        <option value="4">4</option>
                      </AvInput>
                    <AvFeedback>Please select PR!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='HER2'>HER2</Label>
                    <AvInput type='select' name='HER2' id='HER2' required value={this.state.HER2} onChange={(e) => this.showHER2(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3+">3+</option>                                                                    
                      </AvInput>
                    <AvFeedback>Please select HER2!</AvFeedback>
                  </AvGroup>
                </div>
                {showHER2 && (
                  <div className="col-md-3">
                  <AvGroup>
                    <Label for='showher'>If 2 + FISH</Label>
                    <AvRadioGroup name='showher' required value={this.state.showher} onChange={(e) => this.setState({ showher: e.target.value})} >
                        <div className="row">
                            <div className="col-md-6"><AvRadio customInput label='Amplified' value='Amplified' /></div>
                            <div className="col-md-6"><AvRadio customInput label='Non-Amplified' value='Non-Amplified' /></div>
                        </div>
                    </AvRadioGroup>
                    <AvFeedback>Please select 2 + FISH!</AvFeedback>
                  </AvGroup>
                  </div>
                )}  
                <div className="col-md-12">
                <Button color='primary' type='submit' disabled={loading}>
                      {loading && (<svg width="30px" height="30px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"/>
                    </path>
                  </svg>)}
                {loading && <span> Please wait...</span>}
                {!loading && <span>Submit</span>}
                      </Button>              
                      </div>    
                    </div>
                    </AvForm>
              
            </CardBody>
          </Card>
          </Col>
          </Row>
          </Fragment>
          </div>
          </div>
          </div>
        
);      
}
}

export default withRouter(Pathology);
