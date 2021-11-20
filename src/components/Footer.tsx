import React, { useEffect, useState } from "react";

function Footer() {

	const [colorPicker, setColorPicker] = useState<number>(0);

	const handleColor = (event: any) => {
		setColorPicker(parseInt(event.target.value));
	}

	useEffect(() => {
		switch (colorPicker) {
			case 0:
				document.getElementById('labelbutton')!.style.color = "rgb(187, 12, 12)";
				document.getElementById('labelbutton')!.style.backgroundColor = "rgb(93, 163, 180)";
				Array.from(document.getElementsByClassName('App') as HTMLCollectionOf<HTMLElement>)[0].style.color = "rgb(161, 160, 160)";
				document.getElementById("head")!.style.backgroundColor = "rgb(23, 5, 44)";
				document.body.style.background = 'rgb(56, 54, 54)';
				break;
			case 1:
				document.getElementById('labelbutton')!.style.color = "black";
				document.getElementById('labelbutton')!.style.backgroundColor = "#53d9c0";
				Array.from(document.getElementsByClassName('App') as HTMLCollectionOf<HTMLElement>)[0].style.color = "black";
				document.getElementById("head")!.style.backgroundColor = "#53d9c0";
				document.body.style.background = 'rgb(224, 224, 224)';
				break;
		}
	}, [colorPicker]);

	return (
		<div className="footer">
			<hr></hr>
			<p>PicTime &copy; 2021 - All rights reserved
				<span style={{ float: "left", marginLeft: "5px" }}>
					<select value={colorPicker} id="imagesize" onChange={handleColor}>
						<option value={0}>Dark</option>
						<option value={1}>Light</option>
					</select>
				</span>
			</p>
		</div>
	)

}

export default Footer;

