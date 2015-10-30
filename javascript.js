//
//
//	config
	object_name = "type";
	// input fields
	main_child_name = "Objeto";
	add_subchild = "+ Parametros";
	remove_main_child = "Remover Objeto";
	value_name = "parametro";
	remove_subchild = "- Objeto";
	who_split = " ";
	spliter = ", ";
//
//
//	globals
	object_child = -1;
	child_parameter = new Array(1);
//	endglobals

window.onload=function() {
	new_child() ;
}

function new_child() {

	object_child++ ;
	child_parameter[object_child] = -1 ;
	//	interface
	
	var form = document.getElementById("form") ;
	var ul = document.createElement("ul") ;
	ul.id = "x"+object_child ;
	form.appendChild(ul) ;
	ul.innerHTML = '<span id="x'+object_child+'n" type="text">'+main_child_name+' '+object_child+'</span><input onclick="add_parameter( parseInt( this.parentNode.id.substring( 1, id.lenght) ) ) '+/*
	*/'" type="button" value="'+add_subchild+'"><input onclick="remove_child(this.parentNode.id.substring( 1, id.lenght) )" type="button" value="'+remove_subchild+'"><br>' ;
	add_parameter(object_child) ;
	addtype( object_child );
	
}

function remove_child( index ) {

	if ( object_child > 0 ) {

		var y = document.getElementById("x"+index) ;
		y.parentNode.removeChild(y) ;

		if ( index != object_child ) {

			for ( var i = parseInt(index)+1; i < object_child+1; i++ ) {
				
				var newid = i-1 ;
				document.getElementById("x"+i).id = "x"+newid ;
				child_parameter[newid] = child_parameter[i] ;
				document.getElementById("x"+i+"n").id = "x"+newid+"n" ;
				document.getElementById("x"+newid+"n").innerHTML = "Objeto "+newid;
				
				for ( var z = 0; z < child_parameter[i]+1; z++ ) {
				
					document.getElementById("x"+i+"y"+z).id = "x"+newid+"y"+z ;
					document.getElementById("x"+i+"y"+z+"n").id = "x"+newid+"y"+z+"n" ;			
					document.getElementById("x"+i+"y"+z+"v").id = "x"+newid+"y"+z+"v" ;
					
				}
//				alert("indice "+i+" movido para indice "+Math.max(0,i-1))
			}
		}

		object_child -- ;

	}else{
	alert("Você precissa ter pelo menos um "+main_child_name+"!");
	}
	
}

function add_parameter( index ) {
	child_parameter[index] ++ ;
	// gerar interface
	// adicionar formularios dentro de li com id numérica de 0 a quantidade de childs

	var li = document.createElement("li") ;
	var id = "x"+index+"y"+child_parameter[index] ;
	li.id = id ;
	document.getElementById("x"+index).appendChild(li) ;
	li.innerHTML = value_name+'<input id="'+id+'n" type="text"> valor:<input id="'+id+'v" type="text"><input style="width: 80px !important;" onclick="remove_parameter(this.parentNode.parentNode.id.substring(1, id.lenght), this.parentNode.id)"'+/*
*/' type="button" value="'+remove_subchild+'"><br>' ;
}


function remove_parameter( indexx, indexy ) {
	if ( child_parameter[indexx] > 0 ) { 				// se a quantidade de childs do objeto for maior que 1
	
		indexy = parseInt(indexy.replace( "x"+indexx+"y" , ""));
		var x = document.getElementById("x"+indexx+"y"+indexy) ;
		x.parentNode.removeChild(x) ;
		
		if ( indexy != child_parameter[indexx] ) {
			// move os indices das próximas childs para o indice anterior , "recicla" child removida
		
			for ( var i = indexy+1; i < child_parameter[indexx]+1; i++ ) {			// repete para todas as childs a partir da child removida
				// definir id da matéria atual"[i]" igual a i-1
				
				var newid = i-1
				document.getElementById("x"+indexx+"y"+i).id = "x"+indexx+"y"+newid ;
				document.getElementById("x"+indexx+"y"+i+"n").id = "x"+indexx+"y"+newid+"n";
				document.getElementById("x"+indexx+"y"+i+"v").id = "x"+indexx+"y"+newid+"v";
				
			}
		}

		child_parameter[indexx]--;
		
	}else{
	alert("Você precissa ter pelo menos um "+value_name+"!");
	}
	
}


// \n

function gerar() {
	
		var finalstring = "";
		var result = document.getElementById("tab") ;
		result.innerHTML = "" ;
		
	for ( var i = 0; i < object_child+1; i++ ) {
		
		finalstring += object_name+"["+i+"] = {";

		for ( var z = 0; z < child_parameter[i]+1; z++ ) {
			
			finalstring += " "+document.getElementById("x"+i+"y"+z+"n").value+': "';
			var split = document.getElementById("x"+i+"y"+z+"v").value.split(who_split);

			for ( var s = 0; s < split.length; s++ ){
				
				if ( s == split.length-1 ){
					finalstring += split[s]+'"';
				}else{
					finalstring += split[s]+spliter;
				}
			
			}
			
		}
		
		finalstring += " };<br>"
		
	}
		
	result.innerHTML = finalstring;

}

function addtype( who ){
	
	for ( var i = 0; i < 8; i++ ){
	
		add_parameter( who );
		
	}
	
	document.getElementById("x"+who+"y0n").value = "name";
	document.getElementById("x"+who+"y1n").value = "color";
	document.getElementById("x"+who+"y2n").value = "strong";
	document.getElementById("x"+who+"y3n").value = "resisted";
	document.getElementById("x"+who+"y4n").value = "imunityby";
	document.getElementById("x"+who+"y5n").value = "resist";
	document.getElementById("x"+who+"y6n").value = "weak";
	document.getElementById("x"+who+"y7n").value = "imunity";
	document.getElementById("x"+who+"y8n").value = "damage";

}

