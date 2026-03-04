    let c = document.getElementById('c');
    c.width = window.innerWidth-50;
    c.height = window.innerHeight-50;
    let ctx = c.getContext('2d');
    let keysDown = new Set();
    let pressKey = (key) => {
        keysDown.add(key);
    }
    let releaseKey = (key) => {
        keysDown.delete(key);
    };

    addEventListener("keydown", (e) => {
        pressKey(e.key);
    }, false);

    addEventListener("keyup", (e) => {
        releaseKey(e.key);
    }, false)


    let things = [];
    let particles = [];
    const particleLifetimeCounterMax = 30;
    for(let i = 0; i < 2000; i++) {
        particles.push({
            x:100,
            y:100,
            vx:2,
            vy:2,
            angle:0,
            active:false,
            lifetimeCounter: 25,
            color: "#fff"
        });
    }

    things.push(
        createPlayer(c.width-500, c.height/2, "ArrowLeft", "ArrowUp", "ArrowRight", '.'), 
        createPlayer(500, c.height/2, "a", "w", "d", "g"),
    );

    // TODO: Calculate number of asteroids
    for(let i = 0; i < 10; i++) {
        things.push(createAsteroid(100*Math.random(), c.height*Math.random(), 5, 0));
    }
    for(let i = 0; i < 200; i++) {
        things.push(createBullet(things[0], INACTIVE));
    }

    let mainLoop = () => {
        ctx.fillStyle="#000";
        ctx.fillRect(0,0,c.width,c.height);

        for(let i = 0; i < things.length; i++) {
            let thing = things[i];
            // Reset single-frame stuff
            if (thing.hasDiedThisFrame) {
                setFlag(thing, INACTIVE);
                thing.hasDiedThisFrame = false;
            }
            
            
            if (hasFlag(thing, INACTIVE)) {
                continue;
            }


            //// --------

            if (hasFlag(thing, CONTROLLABLE_BY_PLAYER)) {
                thing.cooldownCounter--;
                if (keysDown.has(thing.leftKey)) {
                    thing.angle-= 0.1;
                } else if(keysDown.has(thing.rightKey)) {
                    thing.angle+= 0.1;
                }

                if (keysDown.has(thing.upKey)) {
                    thing.vx+=0.4 * Math.cos(thing.angle);
                    thing.vy+=0.4 * Math.sin(thing.angle);

                    thing.vx = clamp(thing.vx, -thing.maxSpeed,thing.maxSpeed);
                    thing.vy = clamp(thing.vy,-thing.maxSpeed,thing.maxSpeed);
                    //activateParticles(particles, thing, 1, 5, thing.angle+Math.PI+(Math.random()*Math.PI/8-(Math.PI/16)));
                    shipBoosterParticles(particles, thing);
                        
                }

                if (keysDown.has(thing.fireKey) && thing.cooldownCounter < 0) {
                    thing.cooldownCounter = thing.cooldownCounterMax;
                    activateBullet(thing, things);
                }
            }

            thing.x += thing.vx;
            thing.y += thing.vy;

            const wrapBuffer = 60;
            if (thing.x < -wrapBuffer) {
                thing.x = c.width + wrapBuffer;
            } else if (thing.x > c.width + wrapBuffer) {
                thing.x = -wrapBuffer;
            }
            if (thing.y < -wrapBuffer) {
                thing.y = c.height + wrapBuffer;
            } else if (thing.y > c.height + wrapBuffer) {
                thing.y = -wrapBuffer;
            }

            if(hasFlag(thing, LIFETIME_COUNTER)) {
                thing.lifetimeCounter--;
                if(thing.lifetimeCounter <= 0) {
                    setFlag(thing, INACTIVE);
                }
            }
            if (hasFlag(thing, CAN_COLLIDE)) {
                for(let j = 0; j < things.length; j++) {
                    let otherThing = things[j];
                    if (i == j || hasFlag(otherThing, INACTIVE)) {
                        continue;
                    }
                    if (circlesOverlap(thing.x, thing.y, thing.width, otherThing.x, otherThing.y, otherThing.width)) {
                        if (hasFlag(thing, IS_BULLET) && hasFlag(otherThing, CAN_GET_SHOT)) {
                            otherThing.health--;
                            thing.health--;
                            activateParticles(particles, thing.x, thing.y, 5, 8);
                        } else if (hasFlag(thing, CAN_HURT) && hasFlag(otherThing, CAN_GET_HURT)) {
                            activateParticles(particles, thing.x, thing.y, 10, 5);
                            otherThing.health--;
                        } else if (hasFlag(thing, CAN_BE_PICKED_UP) && hasFlag(otherThing, CONTROLLABLE_BY_PLAYER)) {
                            applyPickup(thing, otherThing);
                            thing.health = 0;
                        }
                    }
                }
                if (thing.health <=0) {
                    switch(thing.type) {
                        case TYPE_BULLET:
                            activateParticles(particles, thing, 5, 5);
                            break;
                    }
                    thing.hasDiedThisFrame=true;
                }

            }


            // End of frame checks
            if (thing.hasDiedThisFrame) {
                if (hasFlag(thing, CAN_SPLIT)) {
                    if(thing.size >1)  {
                        things.push(createAsteroid(thing.x, thing.y, thing.size - 1, 0));
                        things.push(createAsteroid(thing.x, thing.y, thing.size - 1, 0));
                    }
                }
                if (hasFlag(thing, CAN_DROP_PICKUP)) {
                    things.push(createRandomPickup(thing.x, thing.y));
                }
                setFlag(thing, INACTIVE);
            }
        }

        // Render
        for(let i = 0; i < things.length; i++) {
            let thing = things[i];
            if (hasFlag(thing, INACTIVE)) {
                continue;
            }
            switch(thing.type) {
                case TYPE_PLAYER:
                    //ctx.fillStyle = "#fff";
                    //ctx.fillText(thing.cooldownCounter, thing.x-10, thing.y,10);
                    //ctx.fillRect(thing.x, thing.y, thing.width, thing.height);
                    ctx.strokeStyle = "#fff";
                    let ox = thing.x+thing.width/2;
                    let oy = thing.y+thing.height/2;
                    ctx.beginPath();
                    ctx.moveTo(ox+20*Math.cos(thing.angle),oy+20*Math.sin(thing.angle)); 
                    ctx.lineTo(ox+12*Math.cos(thing.angle-Math.PI/(1.2)),oy+12*Math.sin(thing.angle-Math.PI/(1.2))); 
                    ctx.lineTo(ox+12*Math.cos(thing.angle+Math.PI/(1.2)),oy+12*Math.sin(thing.angle+Math.PI/(1.2))); 
                    ctx.lineTo(ox+22*Math.cos(thing.angle),oy+22*Math.sin(thing.angle)); 
                    ctx.stroke();
                    
                    // TODO Link these with players some other way
                    ctx.fillStyle="green";
                    ctx.fillRect(20, 20+i*30, thing.health*2, 20);
                    break;

                case TYPE_ASTEROID:
                    ctx.beginPath();
                    ctx.arc(thing.x, thing.y, thing.width, 0, 2 * Math.PI, false); 
                    ctx.fillStyle = 'grey';
                    ctx.fill();
                    //ctx.fillStyle="green";
                    //ctx.fillRect(thing.x-10, thing.y-30, thing.health, 10);
                break;

                case TYPE_PICKUP:
                    ctx.fillStyle = thing.color;
                    ctx.fillRect(thing.x, thing.y, thing.width, thing.height);
                    
                    break;

                default:
                    //ctx.fillText(thing.health, thing.x-10, thing.y-10);
                    ctx.fillStyle = "#0f0";
                    ctx.fillRect(thing.x,thing.y, thing.width,thing.height)

            }
        }
        particles.forEach(p => {
            if (p.active) {
                p.lifetimeCounter--;
                p.x+=p.vx*Math.cos(p.angle);
                p.y+=p.vy*Math.sin(p.angle);

                ctx.fillStyle = `rgba(255,255,255,${p.lifetimeCounter/particleLifetimeCounterMax})`;
                ctx.fillRect(p.x,p.y,3,3);

                if(p.lifetimeCounter <= 0) {
                    p.active = false;
                }
            }
        });

        setTimeout(mainLoop, 20);
    }
mainLoop();
