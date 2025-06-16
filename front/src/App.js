import React, { useState } from 'react';
import CrystalBallScene from './components/CrystalBallScene';
import NameInput from './components/NameInput';
import ConcernInput from './components/ConcernInput';
import titleImg from './img/title.png';
import namePromptImg from './img/name.png';
import prettyImg from './img/pretty_name.png';
import worryImg from './img/worry.png';
import majorImg from './img/major.png';
import './App.css';

function App() {
  const [step, setStep] = useState('start');
  const [major, setmajor] = useState('');
  const [name, setName] = useState('');
  const [concern, setConcern] = useState('');
  const [currentMessageImg, setCurrentMessageImg] = useState('');
  const [showConcernInput, setShowConcernInput] = useState(false);

  const handleStartClick = () => {
    setStep('major');
    setCurrentMessageImg('major');
  };

  const handlemajorSubmit = () => {
    if (major) {
      setStep('nameInput');
      setCurrentMessageImg('name');
    }
  };

  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setStep('concernInput');
    setShowConcernInput(false);
    setCurrentMessageImg('pretty');

    setTimeout(() => {
      setCurrentMessageImg('worry');
      setShowConcernInput(true);
    }, 2000);
  };

  const handleConcernSubmit = (enteredConcern) => {
    setConcern(enteredConcern);
    setCurrentMessageImg('');
    setStep('result');
  };

  return (
    <div className="app-background" style={{ height: '100vh' }}>
      {step === 'start' ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleStartClick}
        >
          <img
            src={titleImg}
            alt="타이틀"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', height: '100%' }}>
          {/* 수정구슬 */}
          <div
            style={{
              width: '300px',
              height: '300px',
              position: 'relative',
              marginTop: '40px',
              marginLeft: '40px',
            }}
          >
            <CrystalBallScene />
            {currentMessageImg && (
              <div className="magic-orb-overlay-message">
                {currentMessageImg === 'major' && (
                  <img src={majorImg} alt="소속을 알려주세요" style={{ width: '220px' }} />
                )}
                {currentMessageImg === 'name' && (
                  <img src={namePromptImg} alt="이름을 알려주세요" style={{ width: '220px' }} />
                )}
                {currentMessageImg === 'pretty' && (
                  <img src={prettyImg} alt="이름이 예뻐요" style={{ width: '220px' }} />
                )}
                {currentMessageImg === 'worry' && (
                  <img src={worryImg} alt="고민이 뭐에요?" style={{ width: '220px' }} />
                )}
              </div>
            )}
          </div>

          {/* 입력 영역 */}
          <div
            style={{
              marginLeft: '50px',
              flexGrow: 1,
              paddingLeft: '500px',
              paddingBottom: '300px',
              color: 'white',
            }}
          >
            {step === 'major' && (
              <div style={{ marginTop: '500px' , marginLeft: '50px'}}>
                <form>
                  <label>
                    <input
                      type="radio"
                      name="major"
                      value="소프트웨어과"
                      onChange={(e) => setmajor(e.target.value)}
                    /> 소프트웨어과
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="major"
                      value="디자인과"
                      onChange={(e) => setmajor(e.target.value)}
                    /> 디자인과
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="major"
                      value="외부인"
                      onChange={(e) => setmajor(e.target.value)}
                    /> 외부인
                  </label>
                </form>
                <button
                  onClick={handlemajorSubmit}
                  disabled={!major}
                  style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                >
                  선택
                </button>
              </div>
            )}


            {step === 'nameInput' && <NameInput onSubmit={handleNameSubmit} />}
            {step === 'concernInput' && showConcernInput && (
              <ConcernInput onSubmit={handleConcernSubmit} />
            )}
            {step === 'result' && (
              <div>
                <p>{major}의 {name}님의 고민이 수정구슬에 전달되었습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;