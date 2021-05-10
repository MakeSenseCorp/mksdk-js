function MksBasicDropDown () {
	self = this;

    this.WorkingObject      = null;
    this.Content            = `
        <button class="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" id="[HOST_ID]_content" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span data-feather="calendar"></span>
            <span id="[HOST_ID]_name"></span>
        </button>
        <div class="dropdown-menu text-center" aria-labelledby="[HOST_ID]_content" id="[HOST_ID]_items"></div>
    `;
    this.RowView = `<span class="dropdown-item" style="cursor:pointer" onclick="[ONCLICK_HANDLER]">[NAME]</span>`;
	
	return this;
}

MksBasicDropDown.prototype.UpdateSelected = function (name) {
    var obj = document.getElementById(this.WorkingObject.id + "_name");
    obj.innerHTML = name;
}

MksBasicDropDown.prototype.AppendItem = function (item) {
    var obj = document.getElementById(this.WorkingObject.id + "_items");
    var html = this.RowView;
    html = html.split("[ONCLICK_HANDLER]").join(item.onclick);
    html = html.split("[NAME]").join(item.name);
    obj.innerHTML += html;
}

MksBasicDropDown.prototype.Build = function (obj) {
    this.WorkingObject = obj;
    var html = this.Content;

    var HostingId = this.WorkingObject.id;
    html = html.split("[HOST_ID]").join(HostingId);
    obj.innerHTML = html;
    feather.replace();
}

MksBasicDropDown.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}