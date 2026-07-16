import binIcon from "./assets/bin2.png"
import { useState } from 'react';
import './App.css'



function App() {
    const [goals, setGoals] = useState([]);

    const [goalName, setGoalName] = useState("")

    function addGoals(event){

        event.preventDefault();

        if(!goalName.trim()){
            return;
        }

        const newGoals = {
            id: crypto.randomUUID(),
            title: goalName,
            completed: false,
        }

        setGoals([...goals, newGoals]);
        setGoalName("");
    }

    function deleteGoals(id){
        setGoals(goals.filter(goal => goal.id !== id));
    }

    function toggleCompleted(id) {
        setGoals(goals.map((goal) => goal.id === id ? { ...goal, completed: !goal.completed } : goal));
    }

    return (
        <div className="App">
            <h1 className="header">My Bucket-List</h1>

            <form className="goal-form" onSubmit={addGoals}>
                <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                />
                <button className="button" onClick={addGoals}>Add Goals</button>
            </form>

            <ul className="list">
                {goals.map(goal => (
                    <li key={goal.id} className="goal-item">

                        <div
                            className={`checkbox ${goal.completed ? "completed" : ""}`}
                            onClick={() => toggleCompleted(goal.id)}
                        >
                            {goal.completed && "✓"}
                        </div>


                        <span>{goal.title}</span>

                        <button
                            className="delete-button"
                            onClick={() => deleteGoals(goal.id)}>
                            <img src={binIcon} alt="delete" />
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;