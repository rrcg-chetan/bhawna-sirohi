const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
var jwt = require("jsonwebtoken");
var url = require('url')
var bodyParser = require('body-parser')

const bcrypt = require('bcrypt')
const saltRounds = 10;


const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "bhawna_ywbc"
})

app.get('/question', (req, res) => {
  range = req.query.page;
  limit = req.query.per_page;
  userid = req.query.submited_by;
  role = req.query.role;
  //console.log(range+' '+limit+ ' '+userid)
  db.query("SELECT count(*) as TotalCount FROM questions where submited_by = ? and status = ?", [userid, "1"], function(err, rows) {
    if(err){
      console.log(err)
    }else{
      let totalCount = rows[0].TotalCount;
      let userrole = role       
      console.log(userrole)
      if(userrole == 'admin'){
        let query = "SELECT id, hospital_id, code, patients_dob, status, name_of_institution, city, country FROM questions where status = ? and demographics_completed = ? and initialpresentation_completed = ? and pathology_completed = ? and treatment_completed = ? and followup_completed = ? and healtheconomics_completed = ? order by id desc limit ?, ?"
        db.query(query,  ["1", "true", "true", "true", "true", "true", "true", parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
          if (err) {
              console.log(err);
            }else{
              res.send({
                "page": range,
                "per_page": limit,
                "total_pages": parseInt(totalCount / limit),
                "total": totalCount,
                "data":result})          
              }            
        });
      }else{
        let query = "SELECT id, hospital_id, code, patients_dob, status, name_of_institution, city, country, demographics_completed, initialpresentation_completed, pathology_completed, treatment_completed, followup_completed, healtheconomics_completed FROM questions where submited_by = ? and status = ? and demographics_completed = ? and initialpresentation_completed = ? and pathology_completed = ? and treatment_completed = ? and followup_completed = ? and healtheconomics_completed = ? order by id desc limit ?, ?"
        db.query(query,  [userid, "1", "true", "true", "true", "true", "true", "true", parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
          if (err) {
              console.log(err);
            }else{
              res.send({
                "page": range,
                "per_page": limit,
                "total_pages": parseInt(totalCount / limit),
                "total": totalCount,
                "data":result})          
              }            
        });
      }       
    }
  });
});

app.get('/questionincomplete', (req, res) => {
  range = req.query.page;
  limit = req.query.per_page;
  userid = req.query.submited_by;
  role = req.query.role;
  //console.log(range+' '+limit+ ' '+userid)
  db.query("SELECT count(*) as TotalCount FROM questions where submited_by = ? and status = ? and (demographics_completed= ? or initialpresentation_completed= ? or pathology_completed= ? or treatment_completed= ? or followup_completed= ? or healtheconomics_completed = ?)", [userid, "1", "false", "false", "false", "false", "false", "false"], function(err, rows) {
    if(err){
      console.log(err)
    }else{
      let totalCount = rows[0].TotalCount;
      let userrole = role       
      console.log(totalCount)
      if(userrole == 'admin'){
        let query = "SELECT id, hospital_id, code, patients_dob, status, name_of_institution, city, country, demographics_completed, initialpresentation_completed, pathology_completed, treatment_completed, followup_completed, healtheconomics_completed FROM questions where status = ? and (demographics_completed= ? or initialpresentation_completed= ? or pathology_completed= ? or treatment_completed= ? or followup_completed= ? or healtheconomics_completed = ?) order by id desc limit ?, ?"
        //console.log(query)
        db.query(query,  ["1", "false", "false", "false", "false", "false", "false", parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
          if (err) {
              console.log(err);
            }else{
              res.send({
                "page": range,
                "per_page": limit,
                "total_pages": parseInt(totalCount / limit),
                "total": totalCount,
                "data":result})          
              }            
        });
      }else{
        let query = "SELECT id, hospital_id, code, patients_dob, status, name_of_institution, city, country, demographics_completed, initialpresentation_completed, pathology_completed, treatment_completed, followup_completed, healtheconomics_completed FROM questions where submited_by = ? and status = ? and (demographics_completed= ? or initialpresentation_completed= ? or pathology_completed= ? or treatment_completed= ? or followup_completed= ? or healtheconomics_completed = ?) order by id desc limit ?, ?"
        //console.log(query)
        db.query(query,  [userid, "1", "false", "false", "false", "false", "false", "false", parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
          if (err) {
              console.log(err);
            }else{
              res.send({
                "page": range,
                "per_page": limit,
                "total_pages": parseInt(totalCount / limit),
                "total": totalCount,
                "data":result})          
              }            
        });
      }       
    }
  });
});

