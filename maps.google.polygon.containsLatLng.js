// Ray Cast Point in Polygon extension for Google Maps GPolygon
// App Delegate Inc <htttp://appdelegateinc.com> 2010

GPolygon.prototype.containsLatLng = function(latLng) {
	// Exclude points outside of bounds as there is no way they are in the poly
	var bounds = this.getBounds();
	
	if(bounds != null && !bounds.containsLatLng(latLng)) {
		return false;
	}
	
	// Raycast point in polygon method
	var numPoints = this.getVertexCount();
	var inPoly = false;
	var i;
	var j = numPoints-1;
	
	for(var i=0; i < numPoints; i++) { 
		var vertex1 = this.getVertex(i);
		var vertex2 = this.getVertex(j);
		
		if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng())	 {
			if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
				inPoly = !inPoly;
			}
		}
		
		j = i;
	}
	
	return inPoly;
};