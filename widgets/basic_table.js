function MksBasicTable () {
	self = this;

    this.WorkingObject  = null;
    this.Head           = "";
    this.Body           = "";
    this.Content        = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        [HEAD]
                    </tr>
                </thead>
                <tbody>
                    [BODY]
                </tbody>
            </table>
        </div>
    `;
	
	return this;
}

MksBasicModal.prototype.SetSchema = function (schema) {
    this.Head = "";
    for (idx = 0; idx < schema.length; idx++) {
        this.Head += "<th>" + schema[idx] + "</th>";
    }
}

MksBasicModal.prototype.SetData = function (data) {
	this.Body = "";
    for (idx = 0; idx < data.length; idx++) {
        this.Head += "<tr>";
        for (ydx = 0; ydx < data[idx].length; ydx++) {
            this.Head += "<td>" + data[idx][ydx] + "</td>";
        }
        this.Head += "</tr>";
    }
}

MksBasicModal.prototype.Build = function (obj) {
    this.WorkingObject = obj;
    var html = this.Content;
    html = html.split("[HEAD]").join(this.Head);
    html = html.split("[BODY]").join(this.Body);
    obj.innerHTML = html;
}

MksBasicModal.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}