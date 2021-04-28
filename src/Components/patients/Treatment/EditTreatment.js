import React, { Fragment } from 'react';

import EditSideBar from '../../sidebar/EditSideBar';
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

class EditTreatment extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {         
        code: code,
        patients: [],  
        isLoading: true,
        errors: null,
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
  componentDidMount() {
    axios.get(`http://localhost:4000/getfulldetails/${this.state.code}`)
    .then(response =>
        response.data.results.map(patient => ({
            fertility_discussed: `${patient.fertility_discussed}`, fertility_discussed_if_yes: `${patient.fertility_discussed_if_yes}`, fertility_discussed_if_other: `${patient.fertility_discussed_if_other}`, neo_adjuvant_therapy: `${patient.neo_adjuvant_therapy}`, neo_adjuvant_therapy_if_yes: `${patient.neo_adjuvant_therapy_if_yes}`, neo_adjuvant_therapy_if_other: `${patient.neo_adjuvant_therapy_if_other}`, ovarian_supression_during_chemotherapy: `${patient.ovarian_supression_during_chemotherapy}`, ovarian_supression_during_chemotherapy_if_yes: `${patient.ovarian_supression_during_chemotherapy_if_yes}`, response_to_neoadjuvant_chemotherapy: `${patient.response_to_neoadjuvant_chemotherapy}`, if_progression: `${patient.if_progression}`, if_progression_if_other: `${patient.if_progression_if_other}`, primary_surgery: `${patient.primary_surgery}`, nodal_surgery: `${patient.nodal_surgery}`, nodal_surgery_if_other: `${patient.nodal_surgery_if_other}`, reconstruction_done: `${patient.reconstruction_done}`, timing_of_reconstruction: `${patient.timing_of_reconstruction}`, type_of_reconstruction: `${patient.type_of_reconstruction}`, type_of_reconstruction_if_other: `${patient.type_of_reconstruction_if_other}`, adjuvant_chemotherapy: `${patient.adjuvant_chemotherapy}`, adjuvant_chemotherapy_if_yes: `${patient.adjuvant_chemotherapy_if_yes}`, adjuvant_chemotherapy_if_other: `${patient.adjuvant_chemotherapy_if_other}`, adjuvant_bone_modifying_agent_given: `${patient.adjuvant_bone_modifying_agent_given}`, adjuvant_bone_modifying_agent_given_if_yes: `${patient.adjuvant_bone_modifying_agent_given_if_yes}`, duration_of_bone_modifying: `${patient.duration_of_bone_modifying}`, duration_of_bone_modifying_if_other: `${patient.duration_of_bone_modifying_if_other}`, her2_targeted_therapy: `${patient.her2_targeted_therapy}`, duration_of_her2_targeted_therapy: `${patient.duration_of_her2_targeted_therapy}`, show_her2_targeted_duration_if_other: `${patient.show_her2_targeted_duration_if_other}`, dual_anti_her_2_given: `${patient.dual_anti_her_2_given}`, dual_anti_her_2_given_if_yes: `${patient.dual_anti_her_2_given_if_yes}`, adjuvant_radiotherapy: `${patient.adjuvant_radiotherapy}`, adjuvant_radiotherapy_if_yes: `${patient.adjuvant_radiotherapy_if_yes}`, adjuvant_radiotherapy_if_yes_other: `${patient.adjuvant_radiotherapy_if_yes_other}`, adjuvant_endocrine_therapy: `${patient.adjuvant_endocrine_therapy}`, adjuvant_endocrine_therapy_if_other: `${patient.adjuvant_endocrine_therapy_if_other}`, recommended_duration_of_adjuvant_endocrine: `${patient.recommended_duration_of_adjuvant_endocrine}`, recommended_duration_of_adjuvant_endocrine_if_other: `${patient.recommended_duration_of_adjuvant_endocrine_if_other}`, reason_for_stopping_adjuvant_endocrine_therapy: `${patient.reason_for_stopping_adjuvant_endocrine_therapy}`, first_line_therapy: `${patient.first_line_therapy}`, first_line_therapy_if_other: `${patient.first_line_therapy_if_other}`, ngs_done_at_diagnosis: `${patient.ngs_done_at_diagnosis}`, ngs_done_at_diagnosis_if_yes: `${patient.ngs_done_at_diagnosis_if_yes}`, ngs_done_at_diagnosis_if_yes_write: `${patient.ngs_done_at_diagnosis_if_yes_write}`, ngs_done_at_recurrence: `${patient.ngs_done_at_recurrence}`, ngs_done_at_recurrence_if_yes: `${patient.ngs_done_at_recurrence_if_yes}`, ngs_done_at_recurrence_if_yes_write: `${patient.ngs_done_at_recurrence_if_yes_write}`, code: `${patient.code}`            
        })),
        //console.log(this.patient)
    )
    .then(patients => {
        this.setState({
          patients,
          isLoading: false,
          fertilitydiscussed: patients[0].fertility_discussed,
          fertilitydiscussedifyes: patients[0].fertility_discussed_if_yes,
          neoadjuvanttherapyv: patients[0].neo_adjuvant_therapy,
          neoadjuvanttherapyifoth: patients[0].neo_adjuvant_therapy_if_yes,
          ifprogression: patients[0].if_progression,
          nodalsurgery: patients[0].nodal_surgery,
          reconstructiondone: patients[0].reconstruction_done,
          ovariansupressionduringchemotherapy: patients[0].ovarian_supression_during_chemotherapy,
          typeofreconstruction: patients[0].type_of_reconstruction,
          adjuvantchemo: patients[0].adjuvant_chemotherapy,
          adjuvantchemoyes: patients[0].adjuvant_chemotherapy_if_yes,
          adjuvantbonemodify: patients[0].adjuvant_bone_modifying_agent_given,
          adjuvantboneduration: patients[0].duration_of_bone_modifying,
          her2targetedtherapy: patients[0].her2_targeted_therapy,
          her2targetedtherapyduration: patients[0].duration_of_her2_targeted_therapy,

          dualantiher2given: patients[0].dual_anti_her_2_given,
          adjuvantradiotherapy: patients[0].adjuvant_radiotherapy,
          dualantiher2givenifother: patients[0].dual_anti_her_2_given_if_other,
          adjuvantradiotherapyifyes: patients[0].adjuvant_radiotherapy_if_yes, 
          adjuvantendocrinetherapy: patients[0].adjuvant_endocrine_therapy,
          recommendeddurationadjendthe: patients[0].recommended_duration_of_adjuvant_endocrine,
          firstlinetherapyifother: patients[0].first_line_therapy,
          ngsdoneatdiagnosis: patients[0].ngs_done_at_diagnosis,
          ngsdoneatrecurrence: patients[0].ngs_done_at_recurrence,
        });
        //document.getElementById('metastases_types')[1].style.display='none';
        console.log(this.state.patients)
        if(this.state.fertilitydiscussed === 'Yes'){
          this.setState({ showFertilityOption: true })
        }
        if(this.state.fertilitydiscussedifyes === 'Other'){
          this.setState({ showFertilityDiscussed: true })          
        }
        if(this.state.neoadjuvanttherapyv === 'Yes'){
          this.setState({ showNeoAdjuvantTherapy: true })          
        }
        if(this.state.neoadjuvanttherapyifoth === 'Other'){
          this.setState({ showNeoAdjuvantTherapyIfYes: true })          
        } 
        if(this.state.ovariansupressionduringchemotherapy === 'Yes'){
          this.setState({ showOvarianSuppression: true })          
        }
        if(this.state.ifprogression === 'Other'){
          this.setState({ showIfProgression: true })          
        }
        if(this.state.nodalsurgery === 'Other'){
          this.setState({ showNodalSurgery: true })          
        }
        if(this.state.reconstructiondone === 'Yes'){
          this.setState({ showReconstruction: true })          
        }
        if(this.state.typeofreconstruction === 'Other'){
          this.setState({ showReconstructionType: true })          
        }
        if(this.state.adjuvantchemo === 'Yes'){
          this.setState({ showAdjuvantChemotherapy: true })          
        }
        if(this.state.adjuvantchemoyes === 'Other'){
          this.setState({ showAdjuvantChemotherapyIfYes: true })          
        }
        if(this.state.adjuvantbonemodify === 'Yes'){
          this.setState({ showAdjuvantBoneModify: true })          
        }
        if(this.state.adjuvantboneduration === 'Other'){
          this.setState({ showFertilityOptionUndertakenBoneOther: true })          
        }
        if(this.state.her2targetedtherapy === 'Yes'){
          this.setState({ showHER2TargetedTherapy: true })          
        }
        if(this.state.her2targetedtherapyduration === 'Other'){
          this.setState({ showHER2TargetedTherapyDuration: true })          
        }
        if(this.state.dualantiher2given === 'Yes'){
          this.setState({ showDualAntiHER2: true })          
        }
        if(this.state.adjuvantradiotherapy === 'Yes'){
          this.setState({ showAdjuvantRadioTherapy: true })          
        }
        if(this.state.adjuvantradiotherapyifyes === 'Other'){
          this.setState({ showAdjuvantRadioTherapyIfYes: true })          
        }
        if(this.state.adjuvantendocrinetherapy === 'Yes'){
          this.setState({ showAdjuvantEndocrineTherapy: true })          
        }
        if(this.state.recommendeddurationadjendthe === 'Other'){
          this.setState({ showRecommendedDurationAdjuvantEndocrineTherapy: true })          
        }
        if(this.state.firstlinetherapyifother === 'Other'){
          this.setState({ showIfPresentedWithMetastases: true })          
        }
        if(this.state.ngsdoneatdiagnosis === 'Yes'){
          this.setState({ showNGSDoneAtDiagnosis: true })          
        }
        if(this.state.ngsdoneatrecurrence === 'Yes'){
          this.setState({ showNGSDoneAtRecurrence: true })          
        }
    })
    .catch(error => this.setState({ error, isLoading: false }));   
  }; 

