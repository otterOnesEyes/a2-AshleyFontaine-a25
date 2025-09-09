// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const uninput = document.querySelector( "#eusername" ),
        pwdinput = document.querySelector( '#epassword' ),
        scoreinput = document.querySelector( '#score' ),
        comboinput = document.querySelector( '#combo' ),
        mainput = document.querySelector( '#marvelous' ),
        grinput = document.querySelector( '#great' ),
        goinput = document.querySelector( '#good' ),
        miinput = document.querySelector( '#miss' ),
        json = { player: uninput.value, 
                 password: pwdinput.value, 
                 score: scoreinput.value,
                 combo: comboinput.value,
                 marvelous: mainput.value,
                 great: grinput.value,
                 good: goinput.value,
                 miss: miinput.value
        },
        body = JSON.stringify( json )

  const response = await fetch( "/entry", {
    method:"POST",
    type: "entry",
    body 
  })

  const text = await response.text()

  document.querySelector('#yourcolor').value = "nah that one sucks"

  console.log( "text:", text )
}

const remove = async function( event ) {
  event.preventDefault()

    const uninput = document.querySelector( '#dusername' ),
          pwdinput = document.querySelector( '#dpassword' ),
          json = { player: uninput.value,
                   password: pwdinput.value
          },
          body = JSON.stringify( json )

    const response = await fetch( "/submit", {
      method:"POST",
      type: "delete",
      body
    })

}



window.onload = function() {
   const entrybutton = document.querySelector("entrybutton"),
         deletebutton = document.querySelector("deletebutton");
  entrybutton.onclick = submit;
  deletebutton.onclick = remove;
}