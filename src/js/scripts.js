console.log('scripts loaded!');

// var formDataJson = toJSONString(document.getElementById("job_search_form"));

$.ajax({ 
  type: 'GET', 
  url: 'http://localhost/knowledgecity/users/',
  data: {
    action: 'get_jobs',
    form_data: formDataJson
  },
  dataType: 'json',
  cache: false
})
.done(function(response){
  console.log(response);
}) 
.fail(function(error){
  console.log(error);
});