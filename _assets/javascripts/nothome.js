'use-strict'

var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un-test.not-home-for-the-holidays-test-int-WojenXYI0zi0GOoxBLcNracDZIVOed7yaDPNINIsJd2K4.6Kj4wtMd8r68KSPySG2N61wkvLDGSTIBfn57Uslw'
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