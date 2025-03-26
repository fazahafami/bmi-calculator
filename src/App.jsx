import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import bgImage from './assets/bmiImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

const calcWeightRange = (height) => {
  if (!height) return;
  const heightInMeters = height / 100;
  const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1)
  const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1)
  return `${minWeight} kg - ${maxWeight} kg`
}



function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tips, setTips] = useState("")
  const [motivation, setMotivation] = useState("")
  const [normalWeightRange, setNormalWeightRange] = useState("")



  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      let categoryText = "";
      let healthTips = "";
      let motivationMsg = "";

      if (bmiValue < 18.5) {
        categoryText = "🔵 Underweight";
        healthTips = "✅ Eat more calorie-dense foods like nuts & dairy.\n✅ Increase protein intake.\n✅ Strength training for muscle gain.";
        motivationMsg = "🌟 Your body is capable of great things! Nourish yourself well and grow stronger every day! Here are some tips for you:";
      } else if (bmiValue < 24.9) {
        categoryText = "🟢 Normal weight";
        healthTips = "✅ Maintain a balanced diet.\n✅ Exercise 3-5 times a week.\n✅ Stay hydrated and manage stress.";
        motivationMsg = "💪 Keep up the great work! Your health is your wealth, and you're doing fantastic! Here are some tips for you:";
      } else if (bmiValue < 29.9) {
        categoryText = "🟠 Overweight";
        healthTips = "✅ Reduce sugary drinks & processed foods.\n✅ Increase fiber intake.\n✅ Exercise 30+ mins daily.";
        motivationMsg = "🔥 Progress, not perfection! Small steps today lead to a healthier tomorrow! Here are some tips for you:";
      } else {
        categoryText = "🔴 Obese";
        healthTips = "✅ Gradually reduce calorie intake.\n✅ Choose whole, unprocessed foods.\n✅ Consult a doctor for a personalized plan.";
        motivationMsg = "🌈 Every journey starts with a single step! Stay strong, and take it one day at a time. Here are some tips for you:";
      }

      setCategory(categoryText);
      setTips(healthTips);
      setMotivation(motivationMsg);
      setNormalWeightRange(calcWeightRange(height));
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
            <Modal.Header className='d-flex justify-content-between   p-2 p-md-3' >
              <Modal.Title style={{ color: 'black' }}>Your BMI:</Modal.Title>
              <Button variant="outline-dark" className="" size="lg"onClick={resetForm}>
              <FontAwesomeIcon icon={faXmark} />
              </Button>
            </Modal.Header>
            <Modal.Body className="text-center mt-n1">
              <h1 className="text-primary" style={{ fontSize: "90px" }}><strong>{bmi}</strong></h1>
              <p className="fs-5" style={{ color: 'black' }}>{category}</p>
              <h5 className='text-success' >Your Normal Weight Range:</h5>
              <p  style={{ color: 'black', fontSize:"" }} >{normalWeightRange}</p>
              <hr style={{ color: 'black' }} />
              <p className="text-start" style={{ color: 'black' }} >{motivation}</p>
              <p className="text-start" style={{ whiteSpace: "pre-line", color: 'black' }}>
                {tips}
              </p>
            </Modal.Body>
            <Modal.Footer className='d-none d-md-flex p-3'>
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
