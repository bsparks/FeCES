'use strict';

import {Entity, Component, System, World} from '../ces/ces';

class HealthComponent extends Component {
    constructor(maxHealth = 100) {
        let health = maxHealth;

        super({health, maxHealth});
    }
}

class CombatSystem extends System {
    damage(entity, amount) {
        let health = entity.getComponent('health');
        health.health -= amount;
        if (health.health < 0) {
            health.health = 0;
        }
    }

    heal(entity, amount) {
        let health = entity.getComponent('health');
        health.health += amount;
        if (health.health > health.maxHealth) {
            health.health = health.maxHealth;
        }
    }

    update(dt) {

    }
}

class Main {
    constructor() {
        this.world = new World();

        this.init();
    }

    init() {
        this.hero = new Entity();
        this.hero.addComponent('health', new HealthComponent());

        this.combat = new CombatSystem();

        this.world.addSystem(this.combat);

        this.world.addEntities(this.hero);
    }
}

window.game = new Main();
