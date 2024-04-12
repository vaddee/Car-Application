import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props){


    const [car, setCar] = React.useState({
        brand: '',
         model: '',
         color: '',
         fuel: '',
         year: '',
         price: ''
        })
//open false kun ikkuna kiinni
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
       setOpen(true);
       setCar({
        brand: props.params.data.brand,
        model: props.params.data.model
       });
   }

   const handleSave = () => {
       console.log("EditCar: update info car");
       const url = props.params.data._links.car.href;
       props.updateCar(url, car);
       setOpen(false);
       
   }

   
       const handleCancel = () =>  setOpen(false);
       
   
   



   return (

       
       <div>
          
        <Button onClick={handleClickOpen}>Edit</Button>
       
       <Dialog open={open}>
           
           <DialogTitle> Edit car

           </DialogTitle>
           <DialogContent>
               <TextField
                   margin="dense"
                   label="Brand"
                   value={car.brand}
                   onChange={ (e) => setCar({...car, brand: e.target.value})}
                   variant="standard"
                   fullwidth>
               </TextField>

               <TextField
                   margin="dense"
                   label="Model"
                   value={car.model}
                   onChange={ (e) => setCar({...car, model: e.target.value})}
                   variant="standard">
               </TextField>

               <TextField
                   margin="dense"
                   label="color"
                   value={car.color}
                   onChange={ (e) => setCar({...car, color: e.target.value})}
                   variant="standard">
               </TextField>

               <TextField
                   margin="dense"
                   label="fuel"
                   value={car.fuel}
                   onChange={ (e) => setCar({...car, fuel: e.target.value})}
                   variant="standard">
               </TextField>

               <TextField
                   margin="dense"
                   label="year"
                   value={car.year}
                   onChange={ (e) => setCar({...car, year: e.target.value})}
                   variant="standard">
               </TextField>

               <TextField
                   margin="dense"
                   label="price"
                   value={car.price}
                   onChange={ (e) => setCar({...car, price: e.target.value})}
                   variant="standard">
               </TextField>





           </DialogContent>
           <DialogActions>
               <Button onClick={handleSave}>Save</Button>
               <Button onClick={handleCancel}>Cancel</Button>
           </DialogActions>
       </Dialog>
       </div>
   )
}