# Asteroids

Small Asteroids demo. Trying out "fat structs", inspired by Ryan Fleury/Casey Muratori.
Instead of doing a fancy Entity Component System or something just shove everything into the same "thing" and just use it.

Everything that is needed for a thing goes in the same struct and then use bit flags for different properties.
The fact that this is JavaScript so any object can have anything anyway defeats the purpose a little bit but oh well..


Controls:
Player 1: Arrow keys, . to fire
Player 2: WAD. G to fire
