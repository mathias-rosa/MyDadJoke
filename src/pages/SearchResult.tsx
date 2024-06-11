import Paper from '@mui/material/Paper';
import { type Joke } from '../types/api';
import Stack from '@mui/material/Stack';

export default function SearchResult({ jokes } : { jokes: Joke[][] }) {
    return (
        <Stack>
            {
            jokes.map(page => page.map((joke) => (
                <Paper key={joke.id}>
                    {joke.joke}
                </Paper>
            )))}
        </Stack>
    );
}