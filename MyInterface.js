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
    let controller = scene.add(this.scene, 'currentScene', myScene.availableScenes);
    controller.onChange(myScene.onSceneChange.bind(myScene));
};

MyInterface.prototype.addCameraMoving = function(scene) {
    this.rotateCamera = true;
    let camera = this.gui.addFolder("Camera Options");
    let camera_checkbox = camera.add(this, 'disableCamera').listen();
    camera_checkbox.onChange(function(value) {
        scene.onCameraChange(value);
    });
    let rotate = camera.add(this, 'rotateCamera');
    let onChangeRotate = function(value) {
        if (value) {
            this.disableCamera = true;
            scene.onCameraChange(this.disableCamera);
        }
    };
    rotate.onChange(onChangeRotate.bind(this));
};

MyInterface.prototype.addPlayers = function(scene) {
    let players = this.gui.addFolder("Players Type");
    let playerOne = players.add(scene.game, 'playerOneType', ["player", "bot"]).listen();
    let playerTwo = players.add(scene.game, 'playerTwoType', ["player", "bot"]).listen();
    playerOne.onChange(function(value) {
        if (value == 'bot')
            scene.game.play();
        else if (scene.turn === 1) {
            scene.game.type = "player";
            scene.ui.updatePlayer();
            scene.updatePick(scene.turn, false);
        }
    });
    playerTwo.onChange(function(value) {
        if (value == 'bot')
            scene.game.play();
        else if (scene.turn === 2) {
            scene.game.type = "player";
            scene.ui.updatePlayer();
            scene.updatePick(scene.turn, false);
        }
    });
    let botsStops = players.add(scene.game, 'stopBots').listen();
    botsStops.onChange(function(value) {
        if (!value)
            scene.game.play();
    });
    players.open();
};