  handleValidSubmit = (event, values) => {
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
   axios.post(`http://localhost:4000/updatepatientdetails`, { fertility_discussed: this.state.fertility_discussed, fertility_discussed_if_yes: this.state.fertility_discussed_if_yes, fertility_discussed_if_other: this.state.fertility_discussed_if_other, neo_adjuvant_therapy: this.state.neo_adjuvant_therapy, neo_adjuvant_therapy_if_yes: this.state.neo_adjuvant_therapy_if_yes, neo_adjuvant_therapy_if_other: this.state.neo_adjuvant_therapy_if_other, ovarian_supression_during_chemotherapy: this.state.ovarian_supression_during_chemotherapy, ovarian_supression_during_chemotherapy_if_yes: this.state.ovarian_supression_during_chemotherapy_if_yes, response_to_neoadjuvant_chemotherapy: this.state.response_to_neoadjuvant_chemotherapy, if_progression: this.state.if_progression, if_progression_if_other: this.state.if_progression_if_other, primary_surgery: this.state.primary_surgery, nodal_surgery: this.state.nodal_surgery, nodal_surgery_if_other: this.state.nodal_surgery_if_other, reconstruction_done: this.state.reconstruction_done, timing_of_reconstruction: this.state.timing_of_reconstruction, type_of_reconstruction: this.state.type_of_reconstruction, type_of_reconstruction_if_other: this.state.type_of_reconstruction_if_other, adjuvant_chemotherapy: this.state.adjuvant_chemotherapy, adjuvant_chemotherapy_if_yes: this.state.adjuvant_chemotherapy_if_yes, adjuvant_chemotherapy_if_other: this.state.adjuvant_chemotherapy_if_other, adjuvant_bone_modifying_agent_given: this.state.adjuvant_bone_modifying_agent_given, adjuvant_bone_modifying_agent_given_if_yes: this.state.adjuvant_bone_modifying_agent_given_if_yes, duration_of_bone_modifying: this.state.duration_of_bone_modifying, duration_of_bone_modifying_if_other: this.state.duration_of_bone_modifying_if_other, her2_targeted_therapy: this.state.her2_targeted_therapy, duration_of_her2_targeted_therapy: this.state.duration_of_her2_targeted_therapy, show_her2_targeted_duration_if_other: this.state.show_her2_targeted_duration_if_other, dual_anti_her_2_given: this.state.dual_anti_her_2_given, dual_anti_her_2_given_if_yes: this.state.dual_anti_her_2_given_if_yes, adjuvant_radiotherapy: this.state.adjuvant_radiotherapy, adjuvant_radiotherapy_if_yes: this.state.adjuvant_radiotherapy_if_yes, adjuvant_radiotherapy_if_yes_other: this.state.adjuvant_radiotherapy_if_yes_other, adjuvant_endocrine_therapy: this.state.adjuvant_endocrine_therapy, adjuvant_endocrine_therapy_if_other: this.state.adjuvant_endocrine_therapy_if_other, recommended_duration_of_adjuvant_endocrine: this.state.recommended_duration_of_adjuvant_endocrine, recommended_duration_of_adjuvant_endocrine_if_other: this.state.recommended_duration_of_adjuvant_endocrine_if_other, reason_for_stopping_adjuvant_endocrine_therapy: this.state.reason_for_stopping_adjuvant_endocrine_therapy, first_line_therapy: this.state.first_line_therapy, first_line_therapy_if_other: this.state.first_line_therapy_if_other, ngs_done_at_diagnosis: this.state.ngs_done_at_diagnosis, ngs_done_at_diagnosis_if_yes: this.state.ngs_done_at_diagnosis_if_yes, ngs_done_at_diagnosis_if_yes_write: this.state.ngs_done_at_diagnosis_if_yes_write, ngs_done_at_recurrence: this.state.ngs_done_at_recurrence, ngs_done_at_recurrence_if_yes: this.state.ngs_done_at_recurrence_if_yes, ngs_done_at_recurrence_if_yes_write: this.state.ngs_done_at_recurrence_if_yes_write, code: this.state.code, treatment_completed: "true" })
    .then(function (response) {
    if(response.data.success === 'Sucessfully Updated!'){            
      history.push(`/follow-up/edit/${response.data.value}`)
    }else{
      
    }
  })
  };
  
