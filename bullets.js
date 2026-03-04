const activateBullet = (player, things) =>  {
    for(let i = 0; i < things.length; i++) {
        let t = things[i];
        if (hasFlag(t, IS_BULLET) && hasFlag(t, INACTIVE)) {
            t.x= player.x + 20*Math.cos(player.angle);
            t.y= player.y + 20*Math.sin(player.angle);
            t.angle= player.angle;
            t.health= 1;
            t.vx= 5 * Math.cos(player.angle)+player.vx;
            t.vy= 5 * Math.sin(player.angle)+player.vy;
            t.hasDiedThisFrame= false;
            t.lifetimeCounter= 200;
            unsetFlag(t, INACTIVE);
            break;
        }
    }
}
