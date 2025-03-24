import { ToastContainer, toast } from 'react-toastify';

export default function CustomNotifier({ message, type } : any) {
    
    switch(type) {
        case 'success':
            toast.success(message);
            break;
        case 'error': 
            toast.error(message);
            break;
        default:
            toast.info(message);
    }

    return <ToastContainer />;
}