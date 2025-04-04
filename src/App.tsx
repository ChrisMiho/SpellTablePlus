import { useState } from 'react';
import spellBuddyPlusLogo from '/logo.png';

import './App.css';

function App() {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff'); // State for the selected color
  const [originalColor, setOriginalColor] = useState<string>(''); // State for the original background color

  const changeBackgroundColor = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    if (!originalColor) {
      // Get the original background color only once
      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => getComputedStyle(document.body).backgroundColor,
      });
      setOriginalColor(result.result || 'transparent'); // Use an empty string as a fallback
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
      args: [selectedColor], // Pass the selected color to the script
    });
  };

  const resetBackgroundColor = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
      args: [originalColor], // Reset to the original color
    });
  };

  return (
    <>
      <div>
        <a href='https://github.com/ChrisMiho/SpellTablePlus' target='_blank'>
          <img
            src={spellBuddyPlusLogo}
            className='logo'
            alt='Spell Buddy Plus logo'
          />
        </a>
      </div>
      <h1>SpellTable+</h1>
      <div className='card'>
        <input
          className='color-picker'
          type='color'
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)} // Update the selected color
        />
        <button className='button' onClick={changeBackgroundColor}>
          Background
        </button>
        <button className='button' onClick={resetBackgroundColor}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
