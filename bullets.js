const activateBullet = (player, things) =>  {
    let bulletIndex = 0;
    for(let i = 0; i < things.length; i++) {
        let t = things[i];
        if (t.type === TYPE_BULLET && hasFlag(t, INACTIVE)) {
            t.x= player.x + 20*Math.cos(player.angle);
            t.y= player.y + 20*Math.sin(player.angle);
            t.angle= player.angle;
            t.health= 1;
            t.vx= 5 * Math.cos(player.angle)+player.vx;
            t.vy= 5 * Math.sin(player.angle)+player.vy;
            t.hasDied= false;
            t.lifetimeCounter= 200;
            unsetFlag(t, INACTIVE);
            break;
        }
    }
}
