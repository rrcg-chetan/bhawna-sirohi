import React, { Fragment, PureComponent } from 'react';
//import ReactDOM from 'react-dom';
//import NavBar from '../Components/navbar/NavBar';
import DemoSideBar from '../../sidebar/DemoSideBar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Redirect, withRouter} from 'react-router-dom'
import moment from 'moment'

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
  AvRadio,
} from 'availity-reactstrap-validation-safe'
import axios from 'axios';

  
   

  
      //const Demography = () => {       
      class Demography extends PureComponent {
        constructor(props){
          super(props);
          this.state = {
            showProfession: false,
            showEthnicity: false,
            showCancer: false,
            showOtherCancer: false,
            showMorbidities: false,
            metastases_types: [
              { text: 'Liver', checked: false },
              { text: 'Lung', checked: false },
              { text: 'Bone', checked: false },
              { text: 'Brain', checked: false },
              { text: 'Ovaries', checked: false },
              { text: 'Adrenal', checked: false },
              { text: 'Other', checked: false },
            ],      
            first_treatment_given: [
              { text: 'Surgery', checked: false },
              { text: 'Chemotherapy', checked: false },
              { text: 'Targeted Therapy', checked: false },
              { text: 'Immunotherapy', checked: false },
              { text: 'Hormone therapy', checked: false },
              { text: 'Radiotherapy', checked: false },
              { text: 'Trial', checked: false },
              { text: 'Alternative Therapy', checked: false },
              { text: 'Declined All Therapies', checked: false },
            ],
            areaofrecurrence: [
              { text: 'Local', checked: false },
              { text: 'Regional', checked: false },
              { text: 'Contra lateral breast', checked: false },
              { text: 'Distant Metastases', checked: false },        
            ], 
            loading: false,
            height: 0,
            weight: 0,
            bmi: 0,
            startDate: new Date(),
            startDateDOD: new Date(),            
            patient_name: "", city: "", country: "", hospital_id: "", patient_initial: "", date_of_birth: "", age_of_diagnosis: "", date_of_diagnosis: "", praffin: "", profession: "", other_profession: "", ethnicity: "", other_ethnicity: "", family_ho_cancer: "", family_has_cancer: "", other_family_has_cancer: "", type_of_cancer: "", age_at_diagnosis_of_relative: "", presenting_symptom: "", monthly_family_income: "", amount: "", co_morbidities: "", other_co_morbodities: ""
          };
          this.showProComponent = this.showProComponent.bind(this);
          this.showEthComponent = this.showEthComponent.bind(this);
          this.showCancerComponent = this.showCancerComponent.bind(this);
          this.hideCancerComponent = this.hideCancerComponent.bind(this);
          this.showOtherCancerComponent = this.showOtherCancerComponent.bind(this);
          this.hideOtherCancerComponent = this.hideOtherCancerComponent.bind(this);
          this.showMorbiditiesComponent = this.showMorbiditiesComponent.bind(this);
          this.hideMorbiditiesComponent = this.hideMorbiditiesComponent.bind(this);
          this.changeHeight = this.changeHeight.bind(this);
          this.changeWeight = this.changeWeight.bind(this);
          this.calculateBMI = this.calculateBMI.bind(this);
          //this.onSubmit = this.onSubmit.bind(this)
          this.handleChange = this.handleChange.bind(this);
          this.sendPatientDetails = this.sendPatientDetails.bind(this);
          this.handleChangeDOD = this.handleChangeDOD.bind(this);          
          
        }

        handleValidSubmit = (event, values) => {
          const { history } = this.props;
          this.setState({ loading: true });
          const code= Math.random().toString(24).substring(4)
          const getUser = () => {
              const userStr = localStorage.getItem("users");
              if(userStr) return JSON.parse(userStr);
              else return null
          }
          const user = getUser();   
          const name_of_institution = user.institution        
          const userid = user.userid       
          const hospital_id = user.hospitalid   
          
          axios.post(`http://localhost:4000/patientdetails`, { patient_name: this.state.patient_name, city: this.state.city, country: this.state.country, patient_initial: this.state.patient_initial, date_of_birth: this.state.date_of_birth, age_of_diagnosis: this.state.age_of_diagnosis, date_of_diagnosis: this.state.date_of_diagnosis, praffin: this.state.praffin, profession: this.state.profession, other_profession: this.state.other_profession, ethnicity: this.state.ethnicity, other_ethnicity: this.state.other_ethnicity, height: this.state.height, weight: this.state.weight, bmi: this.state.bmivalue, family_ho_cancer: this.state.family_ho_cancer, family_has_cancer: this.state.family_has_cancer, other_family_has_cancer: this.state.other_family_has_cancer, type_of_cancer: this.state.type_of_cancer, age_at_diagnosis_of_relative: this.state.age_at_diagnosis_of_relative, presenting_symptom: this.state.presenting_symptom, monthly_family_income: this.state.monthly_family_income, amount: this.state.amount, co_morbidities: this.state.co_morbidities, other_co_morbodities: this.state.other_co_morbodities, code: code, status: 1, date_created: Math.floor(Date.now()/1000), name_of_institution: name_of_institution, submited_by: userid, hospital_id: hospital_id, metastases_types: this.state.metastases_types, first_treatment_given: this.state.first_treatment_given, areaofrecurrence: this.state.areaofrecurrence })
          .then(function (response) {
          //console.log(JSON.stringify(response.data));
          if(response.data.success === 'Demographics Submitted Sucessfully!'){            
            //let history = useHistory();
            //const { history } = this.props;
            //this.context.history.push(`/initial-presentation/${code}`);
            history.push(`/initial-presentation/${code}`)
          }else{
            
          }
        })      
        };
      
        /*handleInvalidSubmit = (event, errors, values) => {
          this.setState({ email: values.email, error: true });
          console.log(`Login failed`);
        };*/

        getUser = () => {
            const userStr = localStorage.getItem("users");
            if(userStr) return JSON.parse(userStr);
            else return null
        }  

        componentDidMount(){
          const getHos = () => {
              const userStr = localStorage.getItem("users");
              if(userStr) return JSON.parse(userStr);
              else return null
          }
          const hos = getHos(); 
          console.log(hos);
          const h_id = hos.hospitalid 
          this.setState({
            hosid: h_id
          })           
          //console.log(this.state.hosid)     
        }

        /*onSubmit = async e => {
          //e.preventDefault();
          await axios.post(`http://localhost:4000/patientdetails`, { patient_name: this.state.patient_name, city: this.state.city, country: this.state.country, hospital_id: this.state.hospital_id, patient_initial: this.state.patient_initial, date_of_birth: this.state.date_of_birth, age_of_diagnosis: this.state.age_of_diagnosis, date_of_diagnosis: this.state.date_of_diagnosis, praffin: this.state.praffin, profession: this.state.profession, other_profession: this.state.other_profession, ethnicity: this.state.ethnicity, other_ethnicity: this.state.other_ethnicity, height: this.state.height, weight: this.state.weight, bmi: this.state.bmivalue, family_ho_cancer: this.state.family_ho_cancer, family_has_cancer: this.state.family_has_cancer, other_family_has_cancer: this.state.other_family_has_cancer, type_of_cancer: this.state.type_of_cancer, age_at_diagnosis_of_relative: this.state.age_at_diagnosis_of_relative, presenting_symptom: this.state.presenting_symptom, monthly_family_income: this.state.monthly_family_income, amount: this.state.amount, co_morbidities: this.state.co_morbidities, other_co_morbodities: this.state.other_co_morbodities})
          .then(() => {
            let history = useHistory();
            history.push("/inital");
          });
        }; */

        sendPatientDetails = e => {   
          const { history } = this.props;
          const code= Math.random().toString(24).substring(4)
          const getUser = () => {
              const userStr = localStorage.getItem("users");
              if(userStr) return JSON.parse(userStr);
              else return null
          }
          const user = getUser();   
          const name_of_institution = user.institution        
          const userid = user.userid       
          const hospital_id = user.hospitalid   
          
          axios.post(`http://localhost:4000/patientdetails`, { patient_name: this.state.patient_name, city: this.state.city, country: this.state.country, patient_initial: this.state.patient_initial, date_of_birth: this.state.date_of_birth, age_of_diagnosis: this.state.age_of_diagnosis, date_of_diagnosis: this.state.date_of_diagnosis, praffin: this.state.praffin, profession: this.state.profession, other_profession: this.state.other_profession, ethnicity: this.state.ethnicity, other_ethnicity: this.state.other_ethnicity, height: this.state.height, weight: this.state.weight, bmi: this.state.bmivalue, family_ho_cancer: this.state.family_ho_cancer, family_has_cancer: this.state.family_has_cancer, other_family_has_cancer: this.state.other_family_has_cancer, type_of_cancer: this.state.type_of_cancer, age_at_diagnosis_of_relative: this.state.age_at_diagnosis_of_relative, presenting_symptom: this.state.presenting_symptom, monthly_family_income: this.state.monthly_family_income, amount: this.state.amount, co_morbidities: this.state.co_morbidities, other_co_morbodities: this.state.other_co_morbodities, code: code, status: 1, date_created: Math.floor(Date.now()/1000), name_of_institution: name_of_institution, submited_by: userid, hospital_id: hospital_id, metastases_types: this.state.metastases_types, first_treatment_given: this.state.first_treatment_given, areaofrecurrence: this.state.areaofrecurrence })
          .then(function (response) {
          //console.log(JSON.stringify(response.data));
          if(response.data.success === 'Demographics Submitted Sucessfully!'){            
            //let history = useHistory();
            //const { history } = this.props;
            //this.context.history.push(`/initial-presentation/${code}`);
            history.push(`/initial-presentation/${code}`)
          }else{
            
          }
        })        
        };

        /*redirectToInitial(){
          const { history } = this.props;
          if(history) history.push(`/initial-presentation/${code}`);
         }*/

        handleChange(date) {
          this.setState({
            startDate: date,
            date_of_birth: moment(date).format('DD-MM-YYYY')
          })
        }

        handleChangeDOD(date) {
          this.setState({
            startDateDOD: date,
            date_of_diagnosis: moment(date).format('DD-MM-YYYY')
          })
        }

        /*setStartDate(e){
          this.setState({ startDate: e.target.value})
        }*/

        showProComponent(name) {
          switch (name) {
            case "showProfession":
              this.setState({ showProfession: true, required: false });              
              break;
default:            
          }
        }        
        hideProComponent(name) {
          switch (name) {
            case "hideProfession":
              this.setState({ showProfession: false, required: true });
              break;
default:            
          }
        } 
        
        showEthComponent(name) {
          switch (name) {
            case "showEthnicity":
              this.setState({ showEthnicity: true, required: false });
              break;
default:            
          }
        }
        hideEthComponent(name) {
          switch (name) {
            case "hideEthnicity":
              this.setState({ showEthnicity: false, required: true });              
              break;
default:            
          }
        }
        
        showCancerComponent(name) {
          switch (name) {
            case "showCancer":
              this.setState({ showCancer: true, showOtherCancer: false });
              break;
default:            
          }
        }
        hideCancerComponent(name) {
          switch (name) {
            case "hideCancer":
              this.setState({ showCancer: false, showOtherCancer: false });              
              break;
default:            
          }
        }

        showOtherCancerComponent(name) {
          switch (name) {
            case "showOtherCancer":
              this.setState({ showOtherCancer: true });
              break;
default:            
          }
        }
        hideOtherCancerComponent(name) {
          switch (name) {
            case "hideOtherCancer":
              this.setState({ showOtherCancer: false });              
              break;
default:            
          }
        }

        showMorbiditiesComponent(name) {
          switch (name) {            
            case "showMorbidities":
              this.setState({ showMorbidities: true });
              break;
default:            
          }
        }
        hideMorbiditiesComponent(name) {
          switch (name) {
            case "hideMorbidities":
              this.setState({ showMorbidities: false });              
              break;
default:            
          }
        }

        changeHeight(e) {
          document.getElementById('bmi').value= '';
          var newHeight = +(e.target.value)
          this.setState({
              height: newHeight,
              bmivalue: parseFloat((this.state.weight / Math.pow(newHeight, 2))*10000).toFixed(2),
          });          
        }
        
        changeWeight(e) {
          document.getElementById('bmi').value= '';
          var newWeight = +(e.target.value)
          this.setState({ bmivalue: '' })
          this.setState({
              weight: newWeight,
              bmivalue: parseFloat((newWeight / Math.pow(this.state.height, 2))*10000).toFixed(2)
          });          
        }

        calculateBMI(e){
          var newWeight = +(this.state.weight)
          var newHeight = +(this.state.height)
          this.setState({            
            bmivalue: parseFloat((newWeight / Math.pow(newHeight, 2))*10000).toFixed(2),
            value: this.state.bmivalue
          });          
          //console.log(this.state.bmivalue);
        }

        render(){          
          const { showProfession, showEthnicity, showCancer, showOtherCancer, showMorbidities, /*patient_name, city, country, hospital_id, patient_initial, date_of_birth, age_of_diagnosis, date_of_diagnosis, praffin, profession, other_profession, ethnicity, other_ethnicity, height, weight, bmi, family_ho_cancer, family_has_cancer, type_of_cancer, age_at_diagnosis_of_relative, presenting_symptom, monthly_family_income, amount, co_morbidities, other_co_morbodities,*/ loading } = this.state; 
          const user = this.getUser();    
          if(user === "null" || user === null || user === '' || user === undefined){
            return <Redirect from="*" to='/login'></Redirect>            
          }
      return (
        <div>
              <DemoSideBar   />
              <div className="content-wrapper animate__animated animate__fadeIn">
              <div className="app-content content overflow-hidden">
              
                <Fragment>
                
                <Row>
                <Col sm='12'>
                <Card>
                  <CardHeader>
                    <h1 className="animate__animated animate__fadeIn">Patient's Demography</h1>
                  </CardHeader>
                  <CardBody>
                    <AvForm onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}>
                    <div className="row">
                    <div className="col-md-3">
                      <AvGroup>            
                        <Label for='name'>Name of Patient</Label>
                        <AvInput name='name' value={this.state.patient_name} onChange={(e) => this.setState({ patient_name: e.target.value})} id='name' required />
                        <AvFeedback>Please enter a Patient's name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='city'>City</Label>
                        <AvInput name='city' id='city' required value={this.state.city} onChange={(e) => this.setState({ city: e.target.value})} />
                        <AvFeedback>Please enter a valid city name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='country'>Country</Label>
                        <AvInput name='country' id='country' required value={this.state.country} onChange={(e) => this.setState({ country: e.target.value})} />
                        <AvFeedback>Please enter a Country!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='hospitalid'>Hospital ID</Label>
                        <AvField name='hospitalid' id='hospitalid' disabled required value={this.state.hosid} onChange={(e) => this.setState({ hospital_id: e.target.value})}  />
                        <AvFeedback>Please enter the Hospital ID!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='patientinitial'>Patient's Initial</Label>
                        <AvField name='patientinitial' id='patientinitial' required value={this.state.patient_initial} onChange={(e) => this.setState({ patient_initial: e.target.value})}  />
                        <AvFeedback>Please enter the Patient's Initial!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>
                        <Label for='dateofbirth'>Date of Birth</Label><br />
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="dobs" id="dobs" selected={this.state.startDate} onSelect={this.handleSelect} onChange={this.handleChange} />
                        <AvInput value={this.state.date_of_birth} name="dateofbirth" id="dateofbirth" className="custom-date-input" onChange={(e) => this.setState({ date_of_birth: e.target.value})} />
                        <AvFeedback>Please enter your DOB!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>
                        <Label for='ageofdiagnosis'>Age of Diagnosis</Label>
                        <AvInput name='ageofdiagnosis' id='ageofdiagnosis' required value={this.state.age_of_diagnosis} onChange={(e) => this.setState({ age_of_diagnosis: e.target.value})}  />
                        <AvFeedback>Please enter Age of Diagnosis!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>
                        <Label for='dateofdiagnosis'>Date of diagnosis of breast cancer</Label><br />
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="dtofdiag" id="dtofdiag" selected={this.state.startDateDOD} onSelect={this.handleSelect} onChange={this.handleChangeDOD} />
                        <AvInput value={this.state.date_of_diagnosis} name="dateofdiagnosis" id="dateofdiagnosis" className="custom-date-input" onChange={(e) => this.setState({ date_of_diagnosis: e.target.value})} />
                        <AvFeedback>Please enter your Date of diagnosis of breast cancer!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <Label for='paraffin'>Paraffin blocks available</Label>
                      <AvRadioGroup name='paraffin' required value={this.state.praffin} onChange={(e) => this.setState({ praffin: e.target.value})} >
                        <div className="row">
                          <div className="col-md-2"><AvRadio customInput label='Yes' value='Yes' /></div>
                          <div className="col-md-2"><AvRadio customInput label='No' value='No' /></div>
                          <div className="col-md-8"><AvRadio customInput label='Not Available' value='Not Available' /></div>
                        </div>
                      </AvRadioGroup>
                      </div>   
                      <div className="col-md-6">
                      <Label for='profession'>Profession</Label>
                      <AvRadioGroup name='profession' required value={this.state.profession} onChange={(e) => this.setState({ profession: e.target.value})} >
                        <div className="row">
                          <div className="col-md-2"><AvRadio customInput label='Doctor' value='Doctor' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Nurse' value='Nurse' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Teacher' value='Teacher' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-3"><AvRadio customInput label='Home Maker' value='Home Maker' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showProComponent("showProfession") } /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>    
                      {showProfession && (
                            <div className="col-md-3">
                            <AvGroup>
                              <Label for='otherprofession'>If Other Please mention Profession</Label>
                              <AvField name='otherprofession' id='otherprofession' value={this.state.other_profession} onChange={(e) => this.setState({ other_profession: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please mention Profession!</AvFeedback>
                            </AvGroup>
                            </div>
                          )}
                      <div className="col-md-12">
                      <Label for='ethnicity'>Ethnicity</Label>
                      <AvRadioGroup name='ethnicity' required value={this.state.ethnicity} onChange={(e) => this.setState({ ethnicity: e.target.value})} >
                        <div className="row">
                          <div className="col-md-2"><AvRadio customInput label='British Indian' value='British Indian' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='British Bangladesh' value='British Bangladesh' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='British Pakistan' value='British Pakistan' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='British-Middle-East' value='British-Middle-East' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-1"><AvRadio customInput label='Indian' value='Indian' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Afro-Caribbean' value='Afro-Caribbean' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Caucasian' value='Caucasian' onClick={ () => this.hideEthComponent("hideEthnicity") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showEthComponent("showEthnicity") } /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>    
                      {showEthnicity && (
                            <div className="col-md-12">
                            <AvGroup>
                              <Label for='otherethnicity'>If Other Please mention Ethnicity</Label>
                              <AvField name='otherethnicity' id='otherethnicity' value={this.state.other_ethnicity} onChange={(e) => this.setState({ other_ethnicity: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please mention Ethnicity!</AvFeedback>
                            </AvGroup>
                            </div>
                          )}
                      
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='height'>Height</Label>
                        <AvInput type="number" name='height' id='height' required value={this.state.height} onChange={(e) => this.setState({ height: e.target.value})}  onBlur={this.changeHeight} />
                        <AvFeedback>Please enter a Height in CMS!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='weight'>weight</Label>
                        <AvInput type="number" name='weight' id='weight' required value={this.state.weight} onChange={(e) => this.setState({ weight: e.target.value})}  onBlur={this.changeWeight} />
                        <AvFeedback>Please enter weight in kg!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='bmi'>BMI</Label>
                        <AvInput name='bmi' id='bmi' value={this.state.bmivalue} required onChange={(e) => this.setState({ bmivalue: e.target.value})}  onBlur={this.calculateBMI} />                        
                      </AvGroup>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-2">
                      <Label for='hocancer'>Family h/o cancer</Label>
                      <AvRadioGroup name='hocancer' required value={this.state.family_ho_cancer} onChange={(e) => this.setState({ family_ho_cancer: e.target.value})} >
                        <div className="row">
                          <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' onClick={ () => this.showCancerComponent("showCancer") } /></div>
                          <div className="col-md-6"><AvRadio customInput label='No' value='No' onClick={ () => this.hideCancerComponent("hideCancer") } /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>
                      {showCancer && (
                        <div className="col-md-7">
                        <Label for='hascancer'>Which relative</Label>
                        <AvRadioGroup name='hascancer' value={this.state.family_has_cancer} onChange={(e) => this.setState({ family_has_cancer: e.target.value})} >
                          <div className="row">
                            <div className="col-md-2"><AvRadio customInput label='Mother' value='Mother' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Father' value='Father' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Sister' value='Sister' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Brother' value='Brother' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showOtherCancerComponent("showOtherCancer") } /></div>                          
                          </div>
                        </AvRadioGroup>
                        </div>  
                      )}
                      {showOtherCancer && (
                            <div className="col-md-3">
                            <AvGroup>
                              <Label for='otherfamily'>If Other Please Mention Relation</Label>
                              <AvField name='otherfamily' id='otherfamily' value={this.state.other_family_has_cancer} onChange={(e) => this.setState({ other_family_has_cancer: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please Mention Relation!</AvFeedback>
                            </AvGroup>
                            </div>
                          )}
                      <div className="col-md-12"></div>
                      <div className="col-md-2">
                      <AvGroup>            
                        <Label for='typeofcancer'>Type of Cancer</Label>
                        <AvField name='typeofcancer' id='typeofcancer' required value={this.state.type_of_cancer} onChange={(e) => this.setState({ type_of_cancer: e.target.value})}  />
                        <AvFeedback>Please enter the Type of Cancer!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='diagnosisofrelativeage'>Age at diagnosis of relative</Label>
                        <AvField name='diagnosisofrelativeage' id='diagnosisofrelativeage' required value={this.state.age_at_diagnosis_of_relative} onChange={(e) => this.setState({ age_at_diagnosis_of_relative: e.target.value})}  />
                        <AvFeedback>Please enter the Age at diagnosis of relative!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <Label for='presentsymptoms'>Presenting Symptom</Label>
                      <AvRadioGroup name='presentsymptoms' required value={this.state.presenting_symptom} onChange={(e) => this.setState({ presenting_symptom: e.target.value})} >
                        <div className="row">
                          <div className="col-md-6"><AvRadio name='presentsymptoms' customInput label='Screen Detected' value='Screen Detected'  /></div>
                          <div className="col-md-6"><AvRadio name='presentsymptoms' customInput label='Symptom Detected' value='Symptom Detected'    /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>
                      <div className="col-md-2">
                      <AvGroup>            
                        <Label for='monthlyfamilyincome'>Monthly Family Income</Label>
                        <AvInput type='select' name='monthlyfamilyincome' id='monthlyfamilyincome'required value={this.state.monthly_family_income} onChange={(e) => this.setState({ monthly_family_income: e.target.value})}>
                            <option value="" selected>Select</option>
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>                            
                          </AvInput>
                        <AvFeedback>Please enter the Monthly Family Income!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-1">
                        <AvGroup>
                          <Label for='monthlyfamilyincomeamount'>Amount</Label>
                          <AvField name='monthlyfamilyincomeamount' id='monthlyfamilyincomeamount' required value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value})}  />
                          <AvFeedback>Please enter the Amount!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-9">
                        <Label for='comorbidities'>Co-morbidities</Label>
                        <AvRadioGroup name='comorbidities' required value={this.state.co_morbidities} onChange={(e) => this.setState({ co_morbidities: e.target.value})} >
                          <div className="row">
                            <div className="col-md-2"><AvRadio customInput label='Hypertension' value='Hypertension' onClick={ () => this.hideOtherCancerComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='DM' value='DM' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='IHD and CVA' value='IHD and CVA' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Viral Illness – HIV' value='Viral Illness – HIV' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Hepatitis B' value='Hepatitis B' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Hepatitis C' value='Hepatitis C' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='TB' value='TB' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showMorbiditiesComponent("showMorbidities") } /></div>                          
                          </div>
                        </AvRadioGroup>
                        </div>
                        {showMorbidities && (
                            <div className="col-md-3">
                            <AvGroup>
                              <Label for='othermorbidities'>If Other Please mention Morbidities</Label>
                              <AvField name='othermorbidities' id='othermorbidities' value={this.state.other_co_morbodities} onChange={(e) => this.setState({ other_co_morbodities: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please mention Morbidities!</AvFeedback>
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

    export default withRouter(Demography);