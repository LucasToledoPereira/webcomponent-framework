export class DgtSelect extends HTMLElement {

    constructor() {
        super();
        this.items = [];
    }

    static get is() { return 'dgt-select'; }

    static get observedAttributes() { return ["items"]; }

    addItem() {
        this.items.push({name: 'Pizza', value: 1, ordered: 0});
        this.populateSelectList();
    }

    connectedCallback() {
        this.createShadowRoot().innerHTML = this._getTemplate();
        this._addEventListener();
        this.populateSelectList();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if(typeof newVal == 'string') {
            this.items = JSON.parse(newVal);
        } else this.items = newVal;
    }

    _createOptions(options) {

        var optionElements = [] ;
        options.forEach(function (option){
            var optionElement;

            if (option instanceof Node) {
                if (option.tagName !== 'OPTION') {
                    throw new Error("Can't use tags other than <option> inside dgt-select");
                }
                optionElement = option;
                optionElement.rawValue = option.value || option.innerText;
            } else {
                optionElement = document.createElement('option');
                optionElement.innerText = this._getAttrib(option, this.labelName);
                optionElement.value = this._getAttrib(option, this.valueName);
                optionElement.rawValue = option;
            }
            optionElement.addEventListener('click', this._handleOptionClick.bind(this));
            optionElements.push(optionElement);
        }.bind(this));

        return optionElements;
    }

    populateSelectList() {
        let select = this.shadowRoot.querySelector('.select-element');
        this.items.forEach(item => {
            let option = document.createElement('option');
            option.value = item.value;
            option.innerText = item.name;
            select.appendChild(option);
        });
    }

    _addEventListener() {
        this.shadowRoot.querySelector('button').addEventListener('click', ()=>{this.addItem()});
    }

    _getTemplate() {
        return `<style>
                    :host {
                        display: block;
                        color: blue;
                    }
                </style>
                <template is="dom-if" if="{{isTrue}}">
                    <div class="dgt-error-msg">Blalsadjas</div>
                </template>
                <div>
                    <p>Select test</p>
                    <select class="select-element"></select>
                </div>
                <button>Add pizza</button>`;
    }
}

window.customElements.define(DgtSelect.is, DgtSelect);
