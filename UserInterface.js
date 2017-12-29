class UserInterface {
    constructor(scene, game) {
        this.scene = scene;
        this.game = game;
        this.gl = scene.gl;
        this.init();
        this.update();
    };

    init() {
        //Init elements
        this.ui_elements = [];
        let text_coords = 
            [0.0, 0.0,
             1.0, 0.0,
             0.0, 1.0,
             1.0, 1.0];
        let indices =
            [0, 2, 3,
             0, 3, 1];

        let player_position =
            [-0.3, 0.95,
             0.1, 0.95,
             -0.3, 0.75,
             0.1, 0.75];
        let bot_position =
           [-0.2, 0.95,
            0.0, 0.95,
            -0.2, 0.75,
            0.0, 0.75];
        let player = new UIElement(this.scene, player_position, text_coords, indices, "images/ui/player.png");
        let bot = new UIElement(this.scene, bot_position, text_coords, indices, "images/ui/bot.png");
        this.ui_elements["player"] = player;
        this.ui_elements["bot"] = bot;

        let player_number_position =
            [0.15, 0.95,
             0.2, 0.95,
             0.15, 0.75,
             0.2, 0.75];
        let player1 = new UIElement(this.scene, player_number_position, text_coords, indices, "images/ui/1.png");
        let player2 = new UIElement(this.scene, player_number_position, text_coords, indices, "images/ui/2.png");
        this.ui_elements["player1"] = player1;
        this.ui_elements["player2"] = player2;

        let undo = new UIElement(this.scene,
            [0.7, 0.5,
             0.95, 0.5,
             0.7, 0.25,
             0.95, 0.25],
            text_coords,
            indices,
            "images/ui/undo.png",
            this.game.undo);
        this.ui_elements.push(undo);

        let game_over_position =
            [-0.5, 0.95,
             0.5, 0.95,
             -0.5, 0.75,
             0.5, 0.75];
        let game_over = new UIElement(this.scene, game_over_position, text_coords, indices, "images/ui/game_over.png");
        this.ui_elements["game_over"] = game_over;

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
        if (!this.game.game_over) {
            this.ui_elements[this.current_type].render();
            this.ui_elements[this.current_turn].render();
        } else {
            this.ui_elements["game_over"].render();
        }
        

        this.gl.enable(this.gl.DEPTH_TEST);
        this.scene.setActiveShader(previous_shader);
    };

    update() {
        this.current_type = this.game.type;
        this.current_turn = "player" + this.game.turn;
    };
};
