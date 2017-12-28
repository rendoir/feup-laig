var DEGREE_TO_RAD = Math.PI / 180;
var UPDATES_PER_SECONDS = 60;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);
    this.setUpdatePeriod(1000 / UPDATES_PER_SECONDS);
    this.setPickEnabled(true);
    this.game = Game;
    this.turn = this.game.turn;
    this.ui = new UserInterface(this, this.game);
    this.outline_shader = new CGFshader(this.gl, '../lib/CGF/shaders/Outline/outline_vertex.glsl', '../lib/CGF/shaders/Outline/outline_frag.glsl');
    this.highlight_shader = new CGFshader(this.gl, '../lib/CGF/shaders/Outline/highlight_vertex.glsl', '../lib/CGF/shaders/Outline/highlight_frag.glsl');
};

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break; // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

};

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    let player_camera = [];
    player_camera[1] = vec3.fromValues(4, 20, 24);
    player_camera[2] = vec3.fromValues(4, 20, -16);
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    this.camera.setTarget(vec3.fromValues(4, 0, 4));
    this.camera.setPosition(player_camera[1]);
    this.camera_radius = vec3.length(vec3.subtract(vec3.create(), player_camera[2], player_camera[1])) / 2;
    this.camera_center = vec3.scale(vec3.create(), vec3.add(vec3.create(), player_camera[2], player_camera[1]), 0.5);
    this.camera_speed = 20;
    //this.interface.disableCamera = true; TODO Uncoment this
    this.cameraMoving = false;
};



/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() {
    this.game.initBoard();

    this.axis = new CGFaxis(this, this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
        this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();
};


XMLscene.prototype.logPicking = function() {
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (let i = 0; i < this.pickResults.length; i++) {
                let obj = this.pickResults[i][0];
                if (obj) {
                    let customId = this.pickResults[i][1];
                    console.log("Picked object: " + obj + ", with pick id " + customId);

                    if (customId === this.graph.selectedNode) {
                        this.graph.selectedNode = -1;
                        customId = 101;
                    } else {
                        this.graph.selectedNode = customId;
                    }
                    if (customId <= 100) {
                        this.updatePick(this.turn, true);
                    } else {
                        this.updatePick(this.turn, false);
                    }
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}


/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {

    this.logPicking();
    this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk) {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

        // Draw axis
        this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                } else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }
        // Displays the scene.
        this.graph.displayScene();
    } else {
        // Draw axis
        this.axis.display();
    }

    this.popMatrix();

    this.ui.render();
};

XMLscene.prototype.update = function(currTime) {
    if (this.graph.loadedOk) {
        this.graph.update(currTime, this.graph.rootGraphNode);
        this.updateCamera(currTime);
        this.updateGame(currTime);
    }
};

XMLscene.prototype.updateGame = function(currTime) {
    if (this.graph.last_selected_piece !== null && this.graph.last_selected_quad !== null) {
        this.graph.initPieceAnimation();
        this.graph.last_selected_piece = null;
        this.graph.last_selected_quad = null;
    }
    if (this.turn !== this.game.turn) {
        this.turn = this.game.turn;
        this.setPlayer(this.turn);
    }
    if (this.game.captured_pieces.length > 0) {
        /** @todo TODO Init animations for this pieces */
        this.game.captured_pieces = [];
    }
};

XMLscene.prototype.updateCamera = function(currTime) {
    if (this.cameraMoving) {
        if (this.camera_animation.ended) {
            this.cameraMoving = false;
        } else {
            let deltaTime = (currTime - this.initial_camera_timestamp) / 1000;
            let camera_animation_matrix = this.camera_animation.getMatrix(deltaTime);
            let camera_position = vec3.transformMat4(vec3.create(), vec3.create(), camera_animation_matrix);
            this.camera.setPosition(camera_position);
        }
    }
};

XMLscene.prototype.setPlayer = function(player) {
    this.cameraMoving = true;
    this.initial_camera_timestamp = performance.now();
    if (player === 1)
        this.camera_animation = new CircularAnimation(this.camera_radius, this.camera_speed, this.camera_center, 90, 270);
    else this.camera_animation = new CircularAnimation(this.camera_radius, this.camera_speed, this.camera_center, -90, 180);
    this.ui.update();
};

XMLscene.prototype.updatePick = function(player, withBoardPieces) {
    let changePick = function(value, key, map) {
        if (key > 100 && withBoardPieces) {
            value.isPickable = true;
        } else if (value.nodeID.indexOf("white") != -1 && player == 1) {
            value.isPickable = true;
        } else if (value.nodeID.indexOf("black") != -1 && player == 1) {
            value.isPickable = false;
        } else if (value.nodeID.indexOf("white") != -1 && player == 2) {
            value.isPickable = false;
        } else if (value.nodeID.indexOf("black") != -1 && player == 2) {
            value.isPickable = true;
        } else {
            value.isPickable = false;
        }
    };
    this.graph.mapPickId_to_Piece.forEach(changePick.bind(this));
};