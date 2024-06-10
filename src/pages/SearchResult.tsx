import { Paper } from '@mui/material';
import { type Joke } from '../types/api';

export default function SearchResult({ jokes } : { jokes: Joke[][] }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
        }}>
            {
            jokes.map(page => page.map((joke) => (
                <Paper key={joke.id}>
                    {joke.joke}
                </Paper>
            )))}
        </div>
    );
}