function MksBasicTable () {
	self = this;

    this.WorkingObject  = null;
    this.Head           = "";
    this.Body           = "";
    this.Content        = `
        <div class="table-responsive">
            <table class="table table-sm [STRIPED] table-hover">
                <thead>
                    <tr>
                        [HEAD]
                    </tr>
                </thead>
                <tbody id="[HOST_ID]_baisc_table_body">
                    [BODY]
                </tbody>
            </table>
        </div>
        <div class="row" id="[HOST_ID]_baisc_table_listing">
            <div class="col-lg-1 text-center"></div>
            <div class="col-lg-3 text-center" id="[HOST_ID]_baisc_table_listing_first"></div>
            <div class="col-lg-2 text-center" id="[HOST_ID]_baisc_table_listing_left"></div>
            <div class="col-lg-2 text-center" id="[HOST_ID]_baisc_table_listing_right"></div>
            <div class="col-lg-3 text-center" id="[HOST_ID]_baisc_table_listing_last"></div>
            <div class="col-lg-1 text-center"></div>
        </div>
    `;
	this.Striped    = false;
    this.RowsNumber = false;
    this.HeaderShow = true;
    this.Listing    = false;
    this.Window     = 30;
    this.Slice      = 1;
    this.Data       = null;

    this.UIChangeEvent = null;
	
	return this;
}

MksBasicTable.prototype.RegisterUIChangeEvent = function(callback) {
    this.UIChangeEvent = callback;
}

MksBasicTable.prototype.EnableListing = function () {
	this.Listing = true;
}

MksBasicTable.prototype.SetListingWindowSize = function (value) {
	this.Window = value;
}

MksBasicTable.prototype.SetStriped = function () {
	this.Striped = true;
}

MksBasicTable.prototype.ShowRowNumber = function (value) {
	this.RowsNumber = value;
}

MksBasicTable.prototype.ShowHeader = function (value) {
	this.HeaderShow = value;
}

MksBasicTable.prototype.SetSchema = function (schema) {
    this.Head = "";
    for (idx = 0; idx < schema.length; idx++) {
        this.Head += "<th scope='col'>" + schema[idx] + "</th>";
    }
}

MksBasicTable.prototype.SetData = function (data) {
	this.Body = "";

    var length = data.length;
    if (this.Listing == true) {
        if (length > this.Window) {
            length = this.Window;
            this.Data = data;
        }
    } 

    for (idx = 0; idx < length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < data[idx].length; ydx++) {
            this.Body += "<td>" + data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
}

MksBasicTable.prototype.AppendSummary = function (data) {
    this.Body += "<tr class='table-dark'>";
    for (idx = 0; idx < data.length; idx++) {
        this.Body += "<td>"+data[idx]+"</td>";
    } this.Body += "</tr>";
}

MksBasicTable.prototype.LeftClick = function () {
    this.Body = "";

    var start_length = 0;
    var end_length   = 0;
    if (this.Slice == 1) {
        start_length = 0;
        end_length   = this.Window;
    } else {
        start_length = (this.Slice - 2) * this.Window;
        end_length   = (this.Slice - 1) * this.Window;
        this.Slice -= 1;
    }

    for (idx = start_length; idx < end_length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
    document.getElementById(this.WorkingObject.id+"_baisc_table_body").innerHTML = this.Body;

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

MksBasicTable.prototype.RighClick = function () {
    this.Body = "";

    var start_length = 0;
    var end_length   = 0;
    if ((this.Slice + 1) * this.Window < this.Data.length) {
        start_length = this.Slice * this.Window;
        end_length   = (this.Slice + 1) * this.Window;
        this.Slice += 1;
    } else {
        start_length = this.Slice * this.Window;
        end_length   = this.Data.length;
    }

    for (idx = start_length; idx < end_length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
    document.getElementById(this.WorkingObject.id+"_baisc_table_body").innerHTML = this.Body;

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

MksBasicTable.prototype.FirstClick = function () {
    console.log("FirstClick",this.Data.length);
}

MksBasicTable.prototype.LastClick = function () {
    console.log("LastClick",this.Data.length);
}

MksBasicTable.prototype.Build = function (obj) {
    this.WorkingObject = obj;
    var html = this.Content;

    var HostingId = this.WorkingObject.id;
    html = html.split("[HOST_ID]").join(HostingId);
	
	if (this.Striped == true) {
		html = html.split("[STRIPED]").join("table-striped");
	} else {
		html = html.split("[STRIPED]").join('');
	}
	
    if (this.HeaderShow == true) {
        html = html.split("[HEAD]").join(this.Head);
    } else {
        html = html.split("[HEAD]").join("");
    }
    
    html = html.split("[BODY]").join(this.Body);
    obj.innerHTML = html;
    console.log(HostingId);

    if (this.Listing == false) {
        document.getElementById(HostingId+"_baisc_table_listing").classList.add("d-none");
    } else {
        this.objLeft = document.createElement("span");
        this.objLeft.style.color = "blue";
        this.objLeft.style.cursor = "pointer";
        this.objLeft.innerHTML = "<<";
        this.objLeft.onclick = this.LeftClick.bind(this);

        this.objRight = document.createElement("span");
        this.objRight.style.color = "blue";
        this.objRight.style.cursor = "pointer";
        this.objRight.innerHTML = ">>";
        this.objRight.onclick = this.RighClick.bind(this);

        this.objFirst = document.createElement("span");
        this.objFirst.style.color = "blue";
        this.objFirst.style.cursor = "pointer";
        this.objFirst.innerHTML = "First";
        this.objFirst.onclick = this.FirstClick.bind(this);

        this.objLast = document.createElement("span");
        this.objLast.style.color = "blue";
        this.objLast.style.cursor = "pointer";
        this.objLast.innerHTML = "Last";
        this.objLast.onclick = this.LastClick.bind(this);

        document.getElementById(HostingId+"_baisc_table_listing_left").appendChild(this.objLeft);
        document.getElementById(HostingId+"_baisc_table_listing_right").appendChild(this.objRight);
        document.getElementById(HostingId+"_baisc_table_listing_first").appendChild(this.objFirst);
        document.getElementById(HostingId+"_baisc_table_listing_last").appendChild(this.objLast);
        document.getElementById(HostingId+"_baisc_table_listing").classList.remove("d-none");
    }
}

MksBasicTable.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}