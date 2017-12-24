class UIElement {
  constructor(scene, position, texture_coordinates, texture_path) {
    this.scenes = scene;
    this.position = position;
    this.texture_coordinates = texture_coordinates;
    this.texture = new CGFtexture(this.scene, "./scenes/" + texture_path);
  }

  render() {

  }
}
