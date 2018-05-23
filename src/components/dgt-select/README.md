## Dgt Select
This component implements a HTML Select and Options using Polymer Webcomponents

### Attributes
* **name**: It is the name of the component
* **searchBar**: Define if the searchBar is visible
* **valueName**: Define the name of the property related to value when the items are objects
* **labelName**: Define the name of the property related to label when the items are objects
* **multiple**: Define if is possible to select more than one item
* **disabled**: Define if the component is disabled
* **autofocus**: Define if the component should receive auto focus
* **required**: Define if the component is mandatory
* **size**: Define if the component is an open select and how many items should be visible



### Methods
* **filter** - *Params: searchTerm (String)* - Used to filter options
* **addItems** - *Params: newItems (Anything)* - Used to add options to select
* **setItems** - *Params: newItems (Anything)* - Used to set options to select
* **removeItems** - *Params: items (Anything)* - Used to remove options from select
* **removeItem** - *Params: index (Number)* - Used to remove option by index
* **clearItems** - *Params: NONE* - Used to clear all options
* **setSelectedItems** - *Params: items (Anything)* - Used to select options
* **disableItems** - *Params: items (Anything)* - Used to disable options
* **getSelectedItems** - *Params: NONE* - Used to get all selected options
* **getItems** - *Params: NONE* - Used to get all options
* **getItems** - *Params: NONE* - Used to get all options
* **getAvailableItems** - *Params: NONE* - Used to get all available options (except disabled options)
* **getIdItems** - *Params: NONE* - Used to get all ids from all options
* **validate** - *Params: NONE* - Used to verify if the component is valid
* **clear** - *Params: NONE* - Used to clear options and errors
* **getValues** - *Params: NONE* - Used to get all values from options
* **getSelectedIndexes** - *Params: NONE* - Used to get all indexes of select options
* **setSelectedIndexes** - *Params: indexes (Array | Number)* - Used to select options by indexes
* **getVisibleItemsIndexes** - *Params: NONE* - Used to get indexes of available options


### Usage
You can use this component like the flowing code:

```html
<dom-module id="my-element">
    <template>

        <!-- Component DGT-SELECT-->
        <dgt-select  label="meu select" value-name="pessoa.id" label-name="pessoa.nome" size='4' multiple id="ex3"></dgt-select>

        <!--Buttons with actions over component-->
        <button on-click="addItems" class="btn btn-sm style-scope" >addItems</button>
        <button on-click="removeItems" class="btn btn-sm style-scope">removeItems</button>
        <button on-click="clearItems" class="btn btn-sm style-scope" >clearItems</button>
        <button on-click="setSelectedItems" class="btn btn-sm style-scope" >setSelectedItem</button>
        <button on-click="setItems" class="btn btn-sm style-scope" >setItems</button>

    </template>
</dom-module>
  

<script>
    class MyElement extends Polymer.Element {
        static get is() { return 'my-element'; }

        static get properties() {
            return {}
        }

        constructor() {
            super();
        }

        getComponentSelect(id) {
            return this.shadowRoot.getElementById(id);
        }

        addItems(){
            this.getComponentSelect('ex3').addItems([/*my items*/]);
        }

        removeItems() {
            this.getComponentSelect('ex3').removeItems([/*my items*/]);
        }

        clearItems() {
            this.getComponentSelect('ex3').clearItems();
        }

        setSelectedItems() {
            this.getComponentSelect('ex3').setSelectedItems(/*my items*/);
        }

        setItems(){
            this.getComponentSelect('ex3').setItems([/*my items*/])
        }
    }

    customElements.define(SelectDemo.is, SelectDemo);
</script>

```

### Authors
* Supero TI - **Lucas Toledo Pereira** - [Github - LucasToledoPereira](https://github.com/LucasToledoPereira)