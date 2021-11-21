export interface ModalviewProps {
    display:string;
    setInvisible:React.Dispatch<React.SetStateAction<string>>;
    imageUrl:string[];
    modalIndex:number;
    tag:string[];
    backColor:string[];
    textColor:string[];
}

export interface ImageProps {
    image:string;
    tag:string;
    backColor:string;
    textColor:string;
    imageSize:number;
    fontSize:number;
    index:number;
    handlerImage:(i:number) => void;
    handlerDelete:(i:number) => void;
}

export interface UploadProps {
    handler:(event:any) => void;
}

export interface SizepickerProps {
    value:string;
    handler:(event:any) => void;
}

export interface TagpickerProps {
    tags:string[];
    backcolors:string[];
    textcolors:string[];
    value:number;
    handler:(event:any) => void;
}

export interface TagcreatorProps {
    inputtext:string;
    inputcolor:string;
    inputtextcolor:string;
    handler:(event:any) => void;
    setInputtext:React.Dispatch<React.SetStateAction<string>>;
    setInputcolor:React.Dispatch<React.SetStateAction<string>>;
    setInputtextcolor:React.Dispatch<React.SetStateAction<string>>;
}
