import '../scss/svi.scss';

/**
 * Animated State-Managed Save Icon or just SaVe Icon
 * HTML | Vanilla JS | CSS3
 *
 * Keep all of this in one class and with optional disabling of direct inserting of HTMLNodes from JS.
 * This opens access to reuse this code with most of aside frameworks.
 * Maybe someday will be created a React Component for this.
 * Maybe not.
 **/

export default class SaveIcon {
    /**
     * Hey, magic numbers here, don't touch that ;)
     *
     * If serious, it's CSS transitions, so in fact we cannot check that all transitions was really done.
     * Yes, we can check every calculated value through JS every 100ms but c'mon, it's madness.
     * Simple solution - just hardcode timeouts here.
     * Maybe someday I'll change that to more appropriate stuff.
     * Let's say it's a draft ;)
     * You saw nothing...
     */
    static ANIM_TIMEOUTS = {
        changed: 1700,
        pending: 1500,
        fail: 2000,
        done: 2000
    }

    /**
     * Icon's root HTMLElement container
     * @type HTMLElement
     **/
    #root; //Root HTMLNode for icon

    /**
     * Has public get/set
     * @type String
     **/
    #size;

    /**
     * Has public get/set
     * @type String
     *
     **/
    #state;

    /**
     * Array of transition listeners
     * @type Function[]
     * */
    #listeners; //External listener methods
    /**
     * Handler of timeout for transition listeners of "finished" event
     * @type number
     * */
    #animFinishHandler;

    /**
     * Constructor
     *
     * @param {HTMLElement|string} root - target HTMLElement or string query selector
     * @param {boolean} generateHTMLNodes - if you need to generate required HTMLElements to append to root HTMLElement from JS
     * @param {String} size - Possible values is 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'
     * @param {String} state - Possible values is 'none', 'changed', 'pending', 'done'
     * @param {Function|Function[]} transitionListeners - Listener(s) for the transition events
     */
    constructor(root, generateHTMLNodes = false, size = 'small', state = 'hide', transitionListeners = []) {
        this.#root = root instanceof HTMLElement ? root : typeof root === "string" ? document.querySelector(root) : null;
        if (generateHTMLNodes) this.#generateHTMLNodes();
        this.size = size
        this.state = state;
        this.addTransitionListeners(transitionListeners);
        this.#refresh();
    }

    get state() {
        return this.#state;
    }

    set state(value) {
        let oldState = this.state;
        this.#state = value.toLowerCase();
        this.#refresh();
        if (oldState !== this.state) {
            this.#processTransitionListeners(oldState, this.state);
        }
    }

    get size() {
        return this.#size;
    }

    set size(value) {
        this.#size = value;
        this.#refresh();
    }

    /**
     * Add Transition Listener(s) to the icon
     * @param {(Function|Function[])} listeners
     */
    addTransitionListeners(listeners) {
        if (!this.#listeners) this.#listeners = [];
        if (listeners) {
            if (Array.isArray(listeners)) {
                listeners.forEach(listener => this.addTransitionListeners(listener));
            } else if (listeners instanceof Function) {
                this.#listeners.push(listeners);
            }
        }
    }

    /**
     * Remove Transition Listener(s) to the icon
     * @param {(Function|Function[])} listeners
     */
    removeTransitionListeners(listeners) {
        if (listeners) {
            if (Array.isArray(listeners)) {
                listeners.forEach(listener => this.removeTransitionListeners(listener));
            } else if (listeners instanceof Function) {
                if (this.#listeners) {
                    const i = this.#listeners.indexOf(listeners);
                    if (i > -1) {
                        this.#listeners.splice(i, 1);
                    }
                }
            }
        }
    }

    //-----------------PRIVATE METHODS-------------------

    /**
     * Old-fashioned way to insert HTMLElements to DOM
     */
    #generateHTMLNodes() {
        let sheet = this.#appendElements(this.#root, 'div', ['sheet']);

        let asterisk = this.#appendElements(sheet, 'div', ['asterisk']);
        this.#appendElements(asterisk, 'div', ['axis'], 3);

        this.#appendElements(sheet, 'div', ['headline']);

        let lineContainer = this.#appendElements(sheet, 'div', ['line-container']);
        this.#appendElements(lineContainer, 'div', ['line'], 3);

        let markFlex = this.#appendElements(this.#root, 'div',['mark-flex']);
        this.#appendElements(markFlex, 'div',['mark']);
    }

    /**
     *
     * @param {HTMLElement} targetElement
     * @param {String} tagName
     * @param {String[]} classList
     * @param {number} copies
     * @returns {HTMLElement|HTMLElement[]}
     */
    #appendElements(
        targetElement = this.#root,
        tagName = 'div',
        classList = [],
        copies = 1
    ) {
        let result = [];
        for (let i = 0; i < copies; i++) {
            let el = document.createElement(tagName);
            el.classList.add(...classList);
            targetElement.appendChild(el);
            result.push(el);
        }
        return result.length === 1 ? result[0] : result;
    }

    /**
     * Refresh state of root icon's container
     */
    #refresh() {
        this.#root.classList.add("si-root");
        Array.from(this.#root.classList)
            .filter(elClass => elClass.startsWith('size-') || elClass.startsWith('state-'))
            .forEach(elClass => this.#root.classList.remove(elClass));
        this.#root.classList.add(`size-${this.size}`);
        this.#root.classList.add(`state-${this.state}`);
    }

    /**
     * Process transition listeners from #listeners with old and new states as arguments
     * @param {String} oldState - Old state of icon
     * @param {String} newState - New state of icon
     */
    #processTransitionListeners(oldState, newState) {
        this.#runListeners(oldState, "changed");
        this.#runListeners(newState, "started");
        this.#clearAnimationFinishHandler();
        if (SaveIcon.ANIM_TIMEOUTS.hasOwnProperty(newState)) {
            this.#animFinishHandler =
                setTimeout(
                    () => {
                        this.#runListeners(newState, "finished");
                    },
                    SaveIcon.ANIM_TIMEOUTS[newState]
                );
        }
    }

    /**
     * Clear #animFinishHandler
     */
    #clearAnimationFinishHandler() {
        if (this.#animFinishHandler) {
            clearTimeout(this.#animFinishHandler);
        }
    }

    /**
     * Runs concrete state
     * @param state - state for listener, e.g. 'none', 'changed', 'pending' or 'done'
     * @param listenerEvent - transition event for listener, might be 'changed', 'started', 'finished'
     */
    #runListeners(state, listenerEvent) {
        if (this.#listeners) this.#listeners.forEach(listener => listener(this, state, listenerEvent));
    }
}