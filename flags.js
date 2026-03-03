// Types
const TYPE_PLAYER = 1<<0;
const TYPE_ASTEROID = 1<<1;
const TYPE_BULLET = 1<<2
const TYPE_PICKUP = 1<<3;

// Pickup Types
const PICKUP_TYPE_HEALTH = 1;
const PICKUP_TYPE_COOLDOWN = 2;
const PICKUP_TYPE_SPEEDUP = 3;


// Flags
const hasFlag = (thing, flag) => {
    return (thing.flags & flag) === flag;
}

const setFlag = (thing, flag) => {
    thing.flags = thing.flags | flag;
}

const unsetFlag = (thing, flag) => {
    thing.flags = thing.flags & (thing.flags ^ flag);
}


const CONTROLLABLE_BY_PLAYER = 1<<0;
const CAN_COLLIDE = 1<<1;
const INACTIVE = 1<<2;
const CAN_SPLIT = 1<<3;
const CAN_HURT = 1<<4;
const CAN_GET_HURT = 1<<5;

const CAN_GET_SHOT = 1<<6;
const IS_BULLET = 1<<7;
const LIFETIME_COUNTER = 1<<8;
const CAN_BE_PICKED_UP = 1<<9;
const CAN_DROP_PICKUP = 1<<10;
