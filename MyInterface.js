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

MyInterface.prototype.addAvailableScenes = function(availableScenes) {
    let scene = this.gui.addFolder("Scene Options");
    return scene.add(this.scene, 'currentScene', availableScenes);
};

MyInterface.prototype.addCameraMoving = function() {
    this.rotateCamera = true;
    let camera = this.gui.addFolder("Camera Options");
    camera.add(this, 'rotateCamera');
    return camera.add(this, 'disableCamera');
};

MyInterface.prototype.addPlayers = function(scene) {
    let players = this.gui.addFolder("Players Type");
    let playerOne = players.add(scene.game, 'playerOneType', ["player", "bot"]);
    let playerTwo = players.add(scene.game, 'playerTwoType', ["player", "bot"]);
    playerOne.onChange(function(value) {
        if (value == 'bot')
            scene.game.play();
        else if (scene.turn === 1)
            scene.updatePick(scene.turn, false);
    });
    playerTwo.onChange(function(value) {
        if (value == 'bot')
            scene.game.play();
        else if (scene.turn === 2)
            scene.updatePick(scene.turn, false);
    });
    players.open();
};