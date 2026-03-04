const activateParticles = (particles, x, y, numParticles, maxSpeed, angle = Math.random()*2*Math.PI) => {
    let particleIndex = 0;
    let addedParticles = 0;
    while(addedParticles <=numParticles && particleIndex < particles.length) {
        let p = particles[particleIndex];
        if (p.active === false) {
            p.active = true;
            addedParticles++;
            p.lifetimeCounter = particleLifetimeCounterMax;
            p.x = x;
            p.y = y;
            p.vx = Math.random()*maxSpeed;
            p.vy = Math.random()*maxSpeed;
            p.angle = angle;
        }
        particleIndex++;
    }
};

const shipBoosterParticles = (particles, ship) => {
    const x = ship.x-18*Math.cos(ship.angle);
    const y = ship.y-18*Math.sin(ship.angle);
    activateParticles(particles, x, y, 5, 8, ship.angle+Math.PI+(Math.random()*Math.PI/8-(Math.PI/16)));
}