  showFertilityOption(name) {
    if(document.getElementById("fertility_discussed").value === "Yes"){
      this.setState({ showFertilityOption: true, fertility_discussed: name });   
      //this.state.fertility_discussed = name 
    }else{
        this.setState({ showFertilityOption: false, showFertilityDiscussed: false, fertility_discussed_if_other: "", fertility_discussed: name }); 
        //this.state.fertility_discussed = name        
    }
  }

  showFertilityDiscussed(name) {
    if(document.getElementById("fertility_discussed_if_yes").value === "Other"){
      this.setState({ showFertilityDiscussed: true, fertility_discussed_if_yes: name });   
      //this.state.fertility_discussed_if_yes = name 
    }else{
        this.setState({ showFertilityDiscussed: false, fertilitydiscussedifother: "", fertility_discussed_if_yes: name }); 
        //this.state.fertility_discussed_if_yes = name        
    }
  }

  showNeoAdjuvantTherapy(name) {
    if(document.getElementById("neoadjuvanttherapy").value === "Yes"){
      this.setState({ showNeoAdjuvantTherapy: true, neoadjuvanttherapy: name });   
      //this.state.neoadjuvanttherapy = name 
    }else{
        this.setState({ showNeoAdjuvantTherapy: false, neoadjuvanttherapy: name, showNeoAdjuvantTherapyIfYes:false, neoadjuvantthereayifyesother: "" }); 
        //this.state.neoadjuvanttherapy = name        
    }
  }

  showNeoAdjuvantTherapyIfYes(name) {
    if(document.getElementById("neoadjuvanttherapyifyes").value === "Other"){
      this.setState({ showNeoAdjuvantTherapyIfYes: true, neoadjuvanttherapyifyes: name });   
      //this.state.neoadjuvanttherapyifyes = name 
    }else{
        this.setState({ showNeoAdjuvantTherapyIfYes: false, neoadjuvantthereayifyesother: "", neoadjuvanttherapyifyes: name }); 
        //this.state.neoadjuvanttherapyifyes = name        
    }
  }

