'use-strict'

var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un.not-home-for-the-holidays-int-uX2UcHAsWiXoOHnZMZPH45z88zdlM831rsoQvcIgOQXZ9kGfmr58RrojjIGq9n6HHGhBJjDaM_EjEslycWVSKg'
  });

$(document).ready(function(){
  $('#download-modal').modal('hide');
  formListener();
})

function formListener(){
  $('.signup').submit(function(event){
    event.preventDefault();
    var email = $('.signup').find('[type="email"]').val();
    var fname = $('.signup').find('[name="fname"]').val();
    aId = getAssetId();
    showDownload(aId);
    data = { 
      source:'nothome ' + aId,
      givenName: fname,
      email: email
    }
    sendData(data);
  });
}

function sendData(data){
  var source = getSource();
  data.tags = (data.tags || {});
  source ? data.tags.adSource = source : null; 
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};

function showDownload(aId){
  dModal = $('#download-modal');
  dModal.find('.download').prop('href',assetUrl(aId));
  dModal.modal('show');
}

function getAssetId(){
  var url = window.location.href;
  var re =/asset=([^&]*)/;
  var aId = url.match(re);
  return aId[1];
}

function assetUrl(aId){
  asset = "";
  if(aId === 'dreidel'){
    asset = "public/dreidel.pdf"
  }
  baseUrl = "../"
  return baseUrl +  asset;
}

function getSource(){
  var id = /source=(.*)/.exec(document.location.href);
  if(id){
  return id[1];
  }
  else{
    return null;
  }
}
