function MkSAPI (key) {
	self = this;
	
	this.Key		= key;
	this.Gateway 	= null;
	this.Webface 	= MkSWebfaceBuilder.GetInstance();
	this.Database 	= null;
	this.NodeWS 	= null

	this.OnNodeChangeCallback = null;
	this.IsLocalWSEnabled = false;
	
	return this;
}

MkSAPI.prototype.SetUserKey = function (key) {
	this.Key = key;
}

MkSAPI.prototype.ConnectGateway = function (callback) {
	this.Gateway = MkSGatewayBuilder.GetInstance(this.Key);
	this.Gateway.OnNodeChangeEvent = this.OnNodeChangeCallback;
	if (!this.Gateway.IsConnected()) {
		this.Gateway.Connect(callback);
	} else {
		callback();
	}
}

MkSAPI.prototype.ConnectLocalWS = function (uuid, callback) {
	var self = this;
	var url	= "ws://" + MkSGlobal.MakeSenseLocalWebsockIP;
	url = url.concat(":", MkSGlobal.MakeSenseLocalWebsockPort);

	this.NodeWS = new WebSocket(url, ['echo-protocol']);
	this.NodeWS.UUID = uuid;
	this.NodeWS.onopen = function () {
		self.IsLocalWSEnabled = true;
		callback();
	};
	this.NodeWS.onmessage = function (event) {
		var jsonData = JSON.parse(event.data);
		if (null != self.OnNodeChangeCallback) {
			self.OnNodeChangeCallback(jsonData);
		}
	}
	this.NodeWS.onerror = function (event) {
		console.log("[ERROR] Websocket", event.data);
	}
	this.NodeWS.onclose = function () {
		console.log("Connection closed...");
		self.IsLocalWSEnabled = false;
	};
}

MkSAPI.prototype.SendPacket = function (type, dest_uuid, cmd, payload, additional, callback) {
	if (this.IsLocalWSEnabled == false) {
		this.Gateway.Send(type, dest_uuid, cmd, payload, additional, callback);
	} else {
		request = {
			header: {
				message_type: type,
				destination: dest_uuid,
				source: "WEBFACE",
				direction: "request"
			},
			data: {
				header: {
					command: cmd,
					timestamp: Date.now()
				},
				payload: payload
			},
			user: {
				key: this.Key
			},
			additional: additional,
			piggybag: {
				identifier: 0
			},
			stamping: []
		}
		this.NodeWS.send(JSON.stringify(request));
	}
}

MkSAPI.prototype.GetNodeInfo = function (uuid, callback) {
	this.SendPacket("DIRECT", uuid, "get_node_info", "", "", callback);
}

MkSAPI.prototype.GetNodeSensorsInfo = function (uuid, callback) {
	this.SendPacket("DIRECT", uuid, "get_sensor_info", "", "", callback);
}

MkSAPI.prototype.SetNodeSensorsInfo = function (uuid, sensors, callback) {
	this.SendPacket("DIRECT", uuid, "set_sensor_info", sensors, "", callback);
}

MkSAPI.prototype.GetFileContent = function (uuid, payload, callback) {
	this.SendPacket("DIRECT", uuid, "get_file", payload, "", callback);
}

MkSAPI.prototype.UploadFileContent = function (uuid, payload, callback) {
	this.SendPacket("DIRECT", uuid, "upload_file", payload, "", callback);
}

MkSAPI.prototype.SendCustomCommand = function (uuid, command, payload, callback) {
	this.SendPacket("DIRECT", uuid, command, payload, "", callback);
}

MkSAPI.prototype.RegisterOnNodeChange = function (uuid, callback) {
	this.SendPacket("DIRECT", uuid, "register_on_node_change", {"item_type":2}, "", callback);
}

MkSAPI.prototype.UnregisterOnNodeChange = function (uuid, callback) {
	this.SendPacket("DIRECT", uuid, "unregister_on_node_change", {"item_type":2}, "", callback);
}

MkSAPI.prototype.SetGlobalGatewayIP = function (ip) {
	MkSGlobal.MakeSenseDomain = ip;
}

MkSAPI.prototype.SetLocalWebsockIP = function (ip) {
	MkSGlobal.MakeSenseLocalWebsockIP = ip;
}

MkSAPI.prototype.SetLocalWebsockPort = function (port) {
	MkSGlobal.MakeSenseLocalWebsockPort = port;
}

var MkSAPIBuilder = (function () {
	var Instance;

	function CreateInstance () {
		if (MkSGlobal.CheckUserLocalStorage) {
			return new MkSAPI(MkSGlobal.UserDEVKey);
		} else {
			return null;
		}
	}

	return {
		GetInstance: function () {
			if (!Instance) {
				console.log("Create API instance");
				Instance = CreateInstance();
			}

			console.log("Return API instance");
			return Instance;
		}
	};
})();
