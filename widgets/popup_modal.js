function MksPopupModal (name) {
	self = this;
  this.Name = name;
  
  this.CSS = `
    .popup-modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    
    .popup-modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }
    
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  `;
	this.BasicModalContainer = `
	`;
  this.BasicModalContent = `
    <div id="w_id_popup_module_[NAME]" class="modal">
      <div class="popup-modal-content">
        <span class="close">&times;</span>
        <div id="w_id_popup_module_content_[NAME]">[CONTENT]</div>
      </div>
    </div>
	`;
	
	return this;
}

MksPopupModal.prototype.Build = function (modal_size) {
	var obj = document.getElementById("id_basic_modal_"+this.Name);
	if (obj !== undefined && obj !== null) {
		return;
	}
	
	// Update modal UI objects
	var html = this.BasicModalContainer;
	html = html.split("[SIZE]").join(modal_size);
	html = html.split("[CONTENT]").join(this.BasicModalContent);
	html = html.split("[FOOTER]").join(this.BasicModalFooter);
	html = html.split("[NAME]").join(this.Name);
	// Create modal in DOM
	var elem = document.createElement('div');
	elem.innerHTML = html;
	document.body.appendChild(elem);	
}

MksPopupModal.prototype.Remove = function () {
	var obj = document.getElementById("id_basic_modal_"+this.Name);
	if (obj !== null) {
		this.Hide();
		obj.parentNode.removeChild(obj);
	}
}

MksPopupModal.prototype.SetContent = function (html) {
	this.BasicModalContent = html;
}

MksPopupModal.prototype.Show = function () {
	$('#id_basic_modal_'+this.Name).modal('show');
}

MksPopupModal.prototype.Hide = function () {
	$('#id_basic_modal_'+this.Name).modal('hide');
}

`
<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>
`