app.get('/allusers', (req, res) => {
  range = req.query.page;
  limit = req.query.per_page;
  console.log(range+' '+limit)
  db.query("SELECT count(*) as TotalCount FROM accounts", function(err, rows) {
    if(err){
      console.log(err)
    }else{
      let totalCount = rows[0].TotalCount;
  db.query("SELECT id, name, email, code, date_created FROM accounts order by id desc",[parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
      if (err) {
          console.log(err);
        }else{
          res.send({
            "page": range,
            "per_page": limit,
            "total_pages": parseInt(totalCount / limit),
            "total": totalCount,
            "data":result})
          //console.log(totalCount);
          }            
    });   
  }
});
});

app.get('/users', (req, res) => {
  range = req.query.page;
  limit = req.query.per_page;  
  userid = req.query.submited_by;
  role = req.query.role;
  //console.log(range+' '+limit)
  db.query("SELECT count(*) as TotalCount FROM accounts", function(err, rows) {
    if(err){
      //console.log(err)
    }else{
      let totalCount = rows[0].TotalCount;
      let userrole = role          
      console.log(userrole)
      if(userrole == 'admin'){
        //db.query(, [parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
        let query = "SELECT id, institution_name, email, code, date_created FROM accounts order by id desc limit ?, ?"
        db.query(query,  [parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
          if (err) {
              console.log(err);
            }else{
              res.send({
                "page": range,
                "per_page": limit,
                "total_pages": parseInt(totalCount / limit),
                "total": totalCount,
                "data":result})          
              }            
        });
      }else{
        let query = "SELECT id, institution_name, email, code, date_created FROM accounts where id = ? order by id desc limit ?, ?"
        db.query(query, [userid, parseInt(limit * range), parseInt(limit)], function (err, result, fields) {
          if (err) {
              console.log(err);
            }else{
              res.send({
                "page": range,
                "per_page": limit,
                "total_pages": parseInt(totalCount / limit),
                "total": totalCount,
                "data":result})          
              }            
        });
      }   
    
  }
})

});

app.post('/adduser', async (req, res) => {
  console.log(req.body);
  login_name= req.body.login_name; country= req.body.country; centre= req.body.centre; user_role= req.body.user_role; culture= req.body.culture; timezone= req.body.timezone; acc_dis= req.body.accountdisabled; pass_never= req.body.passexpires; must_change= req.body.nextloginpassword; cant_change= req.body.cannotchangepassword; user_title= req.body.user_title; first_name= req.body.first_name; last_name= req.body.last_name; name = req.body.name; email= req.body.email; password= bcrypt.hashSync(req.body.password, saltRounds); street_address= req.body.street_address; city= req.body.city; phone_1= req.body.phone_1; phone_2= req.body.phone_2; fax= req.body.fax; dateofbirth= req.body.dateofbirth; code= req.body.code; status= req.body.status; date_created= req.body.date_created;
  
  db.query(
  "insert into accounts (`login_name`,`country`,`centre`,`user_role`,`culture`,`timezone`,`acc_dis`,`pass_never`,`must_change`,`cant_change`,`user_title`,`first_name`,`last_name`, `name`, `email`,`street_address`, `pword`, `city`,`phone_1`,`phone_2`,`fax`, `dob`, `code`, `status`, `date_created`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [login_name, country, centre, user_role, culture, timezone, acc_dis, pass_never, must_change, cant_change, user_title, first_name, last_name, name, email, street_address, password, city, phone_1, phone_2, fax, dateofbirth, code, status, date_created], async function (error, results, fields) {
      if (error) {
          res.send({
            "code":400,
            "failed":error            
          })
        }else{
          res.send({
              "code":200,
              "success":"User Created Sucessfully!"
              })              
          }            
    });
});

