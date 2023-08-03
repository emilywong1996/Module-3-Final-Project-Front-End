import {useState} from "react";
import './Components.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|JPG|jpg|svg)$/));

export const GraphsPage = () => {

  const [equipmentValue, setEquipmentValue] = useState('')


  const handleSubmitFormClick = (e) => {
    e.preventDefault();
    document.getElementById("handleImage").src = images[equipmentValue + ".jpg"];
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
  }

  return (
    <div>
      <h2>Graphs</h2>
      <form autoComplete="off" onSubmit={handleSubmitFormClick}>
        <label>Equipment:</label>
        <input onChange={(e) => setEquipmentValue(e.target.value)} name="equipment" placeholder='Enter Equipment Name' required/>
        <button type="submit">Graph Equipment!</button>
      </form>
      <img id="handleImage"></img>
    </div>
  )
}