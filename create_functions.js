const createPlayer = (_x, _y, _leftKey, _upKey, _rightKey, _fireKey) => {
    return {
        x: _x,
        y: _y,
        angle: Math.PI/2,
        vx: 0,
        vy: 0,
        maxSpeed: 5,
        width: 10,
        height: 10,
        health: 100,
        cooldownCounter: 20,
        cooldownCounterMax:20,
        hasDied: false,
        type: TYPE_PLAYER,
        flags: CONTROLLABLE_BY_PLAYER | CAN_COLLIDE | CAN_GET_HURT | CAN_GET_SHOT,
        leftKey: _leftKey,
        upKey: _upKey,
        rightKey: _rightKey,
        fireKey: _fireKey
    };
};

const createBullet = (player, inactiveFlag) =>  {
    return {
        x: player.x + 20*Math.cos(player.angle),
        y: player.y + 20*Math.sin(player.angle),
        angle: player.angle,
        health: 1,
        size: 0,
        vx: 5 * Math.cos(player.angle)+player.vx,
        vy: 5 * Math.sin(player.angle)+player.vy,
        hasDied: false,
        lifetimeCounter: 200,
        flags: CAN_COLLIDE | IS_BULLET | LIFETIME_COUNTER | inactiveFlag,
        type: TYPE_BULLET,
        width: 3,
        height: 3,
    }
}

const createAsteroid = (_x, _y, _size, inactiveFlag) => {
    let _angle = Math.random()*2*Math.PI;
    return {
        x: _x,
        y: _y,
        angle: _angle,
        width: 10*_size,
        height: 10*_size,
        health: _size,
        vx: (9/_size) * Math.cos(_angle),
        vy: (9/_size) * Math.sin(_angle),
        size: _size,
        hasDied: false,
        flags: CAN_COLLIDE | CAN_GET_SHOT | CAN_HURT | CAN_SPLIT | CAN_DROP_PICKUP | inactiveFlag,
        type: TYPE_ASTEROID
    };
};

const createRandomPickup = (x, y) => {
    const numPickups = 3;
    const randomPickup = Math.floor(Math.random()*numPickups)+1;
    console.log(randomPickup)
    return createPickup(x,y, randomPickup);
}

const createPickup = (_x, _y, _pickupType) => {
    let _color = "#afafaf";
     switch(_pickupType) {
         case PICKUP_TYPE_HEALTH:
             _color= "#0f0";
             break;
         case PICKUP_TYPE_COOLDOWN:
             _color="#00f";
             break;
         case PICKUP_TYPE_SPEEDUP:
             _color= "#f44";
             break;
    };
    
    return {
        x: _x,
        y: _y,
        vx: Math.random(),
        vy: Math.random(),
        width: 10,
        height: 10,
        lifetimeCounter: 300,
        pickupType: _pickupType,
        hasDied: false,
        color: _color,
        type: TYPE_PICKUP,
        flags: CAN_COLLIDE | CAN_BE_PICKED_UP | LIFETIME_COUNTER,
    }
}
