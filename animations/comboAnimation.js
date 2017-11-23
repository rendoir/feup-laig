/**
 * Class that can hold several animations and process them sequentially.
 */
class ComboAnimation extends Animation{
    /**
     * 
     * @param {*} animationsList - A list of animations already initialized
     */
    constructor(animationsList){
        super();
        this.animationsList = animationsList;
        this.initAnimation();
        
    }
    /**
     * Sets the timings at which each animation should start.
     */
    initAnimation(){
        this.initTimes = [0];
        for (let i = 0; i < this.animationsList.length - 1; i++){
            this.initTimes.push(this.animationsList[i].duration);
        }
    }
    /**
     * Returns the index of the active animations based on the delta time
     * @param {*} deltaTime - Time in seconds since the beginning of all animations.
     */
    selectCurrentAnimation(deltaTime){
        for (let i = this.initTimes.length -1; i >= 0; i--){
            if (deltaTime >= this.initTimes[i]){
                return i;
            }
        }
    }
    /**
     * Returns the animation matrix of the active animation
     * @param {*} deltaTime - Time in seconds since the beginning of all animations.
     */
    getMatrix(deltaTime){
        let currentAnimationIndex = this.selectCurrentAnimation(deltaTime);
        let currentAnimation = this.animationsList[currentAnimationIndex];
        let animationDeltaTime = deltaTime - this.initTimes[currentAnimationIndex];
        return currentAnimation.getMatrix(animationDeltaTime);
    }
}