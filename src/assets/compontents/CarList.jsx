import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";

import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {

    // states
    const [cars, setCars] = useState([{ brand: '', model: ''}]); 

   /*  const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    }) */
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");

    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { cellRenderer: params => <EditCar updateCar={updateCar} params={params}/>, width: 120 },
        { // <-- Add comma here
            cellRenderer: (params) => (
                <Button size="small"
                    color="error"
                    onClick={() => deleteCar(params)}
                >
                    Delete
                </Button>
            ),
            width: 120
        }
    ]);
    

    useEffect(() => getCars(), []); // when [] then fetch only after first rendering

    // functions
    // getCars
    const getCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', { method: 'GET' })
            .then(response => {
                //console.log(response)
                if (response.ok)
                    return response.json();
            })
            .then(data => {
                //console.log(data._embedded.cars);
                setCars(data._embedded.cars);
            })
            .catch(err => console.error(err)
            )
    }

    //deleteCar

    const deleteCar = (params) => {
        //console.log(params.data);
        console.log(params.data._links.car.href);
        if (window.confirm("are you sure?")){

        
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    //snackbar viesti
                    
                    setMsgSnackbar("Car deleted succeessfully!");
                    setOpenSnackbar(true);
                    getCars(); //päivittää heti, niin ei näy poistettuja.
                } else {
                    
                    setMsgSnackbar("something went wrong with deleting");
                    setOpenSnackbar(true);
                    
                    
                }
                    
                
            })
            .catch(err => console.error(err)
            )
        }
    }

    const addCar = (car) => {
        console.log("Carlist: addCar");
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {'Content_type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response =>{
            console.log("response" + response);
            if (response.ok){
                
                console.log("response on ok");
                return response.json;
            } else {
                throw new Error('Datan vienti bakkarrin ei onnistunut')
            }
        })
        .then(data => {
            console.log("parsed json = " + data);
            getCars();
        })
        .catch(err => console.err(err))
    }

    
    const updateCar = (url, updatedCar) => { //katso kunnolla
        console.log("Carlist: updateCar");
        console.log(updatedCar);
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response =>{
            console.log("response" + response);
            if (response.ok){
                
                console.log("response on ok");
                return response.json;
            } else {
                throw new Error('Datan vienti bakkarrin ei onnistunut')
            }
        })
        .then(data => {
            console.log("parsed json = " + data);
            getCars();
        })
        .catch(err => console.error(err))
    }

    // return
    return (
        <>
        <AddCar addCar={addCar}/>
        
            
            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact 
                rowData={cars}
                 columnDefs={colDefs}
                 pagination={true}
                 paginationPageSize={8}>

                </AgGridReact>
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                >

                </Snackbar>
            </div>
        </>
    )

}