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

### Events
* **change** - Fired when the selection change
    * *Parameters:*
        - ```evt``` : ```Event``` : Object that has a property called ```detail```, it contains an Object with the changed flag.
* **selectItem** - Fired when an item is selected
    * *Parameters:*
        - ```evt``` : ```Event``` : Object that has a property called ```detail```, it contains the selected item. This item can be a String or an Object.
* **deselectItem** - Fired when an item is deselected
    * *Parameters:*
        - ```evt``` : ```Event``` : Object that has a property called ```detail```, it contains the deselected itemo. This item can be a String or an Object.
* **addItems** - Fired when add new items to select
    * *Parameters:*
        - ```evt``` : ```Event``` : Object that has a property called ```detail```, it contains an Array with added items.
* **removeItems** - Fired when remove items
    * *Parameters:*
        - ```evt``` : ```Event``` : Object that has a property called ```detail```, it contains an Array with removed items.


### Usage
You can use this component like the flowing code:

```html
  <dgt-select  label="meu select" value-name="pessoa.id" label-name="pessoa.nome" size='4' multiple id="ex3"></dgt-select>
  <button id="addItems" class="btn btn-sm style-scope" >addItems</button>

  <script>
      this.shadowRoot.getElementById(addItems).addEventListener('click', (evt) => {
        this.shadowRoot.getElementById('ex3').addItems(['teste']);
      });
  </script>
```

### Authors
* Supero TI - **Lucas Toledo Pereira** - [Github - LucasToledoPereira](https://github.com/LucasToledoPereira)