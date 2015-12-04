'use-strict'

var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un-test.refugeeemojis-test-int-l7z1l8mCLg1kZKp7YNuec4qt8j4VzoP_W8BRfuZxO8VyJhNJGLFiMXSIPeZI5lSD0MKgY_bIcokhUv4grSkKag'
  });

$(document).ready(function(){
  $('#download-modal').modal('hide');
  formListener();

})

function formListener(){
  $('.signup').submit(function(event){
    event.preventDefault();
    var email = $('.signup').find('[type="email"]').val();
    showDownload();
  });
}

function sendData(data){
  data.source = 'nothome';
  data.tags = (data.tags || {});
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};

function showDownload(){
  $('#download-modal').modal('show');
}