app.get('/getuserdetails/:id', async (req, res) => {
  id= req.params.id;  
  db.query(
  "SELECT * FROM accounts where id = ?", [id], async function (error, results, fields) {
      if (error) {
          res.send({
            "code":400,
            "failed":error            
          })
        }else{
          res.send({
              "code":200,
              "data":results
              })              
          }            
    });   
});

app.put('/updateuser/:id', async (req, res) => {
  id= req.params.id;
  console.log(req.body);
  login_name= req.body.login_name; country= req.body.country; centre= req.body.centre; user_role= req.body.user_role; culture= req.body.culture; timezone= req.body.timezone; acc_dis= req.body.acc_dis; pass_never= req.body.pass_never; must_change= req.body.must_change; cant_change= req.body.cant_change; user_title= req.body.user_title; first_name= req.body.first_name; last_name= req.body.last_name; name = req.body.name; email= req.body.email; street_address= req.body.street_address; city= req.body.city; phone_1= req.body.phone_1; phone_2= req.body.phone_2; fax= req.body.fax; dateofbirth= req.body.dateofbirth;
  
  db.query(
  "update accounts set `login_name` = ?, `country` = ?, `centre` = ?, `user_role` = ?, `culture` = ?, `timezone` = ?, `acc_dis` = ?, `pass_never` = ?, `must_change` = ?, `cant_change` = ?, `user_title` = ?, `first_name` = ?, `last_name` = ?, `name` = ?, `email` = ?, `street_address` = ?, `city` = ?, `phone_1` = ?, `phone_2` = ?, `fax` = ?, `dob` = ? where id=?", [login_name, country, centre, user_role, culture, timezone, acc_dis, pass_never, must_change, cant_change, user_title, first_name, last_name, name, email, street_address, city, phone_1, phone_2, fax, dateofbirth, id], async function (error, results, fields) {
      if (error) {
          res.send({
            "code":400,
            "failed":error            
          })
        }else{
          res.send({
              "code":200,
              "success":"User Details Updated!"
              })              
          }            
    });
});

app.post('/register', async (req, res) => {
    name = req.body.name;
    email = req.body.email;
    password = bcrypt.hashSync(req.body.password, saltRounds),
    code = req.body.code;
    status = req.body.status;
    date_created = req.body.date_created;

    db.query(
    "insert into accounts (`institution_name`, `email`, `pword`, `code`, `status`, `date_created`, `user_role`) values (?, ?, ?, ?, ?, ?, ?)", [name, email, password, code, status, date_created, 'user'], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
          }else{
            res.send({
                "code":200,
                "success":"Successfully Registered!"
                })              
            }            
      });   
});

