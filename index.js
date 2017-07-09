//function defined here
function head(url, onheaders, ondone, onerror){
  onheaders  = "function" === typeof onheaders  ? onheaders : function(){}; //normalise
  ondone     = "function" === typeof ondone     ? ondone    : function(){}; //normalise
  onerror    = "function" === typeof onerror    ? onerror   : function(){}; //normalise

  var data = [];

  url = require('url').parse(url);
  const request = require("http").request({
                                     protocol: url.protocol               // "http:"
                                    ,auth:     url.auth                   // "username:password"
                                    ,hostname: url.hostname               // "www.example.com"
                                    ,port:     url.port                   // 80
                                    ,path:     url.path                   // "/"
                                    ,family:   4                          // IPv4
                                    ,method:   "HEAD"
                                    ,headers:  {"Connection":     "Close"
                                               ,"Cache-Control":  "no-cache"
                                               ,"User-Agent":     "Mozilla/5.0 Chrome"
                                               ,"Referer":        "http://eladkarako.com/"
                                               ,"DNT":            "1"
                                               ,"X-Hello":        "Goodbye"  
                                               ,"Accept":          "*/*"
                                               }
                                    ,agent:    undefined                  //use http.globalAgent for this host and port.
                                    ,timeout:  5 * 1000                   //5 seconds
                                  });
  request.setSocketKeepAlive(false);                                      //make sure to return right away (single connection mode).
  request.on("error",    (err)      => {  onerror(request,err);          });
  request.on("response", (response) => {  onheaders(request,response);    //headers
                                          
                                          response.setEncoding("utf8");   //collect response-body
                                          response.on("data",(chunk)=>{data.push(chunk);})
                                          response.on("finish",()=>{ondone(request,response,data);});
                                       });
  request.end();
}

//just use it.. 
head("http://eladkarako.com/" ,function whenheaders(request, response){
                                 console.log("HTTP-Headers Recived",  JSON.stringify(response.headers)  );
                              }
                              ,function whendone(request, response, data){      //NOTE: won't be called when using HEAD
                                 console.log("Response Body Recived", data);
                              }
                              ,function whenerror(request, error){
                                 console.log("Request Error", error);
                              }
);

/* another way, this time just get the HTTP status-code :]  slightly different style... :]]
head("http://eladkarako.com/", function(request,response){
  console.log("HTTP-Headers Recived. Status code=", response.statusCode);
});
*/