  showOvarianSuppression(name) {
    if(document.getElementById("ovariansuppression").value === "Yes"){
      this.setState({ showOvarianSuppression: true, ovariansuppression: name  });   
      //this.state.ovariansuppression = name 
    }else{
        this.setState({ showOvarianSuppression: false, ovariansuppressionifyes: "", ovariansuppression: name  }); 
        //this.state.ovariansuppression = name        
    }
  }

  showIfProgression(name) {
    if(document.getElementById("ifprogression").value === "Other"){
      this.setState({ showIfProgression: true, ifprogression: name });   
      //this.state.ifprogression = name 
    }else{
        this.setState({ showIfProgression: false, ifprogressionandother: "", ifprogression: name }); 
        //this.state.ifprogression = name        
    }
  }

  showNodalSurgery(name) {
    if(document.getElementById("nodalsurgery").value === "Other"){
      this.setState({ showNodalSurgery: true, nodalsurgery: name });   
      //this.state.nodalsurgery = name 
    }else{
        this.setState({ showNodalSurgery: false, ifnodalsurgeryandother: "", nodalsurgery: name }); 
        //this.state.nodalsurgery = name        
    }
  }

  showReconstruction(name) {
    if(document.getElementById("reconstructiondone").value === "Yes"){
      this.setState({ showReconstruction: true, reconstructiondone: name });   
      //this.state.reconstructiondone = name 
    }else{
        this.setState({ showReconstruction: false, showReconstructionType: false, timingofreconstruction: "", typeofreconstruction: "",typeofreconstructionother: "", reconstructiondone: name }); 
        //this.state.reconstructiondone = name        
    }
  }

  showReconstructionType(name) {
    if(document.getElementById("typeofreconstruction").value === "Other"){
      this.setState({ showReconstructionType: true, typeofreconstruction: name });   
      //this.state.typeofreconstruction = name 
    }else{
        this.setState({ showReconstructionType: false, typeofreconstructionother: "", typeofreconstruction: name }); 
        //this.state.typeofreconstruction = name        
    }
  }

  showAdjuvantChemotherapy(name) {
    if(document.getElementById("adjuvantchemotherapy").value === "Yes"){
      this.setState({ showAdjuvantChemotherapy: true, adjuvantchemotherapy: name });   
      //this.state.adjuvantchemotherapy = name 
    }else{
        this.setState({ showAdjuvantChemotherapy: false, showAdjuvantChemotherapyIfYes: false, adjuvantchemotherapyifyes: "", adjuvantchemotherapyother: "", adjuvantchemotherapy: name }); 
        //this.state.adjuvantchemotherapy = name        
    }
  }

  showAdjuvantChemotherapyIfYes(name){
    if(document.getElementById("adjuvantchemotherapyifyes").value === "Other"){
      this.setState({ showAdjuvantChemotherapyIfYes: true, adjuvantchemotherapyifyes: name });   
      //this.state.adjuvantchemotherapyifyes = name 
    }else{
        this.setState({ showAdjuvantChemotherapyIfYes: false, adjuvantchemotherapyother: "", adjuvantchemotherapyifyes: name }); 
        //this.state.adjuvantchemotherapyifyes = name        
    }
  }

  showAdjuvantBoneModify(name){
    if(document.getElementById("adjuvantbonemodify").value === "Yes"){
      this.setState({ showAdjuvantBoneModify: true, adjuvantbonemodify: name });   
      //this.state.adjuvantbonemodify = name 
    }else{
        this.setState({ showAdjuvantBoneModify: false, showFertilityOptionUndertakenBoneOther: false, fertilityoptionundertakenbone: "", fertilityoptionundertakenboneother: "", fertilityoptionundertakenboneotherifother: "", adjuvantbonemodify: name }); 
        //this.state.adjuvantbonemodify = name        
    }
  }

  showFertilityOptionUndertakenBone(name){
    if(document.getElementById("adjuvantbonemodify").value === "Yes"){
      this.setState({ showAdjuvantBoneModify: true, adjuvantbonemodify: name });   
      //this.state.adjuvantbonemodify = name 
    }else{
        this.setState({ showAdjuvantBoneModify: false, fertilityoptionundertakenboneotherifother: "", adjuvantbonemodify: name }); 
        //this.state.adjuvantbonemodify = name        
    }
  }

  showFertilityOptionUndertakenBoneOther(name){
    if(document.getElementById("fertilityoptionundertakenboneother").value === "Other"){
      this.setState({ showFertilityOptionUndertakenBoneOther: true, fertilityoptionundertakenboneother: name });   
      //this.state.fertilityoptionundertakenboneother = name 
    }else{
        this.setState({ showFertilityOptionUndertakenBoneOther: false, fertilityoptionundertakenboneotherifother: "", fertilityoptionundertakenboneother: name }); 
        //this.state.fertilityoptionundertakenboneother = name        
    }
  }

