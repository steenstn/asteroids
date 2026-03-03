const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const rectsOverlap = (x,y,width,height,x2,y2,width2,height2) => {
    return(x < x2+width2 && x+width > x2 && y < y2+height2 && y+height > y2);
}

const circlesOverlap = (x1, y1, r1, x2, y2, r2) => {
    const dx = x1-x2;
    const dy = y1-y2;
    const distance = Math.sqrt(dx*dx + dy*dy);
    return distance <= r1+r2;
}

const circleCollision = (particle, otherParticle) => {
    const dx = otherParticle.x - particle.x;
    const dy = otherParticle.y - particle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const normX = dx / dist;
    const normY = dy / dist;

    const dotProduct = particle.vx * normX + particle.vy * normY;
    const impulse = 2 * dotProduct;

    particle.vx -= impulse * normX;
    particle.vy -= impulse * normY;
}
