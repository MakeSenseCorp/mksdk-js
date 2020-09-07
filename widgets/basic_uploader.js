function MksBasicUploader () {
	self = this;
	
	this.BasicUploaderContainer = `
		<ul class="nav nav-tabs" id="myTab" role="tablist">
			<li class="nav-item waves-effect waves-light">
				<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">File</a>
			</li>
			<li class="nav-item waves-effect waves-light">
				<a class="nav-link active" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="true">Git</a>
			</li>
		</ul>
		<div class="tab-content" id="myTabContent">
			<div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
				<div class="row">
					<div class="col-lg-12">
						<div class="card">
							<div class="card-body">
								<form>
									<div class="form-group">
										<label for="id_package_path">Please select package (ZIP File)</label>
										<input type="file" class="form-control-file" id="id_package_path">
									</div>
								</form>
								<button type="button" id="id_install_button" class="btn btn-primary" onclick="OnInstallClick();">Install</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade active show" id="contact" role="tabpanel" aria-labelledby="contact-tab">
				<div class="row">
					<div class="col-lg-12">
						<div class="card">
							<div class="card-body">
								<h6 class="d-flex justify-content-between align-items-center mb-3">
									<span class="text-muted">Nodes List</span>
									<span class="badge badge-secondary badge-pill" id="id_git_packages_count">0</span>
								</h6>
								<div id="id_git_packages"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row d-none" id="id_progress">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<div class="progress">
							<div id="id_progress_bar" class="progress-bar progress-bar-striped" style="min-width: 20px;"></div>
						</div>
						<div>
							<span class="text-muted" id="id_progress_item">0%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	
	return this;
}

MksBasicModal.prototype.Populate = function (obj) {
	obj.innerHTML = this.BasicUploaderContainer;
}

MksBasicUploader.prototype.Upload = function () {
	
}