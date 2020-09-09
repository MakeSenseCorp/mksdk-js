function MksBasicTable () {
	self = this;

    this.WorkingObject  = null;
    this.Head           = "";
    this.Body           = "";
    this.Content        = `
        <div class="table-responsive">
            <table class="table table-sm table-striped table-hover">
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

MksBasicTable.prototype.SetSchema = function (schema) {
    this.Head = "";
    for (idx = 0; idx < schema.length; idx++) {
        this.Head += "<th scope='col'>" + schema[idx] + "</th>";
    }
}

MksBasicTable.prototype.SetData = function (data) {
	this.Body = "";
    for (idx = 0; idx < data.length; idx++) {
        this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        for (ydx = 0; ydx < data[idx].length; ydx++) {
            this.Body += "<td>" + data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
}

MksBasicTable.prototype.Build = function (obj) {
    this.WorkingObject = obj;
    var html = this.Content;
    html = html.split("[HEAD]").join(this.Head);
    html = html.split("[BODY]").join(this.Body);
    obj.innerHTML = html;
}

MksBasicTable.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}