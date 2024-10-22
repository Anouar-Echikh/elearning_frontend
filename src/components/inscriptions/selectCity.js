import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
//import { makeStyles, withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%",
    maxWidth: "100%",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const govs=[
    'Ariana',
'Béja',
'Ben Arous',
'Bizerte',
'Gabès',
'Gafsa',
'Jendouba',
'Kairouan',
'Kasserine',
'Kebili',
'Kef',
'Mahdia',
'Manouba',
'Mednine',
'Monastir',
'Nabeul',
'Sfax',
'Sidi Bouzid',
'Siliana',
'Sousse',
'Tataouine',
'Tozeur',
'Tunis',
'Zaghouan',
]
 
const tunis = [
    'Tunis-تونس',
    'Le Bardo-باردو',
    'Le Kram-الكرم',
    'La Goulette-حلق الوادي',
    'Carthage-قرطاج',
    'Sidi Bou Said-سيدي بوسعيد',
    'La Marsa-المرسى',
    'Sidi Hassine-سيدي حسين'
  ];

const ariana = [
'Ariana',
'La Soukra',
'Raoued',
'Kalâat el-Andalous',
'Sidi Thabet',
'Ettadhamen-Mnihla',
  ];

const ben_arous = [
'Ben Arous',
'El Mourouj',
'Hammam Lif',
'Hammam Chott',
'Bou Mhel el-Bassatine',
'Ezzahra',
'Radès',
'Mégrine',
'Mohamedia-Fouchana',
'Mornag',
'Khalidia',
  ];

const nabeul=[
    'Nabeul',
    'Dar Chaabane',
    'Béni Khiar',
    'El Maâmoura',
    'Somâa',
    'Korba',
    'Tazerka',
    'Menzel Temime',
    'Menzel Horr',
    'El Mida',
    'Kelibia',
    'Azmour',
    'Hammam Ghezèze',
    'Dar Allouch',
    'El Haouaria',
    'Takelsa',
    'Soliman',
    'Korbous',
    'Menzel Bouzelfa',
    'Béni Khalled',
    'Zaouiet Djedidi',
    'Grombalia',
    'Bou Argoub',
    'Hammamet',
    ]
    
const manouba=[
'Manouba',
'Den Den',
'Douar Hicher',
'Oued Ellil',
'Mornaguia',
'Borj El Amri',
'Djedeida',
'Tebourba',
'El Battan',
 ]
 const zaghouane=[
    'Zaghouan',
    'Zriba',
    'Bir Mcherga',
    'Djebel Oust',
    'El Fahs',
    'Nadhour',
    ]
const bizerte=[
       ' Bizerte',
        'Sejnane',
        'Mateur',
        'Menzel Bourguiba',
        'Tinja',
        'Ghar al Milh',
        'Aousja',
        'Menzel Jemil',
        'Menzel Abderrahmane',
        'El Alia',
        'Ras Jebel',
        'Metline',
        'Raf Raf',
    ]
    const beja=[
        'Béja',
'El Maâgoula',
'Zahret Medien',
'Nefza',
'Téboursouk',
'Testour',
'Goubellat',
'Majaz al Bab',
 ]
 const jendouba=[
    'Jendouba',
    'Bou Salem',
    'Tabarka',
    'Aïn Draham',
    'Fernana',
    'Beni M\'Tir',
    'Ghardimaou',
    'Oued Melliz',
    
 ]
const kef=[
'El Kef',
'Nebeur',
'Touiref',
'Sakiet Sidi Youssef',
'Tajerouine',
'Menzel Salem',
'Kalaat es Senam',
'alâaKt Khasba',
'Jérissa',
'El Ksour',
'Dahmani',
'Sers',
]
const siliana=[
'Siliana',
'Bou Arada',
'Gaâfour',
'El Krib',
'Sidi Bou Rouis',
'Maktar',
'Rouhia',
'Kesra',
'Bargou',
'El Aroussa',
]
const sousse=[
'Sousse',
'Ksibet Thrayet',
'Ezzouhour',
'Zaouiet Sousse',
'Hammam Sousse',
'Akouda',
'Kalâa Kebira',
'Sidi Bou Ali',
'Hergla',
'Enfidha',
'Bouficha',
'Sidi El Hani',
'M\'saken',
'Kalâa Seghira',
'Messaadine',
'Kondar',
]

const monastir=[
'Monastir',
'Khniss',
'Ouerdanin',
'Sahline Moôtmar',
'Sidi Ameur',
'Zéramdine',
'Beni Hassen',
'Ghenada',
'Jemmal',
'Menzel Kamel',
'Bembla',
'Menzel Ennour',
'El Masdour',
'Moknine',
'Sidi Bennour',
'Menzel Farsi',
'Amiret El Hojjaj',
'Cherahil',
'Bekalta',
'Téboulba',
'Ksar Hellal',
'Ksibet El Mediouni',
'Benen Bodher',
'Touza',
'Sayada',
'Lemta',
'Bouhjar',
'Menzel Hayet',
]
const mahdia=[
'Mahdia',
'Rejiche',
'Bou Merdes',
'Ouled Chamekh',
'Chorbane',
'Hebira',
'Essouassi',
'El Djem',
'Kerker',
'Chebba',
'Melloulèche',
'Sidi Alouane',
'Ksour Essef',
'El Bradâa',
]
const sfax=[
'Sfax',
'Sakiet Ezzit',
'Chihia',
'Sakiet Eddaïer',
'Gremda',
'El Ain',
'Thyna',
'Agareb',
'Jebiniana',
'El Hencha',
'Menzel Chaker',
'Ghraïba',
'Bir Ali Ben Khélifa',
'Skhira',
'Mahares',
'Kerkennah',
]

