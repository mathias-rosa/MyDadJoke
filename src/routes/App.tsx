import ThemeProvider from "../theme/ThemeProvider";
import Root from "./root";

export default function App() {

    return (
        <ThemeProvider>
            <Root />
        </ThemeProvider>
    );
}