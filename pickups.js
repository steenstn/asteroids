// Pickup Types
const PICKUP_TYPE_HEALTH = 1;
const PICKUP_TYPE_COOLDOWN = 2;
const PICKUP_TYPE_SPEEDUP = 3;

let applyPickup = (pickup, recipient) => {
    switch(pickup.pickupType) {
        case PICKUP_TYPE_HEALTH:
            recipient.health+=10;
            break;
        case PICKUP_TYPE_COOLDOWN:
            recipient.cooldownCounterMax/=1.2;
            recipient.cooldownCounterMax = Math.ceil(recipient.cooldownCounterMax);
            if(recipient.cooldownCounterMax < 4) {
                recipient.cooldownCounterMax = 4;
            }
            break;
        case PICKUP_TYPE_SPEEDUP:
            recipient.maxSpeed*=1.2;
            break;
    }
};
