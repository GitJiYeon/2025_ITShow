import React, { useState } from 'react';
import CrystalBallScene from './components/CrystalBallScene';
import NameInput from './components/NameInput';
import ConcernInput from './components/ConcernInput';
import titleImg from './img/title.png';
import namePromptImg from './img/name.png';
import prettyImg from './img/pretty_name.png';
import worryImg from './img/worry.png';
import './App.css';

function App() {
  const [step, setStep] = useState('start');
  const [name, setName] = useState('');
  const [concern, setConcern] = useState('');
  const [currentMessageImg, setCurrentMessageImg] = useState(''); // 'name', 'pretty', 'worry'
  const [showConcernInput, setShowConcernInput] = useState(false);

  const handleStartClick = () => {
    setStep('nameInput');
    setCurrentMessageImg('name');
  };

  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setStep('concernInput'); // 미리 concernInput 단계로 넘어감
    setShowConcernInput(false); // 입력창은 아직 안 보이게
    setCurrentMessageImg('pretty'); // 예쁘다 이미지 먼저 보여줌

    // 2초 후 worry 이미지 + 고민 입력창 등장
    setTimeout(() => {
      setCurrentMessageImg('worry');
      setShowConcernInput(true);
    }, 2000);
  };

  const handleConcernSubmit = (enteredConcern) => {
    setConcern(enteredConcern);
    setCurrentMessageImg(''); // 메시지 제거하거나 다른 걸로 바꿔도 됨
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

          {/* 별 + 입력칸 영역 */}
          <div
            style={{
              marginLeft: '50px',
              flexGrow: 1,
              paddingLeft: '500px',
              paddingBottom: '300px',
            }}
          >
            {step === 'nameInput' && <NameInput onSubmit={handleNameSubmit} />}
            {step === 'concernInput' && showConcernInput && (
              <ConcernInput onSubmit={handleConcernSubmit} />
            )}
            {step === 'result' && (
              <div style={{ color: 'white' }}>
                <p>{name}님의 고민이 수정구슬에 전달되었습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;