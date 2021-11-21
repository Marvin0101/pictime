import React, { useEffect, useState } from "react";
import { ModalviewProps } from "../Pictime.types";

function Modalview(props: ModalviewProps) {

	const [imageIndex, setImageIndex] = useState<number>(props.modalIndex);

	useEffect(() => {
		setImageIndex(props.modalIndex);
	}, [props.modalIndex])

	const nextImage = () => {
		if (imageIndex >= props.imageUrl.length - 1) {
			setImageIndex(0);
		} else {
			setImageIndex(imageIndex + 1);
		}
	}

	const prevImage = () => {
		if (imageIndex <= 0) {
			setImageIndex(props.imageUrl.length - 1);
		} else {
			setImageIndex(imageIndex - 1);
		}
	}

	const close = () => {
		props.setInvisible("none");
		setImageIndex(props.modalIndex);
	}

	// console.log("Modalprops: " + props.imageUrl);
	// console.log("Modalprops: " + props.modalIndex);
	// console.log("ModalImageIndex: " + imageIndex);

	return (
		<div className="modal" style={{ display: props.display }}>
			<div className="modal-content">
				<span className="closeModal" onClick={close} >&times;</span>
				<p style={{color:"rgb(161, 160, 160)"}}>PicTime-Galerie</p>
				<ul className="modal-flex">
					<li className="modal-container">
						<img src={props.imageUrl[imageIndex]} alt="" className="imagegallery" />
						<div className="modal-tag" style={{ backgroundColor: props.backColor[imageIndex], color: props.textColor[imageIndex] }}>
							{props.tag[imageIndex]}
						</div>
					</li>
				</ul>
				<div className="leftswipe" onClick={prevImage}>
					<div>&lt;</div>
				</div>
				<div className="rightswipe" onClick={nextImage}>
					<div>&#062;</div>
				</div>
			</div>
		</div>

	)
}

export default Modalview;