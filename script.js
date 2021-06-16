


function mostrarDados() {
    moduloComentario.listarComentario();
}




function criarDados() {
    var nomeUsuario = document.querySelector('#nomeUsuario').value;
    var comentarioUsuario = document.querySelector('#comentarioUsuario').value;
    var telefoneUsuario = document.querySelector('#telefoneUsuario').value;
    var emailUsuario = document.querySelector('#emailUsuario').value;

    var comentario = new RegistroComentario(nomeUsuario, comentarioUsuario, telefoneUsuario, emailUsuario)
    moduloComentario.criarComentario(comentario);
}





function apagarDados(id) {
    moduloComentario.apagarComentario(id);
}





function editarDados(id) {
    moduloComentario.editarComentario(id);
}





function atualizarDados() {
    moduloComentario.atualizarComentario();
}





"use strict";
var moduloComentario = (function() {

  var Comentario = JSON.parse(localStorage.getItem('Comentario')) || [];
  var newComentario = [];
  var id;
  var selectedid;


  return {
      listarComentario: function() {
        var rows = "";
        for (let i = 0; i < Comentario.length; i++) {
          var d = JSON.parse(Comentario[i]);
          id = i;
          rows += "<tr>"+ 
                    "<td>"+ d.nomeUsuario +"</td>" +
                    "<td>"+ d.comentarioUsuario +"</td>" +
                    "<td>"+ d.telefoneUsuario +"</td>" +
                    "<td>"+ d.emailUsuario +"</td>" +                   
                  "</tr>"+
			  	  "<tr>"+
                      "<td>"+ '<button class="buttonEdit" onclick="editarDados('+"'"+id+"'"+')"> Editar </button>' +
                      '<button class="buttonDel" onclick="apagarDados('+"'"+id+"'"+')"> Apagar</button>' +"</td>" +
			  	  "</tr>";
                    
        }
        document.getElementById('ListaComentarios').innerHTML = rows;
      },

      criarComentario: function(emp) {
          if(Comentario != null) {
            newComentario = Comentario;
          }
          newComentario.push(JSON.stringify(emp));
          localStorage.setItem('Comentario', JSON.stringify(newComentario));
          moduloComentario.limpar();
      },
      
      apagarComentario: function(id) {
        if(confirm('Tem certeza que deseja apagar este comentário?')){
          Comentario.splice(id, 1);
          localStorage.setItem('Comentario', JSON.stringify(Comentario));
          moduloComentario.listarComentario();
        }        
      },


      editarComentario: function(id) {
          selectedid = id;
          var objCom = JSON.parse(Comentario[id]);
          document.querySelector("#nomeUsuario").value = objCom.nomeUsuario;
          document.querySelector("#comentarioUsuario").value = objCom.comentarioUsuario;
          document.querySelector("#telefoneUsuario").value = objCom.telefoneUsuario;
          document.querySelector("#emailUsuario").value = objCom.emailUsuario;

          document.getElementById("update").disabled = false;
      },


      atualizarComentario: function() {
          var objCom = JSON.parse(Comentario[selectedid]);
          var objIndex = Comentario.findIndex(obj => JSON.parse(obj).telefoneUsuario == objCom.telefoneUsuario);

          var comentarioAtualizado = JSON.parse(Comentario[objIndex]);

          comentarioAtualizado.nomeUsuario = document.querySelector("#nomeUsuario").value;
          comentarioAtualizado.comentarioUsuario = document.querySelector("#comentarioUsuario").value;
          comentarioAtualizado.telefoneUsuario = document.querySelector("#telefoneUsuario").value;
          comentarioAtualizado.emailUsuario = document.querySelector("#emailUsuario").value;

          Comentario[objIndex] = JSON.stringify(comentarioAtualizado);
          localStorage.setItem('Comentario', JSON.stringify(Comentario));
          moduloComentario.listarComentario();
          moduloComentario.limpar();
      },


      limpar: function () {
        document.querySelector("#nomeUsuario").value = "";
        document.querySelector("#comentarioUsuario").value = "";
        document.querySelector("#telefoneUsuario").value = "";
        document.querySelector("#emailUsuario").value = "";
      }
  };
}());




var  RegistroComentario = function(nomeUsuario, comentarioUsuario, telefoneUsuario, emailUsuario) {
  var nomeUsuario = nomeUsuario;
  var comentarioUsuario = comentarioUsuario;
  var telefoneUsuario = telefoneUsuario;
  var emailUsuario = emailUsuario;

  return {
    nomeUsuario: nomeUsuario,
    comentarioUsuario: comentarioUsuario,
    telefoneUsuario: telefoneUsuario,
    emailUsuario: emailUsuario
  };
}