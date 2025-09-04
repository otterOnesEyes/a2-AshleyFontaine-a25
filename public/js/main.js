// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const nameinput = document.querySelector( "#yourname" ),
        ageinput = document.querySelector( '#yourage' ),
        colorinput = document.querySelector( '#yourcolor' ),
        json = { yourname: nameinput.value, yourage: ageinput.value, yourcolor: colorinput.value
        },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  document.querySelector('#yourcolor').value = "nah that one sucks"

  console.log( "text:", text )
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}