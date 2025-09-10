const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "player": "otter1", "password": "123", "score": 1000000, "class": "SSS+", "combo": 1000, "marvelous": 1000, "great": 0, "good": 0, "miss": 0, "completion": "All Marvelous"},
  { "player": "otter2", "password": "123", "score": 195680, "class": "SSS+", "combo": 1000, "marvelous": 23, "great": 0, "good": 0, "miss": 0, "completion": "Full Combo"},
  { "player": "otter3", "password": "123", "score": 0, "class": "F", "combo": 0, "marvelous": 23, "great": 0, "good": 0, "miss": 0, "completion": "Not Clear"},
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )
    jsObject = JSON.parse( dataString )
    console.log(jsObject.score)
    if(request.url === "/entry"){

      const grade = gradeScore(jsObject.score)
      const completion = evalComplete(jsObject.marvelous, jsObject.great, jsObject.good, jsObject.miss)

      for(let i = 0 ; i < appdata.length; i++){
        if(appdata[i].player == jsObject.player){
          if(appdata[i].password == jsObject.password){
            const entry = appdata[i]

            entry.score = jsObject.score
            entry.class = grade
            entry.combo = jsObject.combo
            entry.marvelous = jsObject.marvelous
            entry.great = jsObject.great
            entry.good = jsObject.good
            entry.miss = jsObject.miss
            entry.completion = completion
          } else {
            alert("Incorrect password!")
            return
          }
        }
      }

      newEntry = {
        player: jsObject.player,
        password: jsObject.password,
        score: jsObject.score,
        class: grade,
        combo: jsObject.combo,
        marvelous: jsObject.marvelous,
        great: jsObject.great,
        good: jsObject.good,
        miss: jsObject.miss,
        completion: completion
      }

      appdata.push(newEntry)
      

    } else if (request.url === "/delete"){
      for(let i = 0 ; i < appdata.length; i++){
        if(appdata[i].player == jsObject.player){
          if(appdata[i].password == jsObject.password){
            appdata[i] == ""
          }
          alert("Incorrect Password!")
          return
        }
      }
      alert("User not found!")
    }

    lb = constructLeaderboard()

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(lb)
  })
}

const constructLeaderboard = function () {
  lb = "<tr><th>Rank</th><th>Player</th><th>Score</th><th>Grade</th><th>Combo</th><th>Complete</th></tr>"
  for(let i = 0; i < appdata.length; i++){
    e = appdata[i]
    lb += "<tr><td>" +
          (i+1) + "</td><td>" +
          e.player + "</td><td>" +
          e.score + "</td><td>" +
          e.grade + "</td><td>" +
          e.combo + "</td><td>" +
          e.completion +
          "</td></tr>"
  }
  return lb
}

const evalComplete = function (marv, great, good, miss){
  if((great + good + miss) == 0){
    return "All Perfect"
  }
  if(miss == 0){
    return "Full Combo"
  }
  if(miss <= 5){
    return "Missless"
  }
 return "Clear"
}

const gradeScore = function( score ) {
  switch(true){
    case(score == 1000000):
      return "MASTER"
    case(score >= 990000):
      return "SSS+"
    case(score >= 980000):
      return "SSS"
    case(score >= 970000):
      return "SS+"
    case(score >= 950000):
      return "SS"
    case(score >= 930000):
      return "S+"
    case(score >= 900000):
      return "S"
    case(score >= 850000):
      return "AAA"
    case(score >= 800000):
      return "AA"
    case(score >= 700000):
      return "A"
    case(score > 0):
      return "B"
    case(score == 0):
      return "F"
  }
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
