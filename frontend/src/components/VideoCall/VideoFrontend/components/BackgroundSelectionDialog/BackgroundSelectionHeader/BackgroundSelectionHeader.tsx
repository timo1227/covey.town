import Container from '@mui/material/Container';
import CloseIcon from '../../../icons/CloseIcon';

interface BackgroundSelectionHeaderProps {
  onClose: () => void;
}

export default function BackgroundSelectionHeader({ onClose }: BackgroundSelectionHeaderProps) {
  return (
    <Container
      sx={{
        minHeight: '56px',
        background: '#F4F4F6',
        borderBottom: '1px solid #E4E7E9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1em',
      }}>
      <div className='font-bold'>Backgrounds</div>
      <button className='cursor-pointer flex bg-transparent border-0 p-1' onClick={onClose}>
        <CloseIcon />
      </button>
    </Container>
  );
}
