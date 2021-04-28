import React, { useState, Fragment, Component, useEffect, PureComponent } from 'react';

import SideBar from '../Components/sidebar/SideBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames'
import {withRouter} from 'react-router-dom'
import moment from 'moment'

import './mainstyle.css';
import './animate.css';
import './vertical-menu.css';
import './perfect-scrollbar.css';

import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col } from 'reactstrap'
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

class Treatment extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {         
      code: code,     
      showFertilityOption: false,  
      showFertilityDiscussed: false,
      showNeoAdjuvantTherapy: false,            
      showNeoAdjuvantTherapyIfYes: false,   
      showIfProgression: false,       
      showNodalSurgery: false, 
      showReconstruction: false, 
      showReconstructionType: false,
      showAdjuvantChemotherapy: false,
      showAdjuvantChemotherapyIfYes: false,
      showAdjuvantBoneModify: false,
      showFertilityOptionUndertakenBone: false,
      showFertilityOptionUndertakenBoneOther: false,
      showHER2TargetedTherapy: false,
      showHER2TargetedTherapyDuration: false,
      showDualAntiHER2: false,
      showAdjuvantRadioTherapy: false,
      showAdjuvantRadioTherapyIfYes: false,
      showAdjuvantEndocrineTherapy: false,
      showRecommendedDurationAdjuvantEndocrineTherapy: false,
      showIfPresentedWithMetastases: false,
      showNGSDoneAtDiagnosis: false,
      showNGSDoneAtRecurrence: false,

