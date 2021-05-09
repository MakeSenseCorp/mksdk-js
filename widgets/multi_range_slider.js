function MksMultiRangeSlider (conf) {
	self = this;

    this.WorkingObject      = null;
    this.Content            = `
        <div class="row justify-content-xl-center">
            <div class="col-xl-2">
                <span id="[HOST_ID]_range_left">[MIN]</span>
            </div>
            <div class="col-xl-8">
                <input id="[HOST_ID]_range_object" type="text" data-slider-min="[MIN]" data-slider-max="[MAX]" data-slider-step="[STEP]" data-slider-value="[[LEFT],[RIGHT]]"/>
            </div>
            <div class="col-xl-2">
                <span id="[HOST_ID]_range_right">[MAX]</span>
            </div>
        </div>
    `;
    this.Config             = conf;
    this.SliderObject       = null;
    this.SliderObjectLeft   = null;
    this.SliderObjectRight  = null;
    this.Slider             = null;
    this.LeftValue          = 0;
    this.RightValue         = 0;
	
	return this;
}

MksMultiRangeSlider.prototype.GetValue = function () {
    var resp = [];
    resp.push(this.LeftValue);
    resp.push(this.RightValue);
    return resp;
}

MksMultiRangeSlider.prototype.Build = function (obj) {
    this.WorkingObject = obj;
    var html = this.Content;

    var HostingId = this.WorkingObject.id;
    html = html.split("[HOST_ID]").join(HostingId);
    html = html.split("[MIN]").join(this.Config.min);
    html = html.split("[MAX]").join(this.Config.max);
    html = html.split("[STEP]").join(this.Config.step);
    html = html.split("[LEFT]").join(this.Config.left);
    html = html.split("[RIGHT]").join(this.Config.right);
    obj.innerHTML = html;

    this.LeftValue  = this.Config.left;
    this.RightValue = this.Config.right;

    this.SliderObjectLeft   = document.getElementById(HostingId+"_range_left");
    this.SliderObject       = document.getElementById(HostingId+"_range_object");
    this.SliderObjectRight  = document.getElementById(HostingId+"_range_right");

    this.Slider = new Slider("#"+HostingId+"_range_object", {
        tooltip: 'always'
    });

    var self = this;
    this.Slider.on("change", function(e) {
        self.SliderObjectLeft.innerHTML  = e.newValue[0];
        self.SliderObjectRight.innerHTML = e.newValue[1];
        self.LeftValue  = e.newValue[0];
        self.RightValue = e.newValue[1];
    });
}

MksMultiRangeSlider.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}