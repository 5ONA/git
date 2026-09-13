export class Boss {
	constructor(w, h) {
		this.x = w * .7;
		this.y = h * .44;
		this.vx = 110;
		this.vy = 70;
		this.r = 32;
		this.hp = 12;
		this.maxHp = 12;
		this.flash = 0;
		this.cover = 0;
		this.dash = 0;
		this.changeIn = 0;
		this.targetX = this.x;
		this.targetY = this.y;
		this.pickTarget(w, h);
	}
	pickTarget(w, h) {
		this.targetX = 70 + Math.random() * Math.max(80, w - 140);
		this.targetY = 90 + Math.random() * Math.max(80, h - 180);
		this.changeIn = .45 + Math.random() * 1.15;
		if (Math.random() < .16) {
			this.dash = .3;
			this.vx += (Math.random() - .5) * 260;
			this.vy += (Math.random() - .5) * 180;
		}
	}
	update(dt, w, h, paused = false, cursorX = null, cursorY = null) {
		if (paused) return;
		this.changeIn -= dt;
		this.dash = Math.max(0, this.dash - dt);
		const cursorIsTarget = Number.isFinite(cursorX) && Number.isFinite(cursorY);
		if (cursorIsTarget) {
			this.targetX = Math.max(65, Math.min(w - 65, cursorX));
			this.targetY = Math.max(75, Math.min(h - 60, cursorY));
		} else if (this.changeIn <= 0 || Math.hypot(this.targetX - this.x, this.targetY - this.y) < 45) this.pickTarget(w, h);
		const dangerSpeed = this.hp < 4 ? 1.45 : this.hp < 7 ? 1.18 : 1;
		const acceleration = this.dash > 0 ? 7 : 2.4;
		const desiredX = (this.targetX - this.x) * acceleration;
		const desiredY = (this.targetY - this.y) * acceleration;
		this.vx += desiredX * dt;
		this.vy += desiredY * dt;
		const maxSpeed = (this.dash > 0 ? 540 : 250) * dangerSpeed;
		const speed = Math.hypot(this.vx, this.vy) || 1;
		if (speed > maxSpeed) { this.vx = this.vx / speed * maxSpeed; this.vy = this.vy / speed * maxSpeed; }
		const currentSpeed = Math.hypot(this.vx, this.vy) || 1;
		if (currentSpeed < 88) {
			const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x) + (Math.random() - .5) * .8;
			this.vx = Math.cos(angle) * 210 * dangerSpeed;
			this.vy = Math.sin(angle) * 210 * dangerSpeed;
		}
		this.vx += (Math.random() - .5) * 18 * dt;
		this.vy += (Math.random() - .5) * 18 * dt;
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		if (this.x < 60 || this.x > w - 60) { this.x = Math.max(60, Math.min(w - 60, this.x)); this.vx *= -1; this.pickTarget(w, h); }
		if (this.y < 70 || this.y > h - 55) { this.y = Math.max(70, Math.min(h - 55, this.y)); this.vy *= -1; this.pickTarget(w, h); }
		this.flash = Math.max(0, this.flash - dt);
		this.cover = Math.max(0, this.cover - dt);
	}
	hit() { this.hp--; this.flash = .18; this.vx *= -.5; this.vy *= -.5; }
	draw(ctx) { ctx.save();ctx.translate(this.x,this.y);if(this.flash>0&&Math.floor(this.flash*30)%2)ctx.globalAlpha=.3;ctx.fillStyle='#70412e';ctx.fillRect(-28,-30,56,66);ctx.fillStyle='#9b5b39';ctx.fillRect(-20,-25,40,58);ctx.fillStyle='#70412e';ctx.fillRect(-24,-43,18,13);ctx.fillRect(-6,-49,18,19);ctx.fillRect(14,-42,16,12);ctx.fillStyle='#f9f5db';ctx.fillRect(-15,-10,11,14);ctx.fillRect(5,-10,11,14);ctx.fillStyle='#1b2031';ctx.fillRect(-11,-6,5,7);ctx.fillRect(9,-6,5,7);ctx.fillStyle='#2b1b29';ctx.fillRect(-10,17,21,5);if(this.cover>0){ctx.fillStyle='#b87545';ctx.fillRect(-31,-9,26,12);ctx.fillRect(5,-9,26,12);ctx.fillStyle='#f2bf69';ctx.fillRect(-34,-5,10,7);ctx.fillRect(24,-5,10,7)}ctx.restore(); }
}