      fertilitydiscussedifother: "",
      fertilityoptionundertaken: "",      
      fertilitydiscussed: "",
      neoadjuvanttherapy: "",
      neoadjuvanttherapyifyes: "",
      neoadjuvantthereayifyesother: "",
      ovariansuppression: "",
      ovariansuppressionifyes: "",
      responsetoneoadjuvantchemotherapy: "",
      ifprogression: "",
      ifprogressionandother: "",
      primarysurgery: "",
      nodalsurgery: "", 
      ifnodalsurgeryandother: "",
      reconstructiondone: "",
      timingofreconstruction: "",
      typeofreconstructionother: "",
      adjuvantchemotherapy: "",
      adjuvantchemotherapyifyes: "",
      adjuvantchemotherapyother: "",
      adjuvantbonemodify: "",
      fertilityoptionundertakenbone: "",
      fertilityoptionundertakenboneother: "",
      fertilityoptionundertakenboneotherifother: "",
      her2targetedtherapy: "",
      her2targetedtherapyduration: "",
      her2targetedtherapydurationifother: "",
      dualantiher2: "",
      dualantiher2ifyes: "",
      adjuvantradiotherapy: "",
      adjuvantradiotherapyifyes: "",
      adjuvantradiotherapyifyesother: "",
      adjuvantendocrinetherapy: "",
      adjuvantendocrinetherapyifyes: "",
      recommendeddurationadjuvantendocrinetherapy: "",
      recommendeddurationadjuvantendocrinetherapyifother: "",
      reasonforstoppingaet: "",
      ifpresentedwithmetastases: "",
      ifpresentedwithmetastasesifother: "",
      ngsdoneatdiagnosis: "",
      ngsdoneatdiagnosisifyes: "",
      ngsdoneatdiagnosisifyesidentifiedtargets: "",
      ngsdoneatrecurrence: "",
      ngsdoneatrecurrenceifyes: "",
      ngsdoneatrecurrenceifyesidentifiedtargets: "",
    };
    this.showFertilityOption = this.showFertilityOption.bind(this);
    this.showFertilityDiscussed = this.showFertilityDiscussed.bind(this);
    this.showNeoAdjuvantTherapy = this.showNeoAdjuvantTherapy.bind(this);
    this.showNeoAdjuvantTherapyIfYes = this.showNeoAdjuvantTherapyIfYes.bind(this);
    this.showOvarianSuppression = this.showOvarianSuppression.bind(this);
    this.showIfProgression = this.showIfProgression.bind(this);
    this.showNodalSurgery = this.showNodalSurgery.bind(this);
    this.showReconstruction = this.showReconstruction.bind(this);
    this.showReconstructionType = this.showReconstructionType.bind(this);
    this.showAdjuvantChemotherapy = this.showAdjuvantChemotherapy.bind(this);
    this.showNeoAdjuvantTherapyIfYes = this.showNeoAdjuvantTherapyIfYes.bind(this);
    this.showAdjuvantBoneModify = this.showAdjuvantBoneModify.bind(this);
    this.showFertilityOptionUndertakenBone = this.showFertilityOptionUndertakenBone.bind(this);
    this.showFertilityOptionUndertakenBoneOther = this.showFertilityOptionUndertakenBoneOther.bind(this);
    this.showHER2TargetedTherapy = this.showHER2TargetedTherapy.bind(this);
    this.showHER2TargetedTherapyDuration = this.showHER2TargetedTherapyDuration.bind(this);
    this.showDualAntiHER2 = this.showDualAntiHER2.bind(this);
    this.showAdjuvantRadioTherapy = this.showAdjuvantRadioTherapy.bind(this);
    this.showAdjuvantRadioTherapyIfYes = this.showAdjuvantRadioTherapyIfYes.bind(this);
    this.showAdjuvantEndocrineTherapy = this.showAdjuvantEndocrineTherapy.bind(this);
    this.showRecommendedDurationAdjuvantEndocrineTherapy = this.showRecommendedDurationAdjuvantEndocrineTherapy.bind(this);
    this.showIfPresentedWithMetastases = this.showIfPresentedWithMetastases.bind(this);
    this.showNGSDoneAtDiagnosis = this.showNGSDoneAtDiagnosis.bind(this);
    this.showNGSDoneAtRecurrence = this.showNGSDoneAtRecurrence.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);      */  
    //console.log(code)
  }

  sendTreatmentDetails = e => {   
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
   axios.put(`http://localhost:4000/patienttreatmentdetails`, { fertilitydiscussed: this.state.fertilitydiscussed, fertilityoptionundertaken: this.state.fertilityoptionundertaken, fertilitydiscussedifother: this.state.fertilitydiscussedifother, neoadjuvanttherapy: this.state.neoadjuvanttherapy, neoadjuvanttherapyifyes: this.state.neoadjuvanttherapyifyes, neoadjuvantthereayifyesother: this.state.neoadjuvantthereayifyesother, ovariansuppression: this.state.ovariansuppression, ovariansuppressionifyes: this.state.ovariansuppressionifyes, responsetoneoadjuvantchemotherapy: this.state.responsetoneoadjuvantchemotherapy, ifprogression: this.state.ifprogression, ifprogressionandother: this.state.ifprogressionandother, primarysurgery: this.state.primarysurgery, nodalsurgery: this.state.nodalsurgery, ifnodalsurgeryandother: this.state.ifnodalsurgeryandother, reconstructiondone: this.state.reconstructiondone, timingofreconstruction: this.state.timingofreconstruction, typeofreconstruction: this.state.typeofreconstruction, typeofreconstructionother: this.state.typeofreconstructionother, adjuvantchemotherapy: this.state.adjuvantchemotherapy, adjuvantchemotherapyifyes: this.state.adjuvantchemotherapyifyes, adjuvantchemotherapyother: this.state.adjuvantchemotherapyother, adjuvantbonemodify: this.state.adjuvantbonemodify, fertilityoptionundertakenbone: this.state.fertilityoptionundertakenbone, fertilityoptionundertakenboneother: this.state.fertilityoptionundertakenboneother, fertilityoptionundertakenboneotherifother: this.state.fertilityoptionundertakenboneotherifother, her2targetedtherapy: this.state.her2targetedtherapy, her2targetedtherapyduration: this.state.her2targetedtherapyduration, her2targetedtherapydurationifother: this.state.her2targetedtherapydurationifother, dualantiher2: this.state.dualantiher2, dualantiher2ifyes: this.state.dualantiher2ifyes, adjuvantradiotherapy: this.state.adjuvantradiotherapy, adjuvantradiotherapyifyes: this.state.adjuvantradiotherapyifyes, adjuvantradiotherapyifyesother: this.state.adjuvantradiotherapyifyesother, adjuvantendocrinetherapy: this.state.adjuvantendocrinetherapy, adjuvantendocrinetherapyifyes: this.state.adjuvantendocrinetherapyifyes, recommendeddurationadjuvantendocrinetherapy: this.state.recommendeddurationadjuvantendocrinetherapy, recommendeddurationadjuvantendocrinetherapyifother: this.state.recommendeddurationadjuvantendocrinetherapyifother, reasonforstoppingaet: this.state.reasonforstoppingaet, ifpresentedwithmetastases: this.state.ifpresentedwithmetastases, ifpresentedwithmetastasesifother: this.state.ifpresentedwithmetastasesifother, ngsdoneatdiagnosis: this.state.ngsdoneatdiagnosis, ngsdoneatdiagnosisifyes: this.state.ngsdoneatdiagnosisifyes, ngsdoneatdiagnosisifyesidentifiedtargets: this.state.ngsdoneatdiagnosisifyesidentifiedtargets, ngsdoneatrecurrence: this.state.ngsdoneatrecurrence, ngsdoneatrecurrenceifyes: this.state.ngsdoneatrecurrenceifyes, ngsdoneatrecurrenceifyesidentifiedtargets: this.state.ngsdoneatrecurrenceifyesidentifiedtargets, code: this.state.code })
    .then(function (response) {
    if(response.data.success === 'Pathology Sucessfully Submitted!'){            
      history.push(`/treatment/${response.data.value}`)
    }else{
      
    }
  })
  };
  
  showFertilityOption(name) {
    if(document.getElementById("fertilitydiscussed").value == "Yes"){
      this.setState({ showFertilityOption: true });   
      this.state.fertilitydiscussed = name 
    }else{
        this.setState({ showFertilityOption: false, showFertilityDiscussed: false, fertilitydiscussedifother: "" }); 
        this.state.fertilitydiscussed = name        
    }
  }

  showFertilityDiscussed(name) {
    if(document.getElementById("fertilityoptionundertaken").value == "Other"){
      this.setState({ showFertilityDiscussed: true });   
      this.state.fertilityoptionundertaken = name 
    }else{
        this.setState({ showFertilityDiscussed: false, fertilitydiscussedifother: "" }); 
        this.state.fertilityoptionundertaken = name        
    }
  }

  showNeoAdjuvantTherapy(name) {
    if(document.getElementById("neoadjuvanttherapy").value == "Yes"){
      this.setState({ showNeoAdjuvantTherapy: true });   
      this.state.neoadjuvanttherapy = name 
    }else{
        this.setState({ showNeoAdjuvantTherapy: false, showNeoAdjuvantTherapyIfYes:false, neoadjuvantthereayifyesother: "" }); 
        this.state.neoadjuvanttherapy = name        
    }
  }

  showNeoAdjuvantTherapyIfYes(name) {
    if(document.getElementById("neoadjuvanttherapyifyes").value == "Other"){
      this.setState({ showNeoAdjuvantTherapyIfYes: true });   
      this.state.neoadjuvanttherapyifyes = name 
    }else{
        this.setState({ showNeoAdjuvantTherapyIfYes: false, neoadjuvantthereayifyesother: "" }); 
        this.state.neoadjuvanttherapyifyes = name        
    }
  }

  showOvarianSuppression(name) {
    if(document.getElementById("ovariansuppression").value == "Yes"){
      this.setState({ showOvarianSuppression: true });   
      this.state.ovariansuppression = name 
    }else{
        this.setState({ showOvarianSuppression: false, ovariansuppressionifyes: "" }); 
        this.state.ovariansuppression = name        
    }
  }

  showIfProgression(name) {
    if(document.getElementById("ifprogression").value == "Other"){
      this.setState({ showIfProgression: true });   
      this.state.ifprogression = name 
    }else{
        this.setState({ showIfProgression: false, ifprogressionandother: "" }); 
        this.state.ifprogression = name        
    }
  }

  showNodalSurgery(name) {
    if(document.getElementById("nodalsurgery").value == "Other"){
      this.setState({ showNodalSurgery: true });   
      this.state.nodalsurgery = name 
    }else{
        this.setState({ showNodalSurgery: false, ifnodalsurgeryandother: "" }); 
        this.state.nodalsurgery = name        
    }
  }

  showReconstruction(name) {
    if(document.getElementById("reconstructiondone").value == "Yes"){
      this.setState({ showReconstruction: true });   
      this.state.reconstructiondone = name 
    }else{
        this.setState({ showReconstruction: false, showReconstructionType: false, timingofreconstruction: "", typeofreconstruction: "",typeofreconstructionother: "" }); 
        this.state.reconstructiondone = name        
    }
  }

  showReconstructionType(name) {
    if(document.getElementById("typeofreconstruction").value == "Other"){
      this.setState({ showReconstructionType: true });   
      this.state.typeofreconstruction = name 
    }else{
        this.setState({ showReconstructionType: false, typeofreconstructionother: "" }); 
        this.state.typeofreconstruction = name        
    }
  }

  showAdjuvantChemotherapy(name) {
    if(document.getElementById("adjuvantchemotherapy").value == "Yes"){
      this.setState({ showAdjuvantChemotherapy: true });   
      this.state.adjuvantchemotherapy = name 
    }else{
        this.setState({ showAdjuvantChemotherapy: false, showAdjuvantChemotherapyIfYes: false, adjuvantchemotherapyifyes: "", adjuvantchemotherapyother: "" }); 
        this.state.adjuvantchemotherapy = name        
    }
  }

  showAdjuvantChemotherapyIfYes(name){
    if(document.getElementById("adjuvantchemotherapyifyes").value == "Other"){
      this.setState({ showAdjuvantChemotherapyIfYes: true });   
      this.state.adjuvantchemotherapyifyes = name 
    }else{
        this.setState({ showAdjuvantChemotherapyIfYes: false, adjuvantchemotherapyother: "" }); 
        this.state.adjuvantchemotherapyifyes = name        
    }
  }

  showAdjuvantBoneModify(name){
    if(document.getElementById("adjuvantbonemodify").value == "Yes"){
      this.setState({ showAdjuvantBoneModify: true });   
      this.state.adjuvantbonemodify = name 
    }else{
        this.setState({ showAdjuvantBoneModify: false, showFertilityOptionUndertakenBoneOther: false, fertilityoptionundertakenbone: "", fertilityoptionundertakenboneother: "", fertilityoptionundertakenboneotherifother: "" }); 
        this.state.adjuvantbonemodify = name        
    }
  }

  showFertilityOptionUndertakenBone(name){
    if(document.getElementById("adjuvantbonemodify").value == "Yes"){
      this.setState({ showAdjuvantBoneModify: true });   
      this.state.adjuvantbonemodify = name 
    }else{
        this.setState({ showAdjuvantBoneModify: false, fertilityoptionundertakenboneotherifother: "" }); 
        this.state.adjuvantbonemodify = name        
    }
  }

  showFertilityOptionUndertakenBoneOther(name){
    if(document.getElementById("fertilityoptionundertakenboneother").value == "Other"){
      this.setState({ showFertilityOptionUndertakenBoneOther: true });   
      this.state.fertilityoptionundertakenboneother = name 
    }else{
        this.setState({ showFertilityOptionUndertakenBoneOther: false, fertilityoptionundertakenboneotherifother: "" }); 
        this.state.fertilityoptionundertakenboneother = name        
    }
  }

  showHER2TargetedTherapy(name){
    if(document.getElementById("her2targetedtherapy").value == "Yes"){
      this.setState({ showHER2TargetedTherapy: true });   
      this.state.her2targetedtherapy = name 
    }else{
        this.setState({ showHER2TargetedTherapy: false, showHER2TargetedTherapyDuration: false, her2targetedtherapyduration: "", her2targetedtherapydurationifother: "" }); 
        this.state.her2targetedtherapy = name        
    }
  }

  showHER2TargetedTherapyDuration(name){
    if(document.getElementById("her2targetedtherapyduration").value == "Other"){
      this.setState({ showHER2TargetedTherapyDuration: true });   
      this.state.her2targetedtherapyduration = name 
    }else{
        this.setState({ showHER2TargetedTherapyDuration: false, her2targetedtherapydurationifother: "" }); 
        this.state.her2targetedtherapyduration = name        
    }
  }

  showDualAntiHER2(name){
    if(document.getElementById("dualantiher2").value == "Yes"){
      this.setState({ showDualAntiHER2: true });   
      this.state.dualantiher2 = name 
    }else{
        this.setState({ showDualAntiHER2: false, dualantiher2ifyes: "" }); 
        this.state.dualantiher2 = name        
    }
  }

  showAdjuvantRadioTherapy(name){
    if(document.getElementById("adjuvantradiotherapy").value == "Yes"){
      this.setState({ showAdjuvantRadioTherapy: true });   
      this.state.adjuvantradiotherapy = name 
    }else{
        this.setState({ showAdjuvantRadioTherapy: false, showAdjuvantRadioTherapyIfYes: false, adjuvantradiotherapyifyes: "", adjuvantradiotherapyifyesother: "" }); 
        this.state.adjuvantradiotherapy = name        
    }
  }

  showAdjuvantRadioTherapyIfYes(name){
    if(document.getElementById("adjuvantradiotherapyifyes").value == "Other"){
      this.setState({ showAdjuvantRadioTherapyIfYes: true });   
      this.state.adjuvantradiotherapyifyes = name 
    }else{
        this.setState({ showAdjuvantRadioTherapyIfYes: false, adjuvantradiotherapyifyesother: "" }); 
        this.state.adjuvantradiotherapyifyes = name        
    }
  }

  showAdjuvantEndocrineTherapy(name){
    if(document.getElementById("adjuvantendocrinetherapy").value == "Yes"){
      this.setState({ showAdjuvantEndocrineTherapy: true });   
      this.state.adjuvantendocrinetherapy = name 
    }else{
        this.setState({ showAdjuvantEndocrineTherapy: false, adjuvantendocrinetherapyifyes: "" }); 
        this.state.adjuvantendocrinetherapy = name        
    }
  }

  showRecommendedDurationAdjuvantEndocrineTherapy(name){
    if(document.getElementById("recommendeddurationadjuvantendocrinetherapy").value == "Other"){
      this.setState({ showRecommendedDurationAdjuvantEndocrineTherapy: true });   
      this.state.recommendeddurationadjuvantendocrinetherapy = name 
    }else{
        this.setState({ showRecommendedDurationAdjuvantEndocrineTherapy: false, recommendeddurationadjuvantendocrinetherapyifother: "" }); 
        this.state.recommendeddurationadjuvantendocrinetherapy = name        
    }
  }

  showIfPresentedWithMetastases(name){
    if(document.getElementById("ifpresentedwithmetastases").value == "Other"){
      this.setState({ showIfPresentedWithMetastases: true });   
      this.state.ifpresentedwithmetastases = name 
    }else{
        this.setState({ showIfPresentedWithMetastases: false, ifpresentedwithmetastasesifother: "" }); 
        this.state.ifpresentedwithmetastases = name        
    }
  }

  showNGSDoneAtDiagnosis(name){
    if(document.getElementById("ngsdoneatdiagnosis").value == "Yes"){
      this.setState({ showNGSDoneAtDiagnosis: true });   
      this.state.ngsdoneatdiagnosis = name 
    }else{
        this.setState({ showNGSDoneAtDiagnosis: false, ngsdoneatdiagnosisifyesidentifiedtargets: "", ngsdoneatdiagnosisifyes: "" }); 
        this.state.ngsdoneatdiagnosis = name        
    }
  }

  showNGSDoneAtRecurrence(name){
    if(document.getElementById("ngsdoneatrecurrence").value == "Yes"){
      this.setState({ showNGSDoneAtRecurrence: true });   
      this.state.ngsdoneatrecurrence = name 
    }else{
        this.setState({ showNGSDoneAtRecurrence: false, ngsdoneatrecurrenceifyesidentifiedtargets: "", ngsdoneatrecurrenceifyes: "" }); 
        this.state.ngsdoneatrecurrence = name        
    }
  }

  render(){          
    const { showFertilityOption, showFertilityDiscussed, showNeoAdjuvantTherapy, showNeoAdjuvantTherapyIfYes, showOvarianSuppression, showIfProgression, showNodalSurgery, showReconstruction, showReconstructionType, showAdjuvantChemotherapy, showAdjuvantChemotherapyIfYes, showAdjuvantBoneModify, showFertilityOptionUndertakenBone, showFertilityOptionUndertakenBoneOther, showHER2TargetedTherapy, showHER2TargetedTherapyDuration, showDualAntiHER2, showAdjuvantRadioTherapy, showAdjuvantRadioTherapyIfYes, showAdjuvantEndocrineTherapy, showRecommendedDurationAdjuvantEndocrineTherapy, showIfPresentedWithMetastases, showNGSDoneAtDiagnosis, showNGSDoneAtRecurrence, fertilitydiscussedifother, fertilityoptionundertaken, fertilitydiscussed, neoadjuvanttherapy, neoadjuvanttherapyifyes, neoadjuvantthereayifyesother, ovariansuppression, ovariansuppressionifyes, ifprogression, ifprogressionandother, primarysurgery, nodalsurgery, reconstructiondone, typeofreconstruction, typeofreconstructionother, adjuvantchemotherapy, adjuvantchemotherapyifyes, adjuvantchemotherapyother, adjuvantbonemodify, fertilityoptionundertakenbone, fertilityoptionundertakenboneotherifother, her2targetedtherapy, her2targetedtherapyduration, her2targetedtherapydurationifother, dualantiher2, dualantiher2ifyes, adjuvantradiotherapy, adjuvantradiotherapyifyes, adjuvantradiotherapyifyesother, adjuvantendocrinetherapy, adjuvantendocrinetherapyifyes, recommendeddurationadjuvantendocrinetherapy, recommendeddurationadjuvantendocrinetherapyifother, reasonforstoppingaet, ifpresentedwithmetastases, ifpresentedwithmetastasesifother, ngsdoneatdiagnosis, ngsdoneatdiagnosisifyes, ngsdoneatdiagnosisifyesidentifiedtargets, ngsdoneatrecurrence, ngsdoneatrecurrenceifyes, ngsdoneatrecurrenceifyesidentifiedtargets, code } = this.state; 
    const { history } = this.props;

    /*var metas = Object.keys(this.state.metastases_types).filter((x) => this.state.metastases_types[x]);
    var treat = Object.keys(this.state.first_treatment_given).filter((x) => this.state.first_treatment_given[x]);*/
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
              <h1 className="animate__animated animate__fadeIn">Treatment</h1>
            </CardHeader>
            <CardBody>
              <AvForm  onSubmit= {() => this.sendTreatmentDetails()}>
              <div className="row">
                
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='fertilitydiscussed'>Fertility discussed</Label>
                    <AvInput type='select' name='fertilitydiscussed' id='fertilitydiscussed' required value={this.state.fertilitydiscussed} onChange={(e) => this.showFertilityOption(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option> 
                        <option value="Not Required">Not Required</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Fertility discussed!</AvFeedback>
                  </AvGroup>
                </div>
                {showFertilityOption && (
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='fertilityoptionundertaken'>Fertility option undertaken</Label>
                        <AvInput type='select' name='fertilityoptionundertaken' id='fertilityoptionundertaken' required value={this.state.fertilityoptionundertaken} onChange={(e) => this.showFertilityDiscussed(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="Embryo cryopreservation">Embryo cryopreservation</option>
                            <option value="Egg Harvesting">Egg Harvesting</option> 
                            <option value="Ovarian Biopsy">Ovarian Biopsy</option>      
                            <option value="LHRH analog with chemotherapy">LHRH analog with chemotherapy</option>
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select Fertility option undertaken!</AvFeedback>
                    </AvGroup>
                  </div>
                )}  
                {showFertilityDiscussed && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='fertilitydiscussedifother'>If Other</Label>
                    <AvField placeholder="" name='fertilitydiscussedifother' id='fertilitydiscussedifother' value={this.state.fertilitydiscussedifother} onChange={(e) => this.setState({ fertilitydiscussedifother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='neoadjuvanttherapy'>Neo-adjuvant therapy</Label>
                    <AvInput type='select' name='neoadjuvanttherapy' id='neoadjuvanttherapy' required value={this.state.neoadjuvanttherapy} onChange={(e) => this.showNeoAdjuvantTherapy(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Neo-adjuvant therapy!</AvFeedback>
                  </AvGroup>
                </div>
                {showNeoAdjuvantTherapy && (
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='neoadjuvanttherapyifyes'>Neo-adjuvant therapy (If Yes)</Label>
                        <AvInput type='select' name='neoadjuvanttherapyifyes' id='neoadjuvanttherapyifyes' required value={this.state.neoadjuvanttherapyifyes} onChange={(e) => this.showNeoAdjuvantTherapyIfYes(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="Anthracycline Alone">Anthracycline Alone</option>
                            <option value="Anthracycline-Taxane">Anthracycline-Taxane</option> 
                            <option value="Anthracycline-Taxane Platinum">Anthracycline-Taxane Platinum</option>      
                            <option value="Trastuzumab">Trastuzumab</option>
                            <option value="Pertuzumab">Pertuzumab</option>     
                            <option value="Tamoxifen">Tamoxifen</option>     
                            <option value="Letrozole">Letrozole</option>                                 
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select Neo-adjuvant therapy (If Yes)!</AvFeedback>
                    </AvGroup>
                  </div>
                )}  
                {showNeoAdjuvantTherapyIfYes && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='neoadjuvantthereayifyesother'>If Other</Label>
                    <AvField placeholder="" name='neoadjuvantthereayifyesother' id='neoadjuvantthereayifyesother' value={this.state.neoadjuvantthereayifyesother} onChange={(e) => this.setState({ neoadjuvantthereayifyesother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='ovariansuppression'>Ovarian suppression</Label>
                    <AvInput type='select' name='ovariansuppression' id='ovariansuppression' required value={this.state.ovariansuppression} onChange={(e) => this.showOvarianSuppression(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option> 
                        <option value="Not Required">Not Required</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Fertility discussed!</AvFeedback>
                  </AvGroup>
                </div>
                {showOvarianSuppression && (
                  <div className="col-md-6">
                    <AvGroup>            
                        <Label for='ovariansuppressionifyes'>Ovarian Suppression (If Yes)</Label>
                        <AvInput type='select' name='ovariansuppressionifyes' id='ovariansuppressionifyes' required value={this.state.ovariansuppressionifyes} onChange={(e) => this.setState({ ovariansuppressionifyes: e.target.value})}>
                            <option value="" selected>Select</option>
                            <option value="To prevent premature ovarian failure">To prevent premature ovarian failure</option>
                            <option value="Fertility Preservation">Fertility Preservation</option>                                               
                        </AvInput>                      
                        <AvFeedback>Please select Ovarian Suppression (If Yes)!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='responsetoneoadjuvantchemotherapy'>Response to neoadjuvant chemotherapy</Label>
                    <AvInput type='select' name='responsetoneoadjuvantchemotherapy' id='responsetoneoadjuvantchemotherapy' required value={this.state.responsetoneoadjuvantchemotherapy} onChange={(e) => this.setState({ responsetoneoadjuvantchemotherapy: e.target.value })}>
                        <option value="" selected>Select</option>
                        <option value="CR">CR</option>
                        <option value="PR">PR</option>                         
                        <option value="SD">SD</option>                         
                        <option value="PD">PD</option>                         
                        <option value="Not Assessed">Not Assessed</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Response to neoadjuvant chemotherapy!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                    <AvGroup>            
                        <Label for='ifprogression'>If progression</Label>
                        <AvInput type='select' name='ifprogression' id='ifprogression' required value={this.state.ifprogression} onChange={(e) => this.showIfProgression(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="Change of Regimen">Change of Regimen</option>
                            <option value="Surgery">Surgery</option> 
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select If progression!</AvFeedback>
                    </AvGroup>
                  </div>
                {showIfProgression && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='ifprogressionandother'>If Other</Label>
                    <AvField placeholder="" name='ifprogressionandother' id='ifprogressionandother' value={this.state.ifprogressionandother} onChange={(e) => this.setState({ ifprogressionandother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='primarysurgery'>Primary surgery</Label>
                    <AvInput type='select' name='primarysurgery' id='primarysurgery' required value={this.state.primarysurgery} onChange={(e) => this.setState({ primarysurgery: e.target.value })}>
                        <option value="" selected>Select</option>
                        <option value="BCS">BCS</option>
                        <option value="Mastectomy">Mastectomy</option>
                        <option value="Oncoplasty">Oncoplasty</option>                        
                      </AvInput>                      
                    <AvFeedback>Please select Primary surgery!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                    <AvGroup>            
                        <Label for='nodalsurgery'>Nodal Surgery</Label>
                        <AvInput type='select' name='nodalsurgery' id='nodalsurgery' required value={this.state.nodalsurgery} onChange={(e) => this.showNodalSurgery(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="SLNB">SLNB</option>
                            <option value="AxS">AxS</option> 
                            <option value="AxD">AxD</option> 
                            <option value="Not Done">Not Done</option> 
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select Nodal Surgery!</AvFeedback>
                    </AvGroup>
                  </div>
                {showNodalSurgery && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='ifnodalsurgeryandother'>If Other</Label>
                    <AvField placeholder="" name='ifnodalsurgeryandother' id='ifnodalsurgeryandother' value={this.state.ifnodalsurgeryandother} onChange={(e) => this.setState({ ifnodalsurgeryandother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div className="col-md-12"></div>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='reconstructiondone'>Reconstruction done</Label>
                      <AvInput type='select' name='reconstructiondone' id='reconstructiondone' required value={this.state.reconstructiondone} onChange={(e) => this.showReconstruction(e.target.value)}>
                          <option value="" selected>Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option> 
                          <option value="Not Applicable">Not Applicable</option>                             
                      </AvInput>                      
                      <AvFeedback>Please select Reconstruction done!</AvFeedback>
                  </AvGroup>
                </div>
                {showReconstruction && (
                <>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='timingofreconstruction'>Timing of reconstruction</Label>
                      <AvInput type='select' name='timingofreconstruction' id='timingofreconstruction' required value={this.state.timingofreconstruction} onChange={(e) => this.setState({ timingofreconstruction: e.target.value })}>
                          <option value="" selected>Select</option>
                          <option value="Immediate">Immediate</option>
                          <option value="Delayed">Delayed</option>                           
                      </AvInput>                      
                      <AvFeedback>Please select Timing of reconstruction!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='typeofreconstruction'>Type of reconstruction</Label>
                      <AvInput type='select' name='typeofreconstruction' id='typeofreconstruction' required value={this.state.typeofreconstruction} onChange={(e) => this.showReconstructionType(e.target.value)}>
                          <option value="" selected>Select</option>
                          <option value="Oncoplasty">Oncoplasty</option>
                          <option value="DIEP Flap">DIEP Flap</option>                           
                          <option value="Prosthesis">Prosthesis</option>
                          <option value="Other">Other</option>                           
                      </AvInput>                      
                      <AvFeedback>Please select Type of reconstruction!</AvFeedback>
                  </AvGroup>
                </div>                
                </>
                )}
                {showReconstructionType && (
                  <div className="col-md-3">
                    <AvGroup>
                      <Label for='typeofreconstructionother'>If Other</Label>
                      <AvField placeholder="" name='typeofreconstructionother' id='typeofreconstructionother' value={this.state.typeofreconstructionother} onChange={(e) => this.setState({ typeofreconstructionother: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                      <Label for='adjuvantchemotherapy'>Adjuvant chemotherapy</Label>
                      <AvInput type='select' name='adjuvantchemotherapy' id='adjuvantchemotherapy' required value={this.state.adjuvantchemotherapy} onChange={(e) => this.showAdjuvantChemotherapy(e.target.value)}>
                          <option value="" selected>Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>                                                    
                      </AvInput>                      
                      <AvFeedback>Please select Adjuvant chemotherapy!</AvFeedback>
                  </AvGroup>
                </div>
                {showAdjuvantChemotherapy && (                
                <div className="col-md-4">
                  <AvGroup>            
                      <Label for='adjuvantchemotherapyifyes'>If Yes</Label>
                      <AvInput type='select' name='adjuvantchemotherapyifyes' id='adjuvantchemotherapyifyes' required value={this.state.adjuvantchemotherapyifyes} onChange={(e) => this.showAdjuvantChemotherapyIfYes(e.target.value)}>
                          <option value="" selected>Select</option>
                          <option value="Anthracycline Alone">Anthracycline Alone</option>
                          <option value="Anthracycline-Taxane">Anthracycline-Taxane</option>  
                          <option value="Anthracycline-Taxane Platinum">Anthracycline-Taxane Platinum</option>
                          <option value="Trastuzumab">Trastuzumab</option>  
                          <option value="Pertuzumab">Pertuzumab</option>
                          <option value="Capecitabine">Capecitabine</option>    
                          <option value="TDM-1">TDM-1</option>
                          <option value="Other">Other</option>                           
                      </AvInput>                      
                      <AvFeedback>Please select If Yes!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                {showAdjuvantChemotherapyIfYes && (
                  <div className="col-md-3">
                    <AvGroup>
                      <Label for='adjuvantchemotherapyother'>If Other</Label>
                      <AvField placeholder="" name='adjuvantchemotherapyother' id='adjuvantchemotherapyother' value={this.state.adjuvantchemotherapyother} onChange={(e) => this.setState({ adjuvantchemotherapyother: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}


                <div className="col-md-12"></div>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='adjuvantbonemodify'>Adjuvant bone modifying agent given</Label>
                      <AvInput type='select' name='adjuvantbonemodify' id='adjuvantbonemodify' required value={this.state.adjuvantbonemodify} onChange={(e) => this.showAdjuvantBoneModify(e.target.value)}>
                          <option value="" selected>Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>                                                      
                      </AvInput>                      
                      <AvFeedback>Please select Adjuvant bone modifying agent given!</AvFeedback>
                  </AvGroup>
                </div>
                {showAdjuvantBoneModify && (
                <>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='fertilityoptionundertakenbone'>Fertility option undertaken</Label>
                      <AvInput type='select' name='fertilityoptionundertakenbone' id='fertilityoptionundertakenbone' required value={this.state.fertilityoptionundertakenbone} onChange={(e) => this.setState({ fertilityoptionundertakenbone: e.target.value })}>
                          <option value="" selected>Select</option>
                          <option value="Zoledronic">Zoledronic</option>
                          <option value="Denosumab">Denosumab</option>
                      </AvInput>                      
                      <AvFeedback>Please select Fertility option undertaken!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='fertilityoptionundertakenboneother'>Fertility option undertaken</Label>
                      <AvInput type='select' name='fertilityoptionundertakenboneother' id='fertilityoptionundertakenboneother' required value={this.state.fertilityoptionundertakenboneother} onChange={(e) => this.showFertilityOptionUndertakenBoneOther(e.target.value)}>
                          <option value="" selected>Select</option>
                          <option value="3 Years">3 Years</option>
                          <option value="5 Years">5 Years</option>                           
                          <option value="Other">Other</option>                           
                      </AvInput>                      
                      <AvFeedback>Please select Fertility option undertaken!</AvFeedback>
                  </AvGroup>
                </div>                
                </>
                )}
                {showFertilityOptionUndertakenBoneOther && (
                  <div className="col-md-3">
                    <AvGroup>
                      <Label for='fertilityoptionundertakenboneotherifother'>If Other</Label>
                      <AvField placeholder="" name='fertilityoptionundertakenboneotherifother' id='fertilityoptionundertakenboneotherifother' value={this.state.fertilityoptionundertakenboneotherifother} onChange={(e) => this.setState({ fertilityoptionundertakenboneotherifother: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='her2targetedtherapy'>HER2 targeted therapy</Label>
                    <AvInput type='select' name='her2targetedtherapy' id='her2targetedtherapy' required value={this.state.her2targetedtherapy} onChange={(e) => this.showHER2TargetedTherapy(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option> 
                        <option value="Not Indicated">Not Indicated</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select HER2 targeted therapy!</AvFeedback>
                  </AvGroup>
                </div>
                {showHER2TargetedTherapy && (
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='her2targetedtherapyduration'>If yes, duration of anti-HER2 therapy</Label>
                        <AvInput type='select' name='her2targetedtherapyduration' id='her2targetedtherapyduration' required value={this.state.her2targetedtherapyduration} onChange={(e) => this.showHER2TargetedTherapyDuration(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option> 
                            <option value="12 Months">12 Months</option>                            
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please Enter if yes, the duration of anti-HER2 therapy!</AvFeedback>
                    </AvGroup>
                  </div>
                )}  
                {showHER2TargetedTherapyDuration && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='her2targetedtherapydurationifother'>If Other</Label>
                    <AvField placeholder="" name='her2targetedtherapydurationifother' id='her2targetedtherapydurationifother' value={this.state.her2targetedtherapydurationifother} onChange={(e) => this.setState({ her2targetedtherapydurationifother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='dualantiher2'>Dual anti-HER2 therapy given (Trastuzumab / Pertuzumab)</Label>
                    <AvInput type='select' name='dualantiher2' id='dualantiher2' required value={this.state.dualantiher2} onChange={(e) => this.showDualAntiHER2(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>                                                
                      </AvInput>                      
                    <AvFeedback>Please select Fertility discussed!</AvFeedback>
                  </AvGroup>
                </div>
                {showDualAntiHER2 && (
                  <div className="col-md-6">
                    <AvGroup>            
                        <Label for='dualantiher2ifyes'>Dual anti-HER2 therapy given (If Yes)</Label>
                        <AvInput type='select' name='dualantiher2ifyes' id='dualantiher2ifyes' required value={this.state.dualantiher2ifyes} onChange={(e) => this.setState({ dualantiher2ifyes: e.target.value})}>
                            <option value="" selected>Select</option>
                            <option value="Neoadjuvant">Neoadjuvant</option>
                            <option value="Adjuvant">Adjuvant</option>                                               
                        </AvInput>                      
                        <AvFeedback>Please select Dual anti-HER2 therapy given (If Yes)!</AvFeedback>
                    </AvGroup>
                  </div>
                )} 
                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='adjuvantradiotherapy'>Adjuvant radio therapy</Label>
                    <AvInput type='select' name='adjuvantradiotherapy' id='adjuvantradiotherapy' required value={this.state.adjuvantradiotherapy} onChange={(e) => this.showAdjuvantRadioTherapy(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Adjuvant Radio therapy!</AvFeedback>
                  </AvGroup>
                </div>
                {showAdjuvantRadioTherapy && (
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='adjuvantradiotherapyifyes'>Neo-adjuvant therapy (If Yes)</Label>
                        <AvInput type='select' name='adjuvantradiotherapyifyes' id='adjuvantradiotherapyifyes' required value={this.state.adjuvantradiotherapyifyes} onChange={(e) => this.showAdjuvantRadioTherapyIfYes(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="IMRT">IMRT</option>
                            <option value="IGRT">IGRT</option> 
                            <option value="Proton">Proton</option>      
                            <option value="IORT">IORT</option>
                            <option value="APBI">APBI</option>     
                            <option value="DIBH">DIBH</option>     
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select Neo-adjuvant therapy (If Yes)!</AvFeedback>
                    </AvGroup>
                  </div>
                )}  
                {showAdjuvantRadioTherapyIfYes && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='adjuvantradiotherapyifyesother'>If Other</Label>
                    <AvField placeholder="" name='adjuvantradiotherapyifyesother' id='adjuvantradiotherapyifyesother' value={this.state.adjuvantradiotherapyifyesother} onChange={(e) => this.setState({ adjuvantradiotherapyifyesother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}

                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='adjuvantendocrinetherapy'>Adjuvant endocrine therapy</Label>
                    <AvInput type='select' name='adjuvantendocrinetherapy' id='adjuvantendocrinetherapy' required value={this.state.adjuvantendocrinetherapy} onChange={(e) => this.showAdjuvantEndocrineTherapy(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option> 
                        <option value="Not Required">Not Required</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Fertility discussed!</AvFeedback>
                  </AvGroup>
                </div>
                {showAdjuvantEndocrineTherapy && (
                  <div className="col-md-6">
                      <AvGroup>
                      <Label for='adjuvantendocrinetherapyifyes'>If Other</Label>
                      <AvField placeholder="" name='adjuvantendocrinetherapyifyes' id='adjuvantendocrinetherapyifyes' value={this.state.adjuvantendocrinetherapyifyes} onChange={(e) => this.setState({ adjuvantendocrinetherapyifyes: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}

                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='recommendeddurationadjuvantendocrinetherapy'>Recommended duration of adjuvant endocrine</Label>
                    <AvInput type='select' name='recommendeddurationadjuvantendocrinetherapy' id='recommendeddurationadjuvantendocrinetherapy' required value={this.state.recommendeddurationadjuvantendocrinetherapy} onChange={(e) => this.showRecommendedDurationAdjuvantEndocrineTherapy(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="5 Years">5 Years</option>
                        <option value="7 Years">7 Years</option> 
                        <option value="10 Years">10 Years</option>                         
                        <option value="Other">Other</option>
                      </AvInput>                      
                    <AvFeedback>Please select Recommended duration of adjuvant endocrine!</AvFeedback>
                  </AvGroup>
                </div>
                {showRecommendedDurationAdjuvantEndocrineTherapy && (
                  <div className="col-md-6">
                    <AvGroup>
                      <Label for='recommendeddurationadjuvantendocrinetherapyifother'>If Other</Label>
                      <AvField placeholder="" name='recommendeddurationadjuvantendocrinetherapyifother' id='recommendeddurationadjuvantendocrinetherapyifother' value={this.state.recommendeddurationadjuvantendocrinetherapyifother} onChange={(e) => this.setState({ recommendeddurationadjuvantendocrinetherapyifother: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='reasonforstoppingaet'>Reason for stopping adjuvant endocrine therapy</Label>
                    <AvInput type='select' name='reasonforstoppingaet' id='reasonforstoppingaet' required value={this.state.reasonforstoppingaet} onChange={(e) => this.setState({ reasonforstoppingaet: e.target.value })}>
                        <option value="" selected>Select</option>
                        <option value="Complete Therapy">Complete Therapy</option>
                        <option value="Intolerability">Intolerability</option>                         
                        <option value="Recurrence">Recurrence</option>                         
                        <option value="Not Known">Not Known</option>                                                                
                      </AvInput>                      
                    <AvFeedback>Please select Reason for stopping adjuvant endocrine therapy!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                    <AvGroup>            
                        <Label for='ifpresentedwithmetastases'>If presented with metastases, first line therapy</Label>
                        <AvInput type='select' name='ifpresentedwithmetastases' id='ifpresentedwithmetastases' required value={this.state.ifpresentedwithmetastases} onChange={(e) => this.showIfPresentedWithMetastases(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="Change of Regimen">Change of Regimen</option>
                            <option value="Surgery">Surgery</option> 
                            <option value="Other">Other</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select If presented with metastases, first line therapy!</AvFeedback>
                    </AvGroup>
                  </div>
                {showIfPresentedWithMetastases && (
                <div className="col-md-4">
                    <AvGroup>
                      <Label for='ifpresentedwithmetastasesifother'>If Other</Label>
                      <AvField placeholder="" name='ifpresentedwithmetastasesifother' id='ifpresentedwithmetastasesifother' value={this.state.ifpresentedwithmetastasesifother} onChange={(e) => this.setState({ ifpresentedwithmetastasesifother: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                </div>
                )}

                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='ngsdoneatdiagnosis'>NGS done at diagnosis</Label>
                    <AvInput type='select' name='ngsdoneatdiagnosis' id='ngsdoneatdiagnosis' required value={this.state.ngsdoneatdiagnosis} onChange={(e) => this.showNGSDoneAtDiagnosis(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select NGS done at diagnosis!</AvFeedback>
                  </AvGroup>
                </div>
                {showNGSDoneAtDiagnosis && (
                  <>
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='ngsdoneatdiagnosisifyes'>NGS done at diagnosis (If Yes)</Label>
                        <AvInput type='select' name='ngsdoneatdiagnosisifyes' id='ngsdoneatdiagnosisifyes' required value={this.state.ngsdoneatdiagnosisifyes} onChange={(e) => this.setState({ ngsdoneatdiagnosisifyes: e.target.value })}>
                            <option value="" selected>Select</option>
                            <option value="Tissue">Tissue</option>
                            <option value="Liquid">Liquid</option>                             
                        </AvInput>                      
                        <AvFeedback>Please select NGS done at diagnosis (If Yes)!</AvFeedback>
                    </AvGroup>
                  </div>                
                  <div className="col-md-4">
                      <AvGroup>
                      <Label for='ngsdoneatdiagnosisifyesidentifiedtargets'>If yes, targets identified</Label>
                      <AvField placeholder="" name='ngsdoneatdiagnosisifyesidentifiedtargets' id='ngsdoneatdiagnosisifyesidentifiedtargets' value={this.state.ngsdoneatdiagnosisifyesidentifiedtargets} onChange={(e) => this.setState({ ngsdoneatdiagnosisifyesidentifiedtargets: e.target.value})} required />
                      <AvFeedback>Please enter If yes, targets identified!</AvFeedback>
                    </AvGroup>
                  </div>
                  </>
                )}

                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='ngsdoneatrecurrence'>NGS done at recurrence</Label>
                    <AvInput type='select' name='ngsdoneatrecurrence' id='ngsdoneatrecurrence' required value={this.state.ngsdoneatrecurrence} onChange={(e) => this.showNGSDoneAtRecurrence(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select NGS done at recurrence!</AvFeedback>
                  </AvGroup>
                </div>
                {showNGSDoneAtRecurrence && (
                  <>
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='ngsdoneatrecurrenceifyes'>NGS done at recurrence (If Yes)</Label>
                        <AvInput type='select' name='ngsdoneatrecurrenceifyes' id='ngsdoneatrecurrenceifyes' required value={this.state.ngsdoneatrecurrenceifyes} onChange={(e) => this.setState({ ngsdoneatrecurrenceifyes: e.target.value })}>
                            <option value="" selected>Select</option>
                            <option value="Archival Tissue">Archival Tissue</option>
                            <option value="Fresh Biopsy">Fresh Biopsy</option>                             
                            <option value="Liquid">Liquid</option>                             
                        </AvInput>                      
                        <AvFeedback>Please select NGS done at recurrence (If Yes)!</AvFeedback>
                    </AvGroup>
                  </div>                
                  <div className="col-md-4">
                      <AvGroup>
                      <Label for='ngsdoneatrecurrenceifyesidentifiedtargets'>If yes, targets identified</Label>
                      <AvField placeholder="" name='ngsdoneatrecurrenceifyesidentifiedtargets' id='ngsdoneatrecurrenceifyesidentifiedtargets' value={this.state.ngsdoneatrecurrenceifyesidentifiedtargets} onChange={(e) => this.setState({ ngsdoneatrecurrenceifyesidentifiedtargets: e.target.value})} required />
                      <AvFeedback>Please enter If yes, targets identified!</AvFeedback>
                    </AvGroup>
                  </div>
                  </>
                )}

                <div className="col-md-12">
                <Button color='primary' type='submit' onClick={ () => this.sendTreatmentDetails }>
                  Submit
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

export default withRouter(Treatment);
