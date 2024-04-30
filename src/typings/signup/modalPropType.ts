export interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children?: React.ReactNode;
}