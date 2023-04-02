import SaveIcon from "../lib/src/js/svi.js";

export default function demo() {
    /*------ SVI Example of usage ------*/

    let saveIcon = new SaveIcon(document.querySelector("#save-icon"), true);

    saveIcon.addTransitionListeners((icon, state, e)=>{
        let logLine = document.createElement('div');
        logLine.classList.add('log-line');
        logLine.innerHTML = `Transition Event: <span class="state">${state}</span> -> <span class="state">${e}</span>`;
        let logScroller = document.querySelector("#demo-transition-events");
        let logContainer= logScroller.querySelector(".log");
        logContainer.appendChild(logLine);
        logScroller.scrollTop = logScroller.scrollHeight;
        setTimeout(()=>{logContainer.removeChild(logLine)}, 7100);
    });

    //Demo stuff
    let setParameter = (param, input) => {
        let value = typeof input === "string" ? input : input.target.dataset[param];
        saveIcon[param] = value;
        document
            .querySelectorAll(`button[data-${param}]`)
            .forEach(button => button.classList.remove('active'));
        document
            .querySelector(`button[data-${param}="${value}"]`)
            .classList.add('active');
    }

    let setState = setParameter.bind(this, 'state');
    let setSize = setParameter.bind(this, 'size');

    document
        .querySelectorAll(`button[data-state]`)
        .forEach(button => {
            button.innerText = `${button.dataset.state}`
            button.addEventListener("click", setState);
        })
    document
        .querySelectorAll(`button[data-size]`)
        .forEach(button => {
            button.innerText = `${button.dataset.size}`
            button.addEventListener("click", setSize);
        })

    setState("changed");
    setSize("x-large");
}