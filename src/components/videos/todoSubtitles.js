import React, { useEffect,useRef,forwardRef,  useImperativeHandle } from "react";
import randomId from "crypto-random-string"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import Subtitles from "./todoSubtitles"
import ReactPlayer from "react-player";
import { useSnackbar } from 'notistack';
//import RemoveAlert from "./subTitleRemoveAlert"
import { useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
//import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import moment from "moment"
import  momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:"#FBCAFF",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function Todo({ inc, pushSubtitles, todo,getTiming,getDuration, index, updateTodo, removeTodo,handleChange,expanded }) {
  const dispatch=useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState(todo.text);
  const [startTiming, setStartTiming] = React.useState(todo.startTiming);
  const [endTiming, setEndTiming] = React.useState(todo.endTiming);
  
  const [list, setList] = React.useState([]);
  const [showAddSubtitleButton, setListShowAddSubtitleButton] = React.useState(false);


useEffect(()=>{
 
  let start=convertDurationToTimeString(todo.startTiming)
  let end=convertDurationToTimeString(todo.endTiming)
  setStartTiming(start)
  setEndTiming(end)
  
  
},[])


  const update = (val) => {// update title
    setValue(val)
    if (!val) return;
    updateTodo({ ...todo, text: val});

  }
  const updateStartTiming = () => {
    // setValue(val)
    // if (!val) return;
    //updateTodo({...todo, startTiming: getTiming()});
    setStartTiming(convertDurationToTimeString(getTiming()))
   
  }
  const updateEndTiming = () => {
    // setValue(val)
    // if (!val) return;
    //getTiming()==0? updateTodo({...todo, endTiming: getDuration()}): updateTodo({...todo, endTiming: getTiming()});
    setEndTiming(convertDurationToTimeString(getTiming()))
   // enqueueSnackbar('La fin  a été bien enregistrée!', { variant: 'success' });
  }

  const updateToGetDuration=(val)=>{
    if(val=="end"){
     setEndTiming(convertDurationToTimeString(getDuration()))
    }
    if(val=="start"){
      setStartTiming(convertDurationToTimeString(0))
    }
  }

  const getListOfSubtitles = (list) => {
    console.log("ListSubtitles:", list)
    setList(list)
    if (list.length > 0)
      pushSubtitles(list)
    //return list
  }
const showRemoveAlert=(index)=>{
  dispatch({ type: "OPEN", payload: { title: "Avertissement !", bodyText: "Voulez-vous vraiment supprimer cette séquence?" ,index,type:"subtitle",chapterId:todo.chapiterId} })
}

const handlOnChangeStartTime=(e)=>{
//let duration=convertTimeToSeconds(e.target.value)
console.log("duration_start:",e.target.value)
  setStartTiming(e.target.value)
}
const handlOnChangeEndTime=(e)=>{
  //let time=convertDurationToTimeString(Number(e.target.value))
 // console.log("formattedTime_end:",String(time))
  //let duration=convertTimeToSeconds(e.target.value)
  //console.log("duration_end:",duration)
  setEndTiming(e.target.value)
}

const updateAllTiming=()=>{
console.log('duration:',getDuration())
  if(String(endTiming).length!=8||String(startTiming).length!=8){
  dispatch({ type: "OPEN_T", payload: { title: "Avertissement !", bodyText: " Format incorrect! : Veuillez respecter le format suivant (6 numéro) => HH : MM : SS"} })
  }else if(convertTimeToSeconds(endTiming)<convertTimeToSeconds(startTiming)){
    dispatch({ type: "OPEN_T", payload: { title: "Avertissement !", bodyText: "Erreur timing : Le Temps de Fin de la séquence doit ètre supérieur à celui de début!"} })
}else if(convertTimeToSeconds(endTiming)>getDuration()){

  dispatch({ type: "OPEN_T", payload: { title: "Avertissement !", bodyText: "Erreur timing :  Le Temps de Fin choisi doit ètre inférieur à la durée total du video!"} })
}else{
  updateTodo({...todo, endTiming:convertTimeToSeconds(endTiming),startTiming:convertTimeToSeconds(startTiming)})
  // console.log("timing format:",moment('09:15:00', "hh:mm:ss"))
  // console.log("format to sting hh:mm:ss => ",moment.duration( 60000,"seconds").format("hh:mm:ss"))
 // handleChange(false)
  enqueueSnackbar('Le timing a bien été  enregistrée!', { variant: 'success' });
}
}

const convertTimeToSeconds=(time)=>{
  //var hms = '02:04:33';   // your input string
var a = time.split(':'); // split it at the colons

// minutes are worth 60 seconds. Hours are worth 60 minutes.
var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

console.log("seconds",seconds);
return seconds
}

const convertDurationToTimeString=(duration_val)=>{
 let timeString= moment.duration(Number(duration_val),"seconds").format("hh:mm:ss", {
 
  trim: false,

 });
 return timeString
}


  return (
    <div>


<Accordion expanded={expanded === todo.id} onChange={handleChange(todo.id)}>
        <AccordionSummary aria-controls={`${index}-content`} id={`${index}-header`}>
        <div className="d-flex justify-content-between container-fluid">
          <Typography>Séquence - {inc + 1}</Typography>
          <IconButton className="p-0" edge="end" aria-label="delete" onClick={() => showRemoveAlert(index)}>
          <DeleteIcon />
        </IconButton>
        </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className="d-flex ">
        <TextField
          id="standard-full-width"
          value={value}
          fullWidth
          size="medium"
          label="Titre de la séquence"
          margin="dense"
          onChange={(e) => update(e.target.value)}

          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        </div>
        {/* <Button onClick={()=>updateTiming()} color="secondary">Ajouter</Button> */}
{/* <span>Timing : <b>{timing} </b></span> */}
<div className=" container d-flex flex-column align-items-center justify-content-center border rounded p-2">
<strong></strong> 
<Alert severity="warning">Note: Pour enregistrer le timing à partir de la video Veuillez pauser le lecteur avant !</Alert>
  <div className=" d-flex my-2 align-items-center">
<TextField
          label="Début"
          id="outlined-size-small"
          defaultValue={()=>convertDurationToTimeString(()=>getTiming())}
          value={startTiming}
          onChange={(e)=>handlOnChangeStartTime(e)}
          size="small"
          variant="outlined"
        />
         <Button variant="outlined"  className="ml-2" color="primary" onClick={()=>updateToGetDuration("start")}>
  Reset
</Button>
      <Button className="ml-2" variant="outlined" color="primary" edge="end" aria-label="Add Chapter" onClick={()=>updateStartTiming()}>
      Du lecteur
      </Button>
      </div>
      <div className=" d-flex align-items-center">
        <TextField
          label="Fin"
          id="outlined-size-small"
          defaultValue={convertDurationToTimeString(()=>getDuration())}
          size="small"
          value={endTiming}
          onChange={(e)=>handlOnChangeEndTime(e)}
          variant="outlined"
        />
      <Button variant="outlined"  className="ml-2" color="primary" onClick={()=>updateToGetDuration("end")}>
  la  fin 
</Button>
      <Button variant="outlined" color="primary" className="ml-2" edge="end" aria-label="Add Chapter" onClick={()=>updateEndTiming()}>
           Du lecteur
      </Button>
      </div>
      <Button variant="outlined" className="my-2" startIcon={<SaveIcon />} onClick={()=>updateAllTiming()}>
  Enregistrer Timing
</Button>
        </div>
      
     
    
        </AccordionDetails>
      </Accordion>
      </div>
       
  );
}

function TodoForm(props) {
 
  return (

    <Button startIcon={<AddIcon />} onClick={() => props.addTodo()} size="small" variant="outlined" style={{borderRadius:30,marginTop:20}} color="primary">Ajouter une séquence</Button>

  );
}


// Main 
const App = forwardRef((props, ref) => {

  const [todos, setTodos] = React.useState(props.list === undefined ? [] : props.list);
  const [dense, setDense] = React.useState(false);
  const [startTiming, setStartTiming] = React.useState();
  const [endTiming, setEndTiming] = React.useState();
  const player = useRef()

//update list subtitle from parentcomponent
useImperativeHandle(ref, () => ({

  // remove todo
 removeTodo(data){

    let newTodos = todos.filter((el) => el.chapiterId==data.chapterId && el.id !== data.index);
    console.log("filtred subtitle-list:", newTodos)
    setTodos(newTodos);
  }


}));

  // add todo
  const addTodo = () => {
    let item = { id: randomId({ length: 10 }),chapiterId:props.chapiterId,startTiming,endTiming,text:""}
    const newTodos = [...todos, item];
    setTodos(newTodos);
  };

  //pushSubtitles
  const pushSubtitles = (list) => {
    console.log("todos:", todos)
    let updatedListWithSubtitles = todos.map((el) => el.id == list[0].chapiterId ? el = { ...el, list } : el)
    setTodos(updatedListWithSubtitles);
  }
  

  //listen to "Todos array", any update will fire getListGoals props func to send data to parentComponent
  useEffect(() => {
    props.getListOfSubtitles(todos)
  }, [todos])

  //update list
  const updateTodo = (item) => {
    let updatedList = todos.map((el, i) => el.id === item.id ? el = item : el)
    setTodos(updatedList)
    props.getListOfSubtitles(todos)
    console.log("updated list:", updatedList)

  }

 // remove todo
 const removeTodo1=(index)=>{
  let newTodos = todos.filter((el) => el.id !== index);
  console.log("filtred subtitle-list:", newTodos)
  setTodos(newTodos);
}

  const [expanded, setExpanded] = React.useState('panel1');

   const handleChange =
     (panel) => (event, newExpanded) => {
       setExpanded(newExpanded ? panel : false);
     };


  return (
    <div className="app">
   
 
      <List dense={dense}>
        
        {todos === undefined ? <p>No items!</p> : todos.map((todo, index) => (
          <Todo
            key={todo.id}
            inc={index}
            index={todo.id}
            todo={todo}
            getTiming={props.getTiming}
            getDuration={props.getDuration}
            updateTodo={updateTodo}
            removeTodo={removeTodo1}
            handleChange={handleChange}
            expanded={expanded}
          />
        ))}

<TodoForm addTodo={addTodo} label={props.label} placeholder={props.placeholder} list={todos} errorMsg={props.errorMsg} />
      </List>
    </div>
  );
});

export default App;