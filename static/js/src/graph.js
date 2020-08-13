function LinearObj(e) {
    var fixedFields = ['type', 'name', 'params', 'func'];
    this.r = e.split(".");
    this.len = this.r.length;
    this.key = this.r[this.r.length - 2];
    this.value = this.r[this.r.length - 1];
    this.isFixed = keysNotFixed(this.r[1], fixedFields);
    this.toString = () => {
        return console.log(this.key, this.value, this.isFixed);
    }
    this.getTableRow = () => {
        let tr = document.createElement('tr');
        tr.className = "dynamic-table";
        this.r.forEach(f => {
            let td = document.createElement('td');
            td.innerHTML = f;
            td.className = "td_cells";
            tr.appendChild(td);
        });
        if (this.isFixed === false) {
            tr.lastChild.contentEditable = "true";
            tr.lastChild.className = "td_cells_editable";
        }
        return tr;
    }
}

var graph = (decodeJson) => {
    console.log(decodeJson);
    var tableDiv = document.getElementById('tableDiv');
    initializeElement(tableDiv);

    // traverse inside a loop . outsie a loop - change isFixed() 
    let elemsArr = [];
    for (var i = 0; i < decodeJson.length; i++) {
        var tbl = document.createElement('table');
        initializeElement(tbl);

        let linearArr = [];
        traverse("root", decodeJson[i], linearArr);

        linearArr.forEach(e => {
            let obj = new LinearObj(e);
            let tr = obj.getTableRow();
            tbl.appendChild(tr);
        });
        tableDiv.appendChild(tbl);
        elemsArr.push(linearArr);
    }

    tableDiv.style.display = "block";

}

function keysNotFixed(keys, fixedFields) {
    var t = 0; // not a fixed field
    fixedFields.forEach(e => {
        if (e === keys) {
            t++;
        }
    });
    if (t == 0) return false; // not a fixed field
    return true; // fixed field
}

function initializeElement(div) {
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
}

function traverse(p, o, linearArr) {
    var type = typeof o;
    if (type == "object") {
        for (var key in o) {
            traverse(p + "." + key, o[key], linearArr)
        }
    } else {
        linearArr.push(p + "." + o);
    }
}

function addButton(parentDiv) {
    let button = document.createElement("button");
    button.className = "dynamic-button";
    button.innerHTML = "Regenerate Geometry";
    button.addEventListener('click',
        function () {
            regen3d(elemsArr)
        }, false);
    parentDiv.appendChild(button);
}