app.post("/login", async (req, res) => {
    var email= req.body.email;
    var password = req.body.password;
    const user = db.query('SELECT * FROM accounts WHERE email = ?',[email], async function (error, results, fields) {
        if (error) {
            res.send({
              "email": email,
              "code":400,
              "failed":"error ocurred"
            })
          }else{
            if(results.length >0){
              const comparision = await bcrypt.compare(password, results[0].pword)
              if(comparision){
                  let token = jwt.sign({ email: user.email }, 'shona nag cms', { expiresIn: 129600 }); // Signing the token
                  res.send({
                    "email": email,
                    "code":200,
                    "success":"Successfully Logged In!",
                    token,
                    users: {
                      userid: results[0].id,
                      hospitalid: results[0].code,
                      loginname: results[0].login_name,
                      institution: results[0].institution_name,
                      role: results[0].user_role,
                    }
                  })
              }
              else{
                res.send({
                     "email": email,
                     "code":204,
                     "failed":"Email and password does not match"
                })
              }
            }
            else{
              res.send({
                "email": email,
                "code":206,
                "failed":"Email does not exits"
                  });
            }
          }
      });
  });

  /*app.post("/logout", async (req, res) => {
    
  });*/

  app.post('/patientdetails', async (req, res) => {
    console.log(req.body);

    patient_name = req.body.patient_name, city = req.body.city, country = req.body.country, hospital_id = req.body.hospital_id, patient_initial = req.body.patient_initial, date_of_birth = req.body.date_of_birth, age_of_diagnosis = req.body.age_of_diagnosis, date_of_diagnosis = req.body.date_of_diagnosis, praffin = req.body.praffin, profession = req.body.profession, other_profession = req.body.other_profession, ethnicity = req.body.ethnicity, other_ethnicity = req.body.other_ethnicity, height = req.body.height, weight = req.body.weight, bmi = req.body.bmi, family_ho_cancer = req.body.family_ho_cancer, family_has_cancer = req.body.family_has_cancer, other_family_has_cancer = req.body.other_family_has_cancer, type_of_cancer = req.body.type_of_cancer, age_at_diagnosis_of_relative = req.body.age_at_diagnosis_of_relative, presenting_symptom = req.body.presenting_symptom, monthly_family_income = req.body.monthly_family_income, amount = req.body.amount, co_morbidities = req.body.co_morbidities, other_co_morbodities = req.body.other_co_morbodities, code= req.body.code; status= req.body.status; date_created= req.body.date_created; name_of_institution = req.body.name_of_institution; submited_by = req.body.submited_by, metastases_types= req.body.metastases_types, first_treatment_given= req.body.first_treatment_given, areaofrecurrence= req.body.areaofrecurrence;

    db.query(
    "insert into questions (`patient_name`, `city`, `country`, `hospital_id`, `patients_initial`, `patients_dob`, `age_of_diagnosis`, `date_of_diagnosis_of_bc`, `paraffin_blocks`, `profession`, `profession_if_other`, `ethnicity`, `ethnicity_if_other`, `patients_height`, `patients_weight`, `patients_bmi`, `family_have_cancer`, `which_relative`, `type_other_family_name`, `type_of_cancer`, `age_at_diagnosis`, `presenting_symptoms`, `family_income_type`, `family_income_amount`, `co_morbidities`, `co_morbidities_if_other`, `code`, `status`, `date_submitted`, `name_of_institution`, `submited_by`, `metastases_types`, `first_treatment_given`, `area_of_recurrence`, `demographics_completed`, `initialpresentation_completed`, `pathology_completed`, `treatment_completed`, `followup_completed`, `healtheconomics_completed`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [patient_name, city, country, hospital_id, patient_initial, date_of_birth, age_of_diagnosis, date_of_diagnosis, praffin, profession, other_profession, ethnicity, other_ethnicity, height, weight, bmi, family_ho_cancer, family_has_cancer, other_family_has_cancer, type_of_cancer, age_at_diagnosis_of_relative, presenting_symptom, monthly_family_income, amount, co_morbidities, other_co_morbodities, code, status, date_created, name_of_institution, submited_by, JSON.stringify(metastases_types), JSON.stringify(first_treatment_given), JSON.stringify(areaofrecurrence), "true", "false", "false", "false", "false", "false"], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error,
              "status": "Details Required!"
            })
          }else{
            res.send({
                "code":200,
                "success":"Demographics Submitted Sucessfully!"
                })              
            }            
      });
  });

  app.post('/updatepatientdemographydetails', async (req, res) => {
    //console.log(req.body)
    var fieldsToUpdate = [];
    for (const field of Object.entries(req.body)) {
      var fld1 = field.toString().replace(/,.*/, "")
      var fld2 = field.toString().replace(/^[^,]+, */, "")
      var fldf1 = fld1.toString().replace('\\', "")
      var fldf2 = fld2.toString().replace('\\', "")      
      fieldsToUpdate.push("`"+fldf1+"`" + ' = ' + "'"+fldf2+"'")
    }
    db.query(
    "UPDATE questions SET "+fieldsToUpdate+" WHERE `code` = '" + req.body.code + "'", function (error, results, fields) {
      if (error) {
        res.status(404).json({
            message: error,
            field: fieldsToUpdate
        });
      } else {
          res.status(201).json({
              "record_count" : results.length,
              "error": null,
              "success":"Demography Sucessfully Updated!"
          });
      }          
    });
  })

  app.get('/getfulldetails/:code', async (req, res) => {
    code= req.params.code;  
    db.query(
    "SELECT * FROM questions where code = ?", [code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error            
            })
          }else{
            res.send({
                "code":200,
                "results":results
                })              
            }            
      });   
  });

  app.post('/patientinitialpresentationdetails', async (req, res) => {
    //console.log(req.body);
    code= req.body.code, presentation = req.body.presentation, at_diagnosis = req.body.at_diagnosis, laterality = req.body.laterality, cT = req.body.cT, cTbasedon = req.body.cTbasedon, cN = req.body.cN, cNbasedon = req.body.cNbasedon, cM = req.body.cM, cMbasedon = req.body.cMbasedon, metastases = req.body.metastases, total_number_of_metastases = req.body.total_number_of_metastases, metastases_types = req.body.metastases_types, other_metastases_types = req.body.other_metastases_types, first_treatment_given = req.body.first_treatment_given, germline_testing_done = req.body.germline_testing_done, genetics = req.body.genetics, other_genetics = req.body.other_genetics, pregnancy_associated_breast_cancer = req.body.pregnancy_associated_breast_cancer, treatment_text = req.body.treatment_text, metastases_text = req.body.metastases_text

    db.query(
    "update questions set `presentation` = ? , `at_diagnosis` = ? , `laterality` = ?, `cT` = ?, `ct_based_one` = ?, `cN` = ? , `cn_bases_on` = ? , `cM` = ? , `cm_based_on` = ? , `metastases` = ?, `total_number_of_metastatus` = ?, `metastases_types` = ? , `other_metastases_types` = ?, `first_treatment_given` = ?, `germline_testing` = ?, `genetic_testing_done` = ? , `genetic_testing_done_and_other` = ? , `pregnancy_associated_b_c` = ?, `initialpresentation_completed` = ? where `code` = ?", [presentation, at_diagnosis, laterality, cT, cTbasedon, cN, cNbasedon, cM, cMbasedon, metastases, total_number_of_metastases, JSON.stringify(metastases_types), other_metastases_types, JSON.stringify(first_treatment_given), germline_testing_done, genetics, other_genetics, pregnancy_associated_breast_cancer, "true", code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error,
              "value": req.body.code,
              "status": "Details Required!"
            })
          }else{
            res.send({
                "code":200,
                "value": req.body.code,
                "success":"Initial Presentation Sucessfully Submitted!"
                })              
            }            
      });
  });

  app.post('/updatepatientdetails', async (req, res) => {
    //console.log(req.body)
    var fieldsToUpdate = [];
    for (const field of Object.entries(req.body)) {
      var fld1 = field.toString().replace(/,.*/, "")
      var fld2 = field.toString().replace(/^[^,]+, */, "")
      var fldf1 = fld1.toString().replace('\\', "")
      var fldf2 = fld2.toString().replace('\\', "")      
      fieldsToUpdate.push("`"+fldf1+"`" + ' = ' + "'"+fldf2+"'")
    }
    console.log(fieldsToUpdate)
    db.query(
    "UPDATE questions SET "+fieldsToUpdate+" WHERE `code` = '" + req.body.code + "'", function (error, results, fields) {
      if (error) {
        res.status(404).json({
            message: error,
            field: fieldsToUpdate
        });
      } else {
          res.status(201).json({
              "record_count" : results.length,
              "error": null,
              "value": req.body.code,
              "success":"Sucessfully Updated!"
          });
      }          
    });
  })

  app.post('/patientpathologydetails', async (req, res) => {
    console.log(req.body);

    pathologytype = req.body.pathologytype, other_type = req.body.other_type, grade = req.body.grade, code = req.body.code, pT = req.body.pT, pN = req.body.pN, ypT = req.body.ypT, ypN = req.body.ypN, pathologicalsizeofcancer = req.body.pathologicalsizeofcancer, ER = req.body.ER, PR = req.body.PR, HER2 = req.body.HER2, showher = req.body.showher

    db.query(
    "update questions set `pathology_type` = ? , `pathology_type_if_other` = ? , `pathology_grade` = ?, `pt` = ?, `pn` = ?, `ypt` = ? , `ypn` = ? , `pathological_size_of_cancer` = ? , `er` = ? , `pr` = ?, `her2` = ?, `if_2_plus` = ?, `pathology_completed` = ? where `code` = ?", [pathologytype, other_type, grade, pT, pN, ypT, ypN, pathologicalsizeofcancer, ER, PR, HER2, showher, "true", code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error,
              "value": req.body.code,
              "status": "Details Required!"
            })
          }else{
            res.send({
                "code":200,
                "value": req.body.code,
                "success":"Pathology Sucessfully Submitted!"
                })              
            }            
      });
  });

  app.post('/patienttreatmentdetails', async (req, res) => {
    console.log(req.body);

    /*pathologytype = req.body.pathologytype, other_type = req.body.other_type, grade = req.body.grade, code = req.body.code, pT = req.body.pT, pN = req.body.pN, ypT = req.body.ypT, ypN = req.body.ypN, pathologicalsizeofcancer = req.body.pathologicalsizeofcancer, ER = req.body.ER, PR = req.body.PR, HER2 = req.body.HER2, showher = req.body.showher*/

    fertilitydiscussed = req.body.fertilitydiscussed, fertilityoptionundertaken = req.body.fertilityoptionundertaken, fertilitydiscussedifother = req.body.fertilitydiscussedifother, neoadjuvanttherapy = req.body.neoadjuvanttherapy, neoadjuvanttherapyifyes = req.body.neoadjuvanttherapyifyes, neoadjuvantthereayifyesother = req.body.neoadjuvantthereayifyesother, ovariansuppression = req.body.ovariansuppression, ovariansuppressionifyes = req.body.ovariansuppressionifyes, responsetoneoadjuvantchemotherapy = req.body.responsetoneoadjuvantchemotherapy, ifprogression = req.body.ifprogression, ifprogressionandother = req.body.ifprogressionandother, primarysurgery = req.body.primarysurgery, nodalsurgery = req.body.nodalsurgery, ifnodalsurgeryandother = req.body.ifnodalsurgeryandother, reconstructiondone = req.body.reconstructiondone, timingofreconstruction = req.body.timingofreconstruction, typeofreconstruction = req.body.typeofreconstruction, typeofreconstructionother = req.body.typeofreconstructionother, adjuvantchemotherapy = req.body.adjuvantchemotherapy, adjuvantchemotherapyifyes = req.body.adjuvantchemotherapyifyes, adjuvantchemotherapyother = req.body.adjuvantchemotherapyother, adjuvantbonemodify = req.body.adjuvantbonemodify, fertilityoptionundertakenbone = req.body.fertilityoptionundertakenbone, fertilityoptionundertakenboneother = req.body.fertilityoptionundertakenboneother, fertilityoptionundertakenboneotherifother = req.body.fertilityoptionundertakenboneotherifother, her2targetedtherapy = req.body.her2targetedtherapy, her2targetedtherapyduration = req.body.her2targetedtherapyduration, her2targetedtherapydurationifother = req.body.her2targetedtherapydurationifother, dualantiher2 = req.body.dualantiher2, dualantiher2ifyes = req.body.dualantiher2ifyes, adjuvantradiotherapy = req.body.adjuvantradiotherapy, adjuvantradiotherapyifyes = req.body.adjuvantradiotherapyifyes, adjuvantradiotherapyifyesother = req.body.adjuvantradiotherapyifyesother, adjuvantendocrinetherapy = req.body.adjuvantendocrinetherapy, adjuvantendocrinetherapyifyes = req.body.adjuvantendocrinetherapyifyes, recommendeddurationadjuvantendocrinetherapy = req.body.recommendeddurationadjuvantendocrinetherapy, recommendeddurationadjuvantendocrinetherapyifother = req.body.recommendeddurationadjuvantendocrinetherapyifother, reasonforstoppingaet = req.body.reasonforstoppingaet, ifpresentedwithmetastases = req.body.ifpresentedwithmetastases, ifpresentedwithmetastasesifother = req.body.ifpresentedwithmetastasesifother, ngsdoneatdiagnosis = req.body.ngsdoneatdiagnosis, ngsdoneatdiagnosisifyes = req.body.ngsdoneatdiagnosisifyes, ngsdoneatdiagnosisifyesidentifiedtargets = req.body.ngsdoneatdiagnosisifyesidentifiedtargets, ngsdoneatrecurrence = req.body.ngsdoneatrecurrence, ngsdoneatrecurrenceifyes = req.body.ngsdoneatrecurrenceifyes, ngsdoneatrecurrenceifyesidentifiedtargets = req.body.ngsdoneatrecurrenceifyesidentifiedtargets, code = req.body.code

    db.query(
    "update questions set `fertility_discussed` = ? , `fertility_discussed_if_yes` = ? , `fertility_discussed_if_other` = ?, `neo_adjuvant_therapy` = ?, `neo_adjuvant_therapy_if_yes` = ?, `neo_adjuvant_therapy_if_other` = ? , `ovarian_supression_during_chemotherapy` = ? , `ovarian_supression_during_chemotherapy_if_yes` = ? , `response_to_neoadjuvant_chemotherapy` = ? , `if_progression` = ?, `if_progression_if_other` = ?, `primary_surgery` = ?, `nodal_surgery` = ?, `nodal_surgery_if_other` = ?, `reconstruction_done` = ?, `timing_of_reconstruction` = ?, `type_of_reconstruction` = ?, `type_of_reconstruction_if_other` = ?, `adjuvant_chemotherapy` = ?, `adjuvant_chemotherapy_if_yes` = ?, `adjuvant_chemotherapy_if_other` = ?, `adjuvant_bone_modifying_agent_given` = ?, `adjuvant_bone_modifying_agent_given_if_yes` = ?, `duration_of_bone_modifying` = ?, `duration_of_bone_modifying_if_other` = ?, `her2_targeted_therapy` = ?, `duration_of_her2_targeted_therapy` = ?, `show_her2_targeted_duration_if_other` = ?, `dual_anti_her_2_given` = ?, `dual_anti_her_2_given_if_yes` = ?, `adjuvant_radiotherapy` = ?,  `adjuvant_radiotherapy_if_yes` = ?,  `adjuvant_radiotherapy_if_yes_other` = ?, `adjuvant_endocrine_therapy` = ?, `adjuvant_endocrine_therapy_if_other` = ?, `recommended_duration_of_adjuvant_endocrine` = ?, `recommended_duration_of_adjuvant_endocrine_if_other`= ?, `reason_for_stopping_adjuvant_endocrine_therapy` = ?, `first_line_therapy` = ?, `first_line_therapy_if_other` = ?, `ngs_done_at_diagnosis` = ?, `ngs_done_at_diagnosis_if_yes` = ?, `ngs_done_at_diagnosis_if_yes_write` = ?, `ngs_done_at_recurrence` = ?, `ngs_done_at_recurrence_if_yes` = ?, `ngs_done_at_recurrence_if_yes_write` = ?, `treatment_completed` = ? where `code` = ?", [fertilitydiscussed, fertilityoptionundertaken, fertilitydiscussedifother, neoadjuvanttherapy, neoadjuvanttherapyifyes, neoadjuvantthereayifyesother, ovariansuppression, ovariansuppressionifyes, responsetoneoadjuvantchemotherapy, ifprogression, ifprogressionandother, primarysurgery, nodalsurgery, ifnodalsurgeryandother, reconstructiondone, timingofreconstruction, typeofreconstruction, typeofreconstructionother, adjuvantchemotherapy, adjuvantchemotherapyifyes, adjuvantchemotherapyother, adjuvantbonemodify, fertilityoptionundertakenbone, fertilityoptionundertakenboneother, fertilityoptionundertakenboneotherifother, her2targetedtherapy, her2targetedtherapyduration, her2targetedtherapydurationifother, dualantiher2, dualantiher2ifyes, adjuvantradiotherapy, adjuvantradiotherapyifyes, adjuvantradiotherapyifyesother, adjuvantendocrinetherapy, adjuvantendocrinetherapyifyes, recommendeddurationadjuvantendocrinetherapy, recommendeddurationadjuvantendocrinetherapyifother, reasonforstoppingaet, ifpresentedwithmetastases, ifpresentedwithmetastasesifother, ngsdoneatdiagnosis, ngsdoneatdiagnosisifyes, ngsdoneatdiagnosisifyesidentifiedtargets, ngsdoneatrecurrence, ngsdoneatrecurrenceifyes, ngsdoneatrecurrenceifyesidentifiedtargets, "true", code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error,
              "value": req.body.code,
              "status": "Details Required!"
            })
          }else{
            res.send({
                "code":200,
                "value": req.body.code,
                "success":"Treatment Sucessfully Submitted!"
                })              
            }            
      });
  });

  app.post('/patientfollowupdetails', async (req, res) => {
    console.log(req.body);

    recurrence = req.body.recurrence, dateofrecurrence = req.body.dateofrecurrence, areaofrecurrence = req.body.areaofrecurrence, detectionofrecurrence = req.body.detectionofrecurrence, recurrenceifmetastases = req.body.recurrenceifmetastases, recurrenceifmetastasesifother = req.body.recurrenceifmetastasesifother, lostfollowup = req.body.lostfollowup, dateofdeath = req.body.dateofdeath, dateoflastfollowup = req.body.dateoflastfollowup, code = req.body.code

    db.query(
    "update questions set `recurrence` = ? , `date_of_recurrence` = ? , `area_of_recurrence` = ?, `if_metastases` = ?, `metastases_if_other` = ?, `detection_of_recurrence` = ? , `lost_to_follow_up` = ? , `date_of_death` = ? , `date_of_last_follow_up` = ?, `followup_completed` = ? where `code` = ?", [recurrence, dateofrecurrence, JSON.stringify(areaofrecurrence), recurrenceifmetastases, recurrenceifmetastasesifother, detectionofrecurrence, lostfollowup, dateofdeath, dateoflastfollowup, "true", code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error,
              "value": req.body.code,
              "status": "Details Required!"
            })
          }else{
            res.send({
                "code":200,
                "value": req.body.code,
                "success":"Followup Sucessfully Submitted!"
                })              
            }            
      });
  });

  app.post('/patienthealtheconomicsdetails', async (req, res) => {
    console.log(req.body);

    registeredas = req.body.registeredas, patienthasinsurance = req.body.patienthasinsurance, insurancecurrency = req.body.insurancecurrency, insuranceamount = req.body.insuranceamount, costsincurredbefore = req.body.costsincurredbefore, costsincurredbeforeinsuranceamount = req.body.costsincurredbeforeinsuranceamount, costofsurgery = req.body.costofsurgery, surgeryamount = req.body.surgeryamount, costofradiotherapy = req.body.costofradiotherapy, radiotherapyamount = req.body.radiotherapyamount, costofchemotherapy = req.body.costofchemotherapy, chemotherapyamount = req.body.chemotherapyamount, stayincitycost = req.body.stayincitycost, stayincityamount = req.body.stayincityamount, travelcosts = req.body.travelcosts, travelcostsamount = req.body.travelcostsamount, costoffollowupvisit = req.body.costoffollowupvisit, costoffollowupvisitamount = req.body.costoffollowupvisitamount, code = req.body.code

    db.query(
    "update questions set `registered_as` = ? , `patient_has_insurance` = ? , `patient_has_insurance_if_yes_currency` = ?, `patient_has_insurance_if_yes_currency_amount` = ?, `currency_cost_incurred_before_coming_centre` = ?, `cost_incurred_before_coming_centre` = ? , `currency_cost_of_surgery` = ? , `cost_of_surgery` = ? , `currency_cost_of_radiotherapy` = ?, `cost_of_radiotherapy` = ? , `currency_cost_of_chemotherapy` = ? , `cost_of_chemotherapy` = ?, `currency_stay_in_the_city` = ?, `stay_in_the_city` = ?, `currency_travel_cost` = ? , `travel_cost` = ? , `currency_cost_of_follow_up_visits` = ? , `cost_of_follow_up_visits` = ?, `healtheconomics_completed` = ? where `code` = ?", [registeredas, patienthasinsurance, insurancecurrency, insuranceamount, costsincurredbefore, costsincurredbeforeinsuranceamount, costofsurgery, surgeryamount, costofradiotherapy, radiotherapyamount, costofchemotherapy, chemotherapyamount, stayincitycost, stayincityamount, travelcosts, travelcostsamount, costoffollowupvisit, costoffollowupvisitamount, "true", code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error,
              "value": req.body.code,
              "status": "Details Required!"
            })
          }else{
            res.send({
                "code":200,
                "value": req.body.code,
                "success":"Health Economics Sucessfully Submitted!"
                })              
            }            
      });
  });

  app.post('/deletepatientdata/', async (req, res) => {
    code= req.body.code;  
    console.log(code)
    db.query(
    "update questions set status = 0 where code = ?", [code], async function (error, results, fields) {
        if (error) {
            res.send({
              "code":400,
              "failed":error            
            })
          }else{
            res.send({
                "code":200,
                "results":results,
                "success": "Details Deleted!"
                })              
            }            
      });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});