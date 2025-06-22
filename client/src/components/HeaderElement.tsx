import { Container, Typography } from '@mui/material';
import '../App.css'

interface HeaderProps {
    headliner: string
}

const headerElement: React.FC<HeaderProps> = ({ headliner }): React.ReactElement => {


    return (
                <Typography className='headliner' variant="h3">{headliner}
                    </Typography>
            )
}

export default headerElement;