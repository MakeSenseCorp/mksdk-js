function MksBasicModal () {
	self = this;
	
	this.BasicModalContainer = `
		<div class="modal fade [SIZE]" id="id-basic-modal" tabindex="-1" role="dialog" aria-labelledby="id-basic-modalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="id-basic-modalLabel">[TITLE]</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="id_basic_modal_content" class="modal-body">[CONTENT]</div>
					<div id="id_basic_modal_footer" class="modal-footer">[FOOTER]</div>
				</div>
			</div>
		</div>
	`;
	this.BasicTitle = "Baisc Modal";
	this.BasicModalContent = `
	`;
	this.BasicModalFooter = `
		<h6 class="d-flex justify-content-between align-items-center mb-3">
			<span class="text-muted"><a href="#" onclick="$('#id-basic-modal').modal('hide');">Close</a></span>
		</h6>
	`;
	
	return this;
}

MksBasicModal.prototype.Build = function (modal_size) {
	var obj = document.getElementById("id-basic-modal");
	if (obj !== undefined && obj !== null) {
		return;
	}
	
	// Update modal UI objects
	var html = this.BasicModalContainer;
	switch(modal_size) {
		case "lg": {
			html = html.split("[SIZE]").join("bd-example-modal-lg");
		}
		break;
		default: {
			html = html.split("[SIZE]").join("bd-example-modal-lg");
		}
		break;
	}
	html = html.split("[CONTENT]").join(this.BasicModalContent);
	html = html.split("[FOOTER]").join(this.BasicModalFooter);
	html = html.split("[TITLE]").join(this.BasicTitle);
	// Create modal in DOM
	var elem = document.createElement('div');
	elem.innerHTML = html;
	document.body.appendChild(elem);	
}

MksBasicModal.prototype.Remove = function () {
	var obj = document.getElementById("id-basic-modal");
	if (obj !== null) {
		this.Hide();
		obj.parentNode.removeChild(obj);
	}
}

MksBasicModal.prototype.SetTitle = function (title) {
	this.BasicTitle = title;
}

MksBasicModal.prototype.SetContent = function (html) {
	this.BasicModalContent = html;
}

MksBasicModal.prototype.SetFooter = function (html) {
	this.BasicModalFooter = html;
}

MksBasicModal.prototype.UpdateFooter = function (html) {
	this.BasicModalFooter = html;
	document.getElementById("id_basic_modal_content").innerHTML = this.BasicModalFooter;
}

MksBasicModal.prototype.SetDefaultFooter = function () {
	this.BasicModalFooter = `
		<h6 class="d-flex justify-content-between align-items-center mb-3">
			<span class="text-muted"><a href="#" onclick="$('#id-basic-modal').modal('hide');">Close</a></span>
		</h6>
	`;
	var obj = document.getElementById("id_basic_modal_footer");
	if (obj !== null) {
		obj.innerHTML = this.BasicModalFooter;
	}
}

MksBasicModal.prototype.Show = function () {
	$('#id-basic-modal').modal('show');
}

MksBasicModal.prototype.Hide = function () {
	$('#id-basic-modal').modal('hide');
}

