(function () {
  class CustomList extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });

      const customListContainer = document.createElement("div");

      const title = this.title;
      const addItemText = this.addItemText;
      const listItems = this.items;

      customListContainer.classList.add("custom-list");

      customListContainer.innerHTML = `
        <style>
          .item-list {
            align-items: left;
            background: #fff;
            border-radius: 3px;
            display: flex;
            flex-direction:column;
            font-size: 12px;
            justify-content: space-between;
            margin-bottom: 6px;
            padding: 0;
          }

          .add-new-list-item-input {
            padding: 8px;
            border: 1px solid lightgray;
            border-radius: 4px;
            font-size: 16px;
          }

          .list {
            padding: 5px;
            margin:4px;
            font-size: 16px;
            background-color: #EEEEEE;
          }
          
          li, div > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .icon {
            background-color: #007db8;
            border: 1px solid #fff;
            cursor: pointer;
            font-weight: 400;
            padding: 5px 8px;
            border-radius: 4px;
            float: right;
            color: #fff;
            font-size:16px;
          }

          .custom-list {
            width: 450px;
            margin: auto;
            padding: 10px;
            padding: 30px;
            background-color: lightblue;
            box-shadow: 2px 2px 2px 2px dimgray;
          }

          .custom-input {
            margin-bottom: 10px;
          }
          
        </style>
        <div class="custom-input">
          <input class="add-new-list-item-input" type="text" placeholder="Enter here"></input>
          <button class="custom-list-add-item icon">Submit</button>
        </div>
        <ul class="item-list">
          ${listItems
            .map(
              (item) => `
            <li class="list">${item}
              <button class="custom-list-remove-item icon">Remove</button>
            </li>
          `
            )
            .join("")}
        </ul>
      `;

      // binding methods
      this.addListItem = this.addListItem.bind(this);
      this.handleRemoveItemListeners =
        this.handleRemoveItemListeners.bind(this);
      this.removeListItem = this.removeListItem.bind(this);

      shadow.appendChild(customListContainer);
    }

    addListItem(e) {
      const textInput = this.shadowRoot.querySelector(
        ".add-new-list-item-input"
      );

      if (textInput.value) {
        const li = document.createElement("li");
        li.classList.add("list");
        const button = document.createElement("button");
        const childrenLength = this.itemList.children.length;

        li.textContent = textInput.value;
        button.classList.add("custom-list-remove-item", "icon");
        button.innerHTML = "Remove";

        this.itemList.appendChild(li);
        this.itemList.children[childrenLength].appendChild(button);

        this.handleRemoveItemListeners([button]);

        textInput.value = "";
      }
    }

    connectedCallback() {
      const removeElementButtons = [
        ...this.shadowRoot.querySelectorAll(".custom-list-remove-item"),
      ];
      const addElementButton = this.shadowRoot.querySelector(
        ".custom-list-add-item"
      );

      this.itemList = this.shadowRoot.querySelector(".item-list");

      this.handleRemoveItemListeners(removeElementButtons);
      addElementButton.addEventListener("click", this.addListItem, false);
    }

    get title() {
      return this.getAttribute("title") || "";
    }

    get items() {
      const items = [];

      [...this.attributes].forEach((attr) => {
        if (attr.name.includes("list-item")) {
          items.push(attr.value);
        }
      });

      return items;
    }

    get addItemText() {
      return this.getAttribute("add-item-text") || "";
    }

    handleRemoveItemListeners(arrayOfElements) {
      arrayOfElements.forEach((element) => {
        element.addEventListener("click", this.removeListItem, false);
      });
    }

    removeListItem(e) {
      e.target.parentNode.remove();
    }
  }

  customElements.define("custom-list", CustomList);
})();
