export default class {
	constructor({
		geometry,
		gl,
		image,
		index,
		length,
		renderer,
		scene,
		screen,
		text,
		viewport,
	}) {
		this.geometry = geometry;
		this.gl = gl;
		this.image = image;
		this.index = index;
		this.length = length;
		this.scene = scene;
		this.screen = screen;
		this.text = text;
		this.viewport = viewport;

		this.createShader();
		this.createMesh();

		this.onResize();
	}
}
