// src/JeopardyGame/JeopardyGame.jsx
import React, { useState } from 'react';
import './JeopardyGame.css';

const initialData = [
  {
    category: "Люба",
    questions: [
      { id: 1, value: 100, q: "Какой сериал я могу пересматривать вечно и мне не надоест?", a: "Отчаянные домохозяйки" },
      { id: 2, value: 200, q: "Каким именем меня должны были назвать?", a: "Маша" },
      { id: 3, value: 300, q: "Сколько у меня татуировок?", a: "1" },
      { id: 4, value: 400, q: "Мой самый стыдный (смешной сильно) поступок", a: "Зубы пропали..." },
      { id: 5, value: 500, q: "Я ненавижу…", a: " когда кто-то громко ест)" },
      { id: 6, value: 600, q: "В детстве я хотела стать...", a: "Патологоанатом" },
    ]
  },
  {
    category: "Кристина",
    questions: [
      { id: 7, value: 100, q: "Моя любимая форма имени", a: "Кристи" },
      { id: 8, value: 200, q: "Какой трек обязан быть на моей свадьбе/дне рождения?", a: "Жить в кайф!!!" },
      { id: 9, value: 300, q: "Мой любимый мультфильм", a: "Ну, погоди!" },
      { id: 10, value: 400, q: "В детстве я хотела стать...", a: "учителем физкультуры/воспитателем в детском саду, парикхмахером и продавцом мяса (за последнее +100)" },
      { id: 11, value: 500, q: "Мой самый бесполезный талант/умение", a: "Спать, закинув одну ногу на другую" },
      { id: 12, value: 600, q: "Моё самое кринжовое свидание", a: "Звонок нынешней девушке бывшего" },
    ]
  },
  {
    category: "Аэлита",
    questions: [
      { id: 13, value: 100, q: "Какой сериал я могу пересматривать вечно и мне не надоест?", a: "Дневники вампира " },
      { id: 14, value: 200, q: "Имя, которое нельзя называть ", a: "Павел" },
      { id: 15, value: 300, q: "Каким именем меня должны были назвать?", a: "Аделина" },
      { id: 16, value: 400, q: "Моя любимая форма имени", a: "Аэлитик" },
      { id: 17, value: 500, q: "Мой любимый персонаж дисней", a: "Ханна Монтана" },
      { id: 18, value: 600, q: "Что абсолютно всегда лежит у меня в сумочке?", a: "Скандики (мятные конфетки)" },
    ]
  }
];

const JeopardyGame = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Люба', score: 0, color: '#F4FCAB' },
    { id: 2, name: 'Кристинна', score: 0, color: '#EBA0C0' },
    { id: 3, name: 'Аэлита', score: 0, color: '#95DBAF' },
    // { id: 4, name: 'Team 4', score: 0, color: '#e6ffcc' },
  ]);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [visited, setVisited] = useState(new Set());

  const handleQuestionClick = (q) => {
    if (visited.has(q.id)) return;
    setActiveQuestion(q);
    setShowAnswer(false);
  };

  // Метод ручного изменения счета (с боковой панели)
  const adjustScore = (teamId, amount) => {
    setTeams(teams.map(t => t.id === teamId ? { ...t, score: t.score + amount } : t));
  };

  // Метод автоматического начисления баллов за текущий вопрос
  const handleAwardPoints = (teamId, isCorrect) => {
    if (!activeQuestion) return;
    const points = activeQuestion.value;
    adjustScore(teamId, isCorrect ? points : -points);
  };
  const closeQuestion = () => {
    setVisited(prev => new Set(prev).add(activeQuestion.id));
    setActiveQuestion(null);
  };

  return (
    <div className="jeopardy-container">
      {/* Боковая панель команд */}
      <div className="sidebar">
        {teams.map(team => (
          <div key={team.id} className="team-card" style={{ backgroundColor: team.color }}>
            <div className="team-name">{team.name}</div>
            <div className="score">{team.score}</div>
            <div className="score-controls">
              {/* Кнопки быстрого изменения счета на +-100 вручную */}
              <button className="score-btn minus" onClick={() => adjustScore(team.id, -100)}>-</button>
              <button className="score-btn plus" onClick={() => adjustScore(team.id, 100)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Игровое поле */}
      <div className="board">
        {initialData.map((cat, idx) => (
          <div key={idx} className="column">
            <div className="header-card">{cat.category}</div>
            {cat.questions.map(q => {
              const isVisited = visited.has(q.id);
              return (
                <div
                  key={q.id}
                  className={`question-card ${isVisited ? 'visited' : ''}`}
                  onClick={() => handleQuestionClick(q)}
                >
                  {q.value}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Модальное окно вопроса */}
      {activeQuestion && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-text">{activeQuestion.q}</h2>
            
            {showAnswer && <div className="answer-text">{activeQuestion.a}</div>}
            
            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Скрыть ответ" : "Показать ответ"}
              </button>
              <button className="btn btn-secondary" onClick={closeQuestion}>
                Закрыть вопрос
              </button>
            </div>

            {/* Быстрое начисление баллов прямо в модальном окне */}
            <div className="modal-scoring">
              <h4>Начислить баллы за этот вопрос (+/- {activeQuestion.value}):</h4>
              <div className="modal-teams-list">
                {teams.map(team => (
                  <div key={team.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{team.name}</span>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      <button 
                        className="score-btn minus" 
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleAwardPoints(team.id, false)}
                      >
                        -
                      </button>
                      <button 
                        className="score-btn plus" 
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleAwardPoints(team.id, true)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JeopardyGame;
