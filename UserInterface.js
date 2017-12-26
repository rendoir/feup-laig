class UserInterface {
    constructor(scene, game) {
        this.scene = scene;
        this.game = game;
        this.gl = scene.gl;
        this.init();
    };

    init() {
        //Init elements
        this.ui_elements = [];
        let undo = new UIElement(this.scene,
            [0.7, 0.5,
             0.95, 0.5,
             0.7, 0.25,
             0.95, 0.25],
            [0.0, 0.0,
             1.0, 0.0,
             0.0, 1.0,
             1.0, 1.0],
            [0, 2, 3,
             0, 3, 1],
            "images/ui/undo.png",
            this.game.undo);
        this.ui_elements.push(undo);

        //Init shader
        this.ui_shader = new CGFshader(this.gl, '../lib/CGF/shaders/UI/ui_vertex.glsl', '../lib/CGF/shaders/UI/ui_frag.glsl');
        let previous_shader = this.scene.activeShader;
        this.scene.setActiveShader(this.ui_shader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.uniform1i(this.ui_shader.uniforms.uSampler, 0);
        this.scene.setActiveShader(previous_shader);

        //Init events
        let ui_scene = this;
        let canvas = document.getElementsByTagName('canvas')[0];
        canvas.addEventListener('click', function (event) {
            let x = event.pageX - canvas.offsetLeft;
            let y = event.pageY - canvas.offsetTop;

            ui_scene.ui_elements.forEach(function (element) {
                if (element.isInside(x, y, canvas.width, canvas.height)) {
                    element.onClick();
                }
            });
        });
    };

    render() {
        let previous_shader = this.scene.activeShader;
        this.scene.setActiveShader(this.ui_shader);
        this.gl.disable(this.gl.DEPTH_TEST);

        this.ui_elements.forEach(function (element) {
            element.render();
        });

        this.gl.enable(this.gl.DEPTH_TEST);
        this.scene.setActiveShader(previous_shader);
    };
}
