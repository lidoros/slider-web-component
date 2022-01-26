/*
  This is a slider web component
  it recieves the following attributes:
    - min:   minimum value allowed (defualt = 0)
    - max:   maximum value allowed (defualt = 10)
    - step:  step size (defualt = 1)
    - label: label to display above slider (defualt = no label)
    - value: value to display at first render

*/

class Slider extends HTMLElement {
  constructor() {
    super();

    //create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    //Create a label for the slider
    const label = document.createElement("p");
    label.setAttribute("class", "label");
    label.textContent = this.hasAttribute("label")
      ? this.getAttribute("label")
      : null;

    //Create the slider
    const slider = document.createElement("input");
    slider.setAttribute("class", "slider");
    slider.setAttribute("type", "range");

    //Take attribute content and put it in slider
    const min = this.hasAttribute("min") ? this.getAttribute("min") : 0;
    const max = this.hasAttribute("max") ? this.getAttribute("max") : 10;
    const step = this.hasAttribute("step") ? this.getAttribute("step") : 1;
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("step", step);

    let midVal = Math.floor((min + max) / 2);
    slider.setAttribute(
      "value",
      this.hasAttribute("value") ? this.getAttribute("value") : midVal
    );
    slider.setAttribute(
      "oninput",
      "this.nextElementSibling.value = this.value"
    );

    //Create container for current value
    const outputValue = document.createElement("output");
    outputValue.setAttribute("class", "output-value");
    outputValue.textContent = midVal;

    //Add ticks to be displayed in Chrome
    //(will automaticaly show on Microsoft edge and Internet explorer)
    const tickContainer = document.createElement("div");
    tickContainer.setAttribute("class", "tick-container");
    const sliderRange = max - min;
    const tickCount = sliderRange / step + 1;

    for (let ii = 0; ii < tickCount; ii++) {
      let tick = document.createElement("span");
      tick.setAttribute("class", "tick-slider");
      tickContainer.appendChild(tick);
    }

    // const elemArr = Array(Math.floor(max / step)).fill(
    //   document.createElement("option")
    // );
    // const elemArrMapped = elemArr.map((e, i) => (e.textContent = step * i));

    // const dataList = document.createElement("datalist");
    // dataList.setAttribute("id", "ticks");
    // slider.setAttribute("list", "ticks");
    // // elemArrMapped.map((e) => dataList.appendChild(e));

    //Styling the slider
    const style = document.createElement("style");
    style.textContent = `
    .wrapper {
      display: grid;
      justify-items: center;
    }
    .label{
      font-size:1.3vw;
    }
    .slider {
      width: 12vw;
    }
    .output-value {
      font-size: 1vw
    }
    .tick-slider {
      width: 1vw;
      height:1vw;
      border-radius: 50%;
      background-color: black;
    }
    tick-container{  
      height: var(--slider-track-height);
  
      pointer-events: none;
  
      border-radius: var(--slider-track-border-radius);
  
      z-index: -1;
    }
    `;

    //Attach the created elements to the shaow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(label);
    wrapper.appendChild(tickContainer);
    wrapper.appendChild(slider);
    wrapper.appendChild(outputValue);
  }
}

customElements.define("my-slider", Slider);
