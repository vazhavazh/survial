export class Player {
	constructor(x, y, context) {
		this.x = x;
		this.y = y;
        this.context = context;
        
        this.image = new Image();
        this.image.src = './img/player.png'
    }
    
    drawImg() {

    }
}
