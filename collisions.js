const collide = (thing, otherThing) => {
    thing.health--;
    otherThing.health--;

    if(thing.health <=0) {
        setFlag(thing, INACTIVE);
    }

    if(otherThing.health <=0) {
        setFlag(thing, INACTIVE);
    }
}
