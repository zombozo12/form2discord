/**
MIT License

Copyright (c) 2019 Wiguna R

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


var POST_URL = "https://discordapp.com/api/webhooks/your_discord_server_webhook";

function onSubmit(e) {
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  var latestResponse = formResponses[formResponses.length - 1];
 
  var itemResponses = latestResponse.getItemResponses();
  
  var items = [];
  
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    
    // Get Question
    var question = itemResponse.getItem().getTitle();
    // Get Answer
    var answer   = itemResponse.getResponse();
    
    
    // use toString() because some entries from Google Form is array, like checkbox, etc.
    items.push({
      "name": question,
      "value": answer.toString(),
      "inline": false
    });
    
    //Logger.log('Response #%s to the question "%s" was "%s"',
               (j + 1).toString(),
               question,
               answer);
  }
  
  /**
  Message Builder to Discord Server Chat.
  
  Change the title and footer if you want to. Or you can change entire Message Builder as you want.
  */
  var options = {
    "method": "post",
    "payload": JSON.stringify({
      "embeds": [{
        "title": "TOP TEXT CHANGE THIS IN SCRIPT",
        "fields": items,
        "footer": {
          "text": "BOTTOM TEXT CHANGE THIS IN SCRIPT"
        }
      }]
    })
  };
    
  //Logger.log(options);
  UrlFetchApp.fetch(POST_URL, options); 
};