  showHER2TargetedTherapy(name){
    if(document.getElementById("her2targetedtherapy").value === "Yes"){
      this.setState({ showHER2TargetedTherapy: true, her2targetedtherapy: name });   
      //this.state.her2targetedtherapy = name 
    }else{
        this.setState({ showHER2TargetedTherapy: false, showHER2TargetedTherapyDuration: false, her2targetedtherapyduration: "", her2targetedtherapydurationifother: "", her2targetedtherapy: name }); 
        //this.state.her2targetedtherapy = name        
    }
  }

  showHER2TargetedTherapyDuration(name){
    if(document.getElementById("her2targetedtherapyduration").value === "Other"){
      this.setState({ showHER2TargetedTherapyDuration: true, her2targetedtherapyduration: name  });   
      //this.state.her2targetedtherapyduration = name 
    }else{
        this.setState({ showHER2TargetedTherapyDuration: false, her2targetedtherapydurationifother: "", her2targetedtherapyduration: name }); 
        //this.state.her2targetedtherapyduration = name        
    }
  }

  showDualAntiHER2(name){
    if(document.getElementById("dualantiher2").value === "Yes"){
      this.setState({ showDualAntiHER2: true, dualantiher2: name });   
      //this.state.dualantiher2 = name 
    }else{
        this.setState({ showDualAntiHER2: false, dualantiher2ifyes: "", dualantiher2: name }); 
        //this.state.dualantiher2 = name        
    }
  }

  showAdjuvantRadioTherapy(name){
    if(document.getElementById("adjuvantradiotherapy").value === "Yes"){
      this.setState({ showAdjuvantRadioTherapy: true, adjuvantradiotherapy: name });   
      //this.state.adjuvantradiotherapy = name 
    }else{
        this.setState({ showAdjuvantRadioTherapy: false, showAdjuvantRadioTherapyIfYes: false, adjuvantradiotherapyifyes: "", adjuvantradiotherapyifyesother: "", adjuvantradiotherapy: name }); 
        //this.state.adjuvantradiotherapy = name        
    }
  }

  showAdjuvantRadioTherapyIfYes(name){
    if(document.getElementById("adjuvantradiotherapyifyes").value === "Other"){
      this.setState({ showAdjuvantRadioTherapyIfYes: true, adjuvantradiotherapyifyes: name });   
      //this.state.adjuvantradiotherapyifyes = name 
    }else{
        this.setState({ showAdjuvantRadioTherapyIfYes: false, adjuvantradiotherapyifyesother: "", adjuvantradiotherapyifyes: name }); 
        //this.state.adjuvantradiotherapyifyes = name        
    }
  }

  showAdjuvantEndocrineTherapy(name){
    if(document.getElementById("adjuvantendocrinetherapy").value === "Yes"){
      this.setState({ showAdjuvantEndocrineTherapy: true, adjuvantendocrinetherapy: name });   
      //this.state.adjuvantendocrinetherapy = name 
    }else{
        this.setState({ showAdjuvantEndocrineTherapy: false, adjuvantendocrinetherapyifyes: "", adjuvantendocrinetherapy: name }); 
        //this.state.adjuvantendocrinetherapy = name        
    }
  }

  showRecommendedDurationAdjuvantEndocrineTherapy(name){
    if(document.getElementById("recommendeddurationadjuvantendocrinetherapy").value === "Other"){
      this.setState({ showRecommendedDurationAdjuvantEndocrineTherapy: true, recommendeddurationadjuvantendocrinetherapy: name });   
      //this.state.recommendeddurationadjuvantendocrinetherapy = name 
    }else{
        this.setState({ showRecommendedDurationAdjuvantEndocrineTherapy: false, recommendeddurationadjuvantendocrinetherapyifother: "", recommendeddurationadjuvantendocrinetherapy: name }); 
        //this.state.recommendeddurationadjuvantendocrinetherapy = name        
    }
  }

  showIfPresentedWithMetastases(name){
    if(document.getElementById("ifpresentedwithmetastases").value === "Other"){
      this.setState({ showIfPresentedWithMetastases: true, ifpresentedwithmetastases: name });   
      //this.state.ifpresentedwithmetastases = name 
    }else{
        this.setState({ showIfPresentedWithMetastases: false, ifpresentedwithmetastasesifother: "", ifpresentedwithmetastases: name }); 
        //this.state.ifpresentedwithmetastases = name        
    }
  }

  showNGSDoneAtDiagnosis(name){
    if(document.getElementById("ngsdoneatdiagnosis").value === "Yes"){
      this.setState({ showNGSDoneAtDiagnosis: true, ngsdoneatdiagnosis: name });   
      //this.state.ngsdoneatdiagnosis = name 
    }else{
        this.setState({ showNGSDoneAtDiagnosis: false, ngsdoneatdiagnosisifyesidentifiedtargets: "", ngsdoneatdiagnosisifyes: "", ngsdoneatdiagnosis: name }); 
        //this.state.ngsdoneatdiagnosis = name        
    }
  }

  showNGSDoneAtRecurrence(name){
    if(document.getElementById("ngsdoneatrecurrence").value === "Yes"){
      this.setState({ showNGSDoneAtRecurrence: true, ngsdoneatrecurrence: name });   
      //this.state.ngsdoneatrecurrence = name 
    }else{
        this.setState({ showNGSDoneAtRecurrence: false, ngsdoneatrecurrenceifyesidentifiedtargets: "", ngsdoneatrecurrenceifyes: "", ngsdoneatrecurrence: name }); 
        //this.state.ngsdoneatrecurrence = name        
    }
  }

