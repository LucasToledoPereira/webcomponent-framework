class SelectDemo extends HTMLElement {
  constructor() { 
    super();
    
    this.attachShadow({mode: 'open'}).innerHTML = `<h3 slot="title">Select Basic Demo</h3>
                                                  <div class="container" slot="component">
                                                    <div class="mar-bot">
                                                      <!--First Demo Example-->
                                                      <h3 class="mar-bot">Dgt-select</h3>
                                                      <dgt-select id="ex1" label="Meu DGT Select"></dgt-select>
                                                      <button id="addItems" class="btn btn-sm style-scope" >addItems</button>
                                                      <button id="removeItems" class="btn btn-sm style-scope">removeItems</button>
                                                      <button id="clearItems" class="btn btn-sm style-scope" >clearItems</button>
                                                      <button id="setSelectedItems" class="btn btn-sm style-scope" >setSelectedItem</button>
                                                      <button id="setItems" class="btn btn-sm style-scope" >setItems</button>
                                                      <button id="disableItems" class="btn btn-sm style-scope" >disableItems</button>
                                                      <hr>
                                                      <!--Second Demo Example-->
                                                      <h3 class="mar-bot">Dgt-select com objetos</h3>
                                                      <dgt-select  label="meu select" value-name="pessoa.id" label-name="pessoa.nome" id="ex2"></dgt-select>
                                                      <button id="addObjItems" class="btn btn-sm style-scope" >addItems</button>
                                                      <button id="removeObjItems" class="btn btn-sm style-scope">removeItems</button>
                                                      <button id="clearObjItems" class="btn btn-sm style-scope" >clearItems</button>
                                                      <button id="setSelectedObjItems" class="btn btn-sm style-scope" >setSelectedItem</button>
                                                      <button id="setObjItems" class="btn btn-sm style-scope" >setItems</button>
                                                      <hr>
                                                      <!--Third Demo Example-->
                                                      <h3 class="mar-bot">Dgt-select com objetos Aberto</h3>
                                                      <dgt-select  label="meu select" value-name="pessoa.id" label-name="pessoa.nome" size='4' multiple id="ex3"></dgt-select>
                                                      <button id="addObjItemsOpen" class="btn btn-sm style-scope" >addItems</button>
                                                      <button id="removeObjItemsOpen" class="btn btn-sm style-scope">removeItems</button>
                                                      <button id="clearObjItemsOpen" class="btn btn-sm style-scope" >clearItems</button>
                                                      <button id="setSelectedItemsOpen" class="btn btn-sm style-scope" >setSelectedItem</button>
                                                      <button id="setObjItemsOpen" class="btn btn-sm style-scope" >setItems</button>
                                                      <button id='sort-object-size' class="btn btn-sm style-scope" >Order</button>
                                                      <hr>
                                                      <!--Fourth Demo Example-->
                                                      <h4 class="mar-bot">Com Barra de busca</h4>
                                                      <dgt-select id="ex4"  size="4" label="Meu select" multiple search-bar></dgt-select>
                                                      <!--Fifth Demo Example-->
                                                      <h4 class="mar-bot">Campo obrigatório</h4>
                                                      <dgt-select id="ex5" label="Meu select" multiple required></dgt-select>
                                                      <button id="submit" class="btn btn-sm style-scope">Ok</button>
                                                      <hr>
                                                      <h4 class="mar-bot">Desabilitado</h4>
                                                      <dgt-select id="ex6" label="Meu select" disabled></dgt-select>
                                                      <dgt-select id="ex7" label="Meu select" multiple search-bar disabled></dgt-select>
                                                  </div>
                                                </div>

                                                <div  class="toast-ctn" >
                                                  <div id="toast" style="display: none" class="toast toast-success">Item cadastrado</div>
                                                </div>`;
  }

  static get is() { return 'dgt-select-demo'; }

  get count() {
    return this.getAttribute('count') || 0;
  }

  set count(val){
    this.setAttribute('count', val);
  }

  get countObj() {
    return this.getAttribute('countObj') || 0;
  }

  set countObj(val){
    this.setAttribute('countObj', val);
  }

  get possibilitieCount() {
    return this.getAttribute('possibilitieCount') || 0;
  }

  set possibilitieCount(val){
    this.setAttribute('possibilitieCount', val);
  }

  get countOpen() {
    return this.getAttribute('countOpen') || 0;
  }

  set countOpen(val){
    this.setAttribute('countOpen', val);
  }

  connectedCallback() {
    this._addEventListenersToEx1();
    this._addEventListenersToEx2();
    this._addEventListenersToEx3();
    this._addEventListenersToEx5();
    this._populateItems();
  }

  getSelect(id) {
    return this.shadowRoot.getElementById(id);
  }

  getItem() {
    return 'Novo item ' + ++this.count;
  }

  addItems(){
    this.getSelect('ex1').addItems([this.getItem()]);
  }

  removeItem() {
    if(this.count <= 0 ) return;
    return 'Novo item ' + this.count--;
  }

  removeItems(){
    this.getSelect('ex1').removeItems([this.removeItem()]);
  }

  clearItems(){
    this.count = 0;
    this.getSelect('ex1').clearItems();
  }

  setSelectedItems(){
    this.getSelect('ex1').setSelectedItems('Novo item ' + this.count);
  }

  setItems(){
    this.getSelect('ex1').setItems(['Novo item 1', 'Novo item 2']);
    this.count = 2;
  }

  disableItems(){
    this.getSelect('ex1').disableItems(['Novo item ' + this.count]);
  }

  _addEventListenersToEx1(){
    this.shadowRoot.getElementById('addItems').addEventListener('click', (evt) => this.addItems(evt));
    this.shadowRoot.getElementById('removeItems').addEventListener('click', (evt) => this.removeItems(evt));
    this.shadowRoot.getElementById('clearItems').addEventListener('click', (evt) => this.clearItems(evt));
    this.shadowRoot.getElementById('setSelectedItems').addEventListener('click', (evt) => this.setSelectedItems(evt));
    this.shadowRoot.getElementById('setItems').addEventListener('click', (evt) => this.setItems(evt));
    this.shadowRoot.getElementById('disableItems').addEventListener('click', (evt) => this.disableItems(evt));
  }

  _addEventListenersToEx2() {
    let dgtSelect = this.getSelect('ex2');
    let toast = this.shadowRoot.getElementById('toast');

    dgtSelect.addEventListener('addItems', function (evt) {
      toast.textContent = "Adicionado: " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)

    });

    dgtSelect.addEventListener('removeItems', function (evt) {
      toast.textContent = "Removido: " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)

    });

    dgtSelect.addEventListener('selectItem', function (evt) {
      toast.textContent = "Selecionado : " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)

    });

    this.shadowRoot.getElementById('addObjItems').addEventListener('click', (evt) => this.addObjItems(evt));
    this.shadowRoot.getElementById('removeObjItems').addEventListener('click', (evt) => this.removeObjItems(evt));
    this.shadowRoot.getElementById('clearObjItems').addEventListener('click', (evt) => this.clearObjItems(evt));
    this.shadowRoot.getElementById('setSelectedObjItems').addEventListener('click', (evt) => this.setSelectedObjItems(evt));
    this.shadowRoot.getElementById('setObjItems').addEventListener('click', (evt) => this.setObjItems(evt));
  }

  _addEventListenersToEx5(){
    this.shadowRoot.getElementById('submit').addEventListener('click', (evt) => this.submit(evt));
  }

  getObject() {
    this.countObj++;
    let objItem = {
      pessoa: {
        nome: "Oberon "+ this.countObj,
        id: this.countObj
      }
    };
    return objItem;
  }

  removeObject() {
    if(this.countObj <= 0) return

    let objItem = {
      pessoa: {
        nome: "Oberon "+ this.countObj ,
        id: this.countObj
      }
    };
    this.countObj--;
    return objItem;
  }

  addObjItems(){
    this.getSelect('ex2').addItems([this.getObject()]);
  }

  removeObjItems(){
    this.getSelect('ex2').removeItems([this.removeObject()]);
  }

  clearObjItems(){
    this.countObj = 0;
    this.getSelect('ex2').clearItems();
  }

  setSelectedObjItems(){
    this.getSelect('ex2').setSelectedItems({
      pessoa: {
        nome: "Oberon "+ this.countObj,
        id: this.countObj
      }
    });
  }

  setObjItems(){
    let items = [{pessoa: {nome: "Oberon 1",id: 1}}, {pessoa: {nome: "Oberon 2",id: 2}}];
    this.countObj = 2;
    this.getSelect('ex2').setItems(items);
  }

  getSortPossibilities() {
    return [
            { ordernation: 'ASC', label: 'ASC' },
            { ordernation: '(function(a, b){ if(a.label < b.label){return -1} if(a.label > b.label){return 1};return 0;})', label: "Eval" },
            { ordernation: "DESC", label: "DESC" },
            { ordernation: function(a, b){
              if(a.label < b.label) return -1
              if(a.label > b.label) return 1;
              return 0;
            }, label: "Function" }
          ]
  }

  _addEventListenersToEx3() {
    let dgtSelect = this.getSelect('ex3');
    let toast = this.shadowRoot.getElementById('toast');

    dgtSelect.addEventListener('addItems', function (evt) {
      toast.textContent = "Adicionado: " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)

    });

    dgtSelect.addEventListener('removeItems', function (evt) {
      toast.textContent = "Removido: " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)

    });

    dgtSelect.addEventListener('selectItem', function (evt) {
      toast.textContent = "Selecionado : " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)

    });

    dgtSelect.addEventListener('deselectItem', function (evt) {
      toast.textContent = "Deselecionado : " +JSON.stringify(evt.detail)
      toast.setAttribute("style", "display: block");

      setTimeout(function(){
        toast.setAttribute("style", "display: none");
      }, 5000)
    });


    this.shadowRoot.getElementById('addObjItemsOpen').addEventListener('click', (evt) => this.addObjItemsOpen(evt));
    this.shadowRoot.getElementById('removeObjItemsOpen').addEventListener('click', (evt) => this.removeObjItemsOpen(evt));
    this.shadowRoot.getElementById('clearObjItemsOpen').addEventListener('click', (evt) => this.clearObjItemsOpen(evt));
    this.shadowRoot.getElementById('setSelectedItemsOpen').addEventListener('click', (evt) => this.setSelectedItemsOpen(evt));
    this.shadowRoot.getElementById('setObjItemsOpen').addEventListener('click', (evt) => this.setObjItemsOpen(evt));
    this.shadowRoot.getElementById('sort-object-size').addEventListener('click', (evt) => this.sortObjItemsOpen(evt));
  }

  getObjectOpen() {
    this.countOpen++;
    var objItem = {
      pessoa: {
        nome: "Oberon "+ this.countOpen,
        id: this.countOpen
      }
    };
    return objItem;
  }

  removeObjectOpen() {
    if(this.countOpen <= 0) return

    var objItem = {
      pessoa: {
        nome: "Oberon "+ this.countOpen ,
        id: this.countOpen
      }
    };
    this.countOpen--;
    return objItem;
  }

  addObjItemsOpen(){
    this.getSelect('ex3').addItems([this.getObjectOpen()]);
  }

  removeObjItemsOpen(){
    this.getSelect('ex3').removeItems([this.removeObjectOpen()]);
  }

  clearObjItemsOpen(){
    this.countOpen = 0;
    this.getSelect('ex3').clearItems();
  }

  setSelectedItemsOpen(){
    this.getSelect('ex3').setSelectedItems({
      pessoa: {
        nome: "Oberon "+ this.countOpen,
        id: this.countOpen
      }
    });
  }

  setObjItemsOpen(){
    var items = [{pessoa: {nome: "Oberon 1",id: 1}}, {pessoa: {nome: "Oberon 2",id: 2}}];
    this.countOpen = 2;
    this.getSelect('ex3').setItems(items);
  }

  sortObjItemsOpen(){
    if(this.possibilitieCount >= this.getSortPossibilities().length  ){
      this.possibilitieCount = 0;
    }
    this.getSelect('ex3').sort = this.getSortPossibilities()[this.possibilitieCount].ordernation;
    this.shadowRoot.getElementById('sort-object-size').textContent = this.getSortPossibilities()[this.possibilitieCount].label
    this.possibilitieCount++;
  }

  _populateItems(){
    for(var i = 4; i <= 7; i++){
      let element = this.getSelect('ex' + i);
      if(element){
        element.addItems(['Brasil', 'Argentina', 'Uruguay', 'Chile']);
      }
    }
  }

  submit() {
    this.getSelect('ex5').validate();
  }

}

customElements.define(SelectDemo.is, SelectDemo);