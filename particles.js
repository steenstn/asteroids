const activateParticles = (particles, thing, numParticles, maxSpeed) => {
    let particleIndex = 0;
    let addedParticles = 0;
    while(addedParticles <=numParticles && particleIndex < particles.length) {
        let p = particles[particleIndex];
        if (p.active === false) {
            p.active = true;
            addedParticles++;
            p.lifetimeCounter = particleLifetimeCounterMax;
            p.x = thing.x;
            p.y = thing.y;
            p.vx = Math.random()*maxSpeed;
            p.vy = Math.random()*maxSpeed;
            p.angle = Math.random()*2*Math.PI;
        }
        particleIndex++;
    }
};
