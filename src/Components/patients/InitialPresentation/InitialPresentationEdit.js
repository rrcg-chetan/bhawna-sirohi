import React, { Fragment } from 'react';
//import ReactDOM from 'react-dom';
//import NavBar from '../Components/navbar/NavBar';
import EditSideBar from '../../sidebar/EditSideBar';
import "react-datepicker/dist/react-datepicker.css";
import {withRouter} from 'react-router-dom'

import '../../../assets/css/mainstyle.css';
import '../../../assets/css/animate.css';
import '../../../assets/css/vertical-menu.css';
import '../../../assets/css/perfect-scrollbar.css';

//import Flatpickr from 'react-flatpickr'
import { Card, CardHeader, CardBody, Label, Button, Row, Col } from 'reactstrap'
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
import axios from 'axios';

class InitialPresentationEdit extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()    
    //console.log(code)    
    this.state = {            
        code: code,
        patients: [],  
        isLoading: true,
        errors: null,     
    };
    this.showMetastasesComp = this.showMetastasesComp.bind(this);
    this.hideMetastasesComp = this.hideMetastasesComp.bind(this);
    this.showOtherTypesMetastases = this.showOtherTypesMetastases.bind(this);
    this.hideOtherTypesMetastases = this.hideOtherTypesMetastases.bind(this);
    this.showGermlineComponent = this.showGermlineComponent.bind(this);
    this.hideGermlineComponent = this.hideGermlineComponent.bind(this);
    this.showOtherGenetics = this.showOtherGenetics.bind(this);
    this.hideOtherGenetics = this.hideOtherGenetics.bind(this);
    //this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    //this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);    
    /*this.handleChange = this.handleChange.bind(this);
    this.sendInitialPresentationDetails = this.sendInitialPresentationDetails.bind(this);*/
    //console.log(code)
  }

  onToggle(index, e){
  	let newItems = this.state.patientmetastases_types.slice();
		newItems[index].checked = !newItems[index].checked
  	this.setState({
    	metastases_types: newItems
    })
    console.log(this.state.metastases_types)
  }

  onToggleTreatment(index, e){
  	let newItemsTreat = this.state.patientfirst_treatment_given.slice();
		newItemsTreat[index].checked = !newItemsTreat[index].checked
  	this.setState({
    	first_treatment_given: newItemsTreat
    })
    console.log(this.state.first_treatment_given)
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getfulldetails/${this.state.code}`)
    .then(response =>
        response.data.results.map(patient => ({
            presentation: `${patient.presentation}`, at_diagnosis: `${patient.at_diagnosis}`, laterality: `${patient.laterality}`, ct: `${patient.ct}`, ct_based_one: `${patient.ct_based_one}`, cn: `${patient.cn}`, cn_bases_on: `${patient.cn_bases_on}`, cm: `${patient.cm}`, cm_based_on: `${patient.cm_based_on}`, metastases: `${patient.metastases}`, total_number_of_metastatus: `${patient.total_number_of_metastatus}`, metastases_types: `${patient.metastases_types}`, other_metastases_types: `${patient.other_metastases_types}`, first_treatment_given: `${patient.first_treatment_given}`, germline_testing: `${patient.germline_testing}`, genetic_testing_done: `${patient.genetic_testing_done}`, genetic_testing_done_and_other: `${patient.genetic_testing_done_and_other}`, pregnancy_associated_b_c: `${patient.pregnancy_associated_b_c}`, treatment_text: `${patient.treatment_text}`, metastasestext: `${patient.metastasestext}`, code: `${patient.code}`,                  
        })),
        //console.log(this.patient)
    )
    .then(patients => {
        this.setState({
          patients,
          isLoading: false,
          metastasesv: patients[0].metastases,
          germlinetesting: patients[0].germline_testing,
          othergermlinetesting: patients[0].genetic_testing_done,
          familyhavecancer: patients[0].family_have_cancer,
          typesofmetastases: patients[0].metastases_types,
          patientmetastases_types: JSON.parse(patients[0].metastases_types),
          patientfirst_treatment_given: JSON.parse(patients[0].first_treatment_given)
          /*pregnancy: patients[0].pregnancy_associated_b_c
          whichrelative: patients[0].which_relative*/
        });
        //document.getElementById('metastases_types')[1].style.display='none';
        console.log(this.state.patientfirst_treatment_given)
        if(this.state.metastasesv === 'Yes'){
          this.setState({ showMetastases: true })
        }
        if(this.state.germlinetesting === 'Yes'){
          this.setState({ showGermLine: true })
        }
        if(this.state.othergermlinetesting === 'Other'){
          this.setState({ showGenetics: true })
        }
        /*if(this.state.pregnancy == 'Yes'){
          this.setState({ show: true })
        }
        if(this.state.whichrelative == 'Other'){
          this.setState({ showOtherCancer: true })
        }*/
    })
    .catch(error => this.setState({ error, isLoading: false })); 
    
}; 

getCheckedData() {
    return this.state.patientmetastases_types.map((item, i) => {
      var check = item.checked;
      //console.log(check)
      if(check === true){
        //console.log(check);
        return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggle.bind(this, i)} checked /></div>) 
      }else{
        return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggle.bind(this, i)} /></div>) 
      }
    }    
    )
}

getTreatmentCheckedData() {
  return this.state.patientfirst_treatment_given.map((item, i) => {
    var check = item.checked;
    //console.log(check)
    if(check === true){
      //console.log(check);
      return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggleTreatment.bind(this, i)} checked /></div>) 
    }else{
      return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggleTreatment.bind(this, i)} /></div>) 
    }
  }    
  )
}

  handleValidSubmit = (event, values) => { 
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
    this.setState({ loading: true })
   axios.post(`http://localhost:4000/updatepatientdetails`, { presentation: this.state.presentation, at_diagnosis: this.state.at_diagnosis, laterality: this.state.laterality, ct: this.state.ct, ct_based_one: this.state.ct_based_one, cn: this.state.cn, cn_bases_on: this.state.cn_bases_on, cm: this.state.cm, cm_based_on: this.state.cm_based_on, metastases: this.state.metastases, total_number_of_metastatus: this.state.total_number_of_metastatus, metastases_types: JSON.stringify(this.state.metastases_types), other_metastases_types: this.state.other_metastases_types, first_treatment_given: JSON.stringify(this.state.first_treatment_given), germline_testing: this.state.germline_testing, genetic_testing_done: this.state.genetic_testing_done, genetic_testing_done_and_other: this.state.genetic_testing_done_and_other, pregnancy_associated_b_c: this.state.pregnancy_associated_b_c, treatment_text: this.state.treatment_text, metastasestext: this.state.metastasestext, code: this.state.code, initialpresentation_completed: "true" })
    .then(function (response) {
    //console.log(JSON.stringify(response.data));
    if(response.data.success === 'Sucessfully Updated!'){            
      //let history = useHistory();
      //const { history } = this.props;
      //this.context.history.push(`/initial-presentation/${code}`);
      history.push(`/pathology/edit/${response.data.value}`)
    }else{
      
    }
  })
  };

  showMetastasesComp(name) {
    switch (name) {
      case "showMetastases":
        this.setState({ showMetastases: true, required: false });              
        break;
default:            
    }
  }        
  hideMetastasesComp(name) {
    switch (name) {
      case "hideMetastases":
        this.setState({ showMetastases: false, showOtherMetastases:false, required: true });        
        break;
default:            
    }
  } 
  
  showOtherTypesMetastases(name) {
    switch (name) {
      case "showOtherMetastases":
        this.setState({ showOtherMetastases: true, required: false });
        break;
default:            
    }
  }
  hideOtherTypesMetastases(name) {
    switch (name) {
      case "hideOtherMetastases":
        this.setState({ showOtherMetastases: false, required: true });              
        //showOtherMetastases
        break;
default:            
    }
  }
  
  showGermlineComponent(name) {
    switch (name) {
      case "showGermLine":
        this.setState({ showGermLine: true, genetic_testing_done: name, showOtherGermline: false });
        //this.state.genetic_testing_done = ''
        break;
default:            
    }

    /*if(document.getElementById("germline_testing").value == "Yes"){
        this.setState({ showGermLine: true, showOtherGermline: false });
        this.state.germline_testing = name
    }else{
        this.setState({ showGermLine: false, showOtherGermline: false });
        //this.state.genetic_testing_done_and_other = ""
        this.state.germline_testing = name
    }*/

  }
  hideGermlineComponent(name) {
    switch (name) {
      case "hideGermLine":
        this.setState({ showGermLine: false, genetic_testing_done: name, showOtherGermline: false });   
        this.setState({ showGenetics: false, showOtherGenetics: false }); 
        //this.state.genetic_testing_done = ''          
        break;
default:            
    }
  }

  showOtherGenetics(name) {
    //alert(name)
    if(document.getElementById("genetic_testing_done").value === "Other"){
        this.setState({ showGenetics: true, showOtherGenetics: true, genetic_testing_done: name });    
        //this.state.genetic_testing_done = name
    }else{
        this.setState({ showGenetics: false, genetic_testing_done: name, genetic_testing_done_and_other: "", showOtherGenetics: false });
        //this.state.genetic_testing_done_and_other = ""
        //this.state.genetic_testing_done = name
    }
  }
  hideOtherGenetics(name) {
    switch (name) {
      case "hideGenetics":
        this.setState({ showGenetics: false, showOtherGenetics: false });              
        break;
default:            
    }
  }

  render(){          
    const { showMetastases, showOtherMetastases, showGermLine, showGenetics, isLoading, /*loading,*/ patients } = this.state;
    
return (
  <div>
        <EditSideBar   />
        <div className="content-wrapper animate__animated animate__fadeIn">
        <div className="app-content content overflow-hidden">
        
          <Fragment>
          
          <Row>
          <Col sm='12'>
          <Card>
            <CardHeader>
              <h1 className="animate__animated animate__fadeIn">Patient's Initial Presentation</h1>
            </CardHeader>
            <CardBody>
                {!isLoading ? (
                    patients.map(patient => {
                    const { /*presentation, at_diagnosis, laterality, ct, ct_based_one, cn, cn_bases_on, cm, cm_based_on, metastases, total_number_of_metastatus, metastases_types, other_metastases_types, first_treatment_given, germline_testing, genetic_testing_done, genetic_testing_done_and_other, pregnancy_associated_b_c, treatment_text, metastasestext, code,*/ loading, /*isLoading*/} = patient;
                    /*var metas = Object.keys(patient.metastases_types).filter((x) => patient.metastases_types[x]);
                    var treat = Object.keys(this.state.first_treatment_given).filter((x) => this.state.first_treatment_given[x]);
                    */                    

                    return (
              <AvForm onValidSubmit={this.handleValidSubmit}>
              <div className="row">
              <div className="col-md-4">
                <AvGroup>            
                  <Label for='presentation'>Presentation</Label>
                  <AvInput type='select' name='presentation' id='presentation'required value={patient.presentation} onChange={(e) => this.setState({ presentation: e.target.value})}>
                      <option value="" selected>Select</option>
                      <option value="Screen Detected">Screen Detected</option>
                      <option value="Symptomatic">Symptomatic</option>                            
                    </AvInput>
                  <AvFeedback>Please select Presentation!</AvFeedback>
                </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='at_diagnosis'>At diagnosis</Label>
                    <AvInput type='select' name='at_diagnosis' id='at_diagnosis'required value={patient.at_diagnosis} onChange={(e) => this.setState({ at_diagnosis: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Early">Early</option>
                        <option value="Locally Advanced">Locally Advanced</option>                            
                      </AvInput>
                    <AvFeedback>Please select At diagnosis!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='laterality'>Laterality</Label>
                    <AvInput type='select' name='laterality' id='laterality'required value={patient.laterality} onChange={(e) => this.setState({ laterality: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Right">Right</option>
                        <option value="Left">Left</option>
                        <option value="Bilateral">Bilateral</option>                            
                      </AvInput>
                    <AvFeedback>Please select Laterality!</AvFeedback>
                  </AvGroup>
                </div>
                <div class="col-md-12 mt-2"><h4>Original clinical stage</h4><hr /></div>
                <div className="col-md-1">
                  <AvGroup>            
                    <Label for='ct'>cT</Label>
                    <AvInput type='select' name='ct' id='ct'required value={patient.ct} onChange={(e) => this.setState({ ct: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>
                        <option value="4">4</option>                            
                        <option value="5">5</option>                            
                      </AvInput>
                    <AvFeedback>Please select cT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='ct_based_one'>Based On cT</Label>
                    <AvInput type='select' name='ct_based_one' id='ct_based_one'required value={patient.ct_based_one} onChange={(e) => this.setState({ ct_based_one: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Clinical">Clinical</option>
                        <option value="Mammorgam">Mammorgam</option>
                        <option value="MRI">MRI</option>                            
                        <option value="Ultrasound">Ultrasound</option>
                      </AvInput>
                    <AvFeedback>Please select Based on cT!</AvFeedback>
                  </AvGroup>
                </div>

                <div className="col-md-1">
                  <AvGroup>            
                    <Label for='cn'>cN</Label>
                    <AvInput type='select' name='cn' id='cn'required value={patient.cn} onChange={(e) => this.setState({ cn: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>                            
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                                                        
                      </AvInput>
                    <AvFeedback>Please select cN!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='cn_bases_on'>Based On cN</Label>
                    <AvInput type='select' name='cn_bases_on' id='cn_bases_on'required value={patient.cn_bases_on} onChange={(e) => this.setState({ cn_bases_on: e.target.value})}>
                    <option value="" selected>Select</option>
                        <option value="Clinical">Clinical</option>
                        <option value="Mammorgam">Mammorgam</option>
                        <option value="MRI">MRI</option>                            
                        <option value="Ultrasound">Ultrasound</option>                           
                      </AvInput>
                    <AvFeedback>Please select Based on cN!</AvFeedback>
                  </AvGroup>
                </div>

                <div className="col-md-1">
                  <AvGroup>            
                    <Label for='cm'>cM</Label>
                    <AvInput type='select' name='cm' id='cm'required value={patient.cm} onChange={(e) => this.setState({ cm: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </AvInput>
                    <AvFeedback>Please select cM!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='cm_based_on'>Based On cM</Label>
                    <AvInput type='select' name='cm_based_on' id='cm_based_on'required value={patient.cm_based_on} onChange={(e) => this.setState({ cm_based_on: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Clinical">Clinical</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="Bone Scan">Bone Scan</option>                            
                        <option value="Pet-CT Scan">Pet-CT Scan</option>
                        <option value="Pet-MRI">Pet-MRI</option>                        
                      </AvInput>
                    <AvFeedback>Please select Based on cT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                <Label for='metastases'>Metastases</Label>
                <AvRadioGroup name='metastases' required value={patient.metastases} onChange={(e) => this.setState({ metastases: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' onClick={ () => this.showMetastasesComp("showMetastases") } /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' onClick={ () => this.hideMetastasesComp("hideMetastases") } /></div>
                  </div>
                </AvRadioGroup>
                </div>
                {showMetastases && (    
                <>
                <div className="col-md-4">
                <Label for='total_number_of_metastatus'>Total number of metastases</Label>
                <AvRadioGroup name='total_number_of_metastatus' required value={patient.total_number_of_metastatus} onChange={(e) => this.setState({ total_number_of_metastatus: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Less than 5' value='Less than 5' /></div>
                    <div className="col-md-6"><AvRadio customInput label='More than 5' value='More than 5' /></div>                          
                  </div>                  
                </AvRadioGroup>
                
                </div> 
                  <div className="col-md-12"></div>
                  <div className="col-md-8">
                  <Label for='type_of_metastases'>Types of Metastases</Label>
                  <AvCheckboxGroup name='metastases_types' id="metastases_types" >
                    <div className="row">
                      {this.getCheckedData()}
                    </div>
                  </AvCheckboxGroup>
                  </div> 
                  </>
                )}     
                {showOtherMetastases && (
                  <div className="col-md-3">
                  <AvGroup>
                    <Label for='other_metastases_types'>If Other Please mention metastases</Label>
                    <AvField name='other_metastases_types' id='other_metastases_types' value={patient.other_metastases_types} onChange={(e) => this.setState({ other_metastases_types: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Please mention metastases!</AvFeedback>
                  </AvGroup>
                  </div>
                )}                          
                <div className="col-md-12"></div>
                
                  <hr />
                  <div className="col-md-12">
                  <Label for='first_treatment_given'><h4>First treatment given</h4></Label>
                  <AvCheckboxGroup name='first_treatment_given' >
                    <div className="row">
                      {this.getTreatmentCheckedData()}                    
                    </div>
                  </AvCheckboxGroup>                  
                  </div>
                <div className="col-md-12"></div>
                <div className="col-md-4">
                <Label for='germline_testing'>Germline testing done</Label>
                <AvRadioGroup name='germline_testing' required value={patient.germline_testing} onChange={(e) => this.setState({ germline_testing: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' onClick={ () => this.showGermlineComponent("showGermLine") } /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' onClick={ () => this.hideGermlineComponent("hideGermLine") } /></div>
                  </div>
                </AvRadioGroup>
                </div>
                {showGermLine && (    
                <>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='genetic_testing_done'>Genetics</Label>
                    <AvInput type='select' name='genetic_testing_done' id='genetic_testing_done'required value={patient.genetic_testing_done} onChange={(e) => this.showOtherGenetics(e.target.value )}>
                        <option value="" selected>Select</option>
                        <option value="BRCA 1">BRCA 1</option>
                        <option value="BRCA 2">BRCA 2</option>
                        <option value="PALB2"> PALB2</option>                            
                        <option value="ATM">ATM</option>
                        <option value="CHEK 2">CHEK 2</option>                        
                        <option value="Other">Other</option>                        
                      </AvInput>
                    <AvFeedback>Please select Genetics!</AvFeedback>
                  </AvGroup>
                </div>
                </>
                )}
                {showGenetics && (
                  <div className="col-md-3">
                  <AvGroup>
                    <Label for='genetic_testing_done_and_other'>If Other Please mention Genetics</Label>
                    <AvField name='genetic_testing_done_and_other' id='genetic_testing_done_and_other' value={patient.genetic_testing_done_and_other} onChange={(e) => this.setState({ genetic_testing_done_and_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Please mention Genetics!</AvFeedback>
                  </AvGroup>
                  </div>
                )} 
                <div className="col-md-12"></div>
                <div className="col-md-4">
                <Label for='pregnancy_associated_b_c'>Pregnancy associated breast cancer:</Label>
                <AvRadioGroup name='pregnancy_associated_b_c' required value={patient.pregnancy_associated_b_c} onChange={(e) => this.setState({ pregnancy_associated_b_c: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' /></div>
                  </div>
                </AvRadioGroup>
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
              );
            })
            ) : (
              <div className="center"><svg width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"/>
                    </path>
                </svg></div>
            )}
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

export default withRouter(InitialPresentationEdit);