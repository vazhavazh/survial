const MOVE_UP_KEY_CODES = ["ArrowUp", "KeyW"];
const MOVE_DOWN_KEY_CODES = ["ArrowDown", "KeyS"];
const MOVE_LEFT_KEY_CODES = ["ArrowLeft", "KeyA"];
const MOVE_RIGHT_KEY_CODES = ["ArrowRight", "KeyD"];
const ALL_MOVE_KEY_CODES = [
	...MOVE_UP_KEY_CODES,
	...MOVE_DOWN_KEY_CODES,
	...MOVE_LEFT_KEY_CODES,
	...MOVE_RIGHT_KEY_CODES,
];

export class Player {
	constructor(x, y, context, movementsLimit) {
		this.x = x;
		this.y = y;
		this.velocity = 3;
		this.radius = 15;

		this.context = context;

		this.cursorPosition = {
			x: 0,
			y: 0,
		};
		this.movementsLimit = {
			minX: movementsLimit.minX + this.radius,
			maxX: movementsLimit.maxX - this.radius,
			minY: movementsLimit.minY + this.radius,
			maxY: movementsLimit.maxY - this.radius,
		};

		document.addEventListener("mousemove", (event) => {
			this.cursorPosition.x = event.clientX;
			this.cursorPosition.y = event.clientY;
		});

		this.keyMap = new Map();
		document.addEventListener("keydown", (event) =>
			this.keyMap.set(event.code, true)
		);
		document.addEventListener("keyup", (event) =>
			this.keyMap.delete(event.code)
		);

		this.image = new Image();
		this.image.src = "./img/player.png";
		this.imageWidth = 50;
		this.imageHeight = 60;
		this.isMoving = false;
		this.imageTick = 0;
	}

	drawImg() {
		const imageTickLimit = 18;
		let subX = 0;
		if (!this.isMoving) {
			subX = 0;
			this.imageTick = 0;
		} else {
			subX =
				this.imageTick > imageTickLimit ? this.imageWidth * 2 : this.imageWidth;
			this.imageTick++;
		}

		if (this.imageTick > imageTickLimit * 2) {
			this.imageTick = 0;
		}

		this.context.drawImage(
			this.image,
			subX,
			0,
			this.imageWidth,
			this.imageHeight,
			this.x - this.imageWidth / 2,
			this.y - this.imageHeight / 2,
			this.imageWidth,
			this.imageHeight
		);
	}

	draw() {
		this.context.save();
		let angle = Math.atan2(
			this.cursorPosition.y - this.y,
			this.cursorPosition.x - this.x
		);
		this.context.translate(this.x, this.y);
		this.context.rotate(angle + Math.PI / 2);
		this.context.translate(-this.x, -this.y);
		this.drawImg();
		this.context.restore();
	}

	update() {
		this.draw();
		this.isMoving = this.shouldMove(ALL_MOVE_KEY_CODES);
		this.updatePosition();
		this.checkPositionLimitAndUpdate();
	}

	updatePosition() {
		if (this.shouldMove(MOVE_UP_KEY_CODES)) this.y -= this.velocity;
		if (this.shouldMove(MOVE_DOWN_KEY_CODES)) this.y += this.velocity;
		if (this.shouldMove(MOVE_LEFT_KEY_CODES)) this.x -= this.velocity;
		if (this.shouldMove(MOVE_RIGHT_KEY_CODES)) this.x += this.velocity;
	}

	checkPositionLimitAndUpdate() {
		if (this.y < this.movementsLimit.minY) this.y = this.movementsLimit.minY;
		if (this.y > this.movementsLimit.maxY) this.y = this.movementsLimit.maxY;
		if (this.x < this.movementsLimit.minX) this.x = this.movementsLimit.minX;
		if (this.x > this.movementsLimit.maxX) this.x = this.movementsLimit.maxX;
	}

	shouldMove(keys) {
		return keys.some((key) => this.keyMap.get(key));
	}
}