  render(){          
    const { showFertilityOption, showFertilityDiscussed, showNeoAdjuvantTherapy, showNeoAdjuvantTherapyIfYes, showOvarianSuppression, showIfProgression, showNodalSurgery, showReconstruction, showReconstructionType, showAdjuvantChemotherapy, showAdjuvantChemotherapyIfYes, showAdjuvantBoneModify, /*showFertilityOptionUndertakenBone,*/ showFertilityOptionUndertakenBoneOther, showHER2TargetedTherapy, showHER2TargetedTherapyDuration, showDualAntiHER2, showAdjuvantRadioTherapy, showAdjuvantRadioTherapyIfYes, showAdjuvantEndocrineTherapy, showRecommendedDurationAdjuvantEndocrineTherapy, showIfPresentedWithMetastases, showNGSDoneAtDiagnosis, showNGSDoneAtRecurrence, isLoading, patients  } = this.state; 
    
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
              <h1 className="animate__animated animate__fadeIn">Treatment</h1>
            </CardHeader>
            <CardBody>
              {!isLoading ? (
                patients.map(patient => {
                  /*const { fertility_discussed, fertility_discussed_if_yes, fertility_discussed_if_other, neo_adjuvant_therapy, neo_adjuvant_therapy_if_yes, neo_adjuvant_therapy_if_other, ovarian_supression_during_chemotherapy, ovarian_supression_during_chemotherapy_if_yes, response_to_neoadjuvant_chemotherapy, if_progression, if_progression_if_other, primary_surgery, nodal_surgery, nodal_surgery_if_other, reconstruction_done, timing_of_reconstruction, type_of_reconstruction, type_of_reconstruction_if_other, adjuvant_chemotherapy, adjuvant_chemotherapy_if_yes, adjuvant_chemotherapy_if_other, adjuvant_bone_modifying_agent_given, adjuvant_bone_modifying_agent_given_if_yes, duration_of_bone_modifying, duration_of_bone_modifying_if_other, her2_targeted_therapy, duration_of_her2_targeted_therapy, show_her2_targeted_duration_if_other, dual_anti_her_2_given, dual_anti_her_2_given_if_yes, adjuvant_radiotherapy, adjuvant_radiotherapy_if_yes, adjuvant_radiotherapy_if_yes_other, adjuvant_endocrine_therapy, adjuvant_endocrine_therapy_if_other, recommended_duration_of_adjuvant_endocrine, recommended_duration_of_adjuvant_endocrine_if_other, reason_for_stopping_adjuvant_endocrine_therapy, first_line_therapy, first_line_therapy_if_other, ngs_done_at_diagnosis, ngs_done_at_diagnosis_if_yes, ngs_done_at_diagnosis_if_yes_write, ngs_done_at_recurrence, ngs_done_at_recurrence_if_yes, ngs_done_at_recurrence_if_yes_write, code } = patient; */
                        return (
              <AvForm onValidSubmit= {this.handleValidSubmit}>
              <div className="row">
                
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='fertility_discussed'>Fertility discussed</Label>
                    <AvInput type='select' name='fertility_discussed' id='fertility_discussed' required value={patient.fertility_discussed} onChange={(e) => this.showFertilityOption(e.target.value)}>
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
                        <Label for='fertility_discussed_if_yes'>Fertility option undertaken</Label>
                        <AvInput type='select' name='fertility_discussed_if_yes' id='fertility_discussed_if_yes' required value={patient.fertility_discussed_if_yes} onChange={(e) => this.showFertilityDiscussed(e.target.value)}>
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
                    <Label for='fertility_discussed_if_other'>If Other</Label>
                    <AvField placeholder="" name='fertility_discussed_if_other' id='fertility_discussed_if_other' value={patient.fertility_discussed_if_other} onChange={(e) => this.setState({ fertility_discussed_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='neoadjuvanttherapy'>Neo-adjuvant therapy</Label>
                    <AvInput type='select' name='neoadjuvanttherapy' id='neoadjuvanttherapy' required value={patient.neo_adjuvant_therapy} onChange={(e) => this.showNeoAdjuvantTherapy(e.target.value)}>
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
                        <AvInput type='select' name='neoadjuvanttherapyifyes' id='neoadjuvanttherapyifyes' required value={patient.neo_adjuvant_therapy_if_yes} onChange={(e) => this.showNeoAdjuvantTherapyIfYes(e.target.value)}>
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
                    <AvField placeholder="" name='neoadjuvantthereayifyesother' id='neoadjuvantthereayifyesother' value={patient.neo_adjuvant_therapy_if_other} onChange={(e) => this.setState({ neo_adjuvant_therapy_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='ovariansuppression'>Ovarian suppression</Label>
                    <AvInput type='select' name='ovariansuppression' id='ovariansuppression' required value={patient.ovarian_supression_during_chemotherapy} onChange={(e) => this.showOvarianSuppression(e.target.value)}>
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
                        <AvInput type='select' name='ovariansuppressionifyes' id='ovariansuppressionifyes' required value={patient.ovarian_supression_during_chemotherapy_if_yes} onChange={(e) => this.setState({ ovarian_supression_during_chemotherapy_if_yes: e.target.value})}>
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
                    <AvInput type='select' name='responsetoneoadjuvantchemotherapy' id='responsetoneoadjuvantchemotherapy' required value={patient.response_to_neoadjuvant_chemotherapy} onChange={(e) => this.setState({ response_to_neoadjuvant_chemotherapy: e.target.value })}>
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
                        <AvInput type='select' name='ifprogression' id='ifprogression' required value={patient.if_progression} onChange={(e) => this.showIfProgression(e.target.value)}>
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
                    <AvField placeholder="" name='ifprogressionandother' id='ifprogressionandother' value={patient.if_progression_if_other} onChange={(e) => this.setState({ if_progression_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='primary_surgery'>Primary surgery</Label>
                    <AvInput type='select' name='primary_surgery' id='primary_surgery' required value={patient.primary_surgery} onChange={(e) => this.setState({ primary_surgery: e.target.value })}>
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
                        <AvInput type='select' name='nodalsurgery' id='nodalsurgery' required value={patient.nodal_surgery} onChange={(e) => this.showNodalSurgery(e.target.value)}>
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
                    <AvField placeholder="" name='ifnodalsurgeryandother' id='ifnodalsurgeryandother' value={patient.nodal_surgery_if_other} onChange={(e) => this.setState({ nodal_surgery_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div className="col-md-12"></div>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='reconstructiondone'>Reconstruction done</Label>
                      <AvInput type='select' name='reconstructiondone' id='reconstructiondone' required value={patient.reconstruction_done} onChange={(e) => this.showReconstruction(e.target.value)}>
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
                      <AvInput type='select' name='timingofreconstruction' id='timingofreconstruction' required value={patient.timing_of_reconstruction} onChange={(e) => this.setState({ timing_of_reconstruction: e.target.value })}>
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
                      <AvInput type='select' name='typeofreconstruction' id='typeofreconstruction' required value={patient.type_of_reconstruction} onChange={(e) => this.showReconstructionType(e.target.value)}>
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
                      <AvField placeholder="" name='typeofreconstructionother' id='typeofreconstructionother' value={patient.type_of_reconstruction_if_other} onChange={(e) => this.setState({ type_of_reconstruction_if_other: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                      <Label for='adjuvantchemotherapy'>Adjuvant chemotherapy</Label>
                      <AvInput type='select' name='adjuvantchemotherapy' id='adjuvantchemotherapy' required value={patient.adjuvant_chemotherapy} onChange={(e) => this.showAdjuvantChemotherapy(e.target.value)}>
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
                      <AvInput type='select' name='adjuvantchemotherapyifyes' id='adjuvantchemotherapyifyes' required value={patient.adjuvant_chemotherapy_if_yes} onChange={(e) => this.showAdjuvantChemotherapyIfYes(e.target.value)}>
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
                      <AvField placeholder="" name='adjuvantchemotherapyother' id='adjuvantchemotherapyother' value={patient.adjuvant_chemotherapy_if_other} onChange={(e) => this.setState({ adjuvant_chemotherapy_if_other: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}


                <div className="col-md-12"></div>
                <div className="col-md-3">
                  <AvGroup>            
                      <Label for='adjuvantbonemodify'>Adjuvant bone modifying agent given</Label>
                      <AvInput type='select' name='adjuvantbonemodify' id='adjuvantbonemodify' required value={patient.adjuvant_bone_modifying_agent_given} onChange={(e) => this.showAdjuvantBoneModify(e.target.value)}>
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
                      <AvInput type='select' name='fertilityoptionundertakenbone' id='fertilityoptionundertakenbone' required value={patient.adjuvant_bone_modifying_agent_given_if_yes} onChange={(e) => this.setState({ adjuvant_bone_modifying_agent_given_if_yes: e.target.value })}>
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
                      <AvInput type='select' name='fertilityoptionundertakenboneother' id='fertilityoptionundertakenboneother' required value={patient.duration_of_bone_modifying} onChange={(e) => this.showFertilityOptionUndertakenBoneOther(e.target.value)}>
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
                      <AvField placeholder="" name='fertilityoptionundertakenboneotherifother' id='fertilityoptionundertakenboneotherifother' value={patient.duration_of_bone_modifying_if_other} onChange={(e) => this.setState({ duration_of_bone_modifying_if_other: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='her2targetedtherapy'>HER2 targeted therapy</Label>
                    <AvInput type='select' name='her2targetedtherapy' id='her2targetedtherapy' required value={patient.her2_targeted_therapy} onChange={(e) => this.showHER2TargetedTherapy(e.target.value)}>
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
                        <AvInput type='select' name='her2targetedtherapyduration' id='her2targetedtherapyduration' required value={patient.duration_of_her2_targeted_therapy} onChange={(e) => this.showHER2TargetedTherapyDuration(e.target.value)}>
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
                    <AvField placeholder="" name='her2targetedtherapydurationifother' id='her2targetedtherapydurationifother' value={patient.show_her2_targeted_duration_if_other} onChange={(e) => this.setState({ show_her2_targeted_duration_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}
                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='dualantiher2'>Dual anti-HER2 therapy given (Trastuzumab / Pertuzumab)</Label>
                    <AvInput type='select' name='dualantiher2' id='dualantiher2' required value={patient.dual_anti_her_2_given} onChange={(e) => this.showDualAntiHER2(e.target.value)}>
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
                        <AvInput type='select' name='dualantiher2ifyes' id='dualantiher2ifyes' required value={patient.dual_anti_her_2_given_if_yes} onChange={(e) => this.setState({ dual_anti_her_2_given_if_yes: e.target.value})}>
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
                    <AvInput type='select' name='adjuvantradiotherapy' id='adjuvantradiotherapy' required value={patient.adjuvant_radiotherapy} onChange={(e) => this.showAdjuvantRadioTherapy(e.target.value)}>
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
                        <AvInput type='select' name='adjuvantradiotherapyifyes' id='adjuvantradiotherapyifyes' required value={patient.adjuvant_radiotherapy_if_yes} onChange={(e) => this.showAdjuvantRadioTherapyIfYes(e.target.value)}>
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
                    <AvField placeholder="" name='adjuvantradiotherapyifyesother' id='adjuvantradiotherapyifyesother' value={patient.adjuvant_radiotherapy_if_yes_other} onChange={(e) => this.setState({ adjuvant_radiotherapy_if_yes_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}

                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='adjuvantendocrinetherapy'>Adjuvant endocrine therapy</Label>
                    <AvInput type='select' name='adjuvantendocrinetherapy' id='adjuvantendocrinetherapy' required value={patient.adjuvant_endocrine_therapy} onChange={(e) => this.showAdjuvantEndocrineTherapy(e.target.value)}>
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
                      <AvField placeholder="" name='adjuvantendocrinetherapyifyes' id='adjuvantendocrinetherapyifyes' value={patient.adjuvant_endocrine_therapy_if_other} onChange={(e) => this.setState({ adjuvant_endocrine_therapy_if_other: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}

                <div class="col-md-12"><hr /></div>
                <div className="col-md-6">
                  <AvGroup>            
                    <Label for='recommendeddurationadjuvantendocrinetherapy'>Recommended duration of adjuvant endocrine</Label>
                    <AvInput type='select' name='recommendeddurationadjuvantendocrinetherapy' id='recommendeddurationadjuvantendocrinetherapy' required value={patient.recommended_duration_of_adjuvant_endocrine} onChange={(e) => this.showRecommendedDurationAdjuvantEndocrineTherapy(e.target.value)}>
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
                      <AvField placeholder="" name='recommendeddurationadjuvantendocrinetherapyifother' id='recommendeddurationadjuvantendocrinetherapyifother' value={patient.recommended_duration_of_adjuvant_endocrine_if_other} onChange={(e) => this.setState({ recommended_duration_of_adjuvant_endocrine_if_other: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                  </div>
                )}
                
                <div class="col-md-12"><hr /></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='reasonforstoppingaet'>Reason for stopping adjuvant endocrine therapy</Label>
                    <AvInput type='select' name='reasonforstoppingaet' id='reasonforstoppingaet' required value={patient.reason_for_stopping_adjuvant_endocrine_therapy} onChange={(e) => this.setState({ reason_for_stopping_adjuvant_endocrine_therapy: e.target.value })}>
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
                        <AvInput type='select' name='ifpresentedwithmetastases' id='ifpresentedwithmetastases' required value={patient.first_line_therapy} onChange={(e) => this.showIfPresentedWithMetastases(e.target.value)}>
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
                      <AvField placeholder="" name='ifpresentedwithmetastasesifother' id='ifpresentedwithmetastasesifother' value={patient.first_line_therapy_if_other} onChange={(e) => this.setState({ first_line_therapy_if_other: e.target.value})} required />
                      <AvFeedback>Please enter the If Other!</AvFeedback>
                    </AvGroup>
                </div>
                )}

                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='ngsdoneatdiagnosis'>NGS done at diagnosis</Label>
                    <AvInput type='select' name='ngsdoneatdiagnosis' id='ngsdoneatdiagnosis' required value={patient.ngs_done_at_diagnosis} onChange={(e) => this.showNGSDoneAtDiagnosis(e.target.value)}>
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
                        <AvInput type='select' name='ngsdoneatdiagnosisifyes' id='ngsdoneatdiagnosisifyes' required value={patient.ngs_done_at_diagnosis_if_yes} onChange={(e) => this.setState({ ngs_done_at_diagnosis_if_yes: e.target.value })}>
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
                      <AvField placeholder="" name='ngsdoneatdiagnosisifyesidentifiedtargets' id='ngsdoneatdiagnosisifyesidentifiedtargets' value={patient.ngs_done_at_diagnosis_if_yes_write} onChange={(e) => this.setState({ ngs_done_at_diagnosis_if_yes_write: e.target.value})} required />
                      <AvFeedback>Please enter If yes, targets identified!</AvFeedback>
                    </AvGroup>
                  </div>
                  </>
                )}

                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='ngsdoneatrecurrence'>NGS done at recurrence</Label>
                    <AvInput type='select' name='ngsdoneatrecurrence' id='ngsdoneatrecurrence' required value={patient.ngs_done_at_recurrence} onChange={(e) => this.showNGSDoneAtRecurrence(e.target.value)}>
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
                        <AvInput type='select' name='ngsdoneatrecurrenceifyes' id='ngsdoneatrecurrenceifyes' required value={patient.ngs_done_at_recurrence_if_yes} onChange={(e) => this.setState({ ngs_done_at_recurrence_if_yes: e.target.value })}>
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
                      <AvField placeholder="" name='ngsdoneatrecurrenceifyesidentifiedtargets' id='ngsdoneatrecurrenceifyesidentifiedtargets' value={patient.ngs_done_at_recurrence_if_yes_write} onChange={(e) => this.setState({ ngs_done_at_recurrence_if_yes_write: e.target.value})} required />
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

export default withRouter(EditTreatment);
