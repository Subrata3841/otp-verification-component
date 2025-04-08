import { useEffect, useRef, useState } from "react";
import "./styles.css";

// Define the number of OTP input boxes
const OTP_DIGITS_COUNT = 5;

export default function App() {
  // State to hold OTP values for each input box
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );

  // Refs to programmatically control focus of each input
  const refArr = useRef([]);

  // Focus on the first input box when component mounts
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  /**
   * Handle value change in each OTP input box
   * @param {string} value - The new character typed
   * @param {number} index - Index of the input box being edited
   */
  const handleOnChange = (value, index) => {
    // Ignore non-numeric input
    if (isNaN(value)) return;

    const newValue = value.trim();
    const newArr = [...inputArr];
    // Only take the last typed digit (handles pasting multiple characters)
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    // Auto-focus next input if available
    if (newValue) {
      refArr.current[index + 1]?.focus();
    }
  };

  /**
   * Handle keyboard navigation (Backspace, Arrow keys)
   * @param {object} e - Keyboard event
   * @param {number} index - Index of current input box
   */
  const handleOnKeyDown = (e, index) => {
    // Move to previous input on Backspace if current is empty
    if (e.key === "Backspace" && !e.target.value) {
      if (index > 0) {
        refArr.current[index - 1]?.focus();
      }
    }

    // // Navigate with ArrowLeft
    // else if (e.key === "ArrowLeft") {
    //   if (index > 0) {
    //     refArr.current[index - 1]?.focus();
    //   }
    // }

    // // Navigate with ArrowRight
    // else if (e.key === "ArrowRight") {
    //   if (index < OTP_DIGITS_COUNT - 1) {
    //     refArr.current[index + 1]?.focus();
    //   }
    // }
  };

  return (
    <div className="App">
      <h1>Validate OTP</h1>

      {/* Render OTP input boxes */}
      <div className="otp-container">
        {inputArr.map((input, index) => (
          <input
            key={index}
            type="text"
            className="otp-input"
            maxLength={1}
            value={inputArr[index]}
            ref={(el) => (refArr.current[index] = el)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}
