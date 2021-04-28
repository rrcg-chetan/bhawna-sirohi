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
} from 'availity-reactstrap-validation-safe'
import axios from 'axios';

class HealthEconomics extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {         
      code: code,     
      showHasInsurance: false,  

      registeredas: "",
      patienthasinsurance: "",
      insurancecurrency: "",
      insuranceamount: "",
      costsincurredbefore: "",
      costsincurredbeforeinsuranceamount: "",
      costofsurgery: "",
      surgeryamount: "",
      costofradiotherapy: "",
      radiotherapyamount: "",
      costofchemotherapy: "",
      chemotherapyamount: "",
      stayincitycost: "",
      stayincityamount: "",
      travelcosts: "",
      travelcostsamount: "",
      costoffollowupvisit: "",
      costoffollowupvisitamount: "",
      loading: false,
    };
  }

  handleValidSubmit = (event, values) => {
      const { history } = this.props;
      this.setState({ loading: true })
      axios.post(`http://localhost:4000/patienthealtheconomicsdetails`, { registeredas: this.state.registeredas, patienthasinsurance: this.state.patienthasinsurance, insurancecurrency: this.state.insurancecurrency, insuranceamount: this.state.insuranceamount, costsincurredbefore: this.state.costsincurredbefore, costsincurredbeforeinsuranceamount: this.state.costsincurredbeforeinsuranceamount, costofsurgery: this.state.costofsurgery, surgeryamount: this.state.surgeryamount, costofradiotherapy: this.state.costofradiotherapy, radiotherapyamount: this.state.radiotherapyamount, costofchemotherapy: this.state.costofchemotherapy, chemotherapyamount: this.state.chemotherapyamount, stayincitycost: this.state.stayincitycost, stayincityamount: this.state.stayincityamount, travelcosts: this.state.travelcosts, travelcostsamount: this.state.travelcostsamount, costoffollowupvisit: this.state.costoffollowupvisit, costoffollowupvisitamount: this.state.costoffollowupvisitamount, code: this.state.code })
      .then(function (response) {
        if(response.data.success === 'Health Economics Sucessfully Submitted!'){            
        history.push(`/`)
        }else{
        
        }
    })
  };

  showHasInsurance(name) {
    if(document.getElementById("patienthasinsurance").value === "Yes"){
      this.setState({ showHasInsurance: true, patienthasinsurance: name });   
      //this.state.patienthasinsurance = name 
    }else{
        this.setState({ showHasInsurance: false, insurancecurrency: "", insuranceamount: "", patienthasinsurance: name }); 
        //this.state.patienthasinsurance = name        
    }
  }

  render(){          
    const { showHasInsurance, /*registeredas, patienthasinsurance, insurancecurrency, insuranceamount, costsincurredbefore, costsincurredbeforeinsuranceamount, costofsurgery, surgeryamount, costofradiotherapy, radiotherapyamount, costofchemotherapy, chemotherapyamount, stayincitycost, stayincityamount, travelcosts, travelcostsamount, costoffollowupvisit, costoffollowupvisitamount,*/ loading, code } = this.state; 
    
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
              <h1 className="animate__animated animate__fadeIn">Health Economics</h1>
            </CardHeader>
            <CardBody>
            <AvForm onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}>
              <div className="row">
                
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='registeredas'>Registered As</Label>
                    <AvInput type='select' name='registeredas' id='registeredas' required value={this.state.registeredas} onChange={(e) => this.setState({ registeredas: e.target.value })}>
                        <option value="" selected>Select</option>
                        <option value="Cash">Cash</option>
                        <option value="TPA">TPA</option> 
                        <option value="Panel">Panel</option>                         
                        <option value="Not Known">Not Known</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Registered As!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='patienthasinsurance'>Patient has insurance</Label>
                    <AvInput type='select' name='patienthasinsurance' id='patienthasinsurance' required value={this.state.patienthasinsurance} onChange={(e) => this.showHasInsurance(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select if or not has insurance!</AvFeedback>
                  </AvGroup>
                </div> 
                {showHasInsurance && (
                    <>
                    <div className="col-md-3">
                    <AvGroup>            
                        <Label for='insurancecurrency'>Currency</Label>
                        <AvInput type='select' name='insurancecurrency' id='insurancecurrency' required value={this.state.insurancecurrency} onChange={(e) => this.setState({ insurancecurrency: e.target.value })}>
                            <option value="" selected>Select</option>
                            <option value="INR">INR</option>
                            <option value="$">$</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select if or not has insurance!</AvFeedback>
                    </AvGroup>
                    </div>
                    <div className="col-md-3">
                        <AvGroup>
                            <Label for='insuranceamount'>Premium per Month</Label>
                            <AvField type="number" name='insuranceamount' id='insuranceamount' value={this.state.insuranceamount} onChange={(e) => this.setState({ insuranceamount: e.target.value})} required />
                            <AvFeedback>Please enter the Premium per Month!</AvFeedback>
                        </AvGroup>
                    </div>
                    </>
                )}     
                <div className="col-md-12"><hr /></div>
                <div className="col-md-4">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Costs incurred before coming to centre</Label></div>        
                        <div className="col-md-6">
                            <AvGroup>            
                                <AvInput type='select' name='costsincurredbefore' id='costsincurredbefore' required value={this.state.costsincurredbefore} onChange={(e) => this.setState({ costsincurredbefore: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Costs incurred before coming to centre!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-6">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='costsincurredbeforeinsuranceamount' id='costsincurredbeforeinsuranceamount' value={this.state.costsincurredbeforeinsuranceamount} onChange={(e) => this.setState({ costsincurredbeforeinsuranceamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Total cost of surgery</Label></div>        
                        <div className="col-md-6">
                            <AvGroup>            
                                <AvInput type='select' name='costofsurgery' id='costofsurgery' required value={this.state.costofsurgery} onChange={(e) => this.setState({ costofsurgery: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Total cost of surgery!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-6">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='surgeryamount' id='surgeryamount' value={this.state.surgeryamount} onChange={(e) => this.setState({ surgeryamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Total cost of radiotherapy</Label></div>        
                        <div className="col-md-6">
                            <AvGroup>            
                                <AvInput type='select' name='costofradiotherapy' id='costofradiotherapy' required value={this.state.costofradiotherapy} onChange={(e) => this.setState({ costofradiotherapy: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Total cost of radiotherapy!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-6">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='radiotherapyamount' id='radiotherapyamount' value={this.state.radiotherapyamount} onChange={(e) => this.setState({ radiotherapyamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Total cost of chemotherapy (includes daycare cost, admission cost, consumables, protocol charges, nursing administration, drugs and investigation, OPD charges)</Label></div>        
                        <div className="col-md-2">
                            <AvGroup>            
                                <AvInput type='select' name='costofchemotherapy' id='costofchemotherapy' required value={this.state.costofchemotherapy} onChange={(e) => this.setState({ costofchemotherapy: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Total cost of chemotherapy!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-2">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='chemotherapyamount' id='chemotherapyamount' value={this.state.chemotherapyamount} onChange={(e) => this.setState({ chemotherapyamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">Out of pocket expenses<hr /></div>
                <div className="col-md-4">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Stay in the city currency</Label></div>        
                        <div className="col-md-6">
                            <AvGroup>            
                                <AvInput type='select' name='stayincitycost' id='stayincitycost' required value={this.state.stayincitycost} onChange={(e) => this.setState({ stayincitycost: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Stay in the city currency!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-6">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='stayincityamount' id='stayincityamount' value={this.state.stayincityamount} onChange={(e) => this.setState({ stayincityamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Travel costs</Label></div>        
                        <div className="col-md-6">
                            <AvGroup>            
                                <AvInput type='select' name='travelcosts' id='travelcosts' required value={this.state.travelcosts} onChange={(e) => this.setState({ travelcosts: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Travel costs!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-6">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='travelcostsamount' id='travelcostsamount' value={this.state.travelcostsamount} onChange={(e) => this.setState({ travelcostsamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="row">
                        <div className="col-md-12"><Label for=''>Cost of follow-up visits <small>includes travel, investigations, OPD consultations</small></Label></div>        
                        <div className="col-md-6">
                            <AvGroup>            
                                <AvInput type='select' name='costoffollowupvisit' id='costoffollowupvisit' required value={this.state.costoffollowupvisit} onChange={(e) => this.setState({ costoffollowupvisit: e.target.value })}>
                                    <option value="" selected>Select</option>
                                    <option value="INR">INR</option>
                                    <option value="$">$</option>                         
                                </AvInput>                      
                                <AvFeedback>Please select Total cost of followup visit!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-md-6">
                            <AvGroup>
                                <AvField type="number" placeholder="Amount" name='costoffollowupvisitamount' id='costoffollowupvisitamount' value={this.state.costoffollowupvisitamount} onChange={(e) => this.setState({ costoffollowupvisitamount: e.target.value})} required />
                                <AvFeedback>Please enter the If Other!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                
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

export default withRouter(HealthEconomics);