const kairouan=[
'Kairouan',
'Chebika',
'Sbikha',
'Oueslatia',
'Aïn Djeloula',
'Haffouz',
'Alaâ',
'Hajeb El Ayoun',
'Nasrallah',
'Menzel Mehiri',
'Echrarda',
'Bou Hajla',
]

const gasserine=[
'Kasserine',
'Sbeitla',
'Sbiba',
'Jedelienne',
'Thala',
'Haïdra',
'Foussana',
'Fériana',
'Thélepte',
'Magel Bel Abbès',
]

const sidibouzid=[
'Sidi Bouzid',
'Jilma',
'Cebalet',
'Bir El Hafey',
'Sidi Ali Ben Aoun',
'Menzel Bouzaiane',
'Meknassy',
'Mezzouna',
'Regueb',
'Ouled Haffouz',
]

const gabes=[
'Gabès',
'Chenini Nahal',
'Ghannouch',
'Métouia',
'Oudhref',
'El Hamma',
'Matmata',
'Nouvelle Matmata',
'Mareth',
'Zarat',
]
const mednine=[
' Medenine',
'Beni Khedache',
'Ben Gardane',
'Zarzis',
'Houmt El Souk' ,
'Midoun' ,
'Ajim' ,
]
const tataouine=[
    'Tataouine',
'Bir Lahmar',
'Ghomrassen',
'Dehiba',
'Remada'
]

const gafsa=[
'Gafsa',
'El Ksar',
'Moularès',
'Redeyef',
'Métlaoui',
'Mdhila',
'El Guettar',
'Sened'
]

const tozeur=[
'Tozeur',
'Degache',
'Hamet Jerid',
'Nafta',
'Tamerza',
]
const kebili=[
'Kebili',
'Djemna',
'Douz',
'El Golâa',
'Souk Lahad',
]

const getCity=(gov)=>{
  console.log("gov from switch:",gov)
  switch (gov) {
    case 'Ariana':return ariana;
    case 'Béja' : return beja ;
    case 'Ben Arous': return ben_arous;
    case 'Bizerte':return bizerte;
    case 'Gabès':return gabes;
    case 'Gafsa':return gafsa;
    case 'Jendouba': return jendouba;
    case 'Kairouan':return kairouan;
    case 'Kasserine':return gasserine;
    case 'Kebili':return kebili;
    case 'Kef': return kef;
    case  'Mahdia':return mahdia;
    case 'Manouba': return manouba;
    case 'Mednine':return mednine;
    case 'Monastir':return monastir
    case 'Nabeul': return nabeul;
    case  'Sfax': return sfax;
    case 'Sidi Bouzid':return sidibouzid;
    case 'Siliana':return siliana;
    case 'Sousse': return sousse;
    case 'Tataouine': return tataouine;
    case 'Tozeur': return tozeur;
    case 'Tunis':return tunis;
    case 'Zaghouan':return zaghouane;
    default: return null
  }

   }
  


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [gov, setGov] = React.useState([]);
  const [city, setCity] = React.useState([]);

  const handleChangeGov = (event) => {
    console.log('event.value from handle:',event.target.value)
    setGov(event.target.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  
  return (
    <div>
       <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="gov-label">Gouvernorat</InputLabel>
        <Select
          labelId="gov-label"
          id="gov-select-outlined"
          value={gov}
          onChange={handleChangeGov}
          label="Gouvernorat"
        >
          <MenuItem value="">
            <em>Choisir le governorat..</em>
          </MenuItem>
          {govs.map((option)=>(
            <MenuItem key={option} value={option}>{option}</MenuItem>
  ))}
          
          
        </Select>
      </FormControl>
      <div  className={gov[0]===undefined?"d-none":""}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="city-select-outlined-label">Ville</InputLabel>
        <Select
          labelId="city-label"
          id="city-select-outlined"
          value={city}
          onChange={handleChangeCity}
          label="Ville"
        >
          <MenuItem value="">
            <em>Choisir la ville..</em>
          </MenuItem>
          {getCity(gov)===null?"No!!":getCity(gov).map((option)=>(
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      {/* <FormControl  className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Lieux</InputLabel>
        <Select
        labelId="demo-simple-select-outlined-label"
          label="Lieux"
          id="demo-mutiple-name"
          multiple
          value={gov}
          onChange={handleChangeGov}
          input={<BootstrapInput id="select-multiple-chip"  />}
               
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {govs.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, gov, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <div  className={gov[0]===undefined?"d-none":""}>
      <FormControl  className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Lieux</InputLabel>
        <Select
        
          label="Lieux"
          id="demo-mutiple-name"
          multiple
          value={city}
          onChange={handleChangeCity}
          input={<BootstrapInput id="select-multiple-chip"  />}
               
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {getCity(gov[0])===null?"No!!":getCity(gov[0]).map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, city, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
      </div> */}
    </div>
  );
}
