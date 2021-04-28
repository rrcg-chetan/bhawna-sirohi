import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';

//export const history = createBrowserHistory();

const PatientsIncompleteData = props => {
    //const { history } = useHistory();
    const [accountStatus, setAccountStatus] = useState([])
    const [page, setPage] = useState(0);
    const countPerPage = 3;
    
    const columns = [
        {
          name: 'Hospital ID',
          selector: 'id',
          sortable: true,
        },
        {
          name: 'Generated Id',
          selector: 'code',
          sortable: true
        },
        {
          name: 'Date of Birth',
          selector: 'patients_dob',
          sortable: false
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: false
        },
        {
            name: 'Institution Name',
            selector: 'name_of_institution',
            sortable: true
        },
        {
            name: 'City',
            selector: 'city',
            sortable: true
        },
        {
            name: 'Country',
            selector: 'country',
            sortable: true
        },
        {
            name: "Options",
            sortable: false,
            cell: d => <div><a href={'demography/share/'+d.code}><svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" id="invoice-row-4996-send-icon" className="cursor-pointer feather feather-send"><line data-v-9a6e255c="" x1="22" y1="2" x2="11" y2="13"></line><polygon data-v-9a6e255c="" points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a><span style={{ color: "#7367f0"}} id={d.code} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deletePatientRecord(e) } }><svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="cursor-pointer mx-1 feather feather-trash"><polyline data-v-9a6e255c="" points="3 6 5 6 21 6"></polyline><path data-v-9a6e255c="" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></span>
            <a href=
            {(() => {
                if(d.demographics_completed === "false") { return '/demography/edit/'+d.code }
                if(d.initialpresentation_completed === "false") { return '/initial-presentation/'+d.code}
                if(d.pathology_completed === "false") { return '/pathology/'+d.code}
                if(d.treatment_completed === "false") { return '/treatment/'+d.code}
                if(d.followup_completed === "false") { return '/follow-up/'+d.code}
                if(d.healtheconomics_completed === "false") { return '/health-economics/'+d.code}
            })()}          
            ><svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path data-v-9a6e255c="" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path data-v-9a6e255c="" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></a>
            </div>
        }
      ];

    const accounts = () => {
        const getUser = () => {
            const userStr = localStorage.getItem("users");
            if(userStr) return JSON.parse(userStr);
            else return null
        }
        const user = getUser();           
        if(user == null){
            return <Redirect to='/login' />
        }
        const userid = user.userid
        const role = user.role
        axios.get(`http://localhost:4000/questionincomplete?page=${page}&per_page=${countPerPage}&submited_by=${userid}&role=${role}`)
        .then(response => {            
            setAccountStatus(response.data);
        }).catch(err => {
            setAccountStatus(err);
        });
        
                    
    }

    let data = accountStatus.data;
    const tableData = { columns, data };

    useEffect(() => {
        accounts();
    }, [page]);

    const deletePatientRecord = (e) => {
        axios.post("http://localhost:4000/deletepatientdata/", { code: e.currentTarget.id }).then(response => {
            console.log(response.data.success)
            if(response.data.success === 'Details Deleted!'){
                window.location.reload();
            }            
        }).catch(err => {            
        });
    }
    return (
        <>
            <div className="card">
                <DataTableExtensions {...tableData}>    
                <DataTable
                    columns={columns.data}
                    data={accountStatus.data}
                    highlightOnHover
                    pagination
                    title="Patients Incomplete List"
                    paginationServer
                    searchPlaceholder
                    search
                    paginationTotalRows={accountStatus.total}
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={{
                        noRowsPerPage: true
                    }}
                    onChangePage={page => setPage(page-1)}  
                    defaultSortField="id"
                    defaultSortAsc={false}                      
                    PageLength={3}                
                    /> 
                    </DataTableExtensions>
            </div>
        </>
    );
};

export default withRouter(PatientsIncompleteData);