
	// GLOBALS
	spliter = ", ";

function findtype( type ){
			
	for( i=0; i<54; i++ ){
		
		var type = pokemon[i].type.split(", ");
		
		if( type[0] == type.id || type[1] == type.id ){
			
			var string
			var pk = document.createElement("tr");
			type.firstChild.appendChild(pk);
			if( type[1] != ""){
				string = '<td style=" padding:0 20px;border: 1px solid #000;border-radius: 10px;" id="'+type[1]+'">'+type[1]+'</td>' ;
			}else {
					string = "";
				}
			pk.innerHTML = '<td><img src="imgs\\P'+i+'.png"></td><td><a href="http://bulbapedia.bulbagarden.net/wiki/'+pokemon[i].name+'_(Pok%C3%A9mon)/Generation_III_learnset#By_leveling_up">'+pokemon[i].name/*
			*/+'</a></td><td style=" padding:0 20px;border: 1px solid #000;border-radius: 10px;" id="'+type[0]+'">'+type[0]+'</td>'+string ;
			type.removeAttribute("onclick");
		}
		
	}
	
}


function hue( string ){
	
	document.getElementById("tst").innerHTML = typeBattleTable( string );
	
}

////////////////////////////////////////////////
/*///////////////Return TYPE Info API//////////////////////*/
////////////////////////////////////////////////

function getTypeIndex( type_name ){

	for ( var i = 0; i < type.length; i++ ){
		
		if ( type_name == type[i].name ){
	
		return i;
		
		}
		
	}
	alert("erro, nome do tipo não existe "+type_name);
	return null;
}

function getColor( type_name ){
	
	return type[getTypeIndex( type_name )].color.split(spliter);
	
}

function getResist( type_name ){

	return type[getTypeIndex( type_name )].resist.split(spliter);

}


function getWeakness( type_name ){

	return type[getTypeIndex( type_name )].weak.split(spliter);

}

function getImunity( type_name ){

	return type[getTypeIndex( type_name )].imunity.split(spliter);

}

function getWeaknessTo( type_name ){
	
	var weaknessList = [];
	
	for ( var i = 0; i < type.length; i++ ){
	
		var s = type[i].weak.split(spliter);

		for ( var x = 0; x < s.length; x++ ){
			
			if ( s[x] == type_name ){
			
				weaknessList[weaknessList.length] = type[i].name;
				
			}
		
		}
	
	}
	
	return weaknessList;
	
}

function getImunityTo( type_name ){
	
	var imunityList = [];
	
	for ( var i = 0; i < type.length; i++ ){
	
		var s = type[i].imunity.split(spliter);

		for ( var x = 0; x < s.length; x++ ){
			
			if ( s[x] == type_name ){
			
				imunityList[imunityList.length] = type[i].name;
				
			}
		
		}
	
	}
	
	return imunityList;
	
}

function getResistTo( type_name ){
	
	var resistList = [];
	
	for ( var i = 0; i < type.length; i++ ){
	
		var s = type[i].resist.split(spliter);

		for ( var x = 0; x < s.length; x++ ){
			
			if ( s[x] == type_name ){
			
				resistList[resistList.length] = type[i].name;
				
			}
		
		}
	
	}
	
	return resistList;
	
}

function isWeak( who, against ){

	var l = getWeaknessTo( who );
	
	for ( var i = 0; i < l.length; i++ ){
	
		if ( l[i] == against ){
			return true
		}
		
	}
	return false;
}

////////////////////////////////////////////////
/*///////////////Return Pokemon Info API//////////////////////*/
////////////////////////////////////////////////

function getPokemonbyType( type, order ){
	
	var pokemonlist = [];
	
	for ( var i = 0; i < pokemon.length; i++ ){
	
		var pkmtypes = getPokemonType( i );
	
		if ( pkmtypes[0] == type && pkmtypes[1] == "" && order == "pure"  ){
		
			pokemonlist[pokemonlist.length] = i;
		
		}else if ( pkmtypes[0] == type && pkmtypes[1] != "" && order == "primary" ){
		
			pokemonlist[pokemonlist.length] = i;
		
		}else if ( pkmtypes[0] != type && pkmtypes[1] == type && order == "secondary" ){
		
			pokemonlist[pokemonlist.length] = i;
		
		}
	
	}

	return pokemonlist;
	
}

function getPokemonType( pkm ){

	return pokemon[pkm].type.split(spliter);

}

function getNumber( index ){

	var s = index+1;
	s = s.toString();
	
	while ( s.length < 3 ){
	
		s = "0"+s;
	
	}
	
	return "#"+s;

}

function getIcon( index ){

	var s = index+1;
	s = s.toString();
	
	while ( s.length < 3 ){
	
		s = "0"+s;
	
	}
	
	return s+"MS.png";

}

////////////////////////////////////////////////
/*///////////////Gerar HTML API//////////////////////*/
////////////////////////////////////////////////

