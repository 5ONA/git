import { Boss as MovingBoss } from './boss.js';

export class Boss extends MovingBoss {
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(2, 2);
    if (this.flash > 0 && Math.floor(this.flash * 30) % 2) ctx.globalAlpha = .3;
    ctx.fillStyle = '#9b4dff';
    ctx.fillRect(-28, -26, 56, 50);
    ctx.fillRect(-36, -12, 8, 24);
    ctx.fillRect(28, -12, 8, 24);
    ctx.fillStyle = '#c477ff';
    ctx.fillRect(-20, -34, 40, 10);
    ctx.fillRect(-20, 24, 12, 10);
    ctx.fillRect(8, 24, 12, 10);
    ctx.fillStyle = '#ff73d1';
    ctx.fillRect(-17, -43, 6, 10);
    ctx.fillRect(11, -43, 6, 10);
    ctx.fillStyle = '#f7f3dd';
    ctx.fillRect(-17, -12, 12, 15);
    ctx.fillRect(5, -12, 12, 15);
    ctx.fillStyle = '#08152e';
    ctx.fillRect(-13, -8, 5, 8);
    ctx.fillRect(8, -8, 5, 8);
    ctx.fillStyle = '#34144f';
    ctx.fillRect(-15, 9, 30, 7);
    if (this.cover > 0) {
      ctx.fillStyle = '#c477ff';
      ctx.fillRect(-31, -10, 24, 10);
      ctx.fillRect(7, -10, 24, 10);
      ctx.fillStyle = '#9b4dff';
      ctx.fillRect(-35, -6, 10, 7);
      ctx.fillRect(25, -6, 10, 7);
    }
    ctx.restore();
  }
}
