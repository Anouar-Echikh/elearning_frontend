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
import OneItem from "./orgItem"
import { connect } from "react-redux"
import { getAllOrgs } from '../../redux/actions/organizationsActions'
import SearchByDateModal from './searchOrgsByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import AddItemModal from "./addOrgModal"
import {useNavigate} from "react-router-dom"
import Container from '@material-ui/core/Container';




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
  const [searchItems, setSearchItems] = useState("")
  const [loading, setLoading] = useState(false)

  const history=useNavigate()

  const getListItems = async () => {
    setLoading(true)
    try {
      const Items = await props.getAllOrgs()
      console.log("allItems:", Items)
      setAllItems(Items)
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

    setListItems(allItems&&allItems.filter(
      item => item.name.toLowerCase().includes(searchItems.toLowerCase())
    ));

    setLoading(false)
  }, [searchItems, allItems])



  const searchItemsByDate = (objDate) => {


    setListItems(allItems&&allItems.filter(
      //format to "dd-mm-yyyy" then compare with isSameOrAfter and  isSameOrBefore
      item => (moment(moment(item.created).format("DD-MM-YYYY")).isSameOrAfter(moment(moment(objDate.dateStart).format("DD-MM-YYYY")))
        && moment(moment(item.created).format("DD-MM-YYYY")).isSameOrBefore(moment(moment(objDate.dateEnd).format("DD-MM-YYYY"))))))
    setLoading(false)

  }

  return (
    <div>
<Container>
      {/* <div className='full-container justify-content-center' style={{overflow:"hidden", marginBottom: 20, position: "relative", marginTop: 40 }}  >
     
        
      
        <span className='mainHeaderText1' style={{ position: "absolute", top: "50%", left: "10%", color: "white", fontWeight: "bold" }}>Thèmes</span>
      
      </div> */}
      </Container>
      <div name="allItems" className="container-video d-flex flex-column justify-content-center "  >
        <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:26,fontWeight:"bolder" ,color:"#3f51b5"}}>Établissements</div></div>

        <div className="d-md-flex flex-xs-column   justify-content-center my-2 mx-auto mx-md-2 " >
       { (props.profile.role=="superAdmin") ? <AddItemModal render={() => setRender(!render)} />:""}



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
            onChange={(e) => setSearchItems(e.target.value)}
            value={searchItems}
          />

          {/* problem searching by date */}
          <SearchByDateModal getListItemsByDate={searchItemsByDate} />
        </div>


        <div className=" mt-3 d-flex justify-content-center flex-wrap ">

          {(listItems&&listItems.length < 1)
            ? (
              <List>
                <ListItem className="d-flex justify-content-center " >
                  <center className="mt-2"><h3>vide!</h3></center>
                </ListItem>
                
              </List>
            )
            : (props.isFetching || loading ? <center>Loading ...</center> :
            
           
            listItems&&listItems.map((el, index) => (


              <OneItem key={el._id} item={el} render={() => setRender(!render)} />



            ))
          
            )
          }
        </div>

      </div>
      </div>
  );
}


const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsorsReducer.sponsors,
    isFetching: state.sponsorsReducer.sponsorIsFetching,
    profile: state.authReducer.profile,

  }
}

export default connect(mapStateToProps, { getAllOrgs })(ListItems)