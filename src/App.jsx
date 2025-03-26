import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import bgImage from './assets/bmiImage.png'



//function for slide bar
const MAX = 100;
const MIN = 5;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];
function valuetext(value) {
  return `${value} years`;
}





function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tips, setTips] = useState("")


  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setCategory("🔵 Underweight");
        setTips("✅ Eat more calorie-dense foods like nuts & dairy.\n✅ Increase protein intake.\n✅ Strength training for muscle gain.")
      }
      else if (bmiValue < 24.9) {
        setCategory("🟢 Normal weight");
        setTips("✅ Maintain a balanced diet.\n✅ Exercise 3-5 times a week.\n✅ Stay hydrated and manage stress.")
      }
      else if (bmiValue < 29.9) {
        setCategory("🟠 Overweight");
        setTips("✅ Reduce sugary drinks & processed foods.\n✅ Increase fiber intake.\n✅ Exercise 30+ mins daily.");
      }
      else {
        setCategory("🔴 Obese");
        setTips("✅ Gradually reduce calorie intake.\n✅ Choose whole, unprocessed foods.\n✅ Consult a doctor for a personalized plan.");
      }

      setShowModal(true);
    } else {
      alert("Please enter valid weight and height.");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    window.location.reload()
  };

  return (
    <>
      {/* background image */}
      <img src={bgImage} alt="Decorative" className="corner-image" />


      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%', background: "linear-gradient(to right, #a0c8ee, #c383df)" }}>


        <div id='main' className="p-3 w-100% rounded-4 bg-light bg-opacity-75 shadow lg bmi-card">
          <h1 className='text-primary'>BMI Calculator</h1>
          <p className='mt-n1 mb-3 fs-5' style={{ color: 'black' }}><em>Know your Body..</em></p>

          {/* gender selection */}
          <Form.Label style={{ color: 'black' }}>Gender:</Form.Label>
          <Form style={{ color: 'black' }}>

            <div className="mb-3">
              <Form.Check inline label="Female" name="group1" type='radio' />
              <Form.Check inline label="Male" name="group1" type='radio' />
              <Form.Check inline label="Other" name="group1" type='radio' />
            </div>

          </Form>

          {/* Age Slection */}
          <Form.Label style={{ color: 'black' }}>Age:</Form.Label>
          <div className='mb-3'>
            <Slider
              aria-label="Always visible"
              defaultValue={20}
              getAriaValueText={valuetext}
              step={1}
              min={MIN}
              max={MAX}
              marks={marks}
              valueLabelDisplay="on"
              className='text-primary'
            />
            <div className='d-flex justify-content-between mt-n1' style={{ color: 'black' }}>
              <span>5 years</span><span>100 years</span>
            </div>
          </div>
          <Form.Label style={{ color: 'black' }}>Weight:</Form.Label>
          <div className='mb-2' style={{ color: 'black' }}>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-control p-1 border border-light bg-white rounded" placeholder="Enter weight in kg"></input>
          </div>
          <Form.Label style={{ color: 'black' }}>Height:</Form.Label>
          <div className='mb-2'>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="form-control p-1 border border-light bg-white rounded" placeholder="Enter height in cm"></input>
          </div>
          <div className='d-flex justify-content-center'>
            <button type="button" className='btn btn-primary mt-2 bg-primary' onClick={calculateBMI}>Calculate</button>
          </div>

          {/* Bootstrap Modal for BMI Result */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)} centered
            backdrop="static"
            keyboard={false}
            style={{ backgroundColor: "rgba(37, 35, 35, 0.5)" }}
            className="custom-modal"
          >
            <Modal.Header className='bg-opacity-50 shadow' closeButton>
              <Modal.Title style={{ color: 'black' }}>Your BMI:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <h1 className="text-primary" style={{ fontSize: "100px" }}><strong>{bmi}</strong></h1>
              <p className="fs-5" style={{ color: 'black' }}>{category}</p>
              <hr style={{ color: 'black' }} />
              <h5 style={{ color: 'black' }}>Health Tips:</h5>
              <p className="text-start" style={{ whiteSpace: "pre-line", color: 'black' }}>
                {tips}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={resetForm}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    </>
  )
}

export default App
