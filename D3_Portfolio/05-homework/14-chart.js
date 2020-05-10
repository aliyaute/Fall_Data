(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic



  // Build your scales here



  d3.csv("eating-data.csv")
    .then(ready)
    .catch(function(err) {
      console.log("Failed with", err)
    })


  function ready(datapoints) {
    // Add and style your marks here


  }
})()