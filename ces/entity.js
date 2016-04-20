import Signal from 'iron/core/signal';

let ENTITY_ID = 0;

export var EntityMixin = Base => class extends Base {
    // this is in lieu of a constructor
    initEntity(name = null) {
        if (this._entityInitialized_ === true) {
            return;
        }
        
        // later extending THREE.Object3D this is readonly...
        if(!this.id) {
            this.id = ++ENTITY_ID;
        }
        
        this.name = name;

        this.components = new Map();

        this.onComponentAdded = new Signal();
        this.onComponentRemoved = new Signal();
        
        this._entityInitialized_ = true;
    }

    getComponentNames() {
        if (this._entityInitialized_ !== true) {
            this.initEntity();
        }
        return Array.from(this.components.keys());
    }

    addComponent(componentName, componentData = {}) {
        if (this._entityInitialized_ !== true) {
            this.initEntity();
        }
        
        if (this.components.has(componentName)) {
            return;
        }

        // TODO: require componentData to be instance of Component?

        this.components.set(componentName, componentData);

        this.onComponentAdded.post(componentName, this);
    }

    removeComponent(componentName) {
        if (this._entityInitialized_ !== true) {
            this.initEntity();
        }
        
        this.components.delete(componentName);
        this.onComponentRemoved.post(componentName, this);
    }

    getComponent(componentName) {
        if (this._entityInitialized_ !== true) {
            this.initEntity();
        }
        
        return this.components.get(componentName) || null;
    }

    destroy() {
        if (this._entityInitialized_ !== true) {
            this.initEntity();
        }
        
        this.onComponentAdded.clear();
        this.onComponentRemoved.clear();
    }
};

class BaseEntity { }

export default class Entity extends EntityMixin(BaseEntity) {
    constructor(name) {
        super();
        this.initEntity(name);
    }
}
