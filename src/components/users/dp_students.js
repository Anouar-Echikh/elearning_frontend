import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import FilterIcon from "@material-ui/icons/FilterListRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
//import OneThemeItem from "./themesItem"
import { connect } from "react-redux"
//import { getStudentsByListIds } from '../../redux/actions/studentsActions'
import { getStudentsByListIds } from '../../redux/actions/studentsActions'
import SearchByDateModal from './searchVideosByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import AddProf from "./addProfModal"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import Container from '@material-ui/core/Container';
import Breadcrumbs from "./breadcrumb"
import Switch from '@material-ui/core/Switch';
import BeatLoader from "react-spinners/BeatLoader"
import LoadingOverlay from "react-loading-overlay";
import { useSnackbar } from 'notistack';
import { patchSubDep, getOneSubDepById } from '../../redux/actions/sub-departmentsActions'
import DeleteStudentFromDp from './deleteStudentFromDp'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ImportFileModal from "./importExcelDocModal"



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));



const ListItems = (props) => {
    const classes = useStyles();
    const [render, setRender] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [listItems, setListItems] = useState([])
    const [searchThemes, setSearchThemes] = useState("")
    const [loading, setLoading] = useState(false)
    const [subDepId, setSubDepId] = useState("")
    const [subDepTitle, setSubDepTitle] = useState("")
    const [depTitle, setDepTitle] = useState("")
    const [listStudents, setListStudents] = useState([])
    const [listProfs, setListProfs] = useState([])
    const [checked, setChecked] = React.useState({});
    const { enqueueSnackbar } = useSnackbar();



    const location = useLocation();
    var routeState = location.state

    const navigate = useNavigate()

    const getListItems = async () => {

        setLoading(true)
        let idSubDep = ""
        var listProf = []
        let routeStateKeys = Object.keys(routeState)
        for (let el of routeStateKeys) {
            if (el.includes("subDepId") == true) {
                setSubDepId(routeState[el])
                idSubDep = routeState[el]
            } else if (el.includes("depTitle")) {
                setDepTitle(routeState[el])
            } else if (el.includes("subDepTitle")) {
                setSubDepTitle(routeState[el])
            } else if (el.includes("listProf")) {
                // setListProfs(routeState[el])
                listProf = routeState[el]
            } else {
                setListStudents(routeState[el])
            }
        }

        try {

            const formation = await props.getOneSubDepById(idSubDep)
            //setFormation(formation)
            console.log("formation:", formation)
            let listStudent = formation && formation.students
           
            setListStudents(listStudent)
            //console.log("useLocation:", location.state)
            const listStudents = await props.getStudentsByListIds({ listUsersId: listStudent })
            
            setAllItems(listStudents)
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getListItems()
    }, [render])



    useEffect(() => {
        setLoading(true)

        setListItems(allItems && allItems.filter(
            item => item.student && item.student.name.toLowerCase().includes(searchThemes.toLowerCase())
        ));

        setLoading(false)
    }, [searchThemes, allItems])



    const searchThemesByDate = (objDate) => {


        setListItems(allItems && allItems.filter(
            //format to "dd-mm-yyyy" then compare with isSameOrAfter and  isSameOrBefore
            theme => (moment(moment(theme.created).format("DD-MM-YYYY")).isSameOrAfter(moment(moment(objDate.dateStart).format("DD-MM-YYYY")))
                && moment(moment(theme.created).format("DD-MM-YYYY")).isSameOrBefore(moment(moment(objDate.dateEnd).format("DD-MM-YYYY"))))))
        setLoading(false)

    }


    //switch control
    const handleChange = async (event, el) => {
        setLoading(true)
        setChecked({...checked, [el.student._id]: event.target.checked })
        console.log("listStudents:---", listStudents)

        if (event.target.checked == false) {

            let newList = listStudents.map((item) => item._id == el.student._id ? { ...item, active: false } : item)
            console.log("newList:---", newList)
            let resp = await props.patchSubDep(subDepId, { students: newList });
            if (resp) {
                setRender(!render)//refresh list
                enqueueSnackbar(el.student && el.student.name + ' a bien été  désactivé!', { variant: 'success' });
                setLoading(false)
            }
            else {
                enqueueSnackbar(el.student && el.student.name + ': Error!', { variant: 'error' });
                setLoading(false)
            }
        } else {
            setLoading(true)
            // update "activation" list students
            let newList = listStudents.map((item) => item._id == el.student._id ? { ...item, active: true } : item)
            console.log("newList2:---", newList)
            let resp = await props.patchSubDep(subDepId, { students: newList });
            if (resp) {

                setRender(!render)//refresh list
                enqueueSnackbar(el.student && el.student.name + ' a bien été  activé!', { variant: 'success' });
                setLoading(false)
            }
            else {
                enqueueSnackbar(el.student && el.student.name + ': Error!', { variant: 'error' });
                setLoading(false)
            }
        }
    };
    // end swicth

    // delete prof from list of subDepartment
    const deleteProf = async (el) => {
        setLoading(true)
        let newList = listStudents.filter((item) => item._id != el.student._id)

        let resp = await props.patchSubDep(subDepId, { students: newList });
        if (resp) {
            enqueueSnackbar(el.student && el.student.name + ' a bien été  supprimé!', { variant: 'success' });
            setLoading(false)
        }
        else {
            enqueueSnackbar(el.student && el.student.name + ': Erreur de suppression!', { variant: 'error' });
            setLoading(false)
        }
    }

    const spinner = () => {
        return (<div className="animated fadeIn pt-3 text-center mx-auto" style={{ marginTop: 20, marginBottom: 20 }}><BeatLoader color="#067BE3" loading={true} size={12} /></div>)
    }


   


    return (
        <div>

            <div name="allItems" className="container-video d-flex flex-column justify-content-center "  >
                {/* <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:22,fontWeight:"bold" ,color:"#3f51b5"}}></div></div> */}
                <div className='container d-flex flex-column align-items-center flex-md-row justify-content-between ' style={{ marginBottom: 20 }}>

                    {/* <div className="d-flex justify-content-center "><div className=""  style={{fontSize:22,fontWeight:"bolder" ,paddingLeft:10,color:"#3f51b5",borderLeft: "solid #3f51b5 3px"}}>Thèmes</div></div> */}
                    <div className="d-flex justify-content-center ">
                        <div className="my-2" style={{ fontSize: 24, fontWeight: "bolder", marginLeft: 10, color: "#666" }}>{subDepTitle}</div></div>
                        
                    <Breadcrumbs level1={depTitle} level2={subDepTitle} level3={"index"} current={"Étudiants"} />
                    
                </div>
                <div className="animated slideInUpTiny animation-duration-3">
                    <div className="animated slideInUpTiny animation-duration-3">
                        <div className="row mb-md-3">
                            <div className="col-12">

                                <div className="jr-card d-print-none">
                                    <div className='container d-flex flex-column align-items-center flex-md-row justify-content-between my-2 mx-auto mx-md-2 '>
                                        <div style={{ fontSize: 24, fontWeight: "bolder" }}>Étudiants</div>
                                        <div className='d-flex flex-column-reverse flex-md-row  justify-content-md-end my-2 align-items-center'>
                                        
                                        {/* <ImportFileModal render={()=>setRender(!render)} listStudents={allItems} subDepId={subDepId} patchSubDep={props.patchSubDep}/> */}
                                            <OutlinedInput
                                                variant="outlined"
                                                placeholder="Recherche par titre "
                                                className="m-1"
                                                style={{ width: 250, height: 37 }}
                                                size="small"
                                                endAdornment={
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                }
                                                onChange={(e) => setSearchThemes(e.target.value)}
                                                value={searchThemes}
                                            />

                                            {/* <AddProf render={() => setRender(!render)} idSubDep={subDepId} /> */}


                                            {/* problem searching by date */}
                                            {/* <SearchByDateModal getListItemsByDate={searchThemesByDate} /> */}

                                        </div>
                                    </div>

                                    <LoadingOverlay
                                        active={loading}
                                        spinner={<BeatLoader color="#067BE3" loading={true} size={10} />}
                                        styles={{
                                            overlay: base => ({
                                                ...base,
                                                background: "rgba(252, 252, 252)"
                                            })

                                        }}
                                    >
                                        <div className="table-responsive">
                                            <table className="table table-bordered">


                                                <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>#</th>
                                                        <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Photo</th>
                                                        <th scope="col">Nom et Prénom</th>
                                                        <th scope="col">phone</th>
                                                        <th scope="col">email</th>
                                                        <th scope="col">Activated</th>
                                                        <th scope="col">Options</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                       (listItems && listItems.length > 0 ? listItems.map((el, index) =>
                                                            <tr key={index + 1}>
                                                                <th scope="row" style={{ verticalAlign: "middle", textAlign: "center" }}>{index + 1}</th>
                                                                <td style={{ verticalAlign: "middle", textAlign: "center" }} ><img src={el.student && el.student.image && el.student.image.idFile?el.student.image.idFile:require("../../imgs/avatar.png")} style={{ width: 50, height: 50, borderRadius: "50%", margin: 5 }} /> </td>
                                                                <td style={{ verticalAlign: "middle" }}>{el.student && el.student.name}</td>
                                                                <td style={{ verticalAlign: "middle" }}>{el.student && el.student.phone}</td>
                                                                <td style={{ verticalAlign: "middle" }}>{el.student && el.student.local && el.student.local.email}</td>
                                                                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                                                                   
                                                                        <Switch
                                                                        checked={checked[el.student._id] != undefined ?checked[el.student._id]: el.active }
                                                                        onChange={(e) => handleChange(e, el)}
                                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                                        />
                                                                   
                                                                </td>
                                                                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                                                                    <DeleteStudentFromDp item={el} deleteOneUserById={deleteProf} render={() => setRender(!render)} />
                                                                </td>

                                                            </tr>) :
                                                            <tr >
                                                                <td className="  text-align-center" colspan="8">
                                                                    <div className="animated fadeIn  text-center mx-auto" style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold" }}>Vide!</div>
                                                                </td>
                                                            </tr>
                                                        )

                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </LoadingOverlay>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}


const mapStateToProps = (state) => {
    return {
        sponsors: state.sponsorsReducer.sponsors,
        isFetching: state.sponsorsReducer.sponsorIsFetching,
        profile: state.authReducer.studentile,
    }
}

export default connect(mapStateToProps, { getStudentsByListIds, patchSubDep, getOneSubDepById })(ListItems)