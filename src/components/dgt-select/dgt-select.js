class DgtSelect extends HTMLElement {
    constructor() { 
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = `<link rel="stylesheet" href="./styles/dgt-style.css" type="text/css">
                                   <link rel="stylesheet" href="./styles/dgt-select.css" type="text/css">`;
    } 

    static get is() { return 'dgt-select'; }

    get id(){
        return this.getAttribute('id');
    }

    set id(val){
        this.setAttribute('id', val);
    }

    get label(){
        return this.getAttribute('label');
    }

    set label(val){
        this.setAttribute('label', val);
    }

    get name(){
        return this.getAttribute('name');
    }

    set name(val){
        this.setAttribute('name', val);
    }

    get sort(){
        return this.getAttribute('sort');
    }

    set sort(val){
        this.setAttribute('sort', val);
    }

    get searchBar(){
        return this.hasAttribute('search-bar');
    }

    set searchBar(val){
        this.setAttribute('search-bar', val);
    }

    get valueName(){
        return this.getAttribute('value-name');
    }

    set valueName(val){
        this.setAttribute('value-name', val);
    }

    get labelName(){
        return this.getAttribute('label-name');
    }

    set labelName(val){
        this.setAttribute('label-name', val);
    }

    get multiple(){
        return this.hasAttribute('multiple');
    }

    set multiple(val){
        this.setAttribute('multiple');
    }

    get disabled(){
        return this.hasAttribute('disabled');
    }

    set disabled(val){
        this.setAttribute('disabled', val);
    }

    get autofocus(){
        return this.hasAttribute('autofocus');
    }

    set autofocus(val){
        this.setAttribute('autofocus', val);
    }

    get required(){
        return this.hasAttribute('required');
    }

    set required(val){
        this.setAttribute('required', val);
    }

    get size(){
        return this.getAttribute('size');
    }

    set size(val){
        this.setAttribute('size', val);
    }

    get dgterror(){
        return this.getAttribute('dgterror');
    }

    set dgterror(val){
        this.setAttribute('dgterror', val);
    }

    _isInternetExplorer() {
      return (navigator.appName == 'Microsoft Internet Explorer')
              || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null));
    }

    _createOptions(options) {
      let optionElements = [];
      options.forEach(((option) => {
        let optionElement;
        if (option instanceof Node) {
          if (option.tagName === 'OPTION') {
            optionElement = option;
            optionElement.rawValue = option.value || option.innerText;
          }     
        } else {
          optionElement = document.createElement('option');
          optionElement.innerText = this._getAttrib(option, this.labelName);
          optionElement.value = this._getAttrib(option, this.valueName);
          optionElement.rawValue = option;
        }

        optionElement && optionElement.addEventListener('click', this._handleOptionClick.bind(this));
        optionElement && optionElements.push(optionElement);
      }).bind(this));

      return optionElements;
    }

    _handleChangeSelect(evt) {
      this._fireEvent('change', {changed: true});
      if(evt.target.selectedIndex >= 0) {
        let options = this._getShadowElement().querySelectorAll('option');
        this._fireEvent('selectItem', options[evt.target.selectedIndex].rawValue);
      }
    }

    _handleOptionClick(evt) {
      if(!evt.target.selected){
        this._fireEvent('deselectItem', evt.target.rawValue);
      }
    }

    _getAttrib(item, attrib) {
      if (!(item instanceof Object)) return item;

      if (attrib.indexOf('.') != -1) {
        let newAttribs = attrib.split('.');
        newAttribs.forEach(function (elm) {
          item = item[elm];
        });
        return item;
      } else {
        return item[attrib];
      }
    }

    _doFilter(evt) {
        let searchTerm = this._getShadowElement().querySelector('input').value;
        this.filter(searchTerm);
    }

    filter(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      let elOptions = this._getShadowElement().querySelectorAll('select option');

      elOptions.forEach(el => {
        if(el.text.toLowerCase().indexOf(searchTerm) === -1){
          el.setAttribute('hidden', true);
          el.style.visibility = 'hidden';
        } else {
          el.removeAttribute('hidden');
          el.style.visibility = "";
        }

        if(this.isIE){
          if(el.style.visibility === 'hidden'){
            let span = document.createElement('span');
            this._getSelectElement().insertBefore(span, el);
            span.appendChild(el);
          } else {
            let span = el.parentElement;
            if(span.tagName === 'SPAN'){
              this._getSelectElement().insertBefore(el, span);
              span.removeNode();
            }
          }
        }
      });
    }

    _moveOptionToArray(htmlCollection) {
      let optionElements= [];
      htmlCollection.forEach(html => optionElements.push(html));
      return optionElements;
    }

    _sortList(toSort) {
      if(typeof this.sort === "function" ){
        return toSort.sort(this.sort);
      }

      if(this.sort.toLowerCase().match("desc|asc") ){
        let direction = this.sort.toLowerCase() === "desc" ? -1 : 1;

        return  toSort.sort(function(a, b) {
            return (a.label.localeCompare(b.label)) * direction;
        });
      }

      let sortFunction =  (new Function('return '+  this.sort))() ;
      this.sort = sortFunction;
      if(typeof sortFunction != "function"){
        throw new Error('Please check String function');
      }
      return toSort.sort(sortFunction);
    }

    _handlerSort() {
      let optionElements = this._moveOptionToArray(this._getShadowElement().querySelectorAll('option'));
      if(optionElements.length == 0){
        return;
      }
      this.clearItems();

      let arr = this._sortList(optionElements);
      arr.forEach(((element) => this._getSelectElement().add(element)).bind(this));
    }


    addItems(newItems) {
      if (!(newItems[0] instanceof Node) && (newItems[0] instanceof Object) && (this.valueName == '' || this.labelName == '')) {
        throw new Error('value-name and label-name must be set')
      }

      if (!(newItems instanceof Array)){
        newItems = [newItems];
      }

      let optionElements = this._createOptions(newItems);

      if(this.sort){
        optionElements = this._moveOptionToArray(this._getShadowElement().querySelectorAll('option')).concat(optionElements);
        optionElements = this._sortList(optionElements);
        this.clearItems();
      }

      optionElements.forEach(((element) => this._getSelectElement().add(element)).bind(this));

      this._fireEvent('addItems', newItems);
    }

    setItems(newItems) {
      this.clearItems();
      this.addItems(newItems);
    }

    removeItems(items) {
      if (!(items instanceof Array)){
        items = [items];
      }
      let itemsRemoved = [];
      let elOptions = this._getShadowElement().querySelectorAll('select option');

      items.forEach(((item) => {
        let value = this._getAttrib(item, this.valueName);
        elOptions.forEach((el) => {
          if(el.value && el.value == value) {
            itemsRemoved.push(el.rawValue);
            this.removeItem(el.index);
          }
        });
      }).bind(this));

      this._fireEvent('removeItems', itemsRemoved);

      return itemsRemoved;
    }

    removeItem(index) {
      this._getSelectElement().remove(index);
    }

    clearItems() {
      this._getSelectElement().innerHTML = '';
    }

    setSelectedItems(items) {
      if(!(items instanceof Array)){
        items = [items];
      }

      let elOptions = this._getShadowElement().querySelectorAll('select option');

      items.forEach(((item) => {
        let value = this._getAttrib(item, this.valueName),
            anySetted = false;
        
        elOptions.forEach(el => {
          if(el.value == value){
            el.selected = true;
            anySetted = true;
          }
        });
          
        if(!anySetted){
          throw new ReferenceError('There is no option to set');
        }
      }).bind(this));
    }

    disableItems(items) {
      if(!(items instanceof Array)){
        items = [items];
      }

      let elOptions = this._getShadowElement().querySelectorAll('select option');

      items.forEach((item => {
        let value = this._getAttrib(item, this.valueName);

        elOptions.forEach(el => {
          if(el.value == value){
            el.disabled = true;
          }
        });
      }).bind(this));
    }

    getSelectedItems() {
      let selectedOptions =  Array.from(this._getSelectElement().querySelectorAll('option:checked'));
      return selectedOptions.map(function(option){
        return option.rawValue;
      });
    }

    getItems() {
      let options =  Array.from(this._getSelectElement().querySelectorAll('option'));
      return options.map(function(option){
        return option.rawValue;
      });
    }

    getAvailableItems() {
      let options = Array.from(this._getSelectElement().querySelectorAll('option:not([disabled])'));
      return options.map(function(option){
        return option.rawValue;
      });
    }

    getIdItems() {
      let rawValues = this.getItems();
      return rawValues.map((rawValue => {
        return this._getAttrib(rawValue, this.valueName);
      }).bind(this));
    }

    _createDomReferences() {
        this.idSelect = (this.id + 'select') || (Math.random()*1000+1);
        this.select = this._getShadowElement().querySelector('select');
        this.select.setAttribute('id', this.idSelect);
    }

    _getSelectElement(){
      if(!this.select){
        this.select  = this._getShadowElement().querySelector('select');
      }
      return this.select;
    }

    _loadDeclaredOptions() {
        let declaredOptionsWrapper = this._getShadowElement().querySelector('#declaredOptionsWrapper');
        let options = Array.from(declaredOptionsWrapper.children);
        declaredOptionsWrapper.parentNode.removeChild(declaredOptionsWrapper);
        if(this.isIE){
          declaredOptionsWrapper.removeNode();
        } else {
          declaredOptionsWrapper.remove();   
        }
        this.addItems(options);
    }

    connectedCallback() {
      this._createTemplate();
      this._createDomReferences();
      this.isIE = this._isInternetExplorer();
      this.valueName = this.valueName || "";
      this.labelName = this.labelName || "";
      this._populateProperties();
      this._loadDeclaredOptions();

      // quickfix bug tag select height firefox
      this._getSelectElement().style.minHeight = this._getSelectElement().offsetHeight;
    }

    static get observedAttributes() {return ['id', 'label', 'name', 'sort', 'searchBar', 'valueName', 'labelName', 'multiple', 'disabled', 'autofocus', 'required', 'size', 'dgterror']; }

    attributeChangedCallback(name){
      if(this._getSelectElement()){
        this._executeIfChanged(name, 'sort', this._handlerSort);
        this._populateProperties();        
      }
    }

    _executeIfChanged(argName, name, fn){
      let isEqualName = argName === name;
      isEqualName && fn.call(this);
    }

    _populateProperties(){
        this._populateSelectProperties();
        this._populateSearchProperties();
        this._populateLabelProperties();
        this._populateErrorProperties();
    }

    _populateSelectProperties(){
        this._addOrRemoveProperty('autofocus', this.autofocus, this._getSelectElement());
        this._addOrRemoveProperty('disabled', this.disabled, this._getSelectElement());
        this._addOrRemoveProperty('multiple', this.multiple, this._getSelectElement());
        this._addOrRemoveProperty('required', this.required, this._getSelectElement());
        this._addOrRemoveProperty('search-bar', this.searchBar, this._getSelectElement());
        this._addOrRemoveProperty('size', this.size, this._getSelectElement());
        this._addOrRemoveProperty('name', this.name, this._getSelectElement());
        this._addOrRemoveProperty('sort', this.sort, this._getSelectElement());
        this._getSelectElement().setAttribute('value-name', this.valueName);
        this._getSelectElement().setAttribute('label-name', this.labelName);
    }

    _populateSearchProperties(){
        let searchDiv = this._getShadowElement().querySelector('#searchIf');
        let searchInput = this._getShadowElement().querySelector('#inputSearch');

        this._addOrRemoveProperty('disabled', this.disabled, searchInput);
        this._addOrRemoveProperty('hidden', !this.searchBar, searchDiv);
    }

    _populateLabelProperties(){
        let label = this._getShadowElement().querySelector('label');
        label.setAttribute('for', this.idSelect);
        label.innerHTML = this.label || '';
    }

    _populateErrorProperties(){
      this._addOrRemoveProperty('hidden', !this.dgterror, this._getShadowElement().querySelector("#error_div"));
      this._getShadowElement().querySelector("#error_div").innerText = this.dgterror;
    }

    _addOrRemoveProperty(name, value, elem){
        let action = value ? 'setAttribute' : 'removeAttribute';
        elem[action](name, value);
    }

    validate() {
      let error = "";
      if(this._getSelectElement().required){
        this.classList.remove('invalid');
        this.removeAttribute('dgterror');
        if(this.getSelectedItems().length == 0){
          console.log('erro de validacao');
          //TODO necessário realizar a internacionalização da mensagem
          error = {
            id: this.id,
            msg: 'Selecione um item'
          };
          this.setAttribute('dgterror', error.msg);
          this.classList.add('invalid');
        }
      }
      return error;
    }

    clear() {
      let elOptions = this._getShadowElement().querySelectorAll('select option');
      elOptions.forEach(el => el.selected = false);

      this.classList.remove('invalid');
      this.removeAttribute('dgterror');
      
      let input = this._getShadowElement().querySelector('input');
      if(input){
        input.value = "";
      }
    }

    getValues() {
      let selectedOptions = this._getSelectElement().querySelectorAll('option:checked');

      if(this.multiple){
        return Array.from(selectedOptions)
          .map((option => this._getAttrib(option.rawValue, this.valueName)).bind(this));
      }
      return selectedOptions[0] ? this._getAttrib(selectedOptions[0].rawValue, this.valueName): null;
    }

    setValues(values) {
      this.setSelectedItems(values);
    }

    getSelectedIndexes() {
      let selectedIndex = [];
      let selectedOptions = this._getSelectElement().querySelectorAll('option:checked');
      selectedOptions.forEach(selected => selectedIndex.push(selected.index));
      return selectedIndex;
    }

    setSelectedIndexes(indexes) {
      if(!(indexes instanceof Array)){
          indexes = [indexes];
      }

      let elOptions = this._getShadowElement().querySelectorAll('select option');
      elOptions.forEach(el => el.selected = (indexes.indexOf !== -1));            
    }

    getVisibleItemsIndexes() {
      let options = Array.from(this._getSelectElement().querySelectorAll('option:not([hidden])'));
      return options.map(option=> {return option.index;});
    }

    _fireEvent(eventName, eventParam){
      this.dispatchEvent(new CustomEvent(eventName, {detail: eventParam}));
    }

    _createTemplate(){
      this._createErrorTemplate();
      this._createSelectTemplate();
      this._createSearchTemplate();
      this._createLabelOptionsTemplate();
    }

    _createErrorTemplate(){
        let div = document.createElement('div');
        div.setAttribute('class', 'dgt-error-msg');
        div.setAttribute('hidden', '');
        div.setAttribute('id', 'error_div');
        div.innerHTML = '';
        this._getShadowElement().appendChild(div);
    }

    _createSelectTemplate(){
        let select = document.createElement('select');
        select.setAttribute('class', 'input-field');
        select.addEventListener('change', (evt) => this._handleChangeSelect(evt));
        this._getShadowElement().appendChild(select);
    }

    _createSearchTemplate() {
        let div = document.createElement('div');
        div.setAttribute('class', 'search-bar');
        div.setAttribute('hidden', '');
        div.setAttribute('id', 'searchIf');

        let input = document.createElement('input');
        input.setAttribute('id', 'inputSearch');
        input.setAttribute('disabled', false);
        input.setAttribute('tabindex', '-1');
        input.setAttribute('type', 'search');
        input.addEventListener('input', (evt) => this._doFilter(evt));
        
        div.appendChild(input);

        this._getShadowElement().appendChild(div);
    }

    _createLabelOptionsTemplate(){
        let label = document.createElement('label');
        label.setAttribute('for', '');
        label.innerText = '';

        let div = document.createElement('div');
        div.setAttribute('id', 'declaredOptionsWrapper');

        let content = document.createElement('slot');
        content.setAttribute('slot', 'option');

        div.appendChild(content);

        this._getShadowElement().appendChild(label);
        this._getShadowElement().appendChild(div);
    }

    _getShadowElement(){
      return this.shadowRoot || this;
    }
  }
  
  customElements.define(DgtSelect.is, DgtSelect);