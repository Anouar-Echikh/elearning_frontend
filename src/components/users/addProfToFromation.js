import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader"
import { connect } from "react-redux"
import { getUsers } from '../../redux/actions/usersActions'
import { patchSubDep, getOneSubDepById } from '../../redux/actions/sub-departmentsActions'
import Button from "@material-ui/core/Button";
import { async } from "crypto-random-string";



const SelectTableComponent = (props) => {
    const [allUsers, setAllUsers] = useState([])
    const [List, setList] = useState([])
    const [MasterChecked, setMasterChecked] = useState(false)
    const [SelectedList, setSelectedList] = useState([])
    const [loading, setLoading] = useState(false)
    const [formation, setFormation] = useState({})
    const [listProfs, setListProfs] = useState([])
    const [searchUsers, setSearchUsers] = useState("")

    // Select/ UnSelect Table rows
    const onMasterCheck = (e) => {
        let tempList = List;
        // Check/ UnCheck All Items
        tempList.map((user) => (user.selected = e.target.checked));

        //Update State

        setMasterChecked(e.target.checked)
        setList(tempList)
        setSelectedList(List.filter((e) => e.selected))

    }

    // Update List Item's state and Master Checkbox State
    const onItemCheck = (e, item) => {
        let tempList = List;
        tempList.map((user) => {
            if (user._id === item._id) {
                user.selected = e.target.checked;
            }
            return user;
        });

        //To Control Master Checkbox State
        const totalItems = List.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        // Update State

        setMasterChecked(totalItems === totalCheckedItems)
        setList(tempList)
        setSelectedList(List.filter((e) => e.selected))

    }

    // Event to get selected rows(Optional)
    const getSelectedRows = async () => {
        // setSelectedList(List.filter((e) => e.selected))
        console.log("selected List :", SelectedList)
        let listObjIds=SelectedList.map((el)=>el={_id:el._id,active:true})
        let newListProf = {  professors:[...listProfs, ...listObjIds] }
        console.log("newSubDep--->:",newListProf)
        let resp = await props.patchSubDep(props.idSubDep,{  professors:[...listProfs, ...listObjIds] })
        if (resp) {
            props.closeAddModal()
        }
    }

    const getListUsers = async () => {
        setLoading(true)
        try {
            const users = await props.getUsers()
            const formation = await props.getOneSubDepById(props.idSubDep)
            setFormation(formation)
            console.log("formation:", formation)
            let listProf=formation&&formation.professors
            console.log("allUsers:", users)
            console.log("listProfs:", listProf)
            setListProfs(listProf)
            //filtrer les prof qui on été déja inscrit dans la formation
            let filtredFromProfessors = users.filter((el) => el.role == "professor" && el.organization == props.profile.organization["_id"]&&(listProf.filter((item)=>(item._id==el._id)).length<1))
            console.log("list:", filtredFromProfessors)

            let newListWithSelectParam = filtredFromProfessors.map((el) => el = { ...el, selected: false })

            setAllUsers(newListWithSelectParam)
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getListUsers()
    }, [])

    const spinner = () => {
        return (<div className="animated fadeIn pt-3 text-center mx-auto" style={{ marginTop: 20, marginBottom: 20 }}><BeatLoader color="#067BE3" loading={true} size={12} /></div>)
    }

    const filterListUsers = (users) => {



    }

    useEffect(() => {
        setLoading(true)
        if (allUsers != undefined) {
            setList(allUsers.filter(
                item => item.name.toLowerCase().includes(searchUsers.toLowerCase())
            ));
        }
        setLoading(false)
    }, [searchUsers, allUsers])




    useEffect(() => {


    }, [])

    return (
        <div>
            <div className='container d-flex justify-content-center' style={{ marginTop: 50 }}>
                <Button
                    variant="contained"
                    color="primary"
                    className="btn btn-primary"
                    onClick={() => getSelectedRows()}
                >
                    Enregistrer {SelectedList.length}
                </Button>
            </div>




            <div className="table-responsive  container " style={{ marginTop: 10 }}>

                <table className="table table-bordered table-image">


                    <thead class="thead-light">
                        <tr>
                            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>
                                <div class="custom-control custom-checkbox" >
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={MasterChecked}
                                        id="mastercheck"
                                        onChange={(e) => onMasterCheck(e)}
                                    />
                                </div>
                            </th>
                            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Photo</th>
                            <th scope="col">Nom et Prénom</th>

                            <th scope="col">Role</th>
                            <th scope="col">email</th>
                            <th scope="col">phone</th>
                            <th scope="col">Option</th>



                        </tr>
                    </thead>
                    <tbody>
                        {List && loading ?
                            <tr >
                                <td className="text-align-center" colspan="8">{spinner()}</td>
                            </tr>
                            : (List.length > 0 ? List.map((el, index) =>
                                <tr key={el._id} className={el.selected ? "selected" : ""}>
                                    <th scope="row" style={{ verticalAlign: "middle", textAlign: "center" }}>
                                        <div class="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={el.selected}
                                                className="form-check-input"
                                                id={`rowcheck${el._id}`}
                                                onChange={(e) => onItemCheck(e, el)}
                                            />
                                        </div>

                                    </th>
                                    <td style={{ verticalAlign: "middle", textAlign: "center" }}><img src={el.image && el.image.idFile} style={{ width: 50, height: 50, borderRadius: "50%" }} /> </td>
                                    <td style={{ verticalAlign: "middle" }}>{el.name}</td>
                                    <td style={{ verticalAlign: "middle" }}>{el.role}</td>
                                    <td style={{ verticalAlign: "middle" }}>{el.local && el.local.email}</td>
                                    <td style={{ verticalAlign: "middle" }}>{el.phone}</td>

                                    <td>options</td>

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
                <div className='container d-flex justify-content-center'>
                    <Button
                        variant="contained"
                        color="primary"
                       
                        onClick={() => getSelectedRows()}
                    >
                        Enregistrer {SelectedList.length}
                    </Button>
                </div>

            </div>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {

        profile: state.authReducer.profile,
    }
}

export default connect(mapStateToProps, { getUsers, patchSubDep, getOneSubDepById })(SelectTableComponent)

