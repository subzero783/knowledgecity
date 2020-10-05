console.log('scripts loaded!');

// var formDataJson = toJSONString(document.getElementById("job_search_form"));

$.ajax({ 
  type: 'POST', 
  url: 'http://localhost/knowledgecity/auth/',
  // data: {
  //   action: 'get_jobs',
  //   form_data: formDataJson
  // },
  dataType: 'json',
  cache: false
})
.done(function(response){
  console.log(response);
}) 
.fail(function(error){
  console.log(error);
});