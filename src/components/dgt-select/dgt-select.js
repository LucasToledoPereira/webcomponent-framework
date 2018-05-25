class DgtSelect extends HTMLElement {
    constructor() { 
      super();
      this.attachShadow({mode: 'open'});
      this._createTemplate();
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


    static get properties() {
      return {
        sort: {
          observer: '_handlerSort'
        }
      }
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
      }).bind(this));

      return optionElements;
    }

    _handleChangeSelect(evt) {
      this._fireEvent('change', {changed: true});
      if(evt.target.selectedIndex >= 0) {
        let options = this.shadowRoot.querySelectorAll('option');
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
        let searchTerm = this.shadowRoot.querySelector('input').value;
        this.filter(searchTerm);
    }

    filter(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      let elOptions = this.shadowRoot.querySelectorAll('select option');

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
              span.remove();
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

      this.sort =  (new Function('return '+  this.sort))() ;
      if(typeof this.sort != "function"){
        throw new Error('Please check String function');
      }
      return toSort.sort(this.sort);
    }

    _handlerSort() {
      let optionElements = this._moveOptionToArray(this.shadowRoot.querySelectorAll('option'));
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
        optionElements = this._moveOptionToArray(this.shadowRoot.querySelectorAll('option')).concat(optionElements);
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
      let elOptions = this.shadowRoot.querySelectorAll('select option');

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

      let elOptions = this.shadowRoot.querySelectorAll('select option');

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

      let elOptions = this.shadowRoot.querySelectorAll('select option');

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
        this.select = this.shadowRoot.querySelector('select');
        this.select.setAttribute('id', this.idSelect);
    }

    _getSelectElement(){
      if(!this.select){
        this.select  = this.shadowRoot.querySelector('select');
      }
      return this.select;
    }

    _loadDeclaredOptions() {
        let declaredOptionsWrapper = this.shadowRoot.getElementById('declaredOptionsWrapper');
        let options = Array.from(declaredOptionsWrapper.children);
        declaredOptionsWrapper.parentNode.removeChild(declaredOptionsWrapper);
        declaredOptionsWrapper.remove();
        this.addItems(options);
    }

    connectedCallback() {
        this._createDomReferences();
        this.isIE = this._isInternetExplorer();
        this.valueName = this.valueName || "";
        this.labelName = this.labelName || "";
        this._populateProperties();
        //this._loadDeclaredOptions();//Verificar

        // quickfix bug tag select height firefox
        this._getSelectElement().style.minHeight = this._getSelectElement().offsetHeight;
    }

    attributeChangedCallback(){
        this._populateProperties();
    }

    _populateProperties(){
        this._populateSelectProperties();
        this._populateSearchProperties();
        this._populateLabelProperties();
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
        let searchTemplate = this.shadowRoot.getElementById('searchIf');
        let searchInput = this.shadowRoot.getElementById('inputSearch');

        this._addOrRemoveProperty('disabled', this.disabled, searchInput);
        searchTemplate.style.display = this.searchBar ? 'block' : 'none';
    }

    _populateLabelProperties(){
        let label = this.shadowRoot.querySelector('label');
        label.setAttribute('for', this.idSelect);
        label.innerHTML = this.label || '';
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
      let elOptions = this.shadowRoot.querySelectorAll('select option');
      elOptions.forEach(el => el.selected = false);

      this.classList.remove('invalid');
      this.removeAttribute('dgterror');
      
      let input = this.querySelector('input');
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

      let elOptions = this.shadowRoot.querySelectorAll('select option');
      //let elOptions = this.querySelectorAll('select option');
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
        let template = document.createElement('template');
        template.setAttribute('style', 'display:none');

        let div = document.createElement('div');
        div.setAttribute('class', 'dgt-error-msg');
        div.innerHTML = '';

        template.appendChild(div);
        this.shadowRoot.appendChild(template);
    }

    _createSelectTemplate(){
        let select = document.createElement('select');
        select.setAttribute('class', 'input-field');
        select.addEventListener('change', (evt) => this._handleChangeSelect(evt));
        this.shadowRoot.appendChild(select);
    }

    _createSearchTemplate() {
        let template = document.createElement('template');
        template.setAttribute('id', 'searchIf');

        let div = document.createElement('div');
        div.setAttribute('class', 'search-bar');

        let input = document.createElement('input');
        input.setAttribute('id', 'inputSearch');
        input.setAttribute('disabled', false);
        input.setAttribute('tabindex', '-1');
        input.setAttribute('type', 'search');
        input.addEventListener('input', (evt) => this._doFilter(evt));
        
        div.appendChild(input);
        template.appendChild(div);

        this.shadowRoot.appendChild(template);
    }

    _createLabelOptionsTemplate(){
        let label = document.createElement('label');
        label.setAttribute('for', '');
        label.innerText = '';

        let div = document.createElement('div');
        div.setAttribute('id', 'declaredOptionsWrapper');

        let content = document.createElement('content');
        content.setAttribute('select', 'option');

        div.appendChild(content);

        this.shadowRoot.appendChild(label);
        this.shadowRoot.appendChild(div);
    }
  }
  
  customElements.define(DgtSelect.is, DgtSelect);