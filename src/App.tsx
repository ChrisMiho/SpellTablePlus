import spellBuddyPlusLogo from '/logo.png';

import './App.css';

function App() {
  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        document.body.style.backgroundColor = 'blue';
      },
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
        <button onClick={() => onclick()}>Click Me!</button>
      </div>
    </>
  );
}

export default App;
