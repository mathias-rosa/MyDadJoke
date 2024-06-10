import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import styled from 'styled-components';

export default styled(AutorenewRoundedIcon)`
    animation: spin 2s linear infinite;
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;

