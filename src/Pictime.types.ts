export interface ModalProps {
    display:string;
    setInvisible:React.Dispatch<React.SetStateAction<string>>;
    imageUrl:string[];
    modalIndex:number;
}