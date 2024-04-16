import "./style.css";
import Image1 from "images/1.jpg";
import Image2 from "images/2.jpg";
import Image3 from "images/3.jpg";
import Image4 from "images/4.jpg";
import Image5 from "images/5.jpg";
import Image6 from "images/6.jpg";
import Image7 from "images/7.jpg";
import Image8 from "images/8.jpg";
import Image9 from "images/9.jpg";
import Image10 from "images/10.jpg";
import Image11 from "images/11.jpg";
import Image12 from "images/12.jpg";
import { Renderer, Camera, Transform } from "ogl";

export default class App {
	constructor() {
		this.createRenderer();
		this.createCamera();
		this.createScene();
		this.createGeometry();
		this.onResize();
		this.createMedias();
		this.update();

		this.addEventListeners();
	}

	createRenderer() {
		this.renderer = new Renderer();

		this.gl = this.renderer.gl;
		this.gl.clearColor(0.79607843137, 0.79215686274, 0.74117647058, 1);

		document.body.appendChild(this.gl.canvas);
	}

	createCamera() {
		this.camera = new Camera(this.gl);
		this.camera.fov = 45;
		this.camera.position.z = 20;
	}

	createMedias() {
		this.mediasImages = [
			{ image: Image1, text: "New Synagogue" },
			{ image: Image2, text: "Paro Taktsang" },
			{ image: Image3, text: "Petra" },
			{ image: Image4, text: "Gooderham Building" },
			{ image: Image5, text: "Catherine Palace" },
			{ image: Image6, text: "Sheikh Zayed Mosque" },
			{ image: Image7, text: "Madonna Corona" },
			{ image: Image8, text: "Plaza de Espana" },
			{ image: Image9, text: "Saint Martin" },
			{ image: Image10, text: "Tugela Falls" },
			{ image: Image11, text: "Sintra-Cascais" },
			{ image: Image12, text: "The Prophet's Mosque" },
			{ image: Image1, text: "New Synagogue" },
			{ image: Image2, text: "Paro Taktsang" },
			{ image: Image3, text: "Petra" },
			{ image: Image4, text: "Gooderham Building" },
			{ image: Image5, text: "Catherine Palace" },
			{ image: Image6, text: "Sheikh Zayed Mosque" },
			{ image: Image7, text: "Madonna Corona" },
			{ image: Image8, text: "Plaza de Espana" },
			{ image: Image9, text: "Saint Martin" },
			{ image: Image10, text: "Tugela Falls" },
			{ image: Image11, text: "Sintra-Cascais" },
			{ image: Image12, text: "The Prophet's Mosque" },
		];

		this.medias = this.mediasImages.map(({ image, text }, index) => {
			const media = new Media({
				geometry: this.planeGeometry,
				gl: this.gl,
				image,
				index,
				length: this.mediasImages.length,
				scene: this.scene,
				screen: this.screen,
				text,
				viewport: this.viewport,
			});

			return media;
		});
	}

	createScene() {
		this.scene = new Transform();
	}

	// Create a geometry
	createGeometry() {
		this.planeGeometry = new Plane(this.gl, {
			heightSegments: 50,
			widthSegments: 100,
		});
	}

	/**
	 * Events.
	 */
	onTouchDown(event) {}

	onTouchMove(event) {}

	onTouchUp(event) {}

	onWheel(event) {}

	/**
	 * Resize.
	 */
	onResize() {
		this.screen = {
			height: window.innerHeight,
			width: window.innerWidth,
		};
		//make sure images are responsive
		if (this.medias) {
			this.medias.forEach((media) =>
				media.onResize({
					screen: this.screen,
					viewport: this.viewport,
				})
			);
		}

		this.renderer.setSize(this.screen.width, this.screen.height);

		this.camera.perspective({
			aspect: this.gl.canvas.width / this.gl.canvas.height,
		});

		const fov = this.camera.fov * (Math.PI / 180);
		const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
		const width = height * this.camera.aspect;

		this.viewport = {
			height,
			width,
		};
	}

	/**
	 * Update.
	 */
	update() {
		this.renderer.render({
			scene: this.scene,
			camera: this.camera,
		});

		window.requestAnimationFrame(this.update.bind(this));

		if (this.medias) {
			this.medias.forEach((media) => media.update(this.scroll, this.direction));
		}
	}

	/**
	 * Listeners.
	 */
	addEventListeners() {
		window.addEventListener("resize", this.onResize.bind(this));

		window.addEventListener("mousewheel", this.onWheel.bind(this));
		window.addEventListener("wheel", this.onWheel.bind(this));

		window.addEventListener("mousedown", this.onTouchDown.bind(this));
		window.addEventListener("mousemove", this.onTouchMove.bind(this));
		window.addEventListener("mouseup", this.onTouchUp.bind(this));

		window.addEventListener("touchstart", this.onTouchDown.bind(this));
		window.addEventListener("touchmove", this.onTouchMove.bind(this));
		window.addEventListener("touchend", this.onTouchUp.bind(this));
	}
}

new App();
