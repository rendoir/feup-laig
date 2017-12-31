/**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by defult)

    return true;
};

MyInterface.prototype.addAvailableScenes = function(myScene) {
    let scene = this.gui.addFolder("Scene Options");
    let controller = scene.add(this.scene, 'currentScene', myScene.availableScenes).name('Current Scene');
    controller.onChange(myScene.onSceneChange.bind(myScene));
};

MyInterface.prototype.addCameraMoving = function(scene) {
    this.rotateCamera = true;
    let camera = this.gui.addFolder("Camera Options");
    let camera_checkbox = camera.add(this, 'disableCamera').listen();
    camera_checkbox.name('Disable Camera Movement');
    camera_checkbox.onChange(function(value) {
        scene.onCameraChange(value);
    });
    let rotate = camera.add(this, 'rotateCamera').name('Rotate Camera');
    let onChangeRotate = function(value) {
        if (value) {
            this.disableCamera = true;
            scene.onCameraChange(this.disableCamera);
        }
    };
    rotate.onChange(onChangeRotate.bind(this));
};

MyInterface.prototype.addPlayers = function(scene) {
    this.scene = scene;
    let players = this.gui.addFolder("Players Type");
    players.add(this, 'player_Vs_player').name('Player Vs Player');
    players.add(this, 'player_Vs_bot').name('Player Vs Bot');
    players.add(this, 'bot_Vs_bot').name('Bot Vs Bot');
    players.add(this.scene.game, 'botLevelOne', 1, 2).step(1).listen().name('Bot 1 Level');
    players.add(this.scene.game, 'botLevelTwo', 1, 2).step(1).listen().name('Bot 2 Level');
    let botsStops = players.add(scene.game, 'stopBots').listen();
    botsStops.name('Stop!');
    botsStops.onChange(function(value) {
        if (!value)
            scene.game.play();
    });
    players.open();
};

MyInterface.prototype.player_Vs_player = function() {
    this.scene.game.type = "player";
    this.scene.game.playerOneType = "player";
    this.scene.game.playerTwoType = "player";
    this.scene.updatePick(this.scene.turn, false);
    this.scene.ui.updatePlayer();
};

MyInterface.prototype.player_Vs_bot = function() {
    this.scene.game.playerOneType = "player";
    this.scene.game.playerTwoType = "bot";
    if (this.scene.game.turn == 1) {
        this.scene.game.type = "player";
        this.scene.updatePick(this.scene.turn, false);
    } else {
        this.scene.game.type = "bot";
        this.scene.game.play();
    }
    this.scene.ui.updatePlayer();
};

MyInterface.prototype.bot_Vs_bot = function() {
    this.scene.game.type = "bot";
    this.scene.game.playerOneType = "bot";
    this.scene.game.playerTwoType = "bot";
    this.scene.ui.updatePlayer();
    this.scene.game.play();
};