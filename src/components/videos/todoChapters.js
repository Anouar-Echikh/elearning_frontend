import React, { useEffect,useRef,forwardRef,  useImperativeHandle } from "react";
import ReactPlayer from "react-player";
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
import { Row, Col } from "reactstrap";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import RemoveAlert from "./removeAlert"
import { useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import moment from "moment"
import  momentDurationFormatSetup from "moment-duration-format";
import AlertTiming from "./timingAlertDialog"

momentDurationFormatSetup(moment);//setup

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
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
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


const Todo = forwardRef( ({inc,pushSubtitles, todo, index, updateTodo, removeTodo,getTiming,getDuration,handleChange,expanded}, ref )=> {

  const [value, setValue] = React.useState(todo.text);
  const [list, setList] = React.useState([]);
  const [showAddSubtitleButton,setListShowAddSubtitleButton] = React.useState(false);
  const dispatch=useDispatch()
  const childRef = useRef();


  useImperativeHandle(ref, () => ({

    // remove todo
   removeSubTitleTodo(data){
    childRef.current.removeTodo(data)
    }
    
  }));






  const update = (val) => {
    setValue(val)
    if (!val) return;
    updateTodo({ ...todo, text:val });
    setListShowAddSubtitleButton(true)
  }
  

  const getListOfSubtitles = (list) => {
    console.log("ListSubtitles:", list)
    setList(list)
    if(list.length>0)
    pushSubtitles(list)
    //return list
  }
  const showRemoveAlert=(index)=>{
    dispatch({ type: "OPEN", payload: { title: "Avertissement !", bodyText: "Voulez-vous vraiment supprimer ce chapitre?",index,type:"chapter" } })
  }

  return (
   
    <div>


<Accordion expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary aria-controls={`${index}-content`} id={`${index}-header`}>
        <div className="d-flex justify-content-between container-fluid">
          <Typography>Chapitre #({inc+1})</Typography>
          <IconButton className="p-0" edge="end" aria-label="delete" onClick={() => showRemoveAlert(index)}>
            <DeleteIcon />
      </IconButton>
      </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className="d-flex  ">
        <TextField
          id="standard-full-width"
          value={value}
          fullWidth
          size="medium"
          label="Titre de chapitre"
          margin="dense"
          onChange={(e) => update(e.target.value)}
          
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        
        {/* <IconButton className="ml-2" edge="end" aria-label="delete" onClick={() => update()}>
            <SaveIcon />
      </IconButton> */}
      
      </div>

      {showAddSubtitleButton || (todo.list&&todo.list.length>0) ?<Subtitles  ref={childRef}  chapiterId={todo.id} list={todo.list} getListOfSubtitles={getListOfSubtitles} getTiming={getTiming} getDuration={getDuration} />:""}
    
        </AccordionDetails>
      </Accordion>

</div>
  );
});

function TodoForm(props) {
  const [value, setValue] = React.useState("");

  
 

  return (

    <Button onClick={()=>props.addTodo()}  className="mb-2" variant="outlined" color="secondary">Ajouter un chapitre</Button>

  );
}


// Main 
function App(props) {

  const [todos, setTodos] = React.useState(props.list === undefined ? [] : props.list);
  const [dense, setDense] = React.useState(false);
  const player = useRef()
  const TodoRef = useRef();
  // add todo
  const addTodo = text => {
    let item = { id: randomId({ length: 10 }),list:[], text }
    const newTodos = [...todos, item];
    setTodos(newTodos);
  };

 //pushSubtitles
 const pushSubtitles=(list)=>{
   console.log("todos:",todos)
   let updatedListWithSubtitles=todos.map((el)=>el.id==list[0].chapiterId?el={...el,list}:el)
   setTodos(updatedListWithSubtitles);
 }
  // remove todo
  const removeTodo = data => {
    console.log("todos1:", todos)
    console.log("data:", data)
    var newTodos=[]
    if(data.type=="chapter"){
   newTodos = todos.filter((el) => el.id !== data.index);
   setTodos(newTodos);
   console.log("filtred chapter-list:", newTodos)
    }
    if(data.type=="subtitle"){
     //newTodos=todos.map((el)=>el.id==data.chapterId?{...el,list:el.list.filter((item)=>item.id!==data.index)}:el)
    
      TodoRef.current.removeSubTitleTodo(data)
     //console.log(newTodos)
   
      }
         
    
   
    
    
  };

  //listen to "Todos array", any update will fire getListGoals props func to send data to parentComponent
  useEffect(() => {
    props.getListChapiter(todos)
  }, [todos])

  //update list
  const updateTodo = (item) => {
    let updatedList = todos.map((el, i) => el.id === item.id ? el = item : el)
    setTodos(updatedList)

    console.log("updated list:", updatedList)

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
    precision: 3,
    useSignificantDigits: true,
    trim: false,
    trunc: true
  });
   return timeString
  }
  

  const getTiming=()=>{
    let t= player.current.getCurrentTime()
    return (t)
   }
   
   const getDuration=()=>{
    let t= player.current.getDuration()
    console.log("duration",t)
      return (t)
   }

   const [expanded, setExpanded] = React.useState('panel1');

   const handleChange =
     (panel) => (event, newExpanded) => {
       setExpanded(newExpanded ? panel : false);
     };

  return (
    <div className="app">
     <RemoveAlert removeChapter={(data)=>removeTodo(data)}/>
     <AlertTiming />
      <Row>
      <Col xs="12" sm="12" lg="6">
      <List dense={dense} style={{ overflow: 'auto',maxHeight:400}}>
        <TodoForm addTodo={addTodo} label={props.label} placeholder={props.placeholder} list={todos} errorMsg={props.errorMsg} />
        {todos == undefined ? <p>No items!</p> : todos.map((todo, index) => (
          <Todo
          ref={TodoRef}
            key={todo.id}
            inc={index}
            index={todo.id}
            pushSubtitles={pushSubtitles}
            todo={todo}
            getTiming={getTiming}
            getDuration={getDuration}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
            handleChange={handleChange}
            expanded={expanded}
          />
        ))}


      </List>
      </Col>
      <Col xs="12" sm="12" lg="6">
       <ReactPlayer
         ref={player}
          url={props.urlVideo}
          controls={true}
          width="100%"
          config={{
            youtube: {
              embedOptions: { rel: 0 }
            }
          }}
        />
        </Col>
      
      </Row>
    </div>
  );
}

export default App;