function MkSAPI (key) {
	self = this;
	
	this.Key		= key;
	this.Gateway 	= null;
	this.Webface 	= MkSWebfaceBuilder.GetInstance();
	this.Database 	= null;
	this.NodeWS 	= null
	this.UUID 		= "";

	this.ModulesLoadedCallback = null;
	this.OnNodeChangeCallback = null;
	this.IsLocalWSEnabled = false;

	// Monitoring
	this.CallbacksMonitorId	= 0;

	// Callback management
	this.Callbacks 			= {};
	this.PacketCounter		= 1;
	this.SentPackets 		= [];
	
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

	console.log("LOCAL WEBSOCKET", url);

	this.NodeWS = new WebSocket(url);
	this.NodeWS.UUID = uuid;
	this.NodeWS.onopen = function () {
		self.IsLocalWSEnabled = true;
		console.log("LOCAL WEBSOCKET > CREATED", url);
		callback();
	};
	this.NodeWS.onmessage = function (event) {
		var jsonData = JSON.parse(event.data);
		// console.log("LOCAL WEBSOCKET > DATA", jsonData);
		if ("GATEWAY" == jsonData.header.source) {
		} else {
			// console.log("[LOCAL #2] Identifier #", jsonData.piggybag.identifier, "recieved.", jsonData.data.header.command);
			if (self.Callbacks[jsonData.piggybag.identifier]) {
				handler = self.Callbacks[jsonData.piggybag.identifier];
				handler.callback(jsonData, {error: "none"});

				// console.log("[LOCAL #2] Delete Identifier #", jsonData.piggybag.identifier);	
				delete self.Callbacks[jsonData.piggybag.identifier];
			} else {
				if (jsonData.piggybag.identifier == -1) {
					if (null != self.OnNodeChangeCallback) {
						self.OnNodeChangeCallback(jsonData);
					}
				} else {
				}
			}
		}
		
	}
	this.NodeWS.onerror = function (event) {
		console.log("[ERROR] Websocket", event.data);
	}
	this.NodeWS.onclose = function () {
		console.log("[LOCAL WEBSOCKET] Connection closed...");
		self.IsLocalWSEnabled = false;
	};
}

MkSAPI.prototype.CallbacksMonitor = function () {
	// console.log("(CallbacksMonitor)");
	if (0 == Object.keys(this.Callbacks).length) {
		//console.log("(CallbacksMonitor) Callbacks list empty");
		clearInterval(this.CallbacksMonitorId);
		this.CallbacksMonitorId	= 0;
	} else {
		for (key in this.Callbacks) {
			if (this.Callbacks.hasOwnProperty(key)) {
				item = this.Callbacks[key];
				
				if (item.timeout_counter > item.timeout) {
					try {
						item.callback(null, {error: "timeout"});
					}
					catch (e) {
						console.log("[ERROR] (CallbacksMonitor)", e.message);
					}
					
					delete this.Callbacks[key];
					// console.log(Object.keys(this.Callbacks).length);
				} else {
					item.timeout_counter++;
					// console.log(item.timeout_counter, item.timeout);
				}
			}
		}
	}
}

MkSAPI.prototype.SendPacket = function (type, dest_uuid, cmd, payload, additional, callback) {
	if (this.IsLocalWSEnabled == false || dest_uuid != this.NodeWS.UUID) {
		// console.log("GATEWAY SEND");
		this.Gateway.Send(type, dest_uuid, cmd, payload, additional, callback);
	} else {
		// console.log("LOCAL WEBSOCKET SEND");
		if ("" == additional) {
			additional = {};
		}
		
		if ("" == payload) {
			payload = {};
		}

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
				identifier: this.PacketCounter
			},
			stamping: []
		}

		this.Callbacks[this.PacketCounter] = { 
			callback: callback,
			timeout_counter: 0,
			timeout: 10
		 };

		this.PacketCounter++;
		if (this.PacketCounter < 1) {
			this.PacketCounter = 0;
		}

		this.NodeWS.send(JSON.stringify(request));

		if (!this.CallbacksMonitorId) {
			this.CallbacksMonitorId = setInterval(this.CallbacksMonitor.bind(this), 1000);
		}
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

MkSAPI.prototype.SetNodeUUID = function (uuid) {
	this.UUID = uuid;
}

MkSAPI.prototype.LoadModule = function(name) {
	var self = this;
	this.GetFileContent(this.UUID, {
		"file_path": "modules/js/"+name
	}, function(res) {
		var payload = res.data.payload;
		var js = MkSGlobal.ConvertHEXtoString(payload.content);
		// Inject into DOM
		MkSGlobal.ExecuteJS(js);
		window.MKSModulesCount--;
		console.log(window.MKSModulesCount);
		if (window.MKSModulesCount == 0) {
			if (self.ModulesLoadedCallback != null) {
				self.ModulesLoadedCallback();
			}
		}
	});
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