function typeBattleTable( type ){
	
	var color = getColor( type );
	var lists = [];
	lists[0] = getResist( type );
	lists[1] = getWeakness( type );
	lists[2] = getImunity( type );
	lists[3] = getResistTo( type );
	lists[4] = getWeaknessTo( type );
	lists[5] = getImunityTo( type );
	var html = [];
	
	for ( var x = 0; x < 6; x++ ){
	
		if ( lists[x][0] != "" && lists[x][0] != undefined ){
		
			html[x] = "";
		
			for ( var i = 0; i < lists[x].length; i ++ ){
			
				html[x] = html[x]+'<a title="'+lists[x][i]+'" class="typeref" style="background: '+getColor(lists[x][i])[0]+'; border:solid 1px '/*
				*/+getColor(lists[x][i])[1]+';">'+lists[x][i].toUpperCase()+'</a><br>';
			
			}
		
		}else{
			
			html[x] = "None";
			
		}
	
	}
	
	return '<table id="typeBP" class="'+type+'" style="background:'+color[0]+'; border: solid 3px '+color[1]+';"><tr><th colspan="2">Offensive</th><th style="background:'+color[0]/*
	*/+'; border: solid 1px'+color[1]+';" class="typeref" >'+type.toUpperCase()+'</th><th colspan="2" >Defensive</th></tr><tr><th>Power</th><th>Types</th><th rowspan="4" ></th><th>Power</th><th>Types</th></tr><tr><td>2\u2717</td><td>'+/*
	*/html[4]+'</td><td>\u00BD\u2717</td><td>'+html[0]+'</td></tr><tr><td>\u00BD\u2717</td><td>'+html[3]+'</td><td>2\u2717</td><td>'+html[1]+'</td>'+'</tr><tr><td>0\u2717</td><td>'+html[5]+'</td><td>0\u2717</td><td>'+html[2]/*
	*/+'</td></tr></table>';
	
}

function gerarClass(){
	
	var style = "";
	
	for ( var i = 0; i < type.length; i++ ){
	
		style += "."+type[i].name+" tr td { background:"+getColor(type[i].name)[2]+"; }" ;
		
	}

	criarRegra( style );
	
}

/*--------------*/

function typeListTable( type ){

	var color = getColor( type );
	var html = [];
	var finalhtml = "";
	var pkmlists = [];
	pkmlists[0] = getPokemonbyType( type, "pure" );
	pkmlists[1] = getPokemonbyType( type, "primary" );
	pkmlists[2] = getPokemonbyType( type, "secondary" );

	for ( var x = 0; x < 3; x++ ){
	
		if ( pkmlists[x].length > 0 ){
		
			html[x] = "";
		
			for ( var i = 0; i < pkmlists[x].length; i ++ ){
				
				var tp = getPokemonType( pkmlists[x][i] );
				var s = "";
				var s2 = "";
				
				if ( tp[1] != "" ){
				
					s = '</td><td style="background: '+getColor(tp[0])[0]+';">'+capit(tp[0])+'</td><td style="background: '+getColor(tp[1])[0]+';">'+capit(tp[1])+'</td></tr>';
					s2 = "<th>Type 2</th>";
					
				}else{
				
					s = '</td><td colspan="2" style="background: '+getColor(tp[0])[0]+';">'+capit(tp[0])+'</td></tr>';
					
				}
				
				html[x] += '<tr><td>'+getNumber(pkmlists[x][i])+'</td><td><img src="icons//'+getIcon(pkmlists[x][i])+'" ></img></td><td>'+capit( pokemon[pkmlists[x][i]].name ) +s ;
			
			}
		
		}else{
		
			html[x] = "None";
			
		}
		
	finalhtml += '<table id="pokemonlist" style="background:'+color[2]+'; border:solid 5px '+color[0]+';" ><thead><tr><th>#</th><th>icon</th><th>Nome</th>'+/*
	*/'<th>Type 1</th>'+s2+'</tr></thead><tbody><tr>'+html[x]+'</tr></tbody></table>';
	
	}
	
	return finalhtml;
 
}

/*--------------*/

function globalList(){

	var lista = "";
	
	for ( var i = 0; i < pokemon.length; i++ ){
	
		var s;
		var type = getPokemonType( i );

		if ( type[1] != "" ){
		
			s = '</td><td style="background: '+getColor( type[0] )[0]+';">'+capit( type[0] )+'</td><td style="background: '+getColor( type[1] )[0]+';">'+capit( type[1] )+'</td></tr>';
		
		}else{
	
			s = '</td><td colspan="2" style="background: '+getColor(type[0])[0]+';">'+capit(type[0])+'</td></tr>';
		
		}
		
		lista += '<tr><td>'+getNumber( i )+'</td><td><img src="icons//'+getIcon( i )+'" ></img></td><td>'+capit( pokemon[i].name ) +s ;
	
	}

	return '<table id="pokemonlist" ><thead><tr><th>#</th><th>icon</th><th>Nome</th>'+/*
	*/'<th>Type 1</th><th>Type 2</th></tr></thead><tbody>'+lista+'</tbody></table>';

}


/*
//! textmacro get takes func, field

function get$func$To( string_type ){
	
	var $func$List = [];
	
	for ( var i = 0; i < 17; i++ ){
	
		var s = type[i].$field$.split(", ");

		for ( var x = 0; x < s.length; x++ ){
			
			if ( s[x] == string_type ){
			
				$func$List[$func$List.length] = type[i].name;
				
			}
		
		}
	
	}
	
	return $func$List;
	
}

//! endtextmacro

//! runtextmacro get("Weakness", "weak")
//! runtextmacro get("Imunity", "imunity")
//! runtextmacro get("Resist", "resist")

*/

function capit(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

function criarRegra(rule) {
  var div = document.createElement("div");
  div.innerHTML = "<style>"+rule+"</style>";
  document.body.appendChild(div);
}