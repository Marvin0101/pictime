export interface ModalviewProps {
    display:string;
    setInvisible:React.Dispatch<React.SetStateAction<string>>;
    imageUrl:string[];
    modalIndex:number;
    tag:string[];
    backColor:string[];
    textColor:string[];
}