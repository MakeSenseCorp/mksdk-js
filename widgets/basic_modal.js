function MksBasicModal () {
	self = this;
	
	this.BasicModalContainer = `
		<div class="modal fade [SIZE]" id="id-basic-modal" tabindex="-1" role="dialog" aria-labelledby="id-basic-modalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="id-basic-modalLabel">Title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="id_basic_modal_content" class="modal-body"> </div>
					<div id="id_basic_modal_footer" class="modal-footer"></div>
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

MksBasicModal.prototype.Populate = function (size) {
	var obj = document.getElementById("id-basic-modal");
	if (obj === undefined) {
		return;
	}
	
	var html = this.BasicModalContainer;
	switch(size) {
		case "lg": {
			html = html.split("[SIZE]").join(bd-example-modal-lg);
		}
		break;
		default: {
			html = html.split("[SIZE]").join(bd-example-modal-lg);
		}
		break;
	}
	
	var elem = document.createElement('div');
	elem.innerHTML = html;
	document.body.appendChild(elem);
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

MksBasicModal.prototype.Show = function (html) {
	$('#id-basic-modal').modal('show');
}

MksBasicModal.prototype.Hide = function (html) {
	$('#id-basic-modal').modal('hide');
}

