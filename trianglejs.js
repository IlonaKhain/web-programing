function Triangle(edge1, edge2) {
	this.edge1 = edge1 == undefined ? 0.0 : edge1;
	this.edge2 = edge2 == undefined ? 0.0 : edge2;
	
	this.hypotenuse = function(){
		var temp = Math.sqrt((this.edge1*this.edge1)+(this.edge2*this.edge2));
		return temp;
	};
	this.semiperimeter = function() {
		return (this.edge1 + this.edge2 + this.hypotenuse())/2;
	};
	this.CircumcircleRadius= function(){
		return this.hypotenuse()/2;
	};
	this.Angle1= function(){
		return 90;
	};
	this.Angle2= function(){
		var temp = Math.atan(this.edge1 / this.edge2);
		return (temp*180)/Math.PI;
		
	};
	this.Angle3 = function() {
		return (90 - this.Angle2());
	};
	/*this.EdgeSizeUp=function (rowindex, percent, edge)  {
		if (edge == 1){return this.edge1 +( this.edge1 *this.percent / 100);}
		if (edge ==2){ return this.edge2 + (this.edge2 *this.percent / 100); }
	};*/
	/*this.EdgeSizeDown=function (percent, edge)  {
		if (edge == 1){return this.edge1 -( this.edge1 *this.percent / 100);}
		if (edge ==2){ return this.edge2 - (this.edge2 *this.percent / 100); }
	};*/

}

function getRandom() {
	return Math.round(Math.random()*100)+1;
}


function TriangleView(edge1, edge2) {
	Triangle.call(this, edge1, edge2);

	this.createOperationView = function(rowIndex, text, func) {
		var view = document.createDocumentFragment();
		
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode(text));
		deleteButton.addEventListener("click", func);
		view.appendChild(deleteButton);
		return view;
		
	}
			
	this.makeUL=function (a1, a2, a3) {
    // Create the list element:
    var array=[a1,a2,a3];
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
	}
	
	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var tdNumber = document.createElement('td');
	    tdNumber.appendChild(document.createTextNode('#' + rowIndex));
		tr.appendChild(tdNumber);

	    var tdEdge1 = document.createElement('td');
	    tdEdge1.appendChild(document.createTextNode(this.edge1));
	    tr.appendChild(tdEdge1);
	    
	    var tdEdge2 = document.createElement('td');
	    tdEdge2.appendChild(document.createTextNode(this.edge2));
		tr.appendChild(tdEdge2);

		var tdSemiper = document.createElement('td');
	    //td4.appendChild(document.createTextNode(this.hypotenuse()));
	     tdSemiper.appendChild(document.createTextNode(this.semiperimeter()));
		tr.appendChild(tdSemiper);

		var tdEdgeUp = document.createElement('td');
		var edge = document.getElementById("edge").value;
		var percent = document.getElementById("percent").value;
	    tdEdgeUp.appendChild(this.createOperationView(rowIndex, "Increase", function(){
	    	data.EdgeSizeUp(rowIndex, percent, edge);
	    } ));
		tr.appendChild(tdEdgeUp);

		var tdEdgeDown = document.createElement('td');
		var edge = document.getElementById("edge").value;
		var percent = document.getElementById("percent").value;
	    tdEdgeDown.appendChild(this.createOperationView(rowIndex, 'Decrease', function(){
	    	data.EdgeSizeDown(rowIndex,percent, edge);
	    }));
		tr.appendChild(tdEdgeDown);

		var tdRadius = document.createElement('td');
	   tdRadius.appendChild(document.createTextNode(this.CircumcircleRadius()));
		tr.appendChild(tdRadius);

		var tdAngle = document.createElement('td');
	   //tdAngle.appendChild(document.createTextNode(this.Angle1()));
	   tdAngle.appendChild(this.makeUL(this.Angle1(), this.Angle2(), this.Angle3()));
		tr.appendChild(tdAngle);
		
		var tdOperations = document.createElement('td');
	    tdOperations.appendChild(this.createOperationView(rowIndex, 'Delete', function(){
	    	data.deleteTriangle(rowIndex);
	    }));
		tr.appendChild(tdOperations);

		return tr;
	}
}




var data = {
	triangles : [
		new TriangleView(1,2),
		new TriangleView(3,4),
		new TriangleView(10,10)
	],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(a, b) {
		this.triangles.push(new TriangleView(a, b));
		this.refreshTable();
	},

	addRandom : function() {
		this.add(getRandom(), getRandom(), getRandom());
	},
	addPersonalTriangle : function(a, b) {
		this.triangles.push(new TriangleView(parseFloat(document.getElementById("Sizeedge1").value), parseFloat(document.getElementById("Sizeedge2").value)));
		this.refreshTable();
	},

	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	},

	EdgeSizeDown : function(rowIndex, percent, edge){
		 if (edge==1){this.triangles[rowIndex].edge1=this.triangles[rowIndex].edge1-(this.triangles[rowIndex].edge1*percent/100);}
		 if (edge==2){this.triangles[rowIndex].edge2=this.triangles[rowIndex].edge2-(this.triangles[rowIndex].edge2*percent/100);}
		this.refreshTable();
		
	},

	EdgeSizeUp : function(rowIndex, percent, edge){
		 if (edge==1){this.triangles[rowIndex].edge1=this.triangles[rowIndex].edge1+(this.triangles[rowIndex].edge1*percent/100);}
		 if (edge==2){this.triangles[rowIndex].edge2=this.triangles[rowIndex].edge2+(this.triangles[rowIndex].edge2*percent/100);}
		this.refreshTable();
		
	}
}
