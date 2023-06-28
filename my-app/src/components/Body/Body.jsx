import React, { useState, useEffect } from 'react';
import bin from '../../assets/images/bin.png';
import './Body.css';

function Body(props) {
  const [word, setWord] = useState('');
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [savedStrings, setSavedStrings] = useState([]);

  const wordChange = event => {
    setWord(event.target.value);
  };

  const saveData = () => {
    const savedData = `${word} - ${transcription} - ${translation}`;
    setSavedStrings([...savedStrings, savedData]);
  };

  const deleteWord = index => {
    const deletedStrings = savedStrings.filter((_, i) => i !== index);
    setSavedStrings(deletedStrings);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
      const data = await response.json();
      console.log(data); // Вывод данных в консоль
      let word = document.getElementById('word')
      let valueWord = word.value
      
      for (let i = 0; i < data.length; i++) {
        if (valueWord === data[i].english) {
          console.log (data[i].transcription) 
          console.log (data[i].russian)

          document.getElementById('transcription').value = data[i].transcription
          document.getElementById('translation').value = data[i].russian
        }
      }
    } catch (error) {
      console.log('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        id='word'
        type="text"
        value={word}
        onChange={wordChange}
        placeholder="Введите слово"
      />

      <input
        id='transcription'
        type="text"
        value={transcription}
        onChange={event => setTranscription(event.target.value)}
        placeholder="Транскрипция"
      />

      <input
        id='translation'
        type="text"
        value={translation}
        onChange={event => setTranslation(event.target.value)}
        placeholder="Перевод"
      />

      <button onClick={fetchData()}>Поиск</button>
      <button onClick={saveData}>Сохранить</button>

      <div>
        {savedStrings.map((savedString, index) => {
          const [savedWord, savedTranscription, savedTranslation] = savedString.split(' - ');
          return (
            <div key={index} className='saveString'>
              <input type="text" value={savedWord} readOnly />
              <input type="text" value={`[${savedTranscription}]`} readOnly />
              <input type="text" value={savedTranslation} readOnly />
              <button className="btn_img" onClick={() => deleteWord(index)}>
                <img src={bin} alt="Корзина" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Body;