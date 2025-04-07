class EditorApp extends HTMLElement {
    constructor() {
        super()
        this.templates = ["template 1", "template 2", "template 3"]
        this.selectedTemplateIndex = 2

        this.innerHTML = `
      <style>
        .editor-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #ccc;
          background-color: #333;
          color: #fff;
        }
        .insert-button {
          background-color: #8bec8b;
          color: #000;
          border: none;
          padding: 10px;
          margin: 10px;
          cursor: pointer;
          font-weight: bold;
        }
        .editor-area {
          flex: 1;
          padding: 10px;
          background-color: #333;
        }
        .templates-panel {
          width: 250px;
          padding: 10px;
          background-color: #444;
          color: #fff;
        }
        .templates-header {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .template-list {
          background-color: #333;
          margin-bottom: 15px;
        }
        .template-item {
          padding: 5px 10px;
          cursor: pointer;
        }
        .template-item.selected {
          background-color: #666;
        }
        .template-buttons {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 15px;
        }
        .template-button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .remove-template {
          background-color: red;
        }
        .add-template {
          background-color: #8bec8b;
        }
        .edit-template-section {
          margin-top: 20px;
        }
        .edit-template-label {
          margin-bottom: 10px;
        }
        .edit-template-input {
          width: 100%;
          padding: 5px;
          box-sizing: border-box;
          background-color: #333;
          color: #fff;
          border: 1px solid #666;
        }
        .tox .template-component {
          display: inline-block;
          border: 1px solid #999;
          border-radius: 3px;
          background-color: #f0f0f0;
          padding: 2px 5px;
          margin: 2px;
          min-width: 120px;
        }
        .template-error {
          display: inline-block;
          color: red;
          font-weight: bold;
          padding: 2px 5px;
          margin: 2px;
          border: 1px solid red;
          border-radius: 3px;
          background-color: #fff0f0;
        }
        .tox-tinymce {
          border: none !important;
          border-radius: 0 !important;
        }
        .tox:not(.tox-tinymce-inline) .tox-editor-header {
          display: none !important;
        }
      </style>
      <div class="editor-container">
        <button class="insert-button" id="insert-button">Insert</button>
        <div class="editor-area">
          <div id="editor-content"></div>
        </div>
      </div>
      <div class="templates-panel">
        <div class="templates-header">Templates</div>
        <div class="template-list" id="template-list"></div>
        <div class="template-buttons">
          <div class="template-button remove-template" id="remove-template">-</div>
          <div class="template-button add-template" id="add-template">+</div>
        </div>
        <div class="edit-template-section">
          <div class="edit-template-label">Edit template</div>
          <input type="text" class="edit-template-input" id="edit-template-input">
        </div>
      </div>
      
    `

        this.templateList = this.querySelector("#template-list")
        this.removeTemplateButton = this.querySelector("#remove-template")
        this.addTemplateButton = this.querySelector("#add-template")
        this.editTemplateInput = this.querySelector("#edit-template-input")
        this.insertButton = this.querySelector("#insert-button")

        this.renderTemplateList()
        this.initEventListeners()

        window.addEventListener("load", () => {
            this.initTinyMCE()
        })
    }

    renderTemplateList() {
        this.templateList.innerHTML = ""

        this.templates.forEach((template, index) => {
            const templateItem = document.createElement("div")
            templateItem.className = "template-item"
            if (index === this.selectedTemplateIndex) {
                templateItem.classList.add("selected")
                this.editTemplateInput.value = template
            }
            templateItem.textContent = template
            templateItem.dataset.index = index
            this.templateList.appendChild(templateItem)
        })
    }

    initEventListeners() {
        // Select template
        this.templateList.addEventListener("click", (event) => {
            if (event.target.classList.contains("template-item")) {
                const index = parseInt(event.target.dataset.index)
                this.selectedTemplateIndex = index
                this.editTemplateInput.value = this.templates[index]
                this.renderTemplateList()
            }
        })

        // Add new template
        this.addTemplateButton.addEventListener("click", () => {
            this.templates.push("template")
            this.selectedTemplateIndex = this.templates.length - 1
            this.editTemplateInput.value = "template"
            this.renderTemplateList()
            this.editTemplateInput.focus()
        })

        // Delete selected template
        this.removeTemplateButton.addEventListener("click", () => {
            if (this.templates.length > 0) {
                const removedTemplate =
                    this.templates[this.selectedTemplateIndex]
                this.templates.splice(this.selectedTemplateIndex, 1)

                if (this.templates.length === 0) {
                    this.selectedTemplateIndex = -1
                    this.editTemplateInput.value = ""
                } else {
                    this.selectedTemplateIndex = Math.min(
                        this.selectedTemplateIndex,
                        this.templates.length - 1
                    )
                    this.editTemplateInput.value =
                        this.templates[this.selectedTemplateIndex]
                }

                this.renderTemplateList()

                this.updateDropdownComponents(removedTemplate)
            }
        })

        // Edit template
        this.editTemplateInput.addEventListener("blur", () => {
            this.updateSelectedTemplate()
        })

        this.editTemplateInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.updateSelectedTemplate()
            }
        })

        // Insert special component
        this.insertButton.addEventListener("click", () => {
            this.insertSpecialComponent()
        })
    }

    updateSelectedTemplate() {
        if (this.selectedTemplateIndex !== -1) {
            const oldValue = this.templates[this.selectedTemplateIndex]
            const newValue = this.editTemplateInput.value.trim()

            if (newValue !== "" && newValue !== oldValue) {
                this.templates[this.selectedTemplateIndex] = newValue
                this.renderTemplateList()

                this.updateTemplateReferences(oldValue, newValue)
            }
        }
    }

    initTinyMCE() {
        if (typeof tinymce === "undefined") {
            console.error("TinyMCE не загружен")
            return
        }

        // Register custom format for template component
        tinymce.PluginManager.add("templatecomponent", (editor) => {
            editor.addCommand("insertTemplateComponent", () => {
                this.insertSpecialComponent()
            })

            editor.ui.registry.addAutocompleter("templateList", {
                ch: "@",
                minChars: 0,
                columns: 1,
                fetch: (pattern) => {
                    return new Promise((resolve) => {
                        const matchedItems = this.templates.map((template) => ({
                            value: template,
                            text: template,
                        }))
                        resolve(matchedItems)
                    })
                },
                onAction: (autocompleteApi, rng, value) => {
                    editor.selection.setRng(rng)

                    const uniqueId = "template-" + Date.now()
                    const templateComponentHTML = `<span id="${uniqueId}" class="template-component" contenteditable="false" data-template="${value}">${value}</span>&nbsp;`

                    editor.insertContent(templateComponentHTML)
                    autocompleteApi.hide()
                },
            })

            editor.on("init", () => {
                editor.formatter.register("templatecomponent", {
                    inline: "span",
                    classes: "template-component",
                    attributes: { "data-template": "%value" },
                })
            })

            editor.ui.registry.addContextMenu("templatecontextmenu", {
                update: (element) => {
                    if (element.classList.contains("template-component")) {
                        return "edittemplate removetemplate"
                    }
                    return ""
                },
            })

            editor.ui.registry.addMenuItem("edittemplate", {
                text: "Редактировать шаблон",
                icon: "edit-block",
                onAction: () => {
                    const selected = editor.selection.getNode()
                    if (
                        selected &&
                        selected.classList.contains("template-component")
                    ) {
                        this.showTemplateEditor(selected)
                    }
                },
            })

            editor.ui.registry.addMenuItem("removetemplate", {
                text: "Удалить шаблон",
                icon: "remove",
                onAction: () => {
                    const selected = editor.selection.getNode()
                    if (
                        selected &&
                        selected.classList.contains("template-component")
                    ) {
                        editor.dom.remove(selected)
                    }
                },
            })
        })

        tinymce.init({
            selector: "#editor-content",
            height: 400,
            menubar: false,
            statusbar: false,
            plugins: ["templatecomponent"],
            toolbar: "",
            contextmenu: "templatecontextmenu link table",
            content_css: false,
            content_style: `
        body { 
          font-family: Arial, sans-serif; 
          padding: 10px; 
          background-color: #333;
          color: #fff;
        }
        .mce-content-body {
          background-color: #333 !important;
        }
        .mce-content-body, .mce-content-body * {
          border: none !important;
          border-radius: 0 !important;
        }
        .tox-tinymce {
          border: none !important;
          border-radius: 0 !important;
        }
        .tox:not(.tox-tinymce-inline) .tox-editor-header {
          display: none !important;
        }
        .template-component {
          display: inline-block;
          border: none;
          border-radius: 3px;
          background-color: gray;
          padding: 2px 5px;
          margin: 2px;
          cursor: pointer;
          min-width: 100px;
          position: relative;
        }
        .template-error {
          display: inline-block;
          color: red;
          font-weight: bold;
          padding: 2px 5px;
          margin: 2px;
          border: 1px solid red;
          border-radius: 3px;
          background-color: #fff0f0;
        }
        .template-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          background-color: gray;
          border: 1px solid #ccc;
          border-radius: 3px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          min-width: 100%;
          display: none;
        }
        .template-dropdown.visible {
          display: block;
        }
        .template-dropdown-item {
          padding: 5px 10px;
          cursor: pointer;
        }
        .template-dropdown-item:hover {
          background-color: #f0f0f0;
        }
      `,
            setup: (editor) => {
                this.editor = editor

                editor.on("click", (e) => {
                    const target = e.target
                    if (target.classList.contains("template-component")) {
                        this.showTemplateSelector(target)
                        e.stopPropagation()
                    } else {
                        this.closeAllDropdowns()
                    }
                })

                editor.on("init", () => {
                    editor.setContent(
                        "<p>There is some text that user typed manually</p>"
                    )
                    editor.getWin().addEventListener("click", (e) => {
                        if (
                            !e.target.closest(".template-component") &&
                            !e.target.closest(".template-dropdown")
                        ) {
                            this.closeAllDropdowns()
                        }
                    })
                })
            },
        })
    }

    closeAllDropdowns() {
        if (!this.editor) return

        const dropdowns = this.editor
            .getDoc()
            .querySelectorAll(".template-dropdown.visible")
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("visible")
        })
    }

    showTemplateSelector(templateComponent) {
        if (!this.editor) return
        this.closeAllDropdowns()
        let dropdown = templateComponent.querySelector(".template-dropdown")

        if (!dropdown) {
            dropdown = this.editor.dom.create("div", {
                class: "template-dropdown",
            })

            this.templates.forEach((template) => {
                const item = this.editor.dom.create(
                    "div",
                    {
                        class: "template-dropdown-item",
                        "data-value": template,
                    },
                    template
                )

                this.editor.dom.bind(item, "click", (e) => {
                    templateComponent.setAttribute("data-template", template)
                    templateComponent.textContent = template
                    dropdown.classList.remove("visible")
                    e.stopPropagation()
                })

                dropdown.appendChild(item)
            })

            templateComponent.appendChild(dropdown)
        }

        dropdown.classList.add("visible")
    }

    showTemplateEditor(templateComponent) {
        const currentTemplate = templateComponent.getAttribute("data-template")

        const templateIndex = this.templates.indexOf(currentTemplate)
        if (templateIndex !== -1) {
            this.selectedTemplateIndex = templateIndex
            this.editTemplateInput.value = currentTemplate
            this.renderTemplateList()

            this.editTemplateInput.scrollIntoView()
            this.editTemplateInput.focus()
        }
    }

    insertSpecialComponent() {
        if (!this.editor || this.templates.length === 0) return

        const selectedTemplate =
            this.templates[this.selectedTemplateIndex] || this.templates[0]
        const uniqueId = "template-" + Date.now()

        const templateComponentHTML = `<span id="${uniqueId}" class="template-component" contenteditable="false" data-template="${selectedTemplate}">${selectedTemplate}</span>&nbsp;`

        this.editor.insertContent(templateComponentHTML)
    }

    updateDropdownComponents(removedTemplate) {
        if (!this.editor) return

        const components = this.editor.dom.select(
            '.template-component[data-template="' + removedTemplate + '"]'
        )
        components.forEach((component) => {
            const errorComponent = this.editor.dom.create(
                "span",
                { class: "template-error" },
                "ERROR"
            )
            this.editor.dom.replace(errorComponent, component)
        })
    }

    updateTemplateReferences(oldValue, newValue) {
        if (!this.editor) return

        const components = this.editor.dom.select(
            '.template-component[data-template="' + oldValue + '"]'
        )
        components.forEach((component) => {
            component.setAttribute("data-template", newValue)
            component.textContent = newValue
        })
    }
}

customElements.define("editor-app", EditorApp)
