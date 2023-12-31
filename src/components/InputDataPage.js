import {useState} from "react";
import './Components.css';
import axios from 'axios'

export const InputDataPage = () => {

  // Sets the useStates for all of the values
  const [actionValue, setActionValue] = useState('');
  const [idValue, setIdValue] = useState(null);
  const [equipmentValue, setEquipmentValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [breakdownValue, setBreakdownValue] = useState(null);
  
  // Outputs the value after form gets submitted
  const output = document.getElementById("output");

  // Render the fields when actionValue changes from add, view, update, or delete data
  const renderFields = (actionValue) => {
    switch (actionValue) {
      case '':
        break;
      case 'add':
        return (
          <div>
            <label>Equipment:</label>
            <input onChange={(e) => setEquipmentValue(e.target.value)} name="equipment" placeholder='Enter Equipment Name' required/>

            <label>Date:</label>
            <input onChange={(e) => setDateValue(e.target.value)} name="enter-date" placeholder='Enter Date' required/>

            <label>Number of Breakdowns:</label>
            <input onChange={(e) => setBreakdownValue(e.target.value)} name="breakdown-rate" placeholder='Enter Breakdown Rate' required/>
            
            <div>
              <button type="submit">Add Data</button>
            </div>

          </div>
          );

      case 'view':
        return(
          <div>
            <label>Equipment:</label>
            <input onChange={(e) => setEquipmentValue(e.target.value)} name="equipment" placeholder='Enter Equipment Name' required/>
            
            <div>
              <button type="submit">View Data</button>
            </div>
          
          </div>);

      case 'update':
        return(
          <div>
            <label>ID of Data Point:</label>
            <input onChange={(e) => setIdValue(e.target.value)} name="id" placeholder='Enter ID Data Point' required/>
            
            <label>Equipment:</label>
            <input onChange={(e) => setEquipmentValue(e.target.value)} name="equipment" placeholder='Enter Equipment Name' required/>

            <label>Date:</label>
            <input onChange={(e) => setDateValue(e.target.value)} name="enter-date" placeholder='Enter Date' required/>

            <label>Number of Breakdowns:</label>
            <input onChange={(e) => setBreakdownValue(e.target.value)} name="breakdown-rate" placeholder='Enter Breakdown Rate' required/>

            <div>
              <button type="submit">Update Data</button>
            </div>

          </div>);

      case 'delete':
        return(
          <div>
            <label>ID of Data Point:</label>
            <input onChange={(e) => setIdValue(e.target.value)} name="id" placeholder='Enter ID Data Point' required/>

            <div>
              <button type="submit">Delete Data</button>
            </div>
        
          </div>
        )

      default:
        break;
    };
  }

  // Reset fields after a handleChange for dropdown menu or when the form gets submitted
  const handleResetValues = (e) => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    setIdValue(null);
    setEquipmentValue(null);
    setDateValue(null);
    setBreakdownValue(null);
  }

  // Submits request to backend server after form gets submitted
  const handleSubmitFormClick = async (e) => {
    e.preventDefault();
    switch (actionValue) {
      case 'add':
        output.innerHTML = `You've added a data point! Equipment: <b>${equipmentValue}</b>, Date: <b>${dateValue}</b>, Breakdown Rate: <b>${breakdownValue}</b>`
        console.log(actionValue, idValue, equipmentValue, dateValue, breakdownValue);
        
        handleResetValues(e);
        break;
      case 'view':
        try {

          const response = await axios.get("http://localhost:3000/data");
          
          let queryData = [];
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].equipment == equipmentValue) {
              queryData.push(response.data[i]);
            }
          }
          output.innerHTML = `Here's all of the data for Equipment <b>${equipmentValue}</b>! </br>` + JSON.stringify(queryData);
          console.log(actionValue, idValue, equipmentValue, dateValue, breakdownValue);
          
          handleResetValues(e);
        } catch (err) {
          console.error(err);
        }
        break;
      case 'update':
        output.innerHTML = `You've updated a data point! Data Point ID: <b>${idValue}</b>, Equipment: <b>${equipmentValue}</b>, Date: <b>${dateValue}</b>, Breakdown Rate: <b>${breakdownValue}</b>`
        console.log(actionValue, idValue, equipmentValue, dateValue, breakdownValue);
        
        handleResetValues(e);
        break;
      case 'delete':
        output.innerHTML = `You've deleted a data point! Data Point ID: <b>${idValue}</b>`
        console.log(actionValue, idValue, equipmentValue, dateValue, breakdownValue);
        
        handleResetValues(e);
        break;
      default:
        break;
    };
  }

  // Sets the action state, and resets fields and the outputHTML for the inputs if the action has changed
  const handleResetOnActionChange = (e) => {
    setActionValue(e.target.value);
    
    if (output != null) {
      output.innerHTML = ""
    };

    handleResetValues(e);
  }
    return (
      <div>
        <h2>Input Data</h2>
        <form autoComplete="off" onSubmit={handleSubmitFormClick}>

            <div>
              <label>Select Action:</label>
              <select name="action" onChange={handleResetOnActionChange}>
                <option value="">-Select Action-</option>
                <option value="add">Add Data</option>
                <option value="view">View All Data</option>
                <option value="update">Update Data</option>
                <option value="delete">Delete Data</option>
              </select>
            </div>
            
            <div>
              {renderFields(actionValue)}
            </div>

            <div id="output"></div>
        </form>
      </div>
    )
  }