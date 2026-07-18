import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { useEffect, useMemo, useState } from "react";
import binIcon from "./assets/bin2.png";
import "./App.css";

function BucketList({ signOut, user }) {
    const client = useMemo(() => generateClient(), []);

    const [goals, setGoals] = useState([]);
    const [goalName, setGoalName] = useState("");

    // Load goals and keep the list synchronized with Amplify Data.
    useEffect(() => {
        const subscription = client.models.Item
            .observeQuery()
            .subscribe({
                next: ({ items }) => {
                    setGoals([...items]);
                },
                error: (error) => {
                    console.error("Could not load goals:", error);
                },
            });

        return () => subscription.unsubscribe();
    }, [client]);

    async function addGoal(event) {
        event.preventDefault();

        const title = goalName.trim();

        if (!title) {
            return;
        }

        const { errors } = await client.models.Item.create({
            title,
            completed: false,
        });

        if (errors) {
            console.error("Could not add goal:", errors);
            return;
        }

        setGoalName("");
    }

    async function deleteGoal(id) {
        const { errors } = await client.models.Item.delete({ id });

        if (errors) {
            console.error("Could not delete goal:", errors);
        }
    }

    async function toggleCompleted(goal) {
        const { errors } = await client.models.Item.update({
            id: goal.id,
            completed: !goal.completed,
        });

        if (errors) {
            console.error("Could not update goal:", errors);
        }
    }

    return (
        <div className="App">
            <h1 className="header">My Bucket-List</h1>

            <p>Welcome {user.username}</p>

            <form className="goal-form" onSubmit={addGoal}>
                <input
                    type="text"
                    value={goalName}
                    onChange={(event) => setGoalName(event.target.value)}
                />

                <button className="button" type="submit">
                    Add Goals
                </button>
            </form>

            <ul className="list">
                {goals.map((goal) => (
                    <li key={goal.id} className="goal-item">
                        <div
                            className={`checkbox ${
                                goal.completed ? "completed" : ""
                            }`}
                            onClick={() => toggleCompleted(goal)}
                        >
                            {goal.completed && "✓"}
                        </div>

                        <span>{goal.title}</span>

                        <button
                            className="delete-button"
                            type="button"
                            onClick={() => deleteGoal(goal.id)}
                        >
                            <img src={binIcon} alt="delete" />
                        </button>
                    </li>
                ))}
            </ul>

            <button type="button" onClick={signOut}>
                Sign Out
            </button>
        </div>
    );
}

function App() {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <BucketList signOut={signOut} user={user} />
            )}
        </Authenticator>
    );
}

export default App;
